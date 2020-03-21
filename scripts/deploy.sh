#!/bin/bash
set -eo pipefail

PROJECT_ID=$(gcloud config list --format 'value(core.project)' 2>/dev/null)

# Deploy migrations
# gcloud run deploy be-migrations --image "gcr.io/$PROJECT_ID/be" --platform managed --region europe-west1

# Deploy be
# gcloud run deploy be --image "gcr.io/$PROJECT_ID/be" --platform managed --region europe-west1

# Deploy fe
gcloud run deploy fe --image "gcr.io/$PROJECT_ID/fe" --platform managed --region europe-west1
