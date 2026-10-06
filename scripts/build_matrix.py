"""Export Matrix media: the laid-out portfolio pages (vector PDF) and stills from the installation video.

Run with the project venv: .venv/bin/python scripts/build_matrix.py [ids...]
Source PDF: NAS 个人资料/作品集/Matrix - Emergence Necessity.pdf (six 1800x900 pages, dark background).
Video stills: NAS 2021-2025大学阶段/2024-10 项目四 - 涌现矩阵/项目四视频.mp4.
"""
from pathlib import Path
import json, sys
import pymupdf
from PIL import Image
from build_flexbench import export, stamp, OUT, DIMS, PHOTO

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / 'source-assets/matrix'
PDF = SRC / 'matrix.pdf'
FULL = (0, 0, 1800, 900)
F = SRC / 'frames'

MANIFEST = {
 'mx-still-blue': (F / 'f146.jpg', PHOTO),
 'mx-still-white': (F / 'f12.jpg', PHOTO),
 'mx-still-hand': (F / 'f24.jpg', PHOTO),
 'mx-still-colour': (F / 'f85.jpg', PHOTO),
 'mx-still-violet': (F / 'f93.jpg', PHOTO),
 'mx-detail': (SRC / 'detail-blue.png', PHOTO),
}

# id: (page, crop box in page units)
BOARDS = {
 'mx-hero': (1, (0, 60, 1180, 860)),
 'mx-board-origin': (2, FULL),
 'mx-board-emergence': (3, FULL),
 'mx-board-structure': (4, FULL),
 'mx-board-control': (5, FULL),
 'mx-board-final': (6, FULL),
}


def export_board(name, page, box):
    d = pymupdf.open(PDF)
    clip = pymupdf.Rect(*box)
    k = 3200 / clip.width
    pix = d[page - 1].get_pixmap(matrix=pymupdf.Matrix(k, k), clip=clip)
    im = Image.frombytes('RGB', (pix.width, pix.height), pix.samples)
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
