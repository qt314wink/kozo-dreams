#!/data/data/com.termux/files/usr/bin/bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
cd "$ROOT"
npm run check
npm run build
mkdir -p .run
if [ -f .run/server.pid ] && kill -0 "$(cat .run/server.pid)" 2>/dev/null; then
  kill "$(cat .run/server.pid)" || true
fi
nohup npm run serve > .run/server.log 2>&1 &
echo $! > .run/server.pid
sleep 1
URL="http://127.0.0.1:${PORT:-4173}"
printf '\nKozo Dreams is running at %s\n' "$URL"
printf 'Server log: %s/.run/server.log\n' "$ROOT"
if command -v termux-open-url >/dev/null 2>&1; then termux-open-url "$URL"; fi
