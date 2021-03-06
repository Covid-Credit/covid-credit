import json
import base64
from datetime import datetime
import dateutil.parser
import io
import logging
import re
import uuid
import os

from django.db import transaction
from django.http import FileResponse
from django.conf import settings
from django.http import HttpResponse
from django.template import loader

from google.cloud import storage

from latex import build_pdf
from latex.jinja2 import make_env
from jinja2 import FileSystemLoader

from integrations.credit_kudos.api import (
    get_access_token,
    get_inflows_over_time,
    get_latest_report,
    get_report,
    get_credit_transactions,
)
from reports.models import IncomeReport

logger = logging.getLogger(__name__)

def _parse_iso601(value: str) -> datetime:
    return dateutil.parser.parse(value)

def _format_date(value: datetime) -> str:
    return value.strftime('%Y-%m-%d')

def _escape(text: str) -> str:
    conv = {
        '&': r'\&',
        '%': r'\%',
        '$': r'\$',
        '#': r'\#',
        '_': r'\_',
        '{': r'\{',
        '}': r'\}',
        '~': r'\textasciitilde{}',
        '^': r'\^{}',
        '\\': r'\textbackslash{}',
        '<': r'\textless{}',
        '>': r'\textgreater{}',
    }
    regex = re.compile('|'.join(re.escape(str(key)) for key in sorted(conv.keys(), key = lambda item: - len(item))))
    return regex.sub(lambda match: conv[match.group()], text)


def _build_pdf(context) -> bytes:
    env = make_env(
      loader=FileSystemLoader(os.path.join(settings.BASE_DIR, 'templates')),
    )
    env.filters['parse_iso8601'] = _parse_iso601
    env.filters['format_date'] = _format_date
    env.filters['escape'] = _escape

    template = env.get_template("pdf.tex")
    pdf = build_pdf(template.render(context), builder="xelatexmk")
    return bytes(pdf)

def _get_employment_type(income_report: IncomeReport) -> str:
    if income_report.self_employed:
        return 'self-employed person'
    else:
        return 'sole trader'

def _get_loss_type(income_report: IncomeReport) -> str:
    if income_report.cancelled_work:
        return 'has lost'
    elif income_report.future_work_cancelled:
        return 'will lose'

def test_pdf(request):
    params = json.loads(request.body)
    params["logo_path"] = os.path.join(settings.BASE_DIR, "static/images/creditkudos.png")
    pdf = _build_pdf(params)
    return FileResponse(io.BytesIO(pdf))

def create_pdf(request):
    params = json.loads(request.body)
    income_report_id = params["income_report_id"]
    income_report = IncomeReport.objects.get(
      id=income_report_id,
    )

    report = get_report(income_report, income_report.credit_kudos_report_id)
    if report["status"] != "complete":
      # Report not ready yet.
      return HttpResponse(status=422)

    report_id = report["id"]
    income = report["summary"]["incomeWithBankTransfers"]["predictedMonthlyAmount"]["value"]
    credit_transactions = get_credit_transactions(income_report, report_id)
    # Filter pending transactions.
    credit_transactions = [t for t in credit_transactions if t["bookedAt"]]

    context = {
      "logo_path": os.path.join(settings.BASE_DIR, "static/images/creditkudos.png"),
      "name": income_report.full_name,
      "email": income_report.email,
      "address": income_report.address,
      "dob": income_report.date_of_birth,
      "income": income,
      "today": datetime.now().strftime("%d %b %Y"),
      "credit_transactions": credit_transactions,
      "reference_code": income_report.reference_code,
      "link_self": f"https://covidcredit.uk/report/{income_report.reference_code}",

      "national_insurance": income_report.national_insurance_number,
      "unique_tax_reference": income_report.unique_tax_reference,
      "employment_type": _get_employment_type(income_report),
      "industry": income_report.industry,
      "loss_type": _get_loss_type(income_report),
      "future_earnings": income_report.future_earnings,
    }
    pdf = _build_pdf(context)
    storage_client = storage.Client()
    bucket = storage_client.bucket("covid-credit-dev")
    key = "reports/%s.pdf" % uuid.uuid4()
    blob = bucket.blob(key)
    blob.upload_from_string(pdf, content_type="application/pdf")

    income_report.file_location = key
    income_report.save()

    return HttpResponse(blob.self_link)
