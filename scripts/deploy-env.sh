#!/bin/bash

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
  cp static/config/index.$ENV.js static/config/index.js
}

main() {
  checkenv
  deployenv
  if hash nginx > /dev/null 2>&1; then
    nginx -g "daemon off;"
  fi
}
main "$@"
