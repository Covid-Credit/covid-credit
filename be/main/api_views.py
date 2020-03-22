import json
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse

from reports.models import IncomeReport


@require_http_methods(["POST"])
def create_report(request):
    data = json.loads(request.body)

    report = IncomeReport.objects.create()

    request.session["income_report_id"] = report.unique_id.hex

    return JsonResponse({"income_report_id": report.unique_id.hex,})
