from django.contrib import admin

from .models import Waitlist


@admin.register(Waitlist)
class WaitlistAdmin(admin.ModelAdmin):
    list_display = ("email", "created_at")
    search_fields = ("email",)

    readonly_fields = ("email", "created_at")
