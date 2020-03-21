import time
import uuid
from datetime import timedelta
from typing import TypedDict

import jwt
import requests
from django.conf import settings
from django.core.exceptions import ImproperlyConfigured

from fronted.utils import tz_now
from users.models import AuthUser, CreditKudosProfile

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
    user: AuthUser, oauth_payload: OauthTokenResponse
) -> CreditKudosProfile:
    access_token = CreditKudosProfile.objects.create(
        user=user,
        access_token=oauth_payload["access_token"],
        token_type=oauth_payload["token_type"],
        expires_at=tz_now() + timedelta(seconds=oauth_payload["expires_in"]),
        refresh_token=oauth_payload["refresh_token"],
        scope=oauth_payload["scope"],
    )
    return access_token


def generate_customer_token(email: str, request) -> str:
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


def get_access_token(user: AuthUser) -> str:
    access_token = (
        CreditKudosProfile.objects.filter(user=user, expires_at__gte=tz_now(),)
        .order_by("-created_at")
        .first()
    )

    if not access_token:
        # Refresh access token
        access_token = refresh_access_token(user)

    return access_token.access_token


def refresh_access_token(user: AuthUser) -> CreditKudosProfile:
    raise_if_disabled()

    oldest_token = (
        CreditKudosProfile.objects.filter(user=user).order_by("-created_at").first()
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

    return save_access_token(user=user, oauth_payload=data)


def get_reports(user: AuthUser):
    raise_if_disabled()

    access_token = get_access_token(user)

    response = requests.get(
        "https://api.creditkudos.com/v3/reports", auth=BearerAuth(access_token),
    )
    response.raise_for_status()

    data = response.json()["data"]

    reports = data["reports"]
    return reports


def get_latest_report(user: AuthUser):
    reports = get_reports(user)

    if len(reports) == 0:
        raise Exception("No reports found")

    latest_report = next(
        (report for report in reports if report["status"] == "complete")
    )

    return latest_report


def get_connected_accounts(user: AuthUser, report_id: int):
    access_token = get_access_token(user)

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
