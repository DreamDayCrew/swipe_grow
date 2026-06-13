#!/bin/bash
# swipe_grow — fetch-videos-WA-05.sh
# Series: Where You Actually Are | backgroundPrompt: crossroads uncertainty starting over honest dark person
if [ -z "$PEXELS_API_KEY" ]; then echo "Error: PEXELS_API_KEY not set."; exit 1; fi
mkdir -p public/videos
fetch_video() {
  local filename=$1 query=$2 outfile="public/videos/${1}"
  echo "Fetching: $filename — \"$query\""
  RESPONSE=$(curl -s -H "Authorization: $PEXELS_API_KEY" \
    "https://api.pexels.com/videos/search?query=$(echo "$query" | sed 's/ /+/g')&per_page=5&orientation=portrait&size=medium")
  URL=$(echo "$RESPONSE" | python3 -c "
import sys,json; data=json.load(sys.stdin); videos=data.get('videos',[])
[print(f['link']) or sys.exit() for v in videos for f in v.get('video_files',[]) if f.get('quality') in ['hd','sd'] and f.get('height',0)>=f.get('width',1)]
print('')")
  if [ -z "$URL" ]; then echo "  ✗ Not found — download manually: public/videos/$filename"
  else curl -s -L "$URL" -o "$outfile" && echo "  ✓ Saved: $outfile"; fi
}
echo ""; echo "━━━  WA-05 — stuck stories / uncertainty  ━━━"; echo ""
fetch_video "WA-05-s1.mp4" "person standing crossroads dark uncertain path"
echo ""; echo "━━━  Done. Refresh Remotion Studio.  ━━━"
