#!/bin/bash
# Simple local Postgres dev environment (Podman version)
# Usage:
#   ./postgres_local.sh start   -> start postgres
#   ./postgres_local.sh stop    -> stop postgres
#   ./postgres_local.sh logs    -> view logs
#   ./postgres_local.sh psql    -> open psql shell

set -e

CONTAINER_NAME="postgres-local"
IMAGE="docker.io/library/postgres:17"
DATA_DIR="$HOME/postgres-data"
PORT="5432"

POSTGRES_USER="appuser"
POSTGRES_PASSWORD="devpassword"
POSTGRES_DB="appdb"


case "$1" in
  start)
    echo "📦 Starting local Postgres..."
    mkdir -p "$DATA_DIR"
    podman run -d \
      --name "$CONTAINER_NAME" \
      -e POSTGRES_USER="$POSTGRES_USER" \
      -e POSTGRES_PASSWORD="$POSTGRES_PASSWORD" \
      -e POSTGRES_DB="$POSTGRES_DB" \
      -v "$DATA_DIR:/var/lib/postgresql/data-d:Z" \
      -p "$PORT:5432" \
      "$IMAGE"
    echo "✅ Postgres started on port $PORT"
    ;;
  stop)
    echo "🛑 Stopping local Postgres..."
    podman stop "$CONTAINER_NAME" 2>/dev/null || true
    podman rm "$CONTAINER_NAME" 2>/dev/null || true
    echo "✅ Container removed."
    ;;
  logs)
    podman logs -f "$CONTAINER_NAME"
    ;;
  psql)
    echo "🐘 Connecting to Postgres..."
    podman exec -it "$CONTAINER_NAME" psql -U "$POSTGRES_USER" -d "$POSTGRES_DB"
    ;;
  *)
    echo "Usage: $0 {start|stop|logs|psql}"
    ;;
esac

