from django.contrib import admin

from .models import IncomeReport


@admin.register(IncomeReport)
class IncomeReportAdmin(admin.ModelAdmin):
    list_display = ("unique_id",)

    readonly_fields = ("unique_id",)
