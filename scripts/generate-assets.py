#!/usr/bin/env python3
"""
Génère les assets dérivés du logo et des photos :
  - src/app/icon.png / apple-icon.png (favicons)
  - public/og/*.jpg (images Open Graph 1200x630)

Usage : python3 scripts/generate-assets.py
Dépendance : Pillow (pip install Pillow)
"""
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
IMAGES = ROOT / "public" / "images"
OG_DIR = ROOT / "public" / "og"
APP = ROOT / "src" / "app"

PAPER = (251, 248, 243)
CORAL_1 = (242, 150, 107)
CORAL_3 = (194, 96, 61)

OG_SIZE = (1200, 630)
PAGES = {
    "accueil": "occasion-anniversaire.webp",
    "anniversaire": "occasion-anniversaire.webp",
    "demande-en-mariage": "occasion-demande-en-mariage.webp",
    "fete-des-meres": "occasion-fete-des-meres.webp",
    "evg-evjf": "occasion-evg-evjf.webp",
    "pot-de-depart": "occasion-pot-de-depart.webp",
}


def logo() -> Image.Image:
    return Image.open(IMAGES / "yurday-logo.webp").convert("RGBA")


def build_icons() -> None:
    """Icône carrée : le « Y » du logo sur fond papier."""
    src = logo()
    mark = src.crop((0, 8, 136, 205))  # le « Y » manuscrit, lettres liées : pas de découpe possible plus loin
    for size, name in ((512, "icon.png"), (180, "apple-icon.png")):
        canvas = Image.new("RGBA", (size, size), PAPER + (255,))
        pad = int(size * 0.14)
        box = size - 2 * pad
        ratio = min(box / mark.width, box / mark.height)
        w, h = int(mark.width * ratio), int(mark.height * ratio)
        resized = mark.resize((w, h), Image.LANCZOS)
        canvas.alpha_composite(resized, ((size - w) // 2, (size - h) // 2))
        canvas.save(APP / name)
        print("écrit", APP / name)


def gradient(width: int, height: int) -> Image.Image:
    """Dégradé diagonal corail, comme les boutons du site."""
    grad = Image.new("RGB", (width, height))
    px = grad.load()
    for y in range(height):
        for x in range(width):
            t = (x / width * 0.65) + (y / height * 0.35)
            px[x, y] = tuple(round(a + (b - a) * t) for a, b in zip(CORAL_1, CORAL_3))
    return grad


def build_og() -> None:
    OG_DIR.mkdir(parents=True, exist_ok=True)
    w, h = OG_SIZE
    panel_w = int(w * 0.46)
    base_panel = gradient(panel_w, h)
    mark = logo()
    logo_w = int(panel_w * 0.62)
    logo_h = round(mark.height * logo_w / mark.width)
    mark = mark.resize((logo_w, logo_h), Image.LANCZOS)
    # Le logo corail devient blanc sur le dégradé.
    white_mark = Image.new("RGBA", mark.size, (255, 255, 255, 0))
    white_mark.putalpha(mark.getchannel("A"))

    for name, photo_file in PAGES.items():
        canvas = Image.new("RGB", OG_SIZE, PAPER)
        photo = Image.open(IMAGES / photo_file).convert("RGB")
        target_w = w - panel_w
        ratio = max(target_w / photo.width, h / photo.height)
        photo = photo.resize((round(photo.width * ratio), round(photo.height * ratio)), Image.LANCZOS)
        left = (photo.width - target_w) // 2
        top = max(0, (photo.height - h) // 2)
        canvas.paste(photo.crop((left, top, left + target_w, top + h)), (panel_w, 0))
        canvas.paste(base_panel, (0, 0))
        canvas.paste(white_mark, ((panel_w - logo_w) // 2, (h - logo_h) // 2), white_mark)
        out = OG_DIR / f"{name}.jpg"
        canvas.save(out, quality=84, optimize=True, progressive=True)
        print("écrit", out)


if __name__ == "__main__":
    build_icons()
    build_og()
