#!/data/data/com.termux/files/usr/bin/bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
PIDFILE="$ROOT/.run/server.pid"
if [ -f "$PIDFILE" ]; then
  PID="$(cat "$PIDFILE")"
  kill "$PID" 2>/dev/null || true
  rm -f "$PIDFILE"
  echo "Stopped Kozo Dreams server."
else
  echo "No Kozo Dreams server PID found."
fi
