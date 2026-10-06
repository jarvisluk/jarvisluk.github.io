"""Homepage card covers cut from the vector decks.

Run with the project venv: .venv/bin/python scripts/build_covers.py
Cards are 1.65:1 (wide slots) or 1.42:1 (narrow slots), so each cover is cut to its slot's ratio
instead of letting object-fit crop the slide's text or phones.
"""
from pathlib import Path
import pymupdf
from PIL import Image
from build_bambu import paint_out

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / 'public/assets'

# name: (pdf, page, crop box in slide units, logo masks)
COVERS = {
 # SF Eats key slide: wordmark, feature map, mascot and the home screen (narrow slot, 1.42).
 'sf-eats-cover': ('source-assets/sf-eats/final-presentation.pdf', 19, (10, 90, 1400, 1069), [(0, 0, 445, 118)]),
 # Bambu Lab mini program concept: QR, mascot and the two phones (wide slot, 1.65).
 'bambu-concept': ('source-assets/bambu/final-presentation.pdf', 20, (90, 0, 1872, 1080), [(20, 30, 395, 125)]),
}


def main():
    for name, (pdf, page, box, masks) in COVERS.items():
        clip = pymupdf.Rect(*box)
        k = 2000 / clip.width
        pix = pymupdf.open(ROOT / pdf)[page - 1].get_pixmap(matrix=pymupdf.Matrix(k, k), clip=clip)
        im = Image.frombytes('RGB', (pix.width, pix.height), pix.samples)
        for m in masks:
            # Clamp the mask to the crop so the blend samples pixels inside the image.
            r = (max(m[0], box[0]), max(m[1], box[1]), m[2], m[3])
            if r[3] > r[1]: paint_out(im, r, box, k)
        im.save(OUT / f'{name}.webp', 'WEBP', quality=88, method=6)
        print(name, im.size, round(im.width / im.height, 3))


if __name__ == '__main__':
    main()
