import json
import base64
import io
import logging
import uuid
import os

from django.db import transaction
from django.http import FileResponse
from django.conf import settings
from django.http import HttpResponse
from django.template import loader

from google.cloud import storage

from latex import build_pdf

from integrations.credit_kudos.api import (
    get_access_token,
    get_inflows_over_time,
    get_latest_report,
)
from reports.models import IncomeReport

logger = logging.getLogger(__name__)


def create_pdf(request):
    template = loader.get_template("pdf.tex")
    params = json.loads(request.body)
    income_report_id = params["income_report_id"]
    income_report = IncomeReport.objects.get(
      id=income_report_id,
    )

    report = get_latest_report(income_report)
    if report["status"] != "complete":
      # Report not ready yet.
      return HttpResponse(status=422)

    inflows = get_inflows_over_time(income_report, report["id"])

    context = {
      "logo_path": os.path.join(settings.BASE_DIR, "static/images/creditkudos.png"),
      "name": income_report.full_name,
      "email": income_report.email,
      "dob": income_report.date_of_birth,
      "inflows": inflows,
    }

    pdf = build_pdf(template.render(context), builder="xelatexmk")
    storage_client = storage.Client()
    bucket = storage_client.bucket("covid-credit-dev")
    key = "reports/%s.pdf" % uuid.uuid4()
    blob = bucket.blob(key)
    blob.upload_from_string(bytes(pdf), content_type="application/pdf")

    income_report.file_location = key
    income_report.save()

    return HttpResponse(blob.self_link)
