#!/bin/bash
# swipe_grow — fetch-videos-DM-04.sh
# Fetches portrait background videos from Pexels for DM-04 Post
# Run from your Remotion project root:  bash fetch-videos-DM-04.sh

if [ -z "$PEXELS_API_KEY" ]; then
  echo "Error: PEXELS_API_KEY not set."
  echo "Get free key at https://www.pexels.com/api/"
  echo ""
  echo "Then run:  PEXELS_API_KEY=your_key bash fetch-videos-DM-04.sh"
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
echo "  DM-04 — Fetching background videos"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# 5 scenes — each matches its point's theme
fetch_video "DM-04-s1.mp4" "notebook planning goal writing dark"
fetch_video "DM-04-s2.mp4" "clock alarm morning routine dark"
fetch_video "DM-04-s3.mp4" "messy desk cluttered workspace"
fetch_video "DM-04-s4.mp4" "person sitting alone thinking dark"
fetch_video "DM-04-s5.mp4" "morning routine toothbrush habit"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  Done. Refresh Remotion Studio."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
