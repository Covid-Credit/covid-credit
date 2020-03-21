import io
import logging
from urllib.parse import urlencode

from django.core.exceptions import SuspiciousOperation
from django.db import transaction
from django.http import HttpResponseRedirect, FileResponse
from django.conf import settings
from django.template import loader

from integrations.credit_kudos.api import (
    exchange_authorisation_code,
    save_access_token,
)


from latex import build_pdf

logger = logging.getLogger(__name__)


def complete_credit_kudos(request):
    code = request.GET.get("code", None)
    next_path = request.GET.get("next", "connect-bank-account-success")
    error = request.GET.get("error", None)

    if not code:
        if error:
            return HttpResponseRedirect(
                f"{settings.BASE_URL}/connect-bank-account-failed?{urlencode(request.GET)}"
            )
        raise SuspiciousOperation

    user = request.user
    oauth_payload = exchange_authorisation_code(code)

    if not user.is_authenticated:
        raise SuspiciousOperation

    with transaction.atomic():
        save_access_token(user, oauth_payload=oauth_payload)

    return HttpResponseRedirect(f"{settings.BASE_URL}/{next_path}")

def create_pdf(request):
    template = loader.get_template("pdf.tex")
    context = {
        'name': 'Sam Pull',
        'email': 'sam@example.com',
        'dob': '1970/1/1',
        'utr': '1234567890',
        'ni': 'AB123456C',
        'address': '123 Fake Street, N1 2AB',
        'loss_of_income': 'partial',
    }
    pdf = build_pdf(template.render(context), builder='xelatexmk')
    return FileResponse(io.BytesIO(bytes(pdf)), as_attachment=False, filename="report.pdf")
