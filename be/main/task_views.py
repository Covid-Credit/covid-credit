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

logger = logging.getLogger(__name__)


def create_pdf(request):
    template = loader.get_template("pdf.tex")
    context = {
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
        "logo_path": os.path.join(settings.BASE_DIR, "static/images/creditkudos.png"),
    }
    pdf = build_pdf(template.render(context), builder="xelatexmk")
    storage_client = storage.Client()
    bucket = storage_client.bucket("covid-credit-dev")
    blob = bucket.blob("reports/%s.pdf" % uuid.uuid4())
    blob.upload_from_string(bytes(pdf), content_type="application/pdf")

    return HttpResponse(blob.self_link)
