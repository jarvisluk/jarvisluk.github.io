"""Colour-grade flat video frames so they sit with the camera photos.

White point from each channel's bright percentile (the white bricks and tables), black point from
the dark percentile, then a gentle S-curve, a touch of saturation and warmth, and light sharpening.
Usage: .venv/bin/python scripts/grade_video_frames.py src.jpg dst.jpg [...]
"""
import sys
from PIL import Image, ImageEnhance, ImageFilter


def pct(hist, p):
    total = sum(hist); acc = 0
    for i, n in enumerate(hist):
        acc += n
        if acc >= total * p: return i
    return 255


def grade(im):
    im = im.convert('RGB')
    luts = []
    warm = (1.0, 0.0, -4.0)  # target white per channel: slightly warm
    for c, h in enumerate([im.histogram()[i*256:(i+1)*256] for i in range(3)]):
        lo, hi = pct(h, 0.005), pct(h, 0.985)
        white = 247 + warm[c]
        lut = []
        for v in range(256):
            x = max(0.0, min(1.0, (v - lo) / max(1, hi - lo)))
            x = x * x * (3 - 2 * x) * 0.35 + x * 0.65  # gentle S-curve
            lut.append(int(max(0, min(255, round(x * white + 6 * (1 - x))))))
        luts.extend(lut)
    im = im.point(luts)
    im = ImageEnhance.Color(im).enhance(1.12)
    return im.filter(ImageFilter.UnsharpMask(radius=2, percent=60, threshold=3))


if __name__ == '__main__':
    args = sys.argv[1:]
    for src, dst in zip(args[::2], args[1::2]):
        grade(Image.open(src)).save(dst, quality=94)
