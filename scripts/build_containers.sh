#!/bin/bash
set -eo pipefail

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
BASE_DIR="$( dirname "$DIR" )"

# Build be image
# (
#   cd "$BASE_DIR/be" || exit
#   gcloud builds submit --config cloudbuild.yaml .
# )

# Build fe image
(
  cd "$BASE_DIR/fe" || exit
  gcloud builds submit --config cloudbuild.yaml .
)
