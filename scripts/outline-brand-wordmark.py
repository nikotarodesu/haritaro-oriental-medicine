"""Outline the four wordmark glyphs from the site's existing Noto Sans JP fonts.

Usage: python scripts/outline-brand-wordmark.py [fontTools package directory]
Requires fontTools and Brotli only when regenerating; not needed by the app/build.
"""
import json
import sys
from pathlib import Path

if len(sys.argv) > 1:
    sys.path.insert(0, sys.argv[1])
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.varLib.instancer import instantiateVariableFont

root = Path(__file__).resolve().parent.parent
characters = "はり太郎"
selected = {}
for file in sorted((root / ".next/static/media").glob("*.woff2")):
    font = TTFont(file)
    names = font["name"]
    family = names.getDebugName(16) or names.getDebugName(1) or ""
    if "Noto Sans JP" not in family:
        font.close()
        continue
    cmap = font.getBestCmap()
    missing = [char for char in characters if char not in selected and ord(char) in cmap]
    if not missing:
        font.close()
        continue
    if "fvar" in font:
        font = instantiateVariableFont(font, {"wght": 600}, inplace=True)
    else:
        weight = font["OS/2"].usWeightClass
        if weight != 600:
            font.close()
            continue
    units = font["head"].unitsPerEm
    glyphs = font.getGlyphSet()
    for char in missing:
        name = cmap[ord(char)]
        glyph = glyphs[name]
        pen = SVGPathPen(glyphs, ntos=lambda value: f"{value:.2f}".rstrip("0").rstrip(".") if value else "0")
        glyph.draw(TransformPen(pen, (1000 / units, 0, 0, 1000 / units, 0, 0)))
        selected[char] = {"character": char, "path": pen.getCommands(), "advance": glyph.width * 1000 / units}
    font.close()
    if len(selected) == len(characters):
        break
assert len(selected) == 4, "Run npm run build first to populate all Japanese font subsets."
output = root / "scripts/brand-wordmark-paths.json"
output.write_text(json.dumps({"font": "Noto Sans JP", "weight": 600, "glyphs": [selected[char] for char in characters]}, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print(f"Outlined {characters} at weight 600; {output.name}")
