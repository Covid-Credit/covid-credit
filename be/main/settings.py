"""
Django settings for main project.

Generated by 'django-admin startproject' using Django 3.0.4.

For more information on this file, see
https://docs.djangoproject.com/en/3.0/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.0/ref/settings/
"""

import functools
import os
import dj_database_url
from dotenv import dotenv_values
from typing import Optional
from google.cloud import secretmanager
import google

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PROJECT_ROOT = os.path.dirname(os.path.abspath(__file__))

ENVIRONMENT = os.environ.get("ENVIRONMENT", "development")
local_env_values = dotenv_values()


BASE_URL = os.environ.get("BASE_URL", "https://localhost:3000")

PROJECT_ID = os.environ["PROJECT_ID"]

@functools.lru_cache
def _load_secret_from_secret_manager(
    key: str, default_value: str = None
) -> Optional[str]:
    client = secretmanager.SecretManagerServiceClient()
    name = client.secret_version_path(PROJECT_ID, key, "latest")

    try:
        response = client.access_secret_version(name)
    except google.api_core.exceptions.NotFound:
        return default_value
    except ValueError:
        return default_value

    payload = response.payload.data.decode("UTF-8")
    return payload


def get_secret(key: str, default_value: str = None) -> Optional[str]:
    if ENVIRONMENT == "production":
        return _load_secret_from_secret_manager(key, default_value)

    return local_env_values.get(key, os.environ.get(key, default_value))


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = get_secret("SECRET_KEY", "DEFAULT_SECRET_KEY")

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = bool(ENVIRONMENT != "production")

if DEBUG:
    ALLOWED_HOSTS = ["127.0.0.1", "localhost", "host.docker.internal"]
else:
    ALLOWED_HOSTS = [".run.app"]


# Application definition

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "users.apps.UsersConfig",
    "reports.apps.ReportsConfig",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    # "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "main.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [os.path.join(BASE_DIR, "templates"),],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "main.wsgi.application"


# Database
# https://docs.djangoproject.com/en/3.0/ref/settings/#databases

DATABASES = {}
if ENVIRONMENT == "production" and os.environ.get("INSTANCE_CONNECTION_NAME", False):
    DATABASES["default"] = {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": get_secret("DATABASE_NAME"),
        "USER": get_secret("DATABASE_USER"),
        "PASSWORD": get_secret("DATABASE_PASS"),
        "HOST": "/cloudsql/{}".format(os.environ.get("INSTANCE_CONNECTION_NAME")),
    }
else:
    db_url = get_secret("DATABASE_URL", None)
    if db_url:
        DATABASES["default"] = dj_database_url.parse(db_url, conn_max_age=500)


# Password validation
# https://docs.djangoproject.com/en/3.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",},
]

AUTH_USER_MODEL = "users.AuthUser"


# Internationalization
# https://docs.djangoproject.com/en/3.0/topics/i18n/

LANGUAGE_CODE = "en-GB"
TIME_ZONE = "Europe/London"

USE_I18N = True
USE_L10N = True
USE_TZ = True

LANGUAGES = [
    ("en-GB", "English (UK)"),
]

DEFAULT_DATETIME_FORMAT = "%d/%m/%Y %H:%M %Z"


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.0/howto/static-files/

STATIC_URL = "/static/"
STATIC_ROOT = os.path.join(BASE_DIR, "static")

STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"

STATICFILES_FINDERS = (
    "django.contrib.staticfiles.finders.FileSystemFinder",
    "django.contrib.staticfiles.finders.AppDirectoriesFinder",
)

LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "formatters": {
        "verbose": {
            "format": "[%(asctime)s] %(name)s {%(module)s:%(lineno)d} %(process)d:%(thread)d %(levelname)5s - %(message)s"
        },
        "simple": {
            "format": "[%(asctime)s] {%(module)s:%(lineno)d} %(levelname)5s - %(message)s"
        },
        "django.server": {
            "()": "django.utils.log.ServerFormatter",
            "format": "[%(server_time)s] %(message)s",
        },
    },
    "handlers": {
        "null": {"level": "DEBUG", "class": "logging.NullHandler",},
        "console": {"class": "logging.StreamHandler", "formatter": "verbose",},
        "django.server": {
            "level": "INFO",
            "class": "logging.StreamHandler",
            "formatter": "django.server",
        },
    },
    "loggers": {
        "": {"handlers": ["console"], "level": "DEBUG",},
        "django": {
            "handlers": ["console"],
            "level": os.getenv("DJANGO_LOG_LEVEL", "ERROR"),
            "propagate": True,
        },
        "django.server": {
            "handlers": ["django.server"],
            "level": "INFO",
            "propagate": False,
        },
        "parso": {
            # Only care about warnings
            "level": "WARNING",
        },
    },
}

# (socket connect, time to first byte)
DEFAULT_INTEGRATION_TIMEOUT = (3.5, 20)

GOOGLE_PROJECT_ID = os.environ.get("PROJECT_ID", "fronted-dev")

CREDIT_KUDOS_CLIENT_ID = get_secret("CREDIT_KUDOS_CLIENT_ID")
CREDIT_KUDOS_CLIENT_SECRET = get_secret("CREDIT_KUDOS_CLIENT_SECRET")
CREDIT_KUDOS_REDIRECT_URI = get_secret("CREDIT_KUDOS_REDIRECT_URI")
