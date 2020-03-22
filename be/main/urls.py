"""main URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path

from . import views
from . import api_views
from . import task_views

urlpatterns = [
    path("admin/", admin.site.urls),
    path("complete/credit-kudos", views.complete_credit_kudos),
    path("api/join-waitlist", api_views.join_waitlist),
    path("api/create-report", api_views.create_report),
    path("api/update-report", api_views.update_report),
    path("api/report/<str:report_reference_code>", api_views.get_report),
    path("api/report/credit-kudos-link", api_views.generate_credit_kudos_link,),
    path("_tasks/create-pdf", task_views.create_pdf),
]
