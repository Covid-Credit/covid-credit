#!/bin/bash

set -e

if [[ $SERVICE_NAME == "be-migrations" ]]; then
  python manage.py migrate --no-input ; python -m http.server "$PORT"
else
  gunicorn --bind ":$PORT" --workers 1 --threads 8 main.wsgi
fi
