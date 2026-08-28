#!/usr/bin/env python3
"""
Pull page copy out of the HTTrack mirror into JSON, one file per route.

The mirror is Kubio output: no <main>, no <header>, no landmark ids, just nested divs.
There is nothing structural to select on, so chrome is removed by frequency instead -
a block of text that appears on most of the 117 pages is the nav, the footer, or a
cookie notice, and is dropped. That is a heuristic, so the JSON is a starting point for
content/*.ts, not a drop-in replacement for it.

The build never reads the mirror. This runs once and its output is committed.

Usage: python3 tools/extract.py
"""

import html
import json
import os
import re
from collections import Counter

MIRROR = os.path.join(
    os.path.dirname(os.path.abspath(__file__)), "..", "..", "wforce-mirror", "wforce.org"
)
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "extracted")

# Phases 3-6: the header-reachable pages plus the pages a hub is the only route to.
ROUTES = [
    "", "our-story", "team", "board-of-directors", "academic-advisory-board",
    "corporate-partners", "academic-partners", "locations", "financials", "faqs",
    "managed-service-centers", "facilities-management", "on-site-remote-staffing",
    "educational-services", "professional-development-fundamentals",
    "professional-development", "advisory-services", "ai-services", "langer-arc",
    "itsupport", "cyber-security", "legacy-application-support",
    "data-analytics-and-ai", "shared-services", "college-co-ops-and-internships",
    "cohorts", "become-a-partner", "blog", "contact", "donate", "privacy-policy",
    # Reachable only from the footer, which makes the footer the only path to it.
    "institute-of-workforce-policy-practice",
]

DROP_TAGS = re.compile(r"<(script|style|noscript|svg|form)\b.*?</\1>", re.S | re.I)
BLOCK = re.compile(r"<(h1|h2|h3|h4|h5|h6|p|li)\b[^>]*>(.*?)</\1>", re.S | re.I)

# Kubio renders an accordion title as a bare div inside the item's anchor, so the FAQ
# questions carry no heading tag at all and a tag-based sweep drops every one of them.
ACCORDION = re.compile(
    r'accordionitem[^>]*>\s*<a\b.*?<div[^>]*>(.*?)</div>\s*</a>', re.S | re.I
)
IMG = re.compile(r"<img\b[^>]*>", re.I)
ATTR = re.compile(r'(\w[\w-]*)\s*=\s*"([^"]*)"')
TAGS = re.compile(r"<[^>]+>")


def text_of(raw):
    return re.sub(r"\s+", " ", html.unescape(TAGS.sub(" ", raw))).strip()


def parse(path):
    src = DROP_TAGS.sub(" ", open(path, encoding="utf-8", errors="replace").read())
    # Marked in place so a question keeps its position ahead of its own answer.
    src = ACCORDION.sub(lambda m: f"<h4>{m.group(1)}</h4>", src)

    blocks = []
    for tag, inner in BLOCK.findall(src):
        t = text_of(inner)
        if t:
            blocks.append({"tag": tag.lower(), "text": t})

    images = []
    for tag in IMG.findall(src):
        a = dict(ATTR.findall(tag))
        # WordPress resize variants regenerate through Next/Image; keep the original.
        src_attr = re.sub(r"-\d+x\d+(\.\w+)$", r"\1", a.get("src", ""))
        if src_attr and "wp-content/uploads" in src_attr:
            images.append({"src": src_attr, "alt": a.get("alt", "")})
    return blocks, images


def main():
    pages = {}
    for route in ROUTES:
        path = os.path.join(MIRROR, route, "index.html")
        if not os.path.exists(path):
            print(f"MISSING {route or '/'}")
            continue
        pages[route] = parse(path)

    # Anything on more than half the pages is chrome, not content.
    seen = Counter()
    for blocks, _ in pages.values():
        seen.update({b["text"] for b in blocks})
    threshold = len(pages) / 2
    chrome = {t for t, n in seen.items() if n > threshold}

    os.makedirs(OUT, exist_ok=True)
    for route, (blocks, images) in pages.items():
        kept = [b for b in blocks if b["text"] not in chrome]
        seen_img, unique = set(), []
        for img in images:
            if img["src"] not in seen_img:
                seen_img.add(img["src"])
                unique.append(img)
        name = (route or "home").replace("/", "-")
        with open(os.path.join(OUT, f"{name}.json"), "w", encoding="utf-8") as f:
            json.dump({"route": "/" + route, "blocks": kept, "images": unique}, f, indent=1)
        print(f"{route or '/':<38} {len(kept):>4} blocks  {len(unique):>3} images")

    print(f"\n{len(chrome)} chrome blocks dropped, on more than {threshold:.0f} of {len(pages)} pages")


if __name__ == "__main__":
    main()
