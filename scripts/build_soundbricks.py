"""Export SoundBricks media: the laid-out portfolio pages (vector PDF) and NAS camera originals.

Run with the project venv: .venv/bin/python scripts/build_soundbricks.py [ids...]
Board regions are in 1500x750 preview units of the 1800x900 pages (x1.2 to page units).
"""
from pathlib import Path
import json, sys
import pymupdf
from PIL import Image
from build_flexbench import export, stamp, OUT, DIMS, PHOTO

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / 'source-assets/soundbricks'
PDF = ROOT / 'source-assets/portfolio/Lu_Junrong_Portfolio.pdf'

F = SRC / 'final'
P = SRC / 'process'
MANIFEST = {
 'sb-hero': (F / 'DSC01510.jpg', PHOTO),
 # Showcase
 'sb-towers': (F / 'DSC01491.jpg', PHOTO),
 'sb-houses': (F / 'DSC01481.jpg', PHOTO),
 'sb-glow': (F / 'DSC01512.jpg', PHOTO),
 'sb-five': (F / 'DSC01521.jpg', PHOTO),
 'sb-hand': (F / 'DSC01505.jpg', PHOTO),
 'sb-app-bricks': (SRC / 'DSC02424_1.jpg', PHOTO),
 'sb-pattern-book': (F / 'DSC01541.jpg', PHOTO),
 'sb-colour-light': (F / 'DSC01520.jpg', PHOTO),
 # Play sessions at the development centre (frames from 患儿试玩.mp4, graded by grade_video_frames.py; overhead, no faces)
 'sb-play-149': (SRC / 'play/graded/play-149.jpg', PHOTO),
 'sb-play-197': (SRC / 'play/graded/play-197.jpg', PHOTO),
 'sb-play-213': (SRC / 'play/graded/play-213.jpg', PHOTO),
 'sb-play-245': (SRC / 'play/graded/play-245.jpg', PHOTO),
 'sb-play-293': (SRC / 'play/graded/play-293.jpg', PHOTO),
 'sb-play-469': (SRC / 'play/graded/play-469.jpg', PHOTO),
 # Outcome
 'sb-set': (F / 'DSC01462.jpg', PHOTO),
 'sb-types': (F / 'DSC01466.jpg', PHOTO),
 'sb-base': (F / 'DSC01507.jpg', PHOTO),
 'sb-patterns': (F / 'DSC01525.jpg', PHOTO),
 # Video poster
 'sb-poster-use': (SRC / 'use-50.png', PHOTO),
 'sb-poster-making': (F / 'DSC01516.jpg', PHOTO),
 # Prototyping
 'sb-proc-acrylic': (P / 'IMG_0200.jpeg', PHOTO),
 'sb-proc-base': (P / 'IMG_0550.jpeg', PHOTO),
 'sb-proc-wiring': (P / 'IMG_0552.JPG', PHOTO),
 'sb-proc-shell': (P / 'IMG_9752.jpeg', PHOTO),
 'sb-proc-circuit': (P / 'IMG_9930.jpeg', PHOTO),
 'sb-proc-reading': (P / 'IMG_9589.jpeg', PHOTO),
}

# id: (pdf page, crop box in preview units)
BOARDS = {
 'sb-board-background': (21, (18, 18, 1492, 742)),
 'sb-board-field': (22, (12, 86, 592, 352)),
 'sb-board-toys': (22, (605, 18, 1492, 742)),
 'sb-board-concept': (23, (18, 18, 525, 742)),
 'sb-board-prototype': (23, (548, 22, 1482, 742), [(548, 22, 1100, 96)]),
 'sb-board-app': (24, (18, 18, 1492, 742)),
 'sb-board-phones': (25, (0, 0, 1092, 750)),
 'sb-board-test-1': (26, (18, 18, 1492, 378)),
 'sb-board-test-2': (26, (18, 388, 1245, 722)),
}


def export_board(name, page, box, masks=()):
    d = pymupdf.open(PDF)
    clip = pymupdf.Rect(*[v * 1.2 for v in box])
    scale = min(3, 3600 / clip.width)
    pix = d[page - 1].get_pixmap(matrix=pymupdf.Matrix(scale, scale), clip=clip)
    im = Image.frombytes('RGB', (pix.width, pix.height), pix.samples)
    if masks:
        from PIL import ImageDraw
        bg = im.getpixel((4, im.height - 4)); d2 = ImageDraw.Draw(im); k = pix.width / clip.width * 1.2
        for m in masks: d2.rectangle([(m[0] - box[0]) * k, (m[1] - box[1]) * k, (m[2] - box[0]) * k, (m[3] - box[1]) * k], fill=bg)
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
