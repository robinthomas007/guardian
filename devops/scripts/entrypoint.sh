#!/bin/bash
set -ev

if [ ! -z "$USER_DATA" ]; then
  # deploying to s3
  bash /opt/devops/scripts/deploys3.sh
else
  ENV=${ENV:-"dev"}
  cp /usr/share/nginx/html/static/config/index.$ENV.js /usr/share/nginx/html/static/config/index.js
  cat /usr/share/nginx/html/static/config/index.js
  # else, run container default entrypoint
  nginx -g 'daemon off;'
fi
