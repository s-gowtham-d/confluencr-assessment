#!/bin/sh
set -e

host="$POSTGRES_HOST"
port="$POSTGRES_PORT"

echo "⏳ Waiting for PostgreSQL at $host:$port..."

until nc -z "$host" "$port"; do
  sleep 1
done

echo "✅ Database is up — starting FastAPI"
exec "$@"
