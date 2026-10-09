"""Export Gocus media: the hero board (the official site's first screen, re-laid out) and the repository's original SVG artwork.

Run with the project venv: .venv/bin/python scripts/build_gocus.py <gocus-checkout>
The interactive panel, component library and design guidelines are live pages, built by scripts/gocus-demo/.
Sources:
- source-assets/gocus/hero-board.png: scripts/gocus-demo/hero.html rendered at 1600x1000, 2x (hero and homepage cover);
  it sets the site's headline, pitch and buttons beside the panel screenshots main.png and branch.png.
The icon breakdown (public/embeds/gocus/icon/index.html) inlines the geometry of <gocus>/assets/app-icon.svg
and assets/tray-iconTemplate.svg; the originals are kept in source-assets/gocus/.
"""
from pathlib import Path
import json, shutil, sys
from PIL import Image
from build_flexbench import stamp, OUT, DIMS

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / 'source-assets/gocus'
SVGS = ['assets/app-icon.svg', 'assets/tray-iconTemplate.svg', 'assets/icon-concepts/icon-style-board.svg']


def main():
    gocus = Path(sys.argv[1])
    dims = json.loads(DIMS.read_text())
    site = Image.open(SRC / 'hero-board.png').convert('RGB')
    site.save(OUT / 'gc-site-hero.webp', 'WEBP', quality=90, method=6)
    dims['gc-site-hero'] = stamp('gc-site-hero', site)
    site.resize((1600, 1000), Image.LANCZOS).save(ROOT / 'public/assets/gocus-cover.webp', 'WEBP', quality=88, method=6)
    for rel in SVGS:
        shutil.copy(gocus / rel, SRC / Path(rel).name)
    DIMS.write_text(json.dumps(dims, separators=None))
    print('gc-site-hero', dims['gc-site-hero'])


if __name__ == '__main__':
    main()
