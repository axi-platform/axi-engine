#!/bin/bash

# Initialize Empty Cache File
if [ ! -f .yarn-cache.tgz ]; then
  echo "Initializing empty .yarn-cache.tgz"
  tar cvzf .yarn-cache.tgz --files-from /dev/null
fi

# Build the Container
docker build . -t axi-engine-dev:latest

# Save the Lockfile to Temp
docker run --rm --entrypoint cat axi-engine-dev:latest /tmp/yarn.lock > /tmp/yarn.lock

if ! diff -q yarn.lock /tmp/yarn.lock > /dev/null  2>&1; then
  echo "Extracting Yarn Cache from Disk"
  docker run --rm --entrypoint tar axi-engine-dev:latest czf - /usr/local/share/.cache/yarn/v1 > .yarn-cache.tgz

  echo "Persisting Yarn Lockfile"
  cp /tmp/yarn.lock yarn.lock
fi
