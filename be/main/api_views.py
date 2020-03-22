import json
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
from django.forms import ModelForm

from integrations.credit_kudos.api import generate_connect_link, generate_customer_token
from reports.models import IncomeReport


class IncomeReportForm(ModelForm):
    class Meta:
        model = IncomeReport
        fields = (
            "full_name",
            "email",
            "date_of_birth",
        )


def get_or_create_report(request):
    if "income_report_reference" in request.session:
        report = IncomeReport.objects.get(
            reference_code=request.session["income_report_reference"]
        )
    else:
        report = IncomeReport.objects.create()
        request.session["income_report_reference"] = report.reference_code

    return report


@require_http_methods(["POST"])
def create_report(request):
    if "income_report_reference" in request.session:
        report = IncomeReport.objects.get(
            reference_code=request.session["income_report_reference"]
        )
    else:
        report = IncomeReport.objects.create()
        request.session["income_report_reference"] = report.reference_code

    return JsonResponse({"income_report_reference": report.reference_code,})


@require_http_methods(["POST"])
def update_report(request):
    report = get_or_create_report(request)

    data = json.loads(request.body)
    form = IncomeReportForm(data, instance=report)
    if not form.is_valid():
        return JsonResponse({"errors": form.errors,}, status=400)

    form.save()

    return JsonResponse({"income_report_reference": report.reference_code,})


def generate_credit_kudos_link(request):
    income_report_reference = request.session["income_report_reference"]
    report = IncomeReport.objects.get(reference_code=income_report_reference)

    customer_token = generate_customer_token(report.email)
    connect_link = generate_connect_link(
        customer_token, {"income_report_reference": report.reference_code,}
    )

    return JsonResponse({"connect_link": connect_link})
