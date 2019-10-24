#!/bin/bash

OUTDIR="/tmp"

checkenv() {
  if [[ -z "$ENV" ]]; then
    echo ENV required
    exit 1
  fi
}

deployenv() {
  echo =======================
  echo Deploying $ENV
  echo =======================
  cp -r $OUTDIR/$ENV/* /usr/share/nginx/html
}

main() {
  checkenv
  deployenv
  if hash nginx > /dev/null 2>&1; then
    nginx -g "daemon off;"
  fi
}
main "$@"
