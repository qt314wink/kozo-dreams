#!/data/data/com.termux/files/usr/bin/bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
PIDFILE="$ROOT/.run/server.pid"

is_kozo_server() {
  local pid="$1" cmdline cwd
  [ -r "/proc/$pid/cmdline" ] || return 1
  cmdline="$(tr '\0' ' ' < "/proc/$pid/cmdline")"
  case "$cmdline" in
    *"node scripts/serve.mjs"*|*"node $ROOT/scripts/serve.mjs"*) ;;
    *) return 1 ;;
  esac
  if [ -L "/proc/$pid/cwd" ]; then
    cwd="$(readlink "/proc/$pid/cwd" 2>/dev/null || true)"
    [ "$cwd" = "$ROOT" ] || return 1
  fi
}

if [ -f "$PIDFILE" ]; then
  PID="$(cat "$PIDFILE")"
  if [[ "$PID" =~ ^[0-9]+$ ]] && kill -0 "$PID" 2>/dev/null && is_kozo_server "$PID"; then
    kill "$PID"
    for _ in 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20; do
      kill -0 "$PID" 2>/dev/null || break
      sleep 0.1
    done
    echo "Stopped Kozo Dreams server."
  else
    echo "Removed stale Kozo Dreams server PID file without signaling a process."
  fi
  rm -f "$PIDFILE"
else
  echo "No Kozo Dreams server PID found."
fi
