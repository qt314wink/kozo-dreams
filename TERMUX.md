# Termux visual-audit runbook

## Fresh install

```bash
pkg update -y
pkg install -y git nodejs-lts openssh
git clone -b agent/kozo-v3-2-visual-audit https://github.com/qt314wink/kozo-dreams.git
cd kozo-dreams
bash scripts/termux/run-audit.sh
```

Open `http://127.0.0.1:4173` when it does not open automatically.

## Subsequent runs

```bash
cd ~/kozo-dreams
git pull --ff-only
bash scripts/termux/run-audit.sh
```

## Create a timestamped audit note

```bash
bash scripts/termux/new-audit-note.sh
```

## Stop the local server

```bash
bash scripts/termux/stop.sh
```

## LAN review

The server binds to `0.0.0.0`. On the same Wi-Fi network, open `http://PHONE_IP:4173`. Do not expose this port publicly.
