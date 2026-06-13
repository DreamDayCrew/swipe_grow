#!/bin/bash
# swipe_grow — render-all.sh
# Renders all 12 bulk reels. Each ID must be registered in Root.tsx via configs/index.ts.
# Usage: bash render-all.sh
# Output: out/<ID>.mp4

set -e

REELS=(
  MA-04
  QP-05
  WA-04
  DM-05
  MA-05
  QP-07
  WA-05
  MA-06
  WA-06
  MA-07
  MA-09
  WA-07
)

mkdir -p out

TOTAL=${#REELS[@]}
DONE=0
FAILED=()

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  swipe_grow — bulk render ($TOTAL reels)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

for ID in "${REELS[@]}"; do
  echo "[$((DONE + 1))/$TOTAL] Rendering $ID ..."
  if npx remotion render src/index.ts "$ID" "out/$ID.mp4" --log=error; then
    DONE=$((DONE + 1))
    echo "  ✓ out/$ID.mp4"
  else
    FAILED+=("$ID")
    echo "  ✗ $ID failed — continuing"
  fi
  echo ""
done

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  Done: $DONE/$TOTAL rendered successfully"
if [ ${#FAILED[@]} -gt 0 ]; then
  echo "  Failed: ${FAILED[*]}"
fi
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
