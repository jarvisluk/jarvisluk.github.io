"""Export FlexBench media from original sources (NAS camera files and Figma fills).

Run with the project venv: .venv/bin/python scripts/build_flexbench.py
Photos are resized to a 2400px long edge; cut-outs and renders keep their alpha channel.
"""
from pathlib import Path
import hashlib
import json, sys
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
NAS = Path('/Users/junrong/Library/CloudStorage/SynologyDrive-DS920/2021-2025大学阶段/2024-5 移动工坊')
FIGMA = ROOT / 'source-assets/flexbench/figma'
OUT = ROOT / 'public/assets/elements'
DIMS = ROOT / 'src/assetDimensions.json'

# id: (source, long edge[, crop box in source pixels])
PHOTO, CUTOUT, SCREEN = 2400, 1400, 1000
MANIFEST = {
 # Brief and context
 'fb-hero': (FIGMA / 'brief-1.jpg', PHOTO),
 # Campus on the left; the farmland on the right was where the portfolio page set its text.
 'fb-campus': (FIGMA / 'bg-6.png', PHOTO, (0, 120, 1700, 1253)),
 'fb-hall-clutter': (NAS / '学校场景调研/APC_0587.jpg', PHOTO),
 'fb-corridor-boxes': (NAS / '学校场景调研/APC_0577.jpg', PHOTO),
 'fb-toolroom': (FIGMA / 'bg-8.jpg', PHOTO),
 # Making workflow
 'fb-wf-lofi': (FIGMA / 'wf-17.jpg', PHOTO),
 'fb-wf-electronics': (FIGMA / 'wf-1.jpg', PHOTO),
 'fb-wf-digital': (FIGMA / 'wf-10.png', PHOTO),
 'fb-wf-outside': (FIGMA / 'wf-8.png', PHOTO),
 'fb-wf-making': (FIGMA / 'wf-13.jpg', PHOTO),
 'fb-wf-finishing': (FIGMA / 'wf-19.jpg', PHOTO),
 # Spaces
 'fb-space-axo': (FIGMA / 'sp-17.png', CUTOUT),
 'fb-space-hall': (NAS / '学校场景调研/APC_0570.jpg', PHOTO),
 'fb-space-classroom': (NAS / '学校场景调研/APC_0573.jpg', PHOTO),
 'fb-space-hall-corridor': (NAS / '学校场景调研/APC_0580.jpg', PHOTO),
 'fb-space-corridor': (NAS / '学校场景调研/APC_0576.jpg', PHOTO),
 'fb-space-eaves': (NAS / '学校场景调研/APC_0566.jpg', PHOTO),
 # Tools (transparent cut-outs)
 'fb-tool-knife': (FIGMA / 'wb-20.png', 800),
 'fb-tool-caliper': (FIGMA / 'wb-5.png', 800),
 'fb-tool-level': (FIGMA / 'wb-8.png', 800),
 'fb-tool-drill': (FIGMA / 'wb-11.png', 800),
 'fb-tool-charger': (FIGMA / 'wb-10.png', 800),
 'fb-tool-grinder': (FIGMA / 'wb-15.png', 800),
 'fb-tool-airbrush': (FIGMA / 'wb-17.png', 800),
 'fb-tool-mat': (FIGMA / 'wb-14.png', 800),
 # Design iterations and renders
 'fb-iter-1': (NAS / '过程/草图1.png', CUTOUT),
 'fb-iter-2': (NAS / '过程/草图4.png', CUTOUT),
 'fb-iter-3': (NAS / '过程/草图6.png', CUTOUT),
 'fb-iter-4': (NAS / '过程/草图7.png', CUTOUT),
 'fb-render-bench': (FIGMA / 'wb-4.png', CUTOUT),
 'fb-render-explode': (NAS / '建模设计图/爆炸图.png', CUTOUT),
 'fb-render-snap': (FIGMA / 'wb-6.png', CUTOUT),
 'fb-render-drawer': (FIGMA / 'wb-1.png', CUTOUT),
 'fb-render-box': (FIGMA / 'wb-19.png', CUTOUT),
 # Prototype making
 'fb-make-frame': (NAS / '过程/截屏2024-09-18 23.52.28.png', PHOTO, (12, 84, 3012, 1764)),  # crop out the QuickTime chrome
 'fb-make-drill': (NAS / '过程/截屏2024-09-19 00.07.19.png', PHOTO),
 'fb-make-saw': (NAS / '过程/截屏2024-09-19 00.19.51.png', PHOTO),
 # Final prototype (camera originals)
 'fb-final-front': (NAS / '最终JPG/DSC01609.jpg', PHOTO),
 'fb-final-pegboard-side': (NAS / '最终JPG/DSC01621.jpg', PHOTO),
 'fb-final-frame': (NAS / '最终JPG/DSC01628.jpg', PHOTO),
 'fb-final-snap-hand': (NAS / '最终JPG/DSC01663.jpg', PHOTO),
 'fb-final-snap-detail': (NAS / '最终JPG/DSC01623.jpg', PHOTO),
 'fb-final-drawers': (NAS / '最终JPG/DSC01640.jpg', PHOTO),
 'fb-final-drawer-tools': (NAS / '最终JPG/DSC01614.jpg', PHOTO),
 'fb-final-grid': (NAS / '最终JPG/DSC01638.jpg', PHOTO),
 'fb-final-box-tools': (NAS / '最终JPG/DSC01716.jpg', PHOTO),
 'fb-final-box-back': (NAS / '最终JPG/DSC01644.jpg', PHOTO),
 'fb-final-pegboard-power': (NAS / '最终JPG/DSC01647.jpg', PHOTO),
 'fb-final-fold-1': (NAS / '最终JPG/DSC01653.jpg', PHOTO),
 'fb-final-fold-2': (NAS / '最终JPG/DSC01655.jpg', PHOTO),
 'fb-final-fold-use': (NAS / '最终JPG/DSC01739.jpg', PHOTO),
 # Storyboard scenes and app screens
 'fb-story-login': (FIGMA / 'sb-1.jpg', PHOTO),
 'fb-story-setup': (FIGMA / 'sb-10.jpg', PHOTO),
 'fb-story-use': (FIGMA / 'sb-12.jpg', PHOTO),
 'fb-story-return': (FIGMA / 'sb-17.jpg', PHOTO),
 'fb-app-login': (FIGMA / 'sb-20.png', SCREEN),
 'fb-app-map': (FIGMA / 'sb-4.png', SCREEN),
 'fb-app-workshop': (FIGMA / 'sb-7.png', SCREEN),
 'fb-app-reserve': (FIGMA / 'sb-16.png', SCREEN),
 'fb-app-overview': (FIGMA / 'sb-9.png', SCREEN),
 'fb-app-tickets': (FIGMA / 'sb-18.png', SCREEN),
}

