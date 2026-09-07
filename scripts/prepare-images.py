#!/usr/bin/env python3
"""
BESTCOR image preparation.
Reads preserved source photos from source-assets/facebook-export/playwright/media
and writes optimized WebP derivatives into public/images/.

Sources are never modified. Mapping mirrors src/lib/images.ts:
  fb_00001 -> hero-home.webp (1440x754) and gallery entry g-01 reuses it
  fb_000NN -> g-NN.webp (640x640) for the remaining exported photos
Curated feature/service crops are named explicitly below.

Run: python3 scripts/prepare-images.py
Requires Pillow (available in the repo venv or system python3 with PIL).
"""
from __future__ import annotations

import os
from PIL import Image, ImageOps, ImageEnhance, ImageFilter

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MEDIA = os.path.join(ROOT, "source-assets", "facebook-export", "playwright", "media")
OUT = os.path.join(ROOT, "public", "images")

# id -> (fb source, target w, target h)
CURATED = {
    "hero-home": ("fb_00001", 1440, 754),
    "service-maintenance": ("fb_00018", 680, 680),
    "service-repairs": ("fb_00016", 680, 680),
    "service-construction": ("fb_00013", 680, 680),
    "service-testing": ("fb_00028", 680, 680),
    "service-distribution": ("fb_00011", 680, 680),
    "service-poleline": ("fb_00029", 680, 680),
    "about-crew": ("fb_00022", 828, 828),
    "about-secondary": ("fb_00010", 680, 680),
    "work-grid-1": ("fb_00016", 560, 560),
    "work-grid-2": ("fb_00028", 560, 560),
    "work-grid-3": ("fb_00011", 560, 560),
    "work-grid-4": ("fb_00025", 560, 560),
    "safety-personnel": ("fb_00021", 828, 828),
    "safety-discipline": ("fb_00010", 680, 680),
}


def process(name: str, fb: str, w: int, h: int) -> None:
    src = os.path.join(MEDIA, f"{fb}.jpg")
    im = Image.open(src).convert("RGB")
    sw, sh = im.size
    # scale so the whole source covers the target box, then center-crop
    scale = max(w / sw, h / sh)
    im = im.resize((round(sw * scale), round(sh * scale)), Image.LANCZOS)
    left = (im.width - w) / 2
    top = (im.height - h) / 2
    im = im.crop((int(left), int(top), int(left) + w, int(top) + h))
    # gentle presentation treatment: slight sharpen; no content change
    im = im.filter(ImageFilter.UnsharpMask(radius=2, percent=90, threshold=3))
    im.save(os.path.join(OUT, f"{name}.webp"), "WEBP", quality=80, method=6)
    print(f"wrote {name}.webp ({w}x{h}) <- {fb}.jpg")


def main() -> None:
    os.makedirs(OUT, exist_ok=True)
    for name, (fb, w, h) in CURATED.items():
        process(name, fb, w, h)
    # remaining gallery items: g-02..g-33 (g-01 reuses hero-home.webp)
    for i in range(2, 34):
        fb = f"fb_{i:05d}"
        if os.path.exists(os.path.join(MEDIA, f"{fb}.jpg")):
            process(f"g-{i:02d}", fb, 640, 640)
    print("done. output:", OUT)


if __name__ == "__main__":
    main()
