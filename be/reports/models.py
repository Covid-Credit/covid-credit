import uuid
from django.db import models

from main.utils import generate_alphanumeric_key


def generate_income_report_reference_code():
    candidate = f"IR{generate_alphanumeric_key(6)}"
    if IncomeReport.objects.filter(reference_code=candidate).exists():
        return generate_income_report_reference_code()
    return candidate


class IncomeReport(models.Model):
    unique_id = models.UUIDField(default=uuid.uuid4, editable=False)
    reference_code = models.CharField(
        max_length=50, default=generate_income_report_reference_code, unique=True
    )

    full_name = models.TextField(blank=True)
    email = models.TextField(blank=True)
    date_of_birth = models.DateField(null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
