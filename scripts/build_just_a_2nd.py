"""Export Just A 2nd media: the portfolio page, App Store screenshots in device frames, and showcase tiles.

Run with the project venv: .venv/bin/python scripts/build_just_a_2nd.py
Sources: NAS `2025-12 Just A 2nd/` (iPhone, iPad and Mac screenshots) copied to source-assets/just-a-2nd,
and Lu_Junrong_Portfolio 2.pdf p. 19. The five iPhone 17 Pro Max simulator shots are the ones on the App Store.
"""
from pathlib import Path
import json
import pymupdf
from PIL import Image, ImageDraw, ImageFilter
from build_flexbench import stamp, OUT, DIMS

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / 'source-assets/just-a-2nd'
SIM = str(SRC) + '/iPhone/Simulator Screenshot - iPhone 17 Pro Max - 2025-12-22 at 15.{}.png'
DEV = str(SRC) + '/iPhone/IMG_{}.PNG'
IPAD = str(SRC) + '/iPad/Simulator Screenshot - iPad Pro 13-inch (M5) - 2025-12-22 at 15.16.{}.png'
MAC = str(SRC) + '/macOS/Screenshot 2025-12-22 at 15.{}.png'
CREAM, INK, ORANGE = (242, 239, 233), (20, 19, 18), (255, 122, 48)

# Single screens shown in phone layouts (App Store shots first, then on-device ones).
SCREENS = {
 'j2-ui-home': SIM.format('12.58'),
 'j2-ui-listen': SIM.format('13.06'),
 'j2-ui-correct': SIM.format('13.09'),
 'j2-ui-mistakes': SIM.format('13.38'),
 'j2-ui-settings': SIM.format('13.44'),
 'j2-ui-wrong': DEV.format('4844'),
 'j2-ui-progress': DEV.format('4840'),
 'j2-ui-stats': DEV.format('4842'),
 'j2-ui-dark-home': DEV.format('4835'),
 'j2-ui-dark-listen': DEV.format('4837'),
 'j2-ui-dark-wrong': DEV.format('4838'),
 'j2-ui-dark-settings': DEV.format('4836'),
}


def rounded(im, r):
    m = Image.new('L', im.size, 0)
    ImageDraw.Draw(m).rounded_rectangle((0, 0, im.width - 1, im.height - 1), r, fill=255)
    im = im.convert('RGBA'); im.putalpha(m); return im


def phone(src, h=1500):
    """Screenshot inside a plain dark bezel, scaled to height h."""
    s = Image.open(src).convert('RGB')
    k = (h - 2 * round(h * .018)) / s.height
    s = s.resize((round(s.width * k), round(s.height * k)), Image.LANCZOS)
    b = round(h * .018)
    out = Image.new('RGBA', (s.width + 2 * b, s.height + 2 * b), (0, 0, 0, 0))
    ImageDraw.Draw(out).rounded_rectangle((0, 0, out.width - 1, out.height - 1), round(out.width * .15), fill=(28, 28, 30, 255))
    out.alpha_composite(rounded(s, round(s.width * .135)), (b, b))
    return out


def tablet(src, h):
    s = Image.open(src).convert('RGB')
    b = round(h * .022)
    k = (h - 2 * b) / s.height
    s = s.resize((round(s.width * k), round(s.height * k)), Image.LANCZOS)
    out = Image.new('RGBA', (s.width + 2 * b, s.height + 2 * b), (0, 0, 0, 0))
    ImageDraw.Draw(out).rounded_rectangle((0, 0, out.width - 1, out.height - 1), round(out.width * .06), fill=(28, 28, 30, 255))
    out.alpha_composite(rounded(s, round(s.width * .045)), (b, b))
    return out


def window(src, w):
    """Mac window screenshot: keep its own alpha (the black around it is the transparent shadow area)."""
    s = Image.open(src).convert('RGBA')
    box = s.getchannel('A').point(lambda v: 255 if v > 250 else 0).getbbox()
    if box: s = s.crop(box)
    s = rounded(s.convert('RGB'), round(s.width * .012))
    return s.resize((w, round(s.height * w / s.width)), Image.LANCZOS)


def stage(size, bg, glow=None):
    im = Image.new('RGBA', size, bg + (255,))
    if glow:
        g = Image.new('RGBA', size, (0, 0, 0, 0))
        w, h = size
        ImageDraw.Draw(g).ellipse((w * .28, h * .05, w * .72, h * .95), fill=glow + (70,))
        im.alpha_composite(g.filter(ImageFilter.GaussianBlur(min(size) * .14)))
    return im


def shadowed(canvas, item, xy, blur=40, alpha=60):
    sh = Image.new('RGBA', canvas.size, (0, 0, 0, 0))
    a = item.getchannel('A').point(lambda v: alpha if v else 0)
    sh.paste((0, 0, 0, 255), (xy[0], xy[1] + blur // 2), a)
    canvas.alpha_composite(sh.filter(ImageFilter.GaussianBlur(blur)))
    canvas.alpha_composite(item, xy)


def row(size, bg, items, glow=None, gap=.05):
    """Lay items side by side, centred, on a stage."""
    c = stage(size, bg, glow)
    total = sum(i.width for i in items) + gap * size[0] * (len(items) - 1)
    x = round((size[0] - total) / 2)
    for i in items:
        shadowed(c, i, (x, round((size[1] - i.height) / 2)))
        x += i.width + round(gap * size[0])
    return c.convert('RGB')


def save(name, im, q=88):
    im.save(OUT / f'{name}.webp', 'WEBP', quality=q, method=6)
    return stamp(name, im)


def board():
    d = pymupdf.open(ROOT / 'source-assets/portfolio/Lu_Junrong_Portfolio 2.pdf')
    pix = d[18].get_pixmap(matrix=pymupdf.Matrix(3200 / 1920, 3200 / 1920))
    return Image.frombytes('RGB', (pix.width, pix.height), pix.samples)


def main():
    dims = json.loads(DIMS.read_text())
    dims['j2-board'] = save('j2-board', board(), 90)
    for name, src in SCREENS.items():
        s = Image.open(src).convert('RGB')
        s = s.resize((900, round(s.height * 900 / s.width)), Image.LANCZOS)
        dims[name] = save(name, rounded(s, 118))
    W, H = 2400, 1600
    tiles = {
     'j2-show-trio': row((W, H), CREAM, [phone(SIM.format(x), 1300) for x in ('12.58', '13.06', '13.38')], ORANGE),
     'j2-show-feedback': row((1500, 1000), CREAM, [phone(SIM.format('13.09'), 860), phone(DEV.format('4844'), 860)], ORANGE),
     'j2-show-dark': row((1500, 1000), INK, [phone(DEV.format('4837'), 860), phone(DEV.format('4838'), 860)], ORANGE),
     'j2-show-ipad': row((1500, 1000), (226, 222, 216), [tablet(IPAD.format('15'), 860), tablet(IPAD.format('29'), 860)], gap=.04),
     'j2-show-mac': row((1500, 1000), (226, 222, 216), [window(MAC.format('38.01'), 1180)]),
     'j2-show-settings': row((1500, 1000), CREAM, [phone(SIM.format('13.44'), 860), phone(DEV.format('4836'), 860)], ORANGE),
    }
    for name, im in tiles.items():
        dims[name] = save(name, im)
    DIMS.write_text(json.dumps(dims, separators=None))
    for k in ['j2-board', *tiles]: print(k, dims[k])


if __name__ == '__main__':
    main()
