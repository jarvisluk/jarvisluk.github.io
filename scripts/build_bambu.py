"""Export Bambu Lab media: slides from the group's final presentation (vector PDF) and mini-program demo stills.

Run with the project venv: .venv/bin/python scripts/build_bambu.py [ids...]
The portfolio (Lu_Junrong_Portfolio.pdf pp. 11-18) reuses slides 1, 3, 13, 16, 20, 21, 22 and 24 of this deck.
Boxes are in slide units (1920x1080). The Bambu Lab / PolyU Design logos are painted out by blending the
background on either side of them, row by row. Co-design and interview photos show participants' faces, so those
parts of the slides are cropped away.
"""
from pathlib import Path
import json, sys
import pymupdf
from PIL import Image
from build_flexbench import export, stamp, OUT, DIMS, PHOTO

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / 'source-assets/bambu'
PDF = SRC / 'final-presentation.pdf'
FULL = (0, 0, 1920, 1080)
L = (20, 30, 395, 125)     # logo top-left
R = (1510, 30, 1882, 125)  # logo top-right (floorplan slides)

# Store footage shot for the demo video (NAS: Bambu Redesign Demo Video/Bambu Store, 4K clips, middle frames).
ST = SRC / 'stills'
MANIFEST = {
 'bb-store-city': (ST / 'store-city.jpg', PHOTO),
 'bb-store-sandbox': (ST / 'store-sandbox.jpg', PHOTO),
 'bb-store-hand': (ST / 'store-hand.jpg', PHOTO),
 'bb-store-filament': (ST / 'store-filament.jpg', PHOTO),
 'bb-store-makers': (ST / 'store-makers.jpg', PHOTO),
 'bb-store-crane': (ST / 'store-crane.jpg', PHOTO),
}

# id: (slide, crop box, logo masks)
BOARDS = {
 'bb-board-concept': (20, FULL, [L]),
 'bb-board-chatbot': (21, FULL, [L]),
 'bb-board-features': (22, FULL, [L]),
 'bb-board-outcomes': (24, FULL, [L]),
 'bb-board-floor-after': (16, FULL, [R]),
 'bb-board-floor-before': (15, FULL, [R]),
 'bb-board-codesign': (13, (0, 0, 1120, 1080), [(20, 25, 405, 105)]),
 'bb-board-insights': (14, FULL, [R]),
 'bb-board-goals': (3, FULL, [L]),
 'bb-board-stakeholders': (4, FULL, [(30, 40, 395, 120)]),
 'bb-board-journey-1': (5, FULL, [(12, 10, 255, 118)]),
 'bb-board-journey-2': (6, FULL, [(12, 10, 255, 118)]),
 'bb-board-painpoints': (7, FULL, [L]),
 'bb-board-blueprint-1': (18, FULL, [L]),
 'bb-board-blueprint-2': (19, FULL, [L]),
 'bb-board-process': (23, FULL, [L]),
}


def paint_out(im, rect, box, k):
    """Fill rect (slide units) row by row with a blend of the pixels just left and right of it."""
    x0 = max(0, round((rect[0] - box[0]) * k) - 4)
    x1 = min(im.width - 1, round((rect[2] - box[0]) * k) + 4)
    y0 = max(0, round((rect[1] - box[1]) * k))
    y1 = min(im.height, round((rect[3] - box[1]) * k))
    px = im.load()
    for y in range(y0, y1):
        a, c = px[x0, y], px[x1, y]
        for x in range(x0, x1):
            t = (x - x0) / (x1 - x0)
            px[x, y] = tuple(round(a[i] + (c[i] - a[i]) * t) for i in range(3))


def export_board(name, page, box, masks):
    d = pymupdf.open(PDF)
    clip = pymupdf.Rect(*box)
    k = 3200 / clip.width
    pix = d[page - 1].get_pixmap(matrix=pymupdf.Matrix(k, k), clip=clip)
    im = Image.frombytes('RGB', (pix.width, pix.height), pix.samples)
    for m in masks: paint_out(im, m, box, k)
    im.save(OUT / f'{name}.webp', 'WEBP', quality=90, method=6)
    return stamp(name, im)


def main():
    dims = json.loads(DIMS.read_text())
    only = set(sys.argv[1:])
    for name, (src, edge, *crop) in MANIFEST.items():
        if only and name not in only: continue
        dims[name] = export(name, src, edge, *crop); print(name, dims[name])
    for name, args in BOARDS.items():
        if only and name not in only: continue
        dims[name] = export_board(name, *args); print(name, dims[name])
    DIMS.write_text(json.dumps(dims, separators=None))


if __name__ == '__main__':
    main()
