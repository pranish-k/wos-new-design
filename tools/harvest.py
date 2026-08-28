#!/usr/bin/env python3
"""
Copy the images the extracted pages actually reference out of the mirror.

Only originals. The mirror holds 784 files, 563 of which are WordPress resize variants
(name-800x600.jpg) that Next/Image regenerates from the original. Filenames are
flattened because the WordPress year/month folders carry no meaning here.

Usage: python3 tools/harvest.py
"""

import json
import os
import shutil

HERE = os.path.dirname(os.path.abspath(__file__))
MIRROR = os.path.join(HERE, "..", "..", "wforce-mirror", "wforce.org")
EXTRACTED = os.path.join(HERE, "extracted")
DEST = os.path.join(HERE, "..", "public", "images")


def main():
    wanted = {}
    for name in sorted(os.listdir(EXTRACTED)):
        if name.startswith("_"):
            continue
        for img in json.load(open(os.path.join(EXTRACTED, name)))["images"]:
            wanted.setdefault(os.path.basename(img["src"]), img["src"])

    os.makedirs(DEST, exist_ok=True)
    copied = missing = 0
    for base, src in sorted(wanted.items()):
        # Pages sit at /slug/index.html, so their srcs are relative (../wp-content/...).
        # Anchor on the wp-content segment rather than resolving each page's depth.
        path = os.path.join(MIRROR, src[src.index("wp-content"):])
        if not os.path.exists(path):
            print(f"MISSING {src}")
            missing += 1
            continue
        shutil.copyfile(path, os.path.join(DEST, base))
        copied += 1
    print(f"{copied} copied, {missing} missing, into public/images/")


if __name__ == "__main__":
    main()
