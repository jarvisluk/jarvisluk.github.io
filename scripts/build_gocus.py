"""Export Gocus media: the official site's first screen and the repository's original SVG artwork.

Run with the project venv: .venv/bin/python scripts/build_gocus.py <gocus-checkout>
The interactive panel, component library and design guidelines are live pages, built by scripts/gocus-demo/.
Sources:
- source-assets/gocus/site-hero.png: https://gocus.pages.dev at 1440 px wide, 2x (hero and homepage cover).
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
    site = Image.open(SRC / 'site-hero.png').convert('RGB')
    site = site.resize((2400, round(site.height * 2400 / site.width)), Image.LANCZOS)
    site.save(OUT / 'gc-site-hero.webp', 'WEBP', quality=90, method=6)
    dims['gc-site-hero'] = stamp('gc-site-hero', site)
    site.resize((1600, 1000), Image.LANCZOS).save(ROOT / 'public/assets/gocus-cover.webp', 'WEBP', quality=88, method=6)
    for rel in SVGS:
        shutil.copy(gocus / rel, SRC / Path(rel).name)
    DIMS.write_text(json.dumps(dims, separators=None))
    print('gc-site-hero', dims['gc-site-hero'])


if __name__ == '__main__':
    main()
