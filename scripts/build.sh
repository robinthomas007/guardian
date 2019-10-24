#!/bin/bash

if [[ -z "$SERVICE_NAME" ]]; then
  export SERVICE_NAME=guardian
fi

ENVS=("dev" "qa" "sandbox" "stage" "prod" "test")
SOURCE_DIR=$PWD
OUTDIR="$PWD/app-dist"

inject_git_tag() {
  GIT_TAG=${GIT_TAG:-"$(git rev-parse --short HEAD)"}
  echo "$GIT_TAG" > git_tag.txt
}

##############
# BUILD ENVS #
##############

npm_build_env() {
  e="$1"
  rm -rf "/tmp/$SERVICE_NAME-$e"
  mkdir -p "/tmp/$SERVICE_NAME-$e"
  rm -rf "$SOURCE_DIR/build"
  cp -r $SOURCE_DIR/* "/tmp/$SERVICE_NAME-$e"
  pushd "/tmp/$SERVICE_NAME-$e" > /dev/null
  export NODE_ENV=$e
  rm -rf node_modules
  inject_git_tag
  npm install
  npm run build
  if [[ $? -ne 0 ]]; then
    echo Build Error > /dev/stderr
    exit 1
  fi
  mv $PWD/build/* $OUTDIR/$e
  popd > /dev/null
}

npm_build_envs() {
  rm -rf "$OUTDIR"
  mkdir -p "$OUTDIR"
  for e in "${ENVS[@]}"; do
    mkdir -p "$OUTDIR/$e"
    npm_build_env "$e"
  done
}

main() {
  npm_build_envs
}
main "$@"
