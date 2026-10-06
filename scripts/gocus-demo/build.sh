#!/bin/zsh
# Build the interactive Gocus panel for the portfolio from a Gocus checkout (with node_modules installed).
# Usage: scripts/gocus-demo/build.sh <gocus-checkout> <recorded demo-data.json>
# Output: public/embeds/gocus/panel/ (static: Gocus web bundle + read-only demo bridge + recorded snapshot).
set -euo pipefail
GOCUS=${1:?gocus checkout}
DATA=${2:?demo-data.json}
TAG=v0.1.12
HERE=${0:A:h}
SITE=${HERE:h:h}
OUT=$SITE/public/embeds/gocus/panel
WORK=$(mktemp -d)/gocus-demo

git -C "$GOCUS" worktree add -q --detach "$WORK" "$TAG"
ln -s "$GOCUS/node_modules" "$WORK/node_modules"

# 1. The dev web bridge only installs on localhost and POSTs to the local Git server;
#    route it to the read-only demo handler instead.
python3 - "$WORK/src/lib/devWebBridge.ts" <<'PY'
import sys
p = sys.argv[1]; s = open(p).read()
s = s.replace("return isLocalDevBridgeHost(window.location.hostname);", "return true;", 1)
s = s.replace("async function requestBridge<T>(route: string, payload: Record<string, unknown> = {}): Promise<T> {",
 "async function requestBridge<T>(route: string, payload: Record<string, unknown> = {}): Promise<T> {\n"
 "  const demo = (window as unknown as { __gocusDemo?: (r: string, p: unknown) => Promise<T> }).__gocusDemo;\n"
 "  if (demo) return demo(route, payload);", 1)
assert "__gocusDemo" in s and "return true;" in s
open(p, "w").write(s)
PY
# 2. The status line should say this is a recorded snapshot, not a live repository.
for f in "$WORK/src/app/useGocusController.ts" "$WORK/src/lib/snapshotResponseView.ts"; do
  python3 - "$f" <<'PY'
import sys
p = sys.argv[1]; s = open(p).read()
assert "Live Git data connected." in s
open(p, "w").write(s.replace("Live Git data connected.", "Recorded snapshot of the Gocus repository."))
PY
done
# 3. Load the handler before the app.
python3 - "$WORK/index.html" <<'PY'
import sys
p = sys.argv[1]; s = open(p).read()
s = s.replace('<script type="module"', '<script src="./demo-bridge.js"></script>\n    <script type="module"', 1)
assert "demo-bridge.js" in s
open(p, "w").write(s)
PY

(cd "$WORK" && npx vite build --base ./ --outDir "$WORK/dist-demo" --emptyOutDir >/dev/null)
mkdir -p "$OUT"
find "$OUT" -mindepth 1 -delete
cp -R "$WORK/dist-demo/." "$OUT/"
cp "$HERE/demo-bridge.js" "$OUT/demo-bridge.js"
cp "$DATA" "$OUT/demo-data.json"
git -C "$GOCUS" worktree remove --force "$WORK"
echo "built $OUT"; ls "$OUT" "$OUT/assets" | head -20
