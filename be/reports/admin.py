from django.contrib import admin

from .models import IncomeReport


@admin.register(IncomeReport)
class IncomeReportAdmin(admin.ModelAdmin):
    list_display = ("reference_code", "created_at")
    search_fields = ("reference_code",)

    readonly_fields = ("unique_id", "reference_code")
