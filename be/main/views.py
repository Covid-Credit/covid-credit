import io
import logging
from urllib.parse import urlencode

from django.core.exceptions import SuspiciousOperation
from django.db import transaction
from django.http import HttpResponseRedirect, FileResponse
from django.conf import settings

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
    min_latex = (r"\documentclass{article}"
             r"\begin{document}"
             r"Hello, world!"
             r"\end{document}")
    pdf = build_pdf(min_latex)
    return FileResponse(io.BytesIO(bytes(pdf)), as_attachment=True, filename="report.pdf")