"""破れた色紙を貼り合わせた数字（0-9）のスプライトを生成する。

出力: 5列 x 2行（0-4 / 5-9）、1セル CELL px 四方、白地。
使い方: python digits.py <font.ttf> <out.webp>
"""
import sys
import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont

CELL = 400
SS = 2  # スーパーサンプリング
C = CELL * SS

RED = np.array([222, 32, 36], float)
BLUE = np.array([30, 58, 196], float)
YELLOW = np.array([242, 204, 34], float)
BLACK = np.array([24, 24, 26], float)
PAPER = np.array([238, 234, 224], float)


def smooth_noise(rng, h, w, scale):
    small = rng.random((max(2, h // scale), max(2, w // scale)))
    img = Image.fromarray((small * 255).astype(np.uint8)).resize((w, h), Image.BICUBIC)
    return np.asarray(img, float) / 255.0


def displace(mask, rng, amp, scale, fine_amp=0.0):
    h, w = mask.shape
    dx = (smooth_noise(rng, h, w, scale) - 0.5) * 2 * amp
    dy = (smooth_noise(rng, h, w, scale) - 0.5) * 2 * amp
    if fine_amp:
        dx += (smooth_noise(rng, h, w, 3) - 0.5) * 2 * fine_amp
        dy += (smooth_noise(rng, h, w, 3) - 0.5) * 2 * fine_amp
    yy, xx = np.mgrid[0:h, 0:w]
    sx = np.clip((xx + dx).astype(int), 0, w - 1)
    sy = np.clip((yy + dy).astype(int), 0, h - 1)
    return mask[sy, sx]


def glyph_mask(font, ch):
    img = Image.new("L", (C, C), 0)
    d = ImageDraw.Draw(img)
    size = int(C * 0.86)
    f = ImageFont.truetype(font, size)
    l, t, r, b = d.textbbox((0, 0), ch, font=f)
    gw, gh = r - l, b - t
    # 縦に少し伸ばして、セルにほぼ正方形で収まるようにする
    tmp = Image.new("L", (gw + 20, gh + 20), 0)
    ImageDraw.Draw(tmp).text((10 - l, 10 - t), ch, font=f, fill=255)
    target_h = int(C * 0.84)
    target_w = min(int(gw * target_h / gh * 1.02), int(C * 0.84))
    tmp = tmp.resize((target_w, target_h), Image.LANCZOS)
    img.paste(tmp, ((C - target_w) // 2, (C - target_h) // 2))
    return np.asarray(img, float) / 255.0


def poly_mask(points):
    img = Image.new("L", (C, C), 0)
    ImageDraw.Draw(img).polygon([(x * C, y * C) for x, y in points], fill=255)
    return np.asarray(img, float) / 255.0


def jagged(points, rng, steps=10, amp=0.012):
    """多角形の辺を細かく分けて揺らし、手でちぎった線にする"""
    out = []
    n = len(points)
    for i in range(n):
        x0, y0 = points[i]
        x1, y1 = points[(i + 1) % n]
        for s in range(steps):
            t = s / steps
            out.append((x0 + (x1 - x0) * t + rng.normal(0, amp), y0 + (y1 - y0) * t + rng.normal(0, amp)))
    return out


def stripes(horizontal, period=22):
    yy, xx = np.mgrid[0:C, 0:C]
    v = (yy if horizontal else xx) % period
    return np.where(v[..., None] < period * 0.48, BLACK, PAPER)


def layout(rng):
    """1つの数字を埋める紙片の並び。下から順に重ねる"""
    cut = 0.42 + rng.uniform(-0.08, 0.1)
    tilt = rng.uniform(-0.14, 0.14)
    layers = [
        (BLUE, [(-0.1, -0.1), (1.1, -0.1), (1.1, 1.1), (-0.1, 1.1)]),
        (RED, [(-0.1, -0.1), (1.1, -0.1), (1.1, cut + tilt), (0.5, cut + rng.uniform(-0.04, 0.04)), (-0.1, cut - tilt)]),
    ]
    extras = rng.permutation(["yellow", "stripe", "paper", "black", "yellow2"])[: rng.integers(2, 4)]
    for kind in extras:
        cx, cy = rng.uniform(0.15, 0.85), rng.uniform(0.2, 0.85)
        w, h = rng.uniform(0.18, 0.42), rng.uniform(0.14, 0.34)
        a = rng.uniform(-0.6, 0.6)
        ca, sa = np.cos(a), np.sin(a)
        pts = []
        for px, py in [(-w, -h), (w, -h * rng.uniform(0.6, 1.2)), (w * rng.uniform(0.7, 1.1), h), (-w, h * rng.uniform(0.5, 1))]:
            pts.append((cx + (px * ca - py * sa) / 2, cy + (px * sa + py * ca) / 2))
        if kind.startswith("yellow"):
            layers.append((YELLOW, pts))
        elif kind == "stripe":
            layers.append(("stripe", pts))
        elif kind == "paper":
            layers.append((PAPER, pts))
        else:
            layers.append((BLACK, pts))
    return layers


def render_digit(font, ch, seed):
    rng = np.random.default_rng(seed)
    glyph = glyph_mask(font, ch)
    glyph = displace(glyph, rng, amp=4 * SS, scale=50, fine_amp=1.1 * SS)
    glyph = (glyph > 0.5).astype(float)

    canvas = np.ones((C, C, 3)) * 255.0
    color = np.zeros((C, C, 3))
    horizontal = bool(rng.integers(0, 2))
    for fill, pts in layout(rng):
        m = poly_mask(jagged(pts, rng))
        m = displace(m, rng, amp=2.5 * SS, scale=45, fine_amp=1.1 * SS)
        # ちぎった縁に見える紙の白い繊維
        edge = np.asarray(Image.fromarray((m * 255).astype(np.uint8)).filter(ImageFilter.MaxFilter(5)), float) / 255.0
        edge = displace(edge, rng, amp=2 * SS, scale=6)
        color = color * (1 - edge[..., None]) + PAPER * edge[..., None]
        src = stripes(horizontal) if isinstance(fill, str) else fill
        color = color * (1 - m[..., None]) + src * m[..., None]

    # 紙の質感：粗いムラ・しわ・細かい粒
    blotch = smooth_noise(rng, C, C, 90)
    grain = rng.random((C, C))
    shade = 0.9 + 0.1 * blotch + (grain - 0.5) * 0.07
    yy, xx = np.mgrid[0:C, 0:C]
    for _ in range(2):  # 折り目
        a = rng.uniform(0, np.pi)
        d = (xx - rng.uniform(0.2, 0.8) * C) * np.cos(a) + (yy - rng.uniform(0.2, 0.8) * C) * np.sin(a)
        shade -= 0.07 * np.exp(-(d / (1.6 * SS)) ** 2)
        shade += 0.03 * np.exp(-((d - 3 * SS) / (2.5 * SS)) ** 2)
    color = np.clip(color * shade[..., None], 0, 255)

    out = canvas * (1 - glyph[..., None]) + color * glyph[..., None]
    img = Image.fromarray(out.astype(np.uint8))
    return img.resize((CELL, CELL), Image.LANCZOS)


def main():
    font, out = sys.argv[1], sys.argv[2]
    atlas = Image.new("RGB", (CELL * 5, CELL * 2), (255, 255, 255))
    for d in range(10):
        img = render_digit(font, str(d), seed=1000 + d * 17)
        atlas.paste(img, ((d % 5) * CELL, (d // 5) * CELL))
    atlas.save(out, "WEBP", quality=86, method=6)


if __name__ == "__main__":
    main()
