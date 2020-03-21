import uuid
from django.db import models


class IncomeReport(models.Model):
    unique_id = models.UUIDField(default=uuid.uuid4, editable=False)

    full_name = models.TextField(blank=True)
    email = models.TextField(blank=True)
    date_of_birth = models.DateField(null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
