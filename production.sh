# Production Build Script

# Initialize Empty Cache File
if [ ! -f .yarn-cache.tgz ]; then
  echo "Initializing empty .yarn-cache.tgz"
  tar cvzf .yarn-cache.tgz --files-from /dev/null
fi

# Build the Axi Engine container
echo "Building axi-engine:latest..."
docker build -f Dockerfile.prod -t axi-engine:latest .

# Start the container in interactive mode
echo "Spawning shell in container..."
docker run -it --rm axi-engine:latest sh
