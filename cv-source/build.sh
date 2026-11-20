#!/usr/bin/env bash
set -euo pipefail
CV_DIR="$(cd "$(dirname "$0")" && pwd)"
PDF_DIR="$CV_DIR/../site/assets/documents"
mkdir -p "$PDF_DIR" "$CV_DIR/.build"
cd "$CV_DIR"
for document in Saange_Tamang_Academic_CV Saange_Tamang_Research_CV; do
  tectonic --keep-logs --outdir "$CV_DIR/.build" "$document.tex"
  cp "$CV_DIR/.build/$document.pdf" "$PDF_DIR/$document.pdf"
done
