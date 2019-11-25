#!/bin/bash

if [[ -z "$SERVICE_NAME" ]]; then
  export SERVICE_NAME=guardian
fi

SOURCE_DIR=$PWD
export NODE_PATH=src

inject_git_tag() {
  GIT_TAG=${GIT_TAG:-"$(git rev-parse --short HEAD)"}
  echo "$GIT_TAG" > git_tag.txt
}

##############
# BUILD ENVS #
##############

npm_build_envs() {
  rm -rf node_modules
  inject_git_tag
  npm install
  npm run allenvs
  npm run build
  if [[ $? -ne 0 ]]; then
    echo Build Error > /dev/stderr
    exit 1
  fi
}

main() {
  npm_build_envs
}
main "$@"
