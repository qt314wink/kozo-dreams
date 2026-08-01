#!/data/data/com.termux/files/usr/bin/bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
cd "$ROOT"
npm run check
npm run build
mkdir -p .run
if [ -f .run/server.pid ]; then
  bash scripts/termux/stop.sh
fi
nohup node scripts/serve.mjs > .run/server.log 2>&1 &
SERVER_PID=$!
echo "$SERVER_PID" > .run/server.pid
sleep 1
if ! kill -0 "$SERVER_PID" 2>/dev/null; then
  cat .run/server.log >&2
  rm -f .run/server.pid
  exit 1
fi
URL="http://127.0.0.1:${PORT:-4173}"
printf '\nKozo Dreams is running at %s\n' "$URL"
printf 'Server log: %s/.run/server.log\n' "$ROOT"
if command -v termux-open-url >/dev/null 2>&1; then termux-open-url "$URL"; fi
