#!/data/data/com.termux/files/usr/bin/bash
set -euo pipefail
pkg update -y
pkg install -y git nodejs-lts openssh
node --version
npm --version
git --version
printf '\nTermux prerequisites installed.\n'
