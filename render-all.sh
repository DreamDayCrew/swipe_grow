#!/bin/bash
# swipe_grow — render-all.sh
# Bulk renders every config file in the configs/ folder.
# Each config file must export CONFIG with reelId set.
#
# Usage:
#   bash render-all.sh

CONFIGS_DIR="./configs"
OUT_DIR="./out"
SRC_CONFIG="./src/config.ts"
BACKUP_CONFIG="./src/config.backup.ts"

mkdir -p "$OUT_DIR"

# Check configs folder exists
if [ ! -d "$CONFIGS_DIR" ]; then
  echo "No configs/ folder found. Create configs/HD-10.ts etc first."
  exit 1
fi

# Backup current config.ts
cp "$SRC_CONFIG" "$BACKUP_CONFIG"

TOTAL=0
SUCCESS=0
FAILED=()

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  swipe_grow — Bulk Render"
echo "  Configs found: $(ls $CONFIGS_DIR/*.ts 2>/dev/null | wc -l)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

for config_file in "$CONFIGS_DIR"/*.ts; do
  config_name=$(basename "$config_file" .ts)
  TOTAL=$((TOTAL + 1))

  echo "[$TOTAL] Rendering: $config_name"

  # Swap config
  cp "$config_file" "$SRC_CONFIG"

  # Render
  npx remotion render "$config_name" "$OUT_DIR/${config_name}.mp4" --quiet

  if [ $? -eq 0 ]; then
    SUCCESS=$((SUCCESS + 1))
    echo "    ✓ Done → out/${config_name}.mp4"
  else
    FAILED+=("$config_name")
    echo "    ✗ Failed — skipping"
  fi

  echo ""
done

# Restore original config
cp "$BACKUP_CONFIG" "$SRC_CONFIG"
rm "$BACKUP_CONFIG"

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  Done: $SUCCESS / $TOTAL rendered"

if [ ${#FAILED[@]} -gt 0 ]; then
  echo "  Failed:"
  for f in "${FAILED[@]}"; do
    echo "    - $f"
  done
fi

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
