#!/bin/bash
# swipe_grow — fetch-all-videos.sh
# Fetches background videos for all 12 bulk reels in sequence.
# Usage: PEXELS_API_KEY=your_key bash fetch-all-videos.sh

if [ -z "$PEXELS_API_KEY" ]; then
  echo "Error: PEXELS_API_KEY not set."
  echo "Get a free key at https://www.pexels.com/api/"
  echo ""
  echo "Run: PEXELS_API_KEY=your_key bash fetch-all-videos.sh"
  exit 1
fi

SCRIPTS=(
  fetch-videos-MA-04.sh
  fetch-videos-QP-05.sh
  fetch-videos-WA-04.sh
  fetch-videos-DM-05.sh
  fetch-videos-MA-05.sh
  fetch-videos-QP-07.sh
  fetch-videos-WA-05.sh
  fetch-videos-MA-06.sh
  fetch-videos-WA-06.sh
  fetch-videos-MA-07.sh
  fetch-videos-MA-09.sh
  fetch-videos-WA-07.sh
)

TOTAL=${#SCRIPTS[@]}
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  swipe_grow — fetching videos for $TOTAL reels"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

for script in "${SCRIPTS[@]}"; do
  bash "$script"
  echo ""
done

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  All fetches complete. Run: bash render-all.sh"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
