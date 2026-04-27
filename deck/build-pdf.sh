#!/bin/bash
# Генерация Oplatum-Deck.pdf через Chrome headless
# Запуск: bash deck/build-pdf.sh (из корня oplatum-landing)

set -e

DECK_DIR="$(cd "$(dirname "$0")" && pwd)"
INPUT="file://$DECK_DIR/index.html"
OUTPUT="$DECK_DIR/oplatum-deck.pdf"

CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

"$CHROME" \
  --headless=new \
  --disable-gpu \
  --no-sandbox \
  --window-size=1600,1200 \
  --print-to-pdf="$OUTPUT" \
  --no-pdf-header-footer \
  --virtual-time-budget=15000 \
  --hide-scrollbars \
  --run-all-compositor-stages-before-draw \
  "$INPUT"

echo "✓ Generated: $OUTPUT"
ls -lh "$OUTPUT"
