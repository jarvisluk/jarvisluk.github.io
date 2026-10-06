"""Export the Shokz OpenSwim Pro 2 app boards and the homepage cover.

Run with the project venv: .venv/bin/python scripts/build_shokz.py
Source: Figma file Jf4N724rkfcY67QNLaTnC7, Section 12 (node 1224:62124), seven 1920x1280 boards.
The section was exported as one SVG; each board was rendered at 2x with headless Chrome by rewriting the SVG
viewBox to the board's frame, giving source-assets/shokz/board-1..7.png (3840x2560).
The product's internal codename on boards 1 and 5 has been replaced in those PNGs (with Noto Sans SC):
the home header now reads "OpenSwim Pro 2" and the import copy says "connect them to your computer".
"""
from pathlib import Path
import json
from PIL import Image
from build_flexbench import stamp, OUT, DIMS

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / 'source-assets/shokz'

# Board order follows the Figma frames read left to right, top to bottom.
BOARDS = {
 'sk-home': 1,
 'sk-training': 2,
 'sk-player': 3,
 'sk-data': 4,
 'sk-import': 5,
 'sk-courses': 6,
 'sk-library': 7,
}


def save(path, im, q=88):
    im.save(path, 'WEBP', quality=q, method=6)


# Key screens compared stage by stage in the embed (requirements, network, connecting).
FLOW = ['v1-entry', 'v1-empty', 'v1-connecting', 'v2-check', 'v2-list', 'v2-connecting']


def flow_screens():
    """Screens for the Wi-Fi setup before/after flow embed (public/embeds/shokz/wifi).

    source-assets/shokz/wifi holds screens rendered at 3x from the interaction specs
    (7.2.3.1 Wi-Fi connection = before, 7.2 audio import = final), with the spec's red annotation
    lines painted out; the embed redraws its own connectors.
    """
    out = ROOT / 'public/embeds/shokz/wifi/img'
    out.mkdir(parents=True, exist_ok=True)
    for old in out.glob('*.webp'): old.unlink()
    for name in FLOW:
        src = SRC / 'wifi' / f'{name}.png'
        im = Image.open(src).convert('RGB')
        im = im.resize((600, round(im.height * 600 / im.width)), Image.LANCZOS)
        save(out / f'{src.stem}.webp', im, 86)


def main():
    flow_screens()
    dims = json.loads(DIMS.read_text())
    for name, i in BOARDS.items():
        im = Image.open(SRC / f'board-{i}.png').convert('RGB').resize((3200, 2133), Image.LANCZOS)
        save(OUT / f'{name}.webp', im, 90)
        dims[name] = stamp(name, im)
    # Homepage card: wide slot (1.65:1). Keep the home screens, drop the swimmer graphic at the bottom.
    home = Image.open(SRC / 'board-1.png').convert('RGB')
    cover = home.crop((0, 0, 3840, round(3840 / 1.65))).resize((1600, round(1600 / 1.65)), Image.LANCZOS)
    save(ROOT / 'public/assets/shokz-cover.webp', cover)
    DIMS.write_text(json.dumps(dims, separators=None))
    for k in BOARDS: print(k, dims[k])


if __name__ == '__main__':
    main()
