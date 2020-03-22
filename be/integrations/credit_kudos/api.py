import json
import base64
import time
import uuid
import urllib.parse
from datetime import timedelta
from typing import TypedDict

import jwt
import requests
from django.conf import settings
from django.core.exceptions import ImproperlyConfigured

from main.utils import tz_now
from reports.models import IncomeReport
from users.models import CreditKudosProfile

from ..utils import BearerAuth


class CreditKudosNoToken(Exception):
    pass


class OauthTokenResponse(TypedDict):
    access_token: str
    token_type: str
    expires_in: int
    refresh_token: str
    scope: str
    created_at: int


def raise_if_disabled():
    # Check if credit kudos integration is enabled
    if not all([settings.CREDIT_KUDOS_CLIENT_ID, settings.CREDIT_KUDOS_CLIENT_SECRET]):
        raise ImproperlyConfigured("Credit Kudos integration is not setup")
    return True


def exchange_authorisation_code(authorisation_code: str) -> OauthTokenResponse:
    """Exchanges the authorisation code we get back at the end of a successful Connect Flow for an oauth access token
    and refresh token"""
    payload = {
        "client_id": settings.CREDIT_KUDOS_CLIENT_ID,
        "client_secret": settings.CREDIT_KUDOS_CLIENT_SECRET,
        "code": authorisation_code,
        "grant_type": "authorization_code",
    }
    response = requests.post("https://api.creditkudos.com/oauth/token", json=payload)
    response.raise_for_status()

    data = response.json()
    return data


def save_access_token(
    income_report: IncomeReport, oauth_payload: OauthTokenResponse
) -> CreditKudosProfile:
    access_token = CreditKudosProfile.objects.create(
        income_report=income_report,
        access_token=oauth_payload["access_token"],
        token_type=oauth_payload["token_type"],
        expires_at=tz_now() + timedelta(seconds=oauth_payload["expires_in"]),
        refresh_token=oauth_payload["refresh_token"],
        scope=oauth_payload["scope"],
    )
    return access_token


def generate_customer_token(email: str) -> str:
    raise_if_disabled()

    return jwt.encode(
        {
            "iss": settings.CREDIT_KUDOS_CLIENT_ID,
            "sub": "customer",
            "iat": time.time(),
            "jti": str(uuid.uuid4()),
            "email": email,
        },
        getattr(settings, "CREDIT_KUDOS_CLIENT_SECRET", ""),
        algorithm="HS256",
    ).decode("utf-8")


def generate_connect_link(access_token, state):
    params = {
        "client_id": settings.CREDIT_KUDOS_CLIENT_ID,
        "context": "connect",
        "customer_token": access_token,
        "redirect_uri": settings.CREDIT_KUDOS_REDIRECT_URI,
        "tab_journey": False,
        "state": str(base64.b64encode(json.dumps(state).encode("utf-8")), "utf-8"),
    }

    encoded_params = urllib.parse.urlencode(params, quote_via=urllib.parse.quote)
    return f"https://app.creditkudos.com/#/intro/?{encoded_params}"


def get_access_token(income_report: IncomeReport) -> str:
    access_token = (
        CreditKudosProfile.objects.filter(
            income_report=income_report, expires_at__gte=tz_now(),
        )
        .order_by("-created_at")
        .first()
    )

    if not access_token:
        # Refresh access token
        access_token = refresh_access_token(income_report)

    return access_token.access_token


def refresh_access_token(income_report: IncomeReport) -> CreditKudosProfile:
    raise_if_disabled()

    oldest_token = (
        CreditKudosProfile.objects.filter(income_report=income_report)
        .order_by("-created_at")
        .first()
    )
    if not oldest_token:
        raise CreditKudosNoToken("User doesn't have a Credit Kudos access token")

    payload = {
        "client_id": settings.CREDIT_KUDOS_CLIENT_ID,
        "client_secret": settings.CREDIT_KUDOS_CLIENT_SECRET,
        "refresh_token": oldest_token.refresh_token,
        "grant_type": "refresh_token",
    }
    response = requests.post("https://api.creditkudos.com/oauth/token", json=payload)
    response.raise_for_status()

    data = response.json()

    return save_access_token(income_report=income_report, oauth_payload=data)


def get_reports(income_report: IncomeReport):
    raise_if_disabled()

    access_token = get_access_token(income_report)

    response = requests.get(
        "https://api.creditkudos.com/v3/reports", auth=BearerAuth(access_token),
    )
    response.raise_for_status()

    data = response.json()["data"]

    reports = data["reports"]
    return reports


def get_latest_report(income_report: IncomeReport):
    reports = get_reports(income_report)

    if len(reports) == 0:
        raise Exception("No reports found")

    latest_report = reports[0]
    return latest_report


def get_report(income_report: IncomeReport, report_id: int):
    access_token = get_access_token(income_report)

    response = requests.get(
        f"https://api.creditkudos.com/v3/reports/{report_id}", auth=BearerAuth(access_token),
    )
    response.raise_for_status()

    data = response.json()["data"]

    report = data["report"]
    return report


def get_connected_accounts(income_report: IncomeReport, report_id: int):
    access_token = get_access_token(income_report)

    response = requests.get(
        f"https://api.creditkudos.com/v3/reports/{report_id}/accounts",
        auth=BearerAuth(access_token),
    )
    response.raise_for_status()

    data = response.json()["data"]

    accounts = data["accounts"]
    # TODO handle multiple pages?

    if len(accounts) == 0:
        raise Exception("No accounts found")

    return accounts


def get_inflows_over_time(income_report: IncomeReport, report_id: int):
    access_token = get_access_token(income_report)

    response = requests.get(
        f"https://api.creditkudos.com/v3/reports/{report_id}/inflows_over_time",
        auth=BearerAuth(access_token),
    )
    response.raise_for_status()

    data = response.json()["data"]
    return data["inflowsOverTime"]


def get_credit_transactions(income_report: IncomeReport, report_id: int):
    accounts = get_connected_accounts(income_report, report_id)
    access_token = get_access_token(income_report)

    credit_transactions = []
    for account in accounts:
        account_id = account["id"]
        response = requests.get(
            f"https://api.creditkudos.com/v3/reports/{report_id}/accounts/{account_id}/transactions",
            params={
                "inflow_outflow_indicator": "inflow",
            },
            auth=BearerAuth(access_token),
        )
        response.raise_for_status()
        credit_transactions += response.json()["data"]["transactions"]

    return credit_transactions


class UserInfoPayload(TypedDict):
    email: str
    customReference: str


def fetch_userinfo(access_token: str) -> UserInfoPayload:
    response = requests.get(
        f"https://api.creditkudos.com/v3/userinfo", auth=BearerAuth(access_token),
    )
    response.raise_for_status()
    data = response.json()
    return data["data"]["customer"]