# Laid-out portfolio boards (Figma frames exported at 3x on black). Regions are in frame units;
# masks black out neighbouring content; black is then keyed out so the art sits on any dark section.
BOARDS = {
 'fb-board-axo': ('board-location.png', (640, 0, 1180, 900), [(1125, 0, 1180, 680), (1125, 740, 1180, 900), (975, 480, 1180, 500)]),
 'fb-board-map': ('board-location.png', (1160, 615, 1765, 870), [(1160, 615, 1200, 770)]),
 'fb-board-tools': ('board-workbench.png', (15, 75, 815, 425), []),
 'fb-board-mapping': ('board-workbench.png', (15, 425, 845, 885), []),
 'fb-board-bench': ('board-workbench.png', (895, 80, 1795, 895), []),
}


def export_board(name, src, box, masks):
    from PIL import ImageDraw
    im = Image.open(FIGMA / src).convert('RGB')
    d = ImageDraw.Draw(im)
    for m in masks: d.rectangle([v * 3 for v in m], fill=(0, 0, 0))
    im = im.crop(tuple(v * 3 for v in box))
    # colour-to-alpha against black: alpha = brightest channel, colour un-premultiplied
    from PIL import ImageChops, ImageMath
    r, g, b = im.split()
    alpha = ImageChops.lighter(ImageChops.lighter(r, g), b)
    bands = [ImageMath.lambda_eval(lambda e: e['c'] * 255 / e['max'](e['a'], 1), c=c.convert('F'), a=alpha.convert('F')).convert('L') for c in (r, g, b)]
    out = Image.merge('RGBA', (*bands, alpha))
    bbox = out.getchannel('A').point(lambda v: 255 if v > 8 else 0).getbbox()
    if bbox: out = out.crop(bbox)
    if max(out.size) > PHOTO: out.thumbnail((PHOTO, PHOTO), Image.LANCZOS)
    out.save(OUT / f'{name}.webp', 'WEBP', quality=90, method=6)
    return stamp(name, out)


def stamp(name, im):
    """Dimensions plus a short content hash, used as a cache-busting query in elementPath."""
    v = hashlib.md5((OUT / f'{name}.webp').read_bytes()).hexdigest()[:8]
    return {'width': im.width, 'height': im.height, 'v': v}


def export(name, src, edge, crop=None):
    im = Image.open(src)
    im = ImageOps.exif_transpose(im)
    if crop: im = im.crop(crop)
    alpha = im.mode in ('RGBA', 'LA') or (im.mode == 'P' and 'transparency' in im.info)
    im = im.convert('RGBA' if alpha else 'RGB')
    if alpha:
        box = im.getchannel('A').getbbox()
        if box: im = im.crop(box)
    if max(im.size) > edge:
        im.thumbnail((edge, edge), Image.LANCZOS)
    im.save(OUT / f'{name}.webp', 'WEBP', quality=82 if not alpha else 88, method=6)
    return stamp(name, im)


def main():
    dims = json.loads(DIMS.read_text())
    only = set(sys.argv[1:])
    for name, (src, edge, *crop) in MANIFEST.items():
        if only and name not in only: continue
        dims[name] = export(name, src, edge, *crop)
        print(name, dims[name])
    for name, args in BOARDS.items():
        if only and name not in only: continue
        dims[name] = export_board(name, *args)
        print(name, dims[name])
    DIMS.write_text(json.dumps(dims, separators=None))


if __name__ == '__main__':
    main()
