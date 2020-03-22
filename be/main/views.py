import json
import base64
import io
import logging
import uuid
import os
from urllib.parse import urlencode

from django.core.exceptions import SuspiciousOperation
from django.db import transaction
from django.http import HttpResponse, HttpResponseRedirect
from django.conf import settings
from django.template import loader

from google.cloud import storage
from google.cloud import tasks_v2

from reports.models import IncomeReport
from integrations.credit_kudos.api import (
    exchange_authorisation_code,
    save_access_token,
    get_latest_report,
)


from latex import build_pdf

logger = logging.getLogger(__name__)


def complete_credit_kudos(request):
    code = request.GET.get("code", None)
    state = request.GET.get("state", None)
    error = request.GET.get("error", None)

    if not code or not state:
        if error:
            return HttpResponseRedirect(
                f"{settings.BASE_URL}/connect-bank-account-failed?{urlencode(request.GET)}"
            )
        raise SuspiciousOperation

    state = json.loads(base64.b64decode(state).decode("utf-8"))

    income_report = IncomeReport.objects.get(
        reference_code=state["income_report_reference"]
    )
    oauth_payload = exchange_authorisation_code(code)

    with transaction.atomic():
        save_access_token(income_report, oauth_payload=oauth_payload)

    latest_report = get_latest_report(income_report)
    income_report.credit_kudos_report_id = latest_report["id"]
    income_report.save()

    next_path = request.GET.get("next", f"report/{income_report.reference_code}/view")
    return HttpResponseRedirect(f"{settings.BASE_URL}/{next_path}")


def perform_pdf_task(request):
    client = tasks_v2.CloudTasksClient()
    parent = client.queue_path(settings.PROJECT_ID, "europe-west1", "pdf-queue")
    task = {
        "http_request": {
            "http_method": "POST",
            "url": settings.BASE_URL + "/_tasks/create-pdf",
            "oidc_token": {
                "service_account_email": "123238859534-compute@developer.gserviceaccount.com",
            },
            "body": json.dumps({
                "name": "Sam Pull",
                "email": "sam@example.com",
                "dob": "1970/1/1",
                "utr": "1234567890",
                "ni": "AB123456C",
                "address": "123 Fake Street, N1 2AB",
                "loss_of_income": "partial",
                "accounts": [
                    {
                        "name": "Sam Pull Current Account",
                        "number": "12345678",
                        "sort_code": "12-34-56",
                    }
                ],
                "standard_occupation_code": "6221",  # SOC2020 Hairdresser
                "company": {"name": "Foo Bar Limited", "number": "11112222",},
            }).encode(),
        },
    }
    response = client.create_task(parent, task)
    logger.info("Created task %s", response.name)
    return HttpResponse("OK")


