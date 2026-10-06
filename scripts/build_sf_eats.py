"""Export SF Eats media: slides from the group's final presentation (vector PDF) and concept-video stills.

Run with the project venv: .venv/bin/python scripts/build_sf_eats.py [ids...]
The portfolio (Lu_Junrong_Portfolio.pdf pp. 1-10) reuses slides 1, 6, 19-25 and 29 of this deck, so the deck is
the source for both the outcome boards and the research boards. Boxes are in slide units (1920x1080).
The SF Express / PolyU Design logo header (top-left, y < 118) is cropped off or painted over with the slide background.
"""
from pathlib import Path
import json, sys
import pymupdf
from PIL import Image
from build_flexbench import export, stamp, OUT, DIMS, PHOTO

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / 'source-assets/sf-eats'
PDF = SRC / 'final-presentation.pdf'
LOGO = (0, 0, 445, 118)
FULL = (0, 0, 1920, 1080)

# Concept-video stills (SF Video.m4v on the NAS); hands, phones and food only.
ST = SRC / 'stills'
MANIFEST = {
 'sf-vehicle': (ST / 's0.6.jpg', PHOTO),
 'sf-still-plan': (ST / 's102.5.jpg', PHOTO),
 'sf-still-share': (ST / 's116.jpg', PHOTO),
 'sf-still-bowl': (ST / 's122.jpg', PHOTO),
 'sf-still-home': (ST / 's42.5.jpg', PHOTO),
 'sf-still-track': (ST / 's44.5.jpg', PHOTO),
}

# id: (slide, crop box, mask the logo header with the background colour?)
BOARDS = {
 'sf-board-key': (19, (0, 90, 1920, 1080), False),
 'sf-board-mascot': (20, FULL, True),
 'sf-board-community': (21, FULL, True),
 'sf-board-group': (22, FULL, True),
 'sf-board-plan': (23, FULL, True),
 'sf-board-order': (24, FULL, True),
 'sf-board-streak': (25, FULL, True),
 'sf-board-survey': (8, FULL, True),
 'sf-board-stakeholders': (10, FULL, True),
 'sf-board-ideation': (14, FULL, True),
 'sf-board-blueprint': (15, FULL, True),
 'sf-board-journey': (16, FULL, True),
 'sf-board-scenario': (26, FULL, True),
}


def export_board(name, page, box, mask):
    d = pymupdf.open(PDF)
    clip = pymupdf.Rect(*box)
    scale = 3200 / clip.width
    pix = d[page - 1].get_pixmap(matrix=pymupdf.Matrix(scale, scale), clip=clip)
    im = Image.frombytes('RGB', (pix.width, pix.height), pix.samples)
    if mask:
        # Fill each row of the logo header by blending the background just left and right of it,
        # so flat, gradient and lightly textured slides all close up without a visible patch.
        k = scale
        x0, x1 = 2, round((LOGO[2] + 6 - box[0]) * k)
        y1 = min(im.height, round((LOGO[3] - box[1]) * k))
        px = im.load()
        for y in range(0, y1):
            a, c = px[x0, y], px[x1, y]
            for x in range(x0, x1):
                t = (x - x0) / (x1 - x0)
                px[x, y] = tuple(round(a[i] + (c[i] - a[i]) * t) for i in range(3))
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
