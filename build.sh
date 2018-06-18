#!/bin/bash

# Init empty cache file
if [ ! -f .yarn-cache.tgz ]; then
  echo "Initializing empty .yarn-cache.tgz"
  tar cvzf .yarn-cache.tgz --files-from /dev/null
fi

docker build . -t axi-engine:latest
docker run --rm --entrypoint cat axi-engine:latest /tmp/yarn.lock > /tmp/yarn.lock

if ! diff -q yarn.lock /tmp/yarn.lock > /dev/null  2>&1; then
  echo "Saving Yarn cache"
  docker run --rm --entrypoint tar axi-engine:latest czf - `yarn cache dir` > .yarn-cache.tgz

  echo "Saving yarn.lock"
  cp /tmp/yarn.lock yarn.lock
fi
