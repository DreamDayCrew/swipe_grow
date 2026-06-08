#!/bin/bash
# swipe_grow — render.sh
# Render a single reel using the current config.ts
#
# Usage:
#   bash render.sh           → renders whatever is in config.ts
#   bash render.sh HD-10     → renders HD-10 (reelId must match in config)

REEL_ID=${1:-$(node -e "const c = require('./src/config.ts'); console.log(c.CONFIG.reelId)" 2>/dev/null || echo "SwipeGrow")}
OUT_DIR="./out"
mkdir -p "$OUT_DIR"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  swipe_grow — Rendering: $REEL_ID"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

npx remotion render "$REEL_ID" "$OUT_DIR/${REEL_ID}.mp4"

if [ $? -eq 0 ]; then
  echo ""
  echo "✓ Done → $OUT_DIR/${REEL_ID}.mp4"
else
  echo ""
  echo "✗ Render failed. Check errors above."
  exit 1
fi
