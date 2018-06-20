# Production Build Script

# Initialize Empty Cache File
if [ ! -f .yarn-cache.tgz ]; then
  echo "Initializing empty .yarn-cache.tgz"
  tar cvzf .yarn-cache.tgz --files-from /dev/null
fi

# Build the Axi Engine container
echo "Building axi-engine:latest..."
docker build -f Dockerfile.prod -t axi-engine:latest .

if ! diff -q yarn.lock /tmp/yarn.lock > /dev/null  2>&1; then
  echo "Extracting Yarn Cache from Disk..."
  # docker run --rm --entrypoint tar axi-engine-dev:latest czf - /usr/local/share/.cache/yarn/v1 > .yarn-cache.tgz
fi

# Start the container in interactive mode
echo "Spawning shell in container..."
docker run -it --rm axi-engine:latest sh
