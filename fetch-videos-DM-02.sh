#!/bin/bash
# swipe_grow — fetch-videos-DM-02.sh
# Fetches portrait videos from Pexels for DM-02 Post
# Run from your Remotion project root

if [ -z "$PEXELS_API_KEY" ]; then
  echo "Error: PEXELS_API_KEY not set."
  echo "Get free key at https://www.pexels.com/api/"
  exit 1
fi

mkdir -p public/videos

fetch_video() {
  local filename=$1
  local query=$2
  local outfile="public/videos/${filename}"

  echo "Fetching: $filename — \"$query\""

  RESPONSE=$(curl -s -H "Authorization: $PEXELS_API_KEY" \
    "https://api.pexels.com/videos/search?query=$(echo "$query" | sed 's/ /+/g')&per_page=5&orientation=portrait&size=medium")

  URL=$(echo "$RESPONSE" | python3 -c "
import sys, json
data = json.load(sys.stdin)
videos = data.get('videos', [])
for v in videos:
    files = v.get('video_files', [])
    for f in files:
        if f.get('quality') in ['hd', 'sd'] and f.get('height', 0) >= f.get('width', 1):
            print(f['link'])
            sys.exit()
print('')
")

  if [ -z "$URL" ]; then
    echo "  ✗ No portrait video found — download manually from pexels.com"
    echo "    Search: \"$query\" → save as public/videos/$filename"
  else
    curl -s -L "$URL" -o "$outfile"
    echo "  ✓ Saved: $outfile"
  fi
}

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  DM-02 — Fetching videos"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

fetch_video "DM-02-cover.mp4"    "discipline focus dark"
fetch_video "DM-02-scene-1.mp4"  "rainy day person working"
fetch_video "DM-02-scene-2.mp4"  "thread rope hold together"
fetch_video "DM-02-scene-3.mp4"  "morning routine habit"
fetch_video "DM-02-scene-4.mp4"  "athlete training alone"
fetch_video "DM-02-scene-5.mp4"  "calendar schedule planning"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  Done. Place videos in public/videos/"
echo "  Then: npx remotion preview"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
