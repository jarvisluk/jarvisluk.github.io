"""Export PawPals media: NAS camera originals, the laid-out deck (PawPals.pdf, Figma Page 2) and video posters.

Run with the project venv: .venv/bin/python scripts/build_pawpals.py [ids...]
Deck pages are 3840x2160 rasters; board regions are given in 1600x900 preview units (x2.4).
"""
from pathlib import Path
import json, sys
from PIL import Image, ImageDraw
from build_flexbench import export, stamp, OUT, DIMS, PHOTO, SCREEN

SRC = Path(__file__).resolve().parent.parent / 'source-assets/pawpals'
BG = (255, 254, 244)  # deck background

MANIFEST = {
 'pp-hero': (SRC / 'final/DSC03139.jpg', PHOTO),
 # Showcase
 'pp-cat-collar': (SRC / 'final/DSC03141.jpg', PHOTO),
 'pp-real-collar': (SRC / 'wearable/IMG_7451.jpeg', PHOTO),
 'pp-station-cluster': (SRC / 'final/DSC03152.jpg', PHOTO),
 'pp-table-graphics': (SRC / 'final/DSC03148.jpg', PHOTO),
 'pp-pcbs': (SRC / 'final/DSC03156.jpg', PHOTO),
 'pp-logo-panel': (SRC / 'final/DSC03144.jpg', PHOTO),
 'pp-app-mock': (SRC / 'book/猫友迹APP页面.png', PHOTO),
 'pp-collar-close': (SRC / 'final/DSC03158.jpg', PHOTO),
 # Video posters
 'pp-poster-demo': (SRC / 'frames/demo-60.png', PHOTO),
 'pp-poster-making': (SRC / 'frames/making-8.png', PHOTO),
 # Wearable hardware and field tests
 'pp-hw-devboard': (SRC / 'wearable/IMG_20250101_203359.JPG', PHOTO),
 'pp-hw-pcb': (SRC / 'wearable/IMG_20250101_215955.JPG', PHOTO),
 'pp-hw-battery': (SRC / 'wearable/IMG_20250101_220017.JPG', PHOTO),
 'pp-test-grey': (SRC / 'wearable/IMG_20250103_230007.JPG', PHOTO),
 'pp-test-backpack': (SRC / 'wearable/流浪猫佩戴测试图片1.jpeg', PHOTO),
 'pp-test-walk': (SRC / 'wearable/IMG_7432.jpeg', PHOTO),
 'pp-test-fpc': (SRC / 'wearable/IMG_7461.jpeg', PHOTO),
 'pp-test-logo': (SRC / 'wearable/IMG_7460.jpeg', PHOTO),
 'pp-test-calico': (SRC / 'wearable/IMG_7632.jpeg', PHOTO),
 'pp-test-fitting': (SRC / 'wearable/流浪猫佩戴测试图片2.jpeg', PHOTO),
 # Stations
 'pp-station-espnow': (SRC / 'final/DSC03147.jpg', PHOTO),
 'pp-station-door': (SRC / 'final/DSC03161.jpg', PHOTO),
 'pp-station-sensor': (SRC / 'final/DSC03162.jpg', PHOTO),
 'pp-render-cluster': (SRC / 'render/渲染图（带球）.22.png', PHOTO),
 'pp-render-tower': (SRC / 'render/渲染图（带球）.25.png', PHOTO),
 'pp-render-hex': (SRC / 'render/渲染图（带球）.26.png', PHOTO),
 # Exhibition
 'pp-ex-wide': (SRC / 'final/DSC03174.jpg', PHOTO),
 'pp-ex-side': (SRC / 'final/DSC03170.jpg', PHOTO),
 'pp-ex-cat': (SRC / 'final/DSC03169.jpg', PHOTO),
 'pp-ex-table': (SRC / 'final/DSC03149.jpg', PHOTO),
 'pp-ex-stamps': (SRC / 'final/DSC03150.jpg', PHOTO),
 'pp-ex-lid': (SRC / 'final/DSC03165.jpg', PHOTO),
 'pp-ex-paws': (SRC / 'final/DSC03167.jpg', PHOTO),
 'pp-ex-yarn': (SRC / 'final/DSC03153.jpg', PHOTO),
}

# id: (deck page, crop box, masks) in preview units
BOARDS = {
 'pp-board-origin': (3, (22, 165, 1575, 818), []),
 'pp-board-intervention': (4, (30, 90, 1560, 815), [(0, 0, 1165, 145)]),
 'pp-board-blueprint': (5, (30, 150, 1560, 822), []),
 'pp-board-stakeholders': (6, (30, 150, 1585, 845), []),
 'pp-board-journey': (8, (85, 195, 1545, 800), []),
 'pp-board-ia': (9, (25, 170, 1580, 832), []),
 'pp-ui-desktop': (10, (25, 165, 1042, 745), []),
 'pp-ui-phones': (10, (1162, 110, 1508, 790), []),
 'pp-board-gps': (12, (40, 75, 1575, 828), [(0, 0, 700, 150)]),
 'pp-board-hardware': (13, (85, 170, 1545, 840), []),
 'pp-board-research': (14, (85, 170, 1545, 818), []),
 'pp-board-behaviour': (17, (78, 175, 1575, 800), []),
 'pp-station-field': (18, (22, 130, 896, 620), []),
}


def export_board(name, page, box, masks):
    im = Image.open(SRC / f'pdf/p{page:02d}-img00-3840x2160.png').convert('RGB')
    d = ImageDraw.Draw(im)
    for m in masks: d.rectangle([v * 2.4 for v in m], fill=BG)
    im = im.crop(tuple(round(v * 2.4) for v in box))
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
