#!/usr/bin/env python3
"""
Pull the individual person pages out of the mirror into content/person-pages.ts.

URLs follow the sitemap's canonical form, the nested one (/team/jose-cabrera/), not the
top-level duplicates the index cards link to. That settles half of open decision 4: the
redirect direction. The 19 top-level slugs are listed here so the redirects can be
written from them, and are recorded in PROGRESS.md rather than resolved silently.

Usage: python3 tools/extract_people.py
"""

import html
import json
import os
import re
from collections import Counter

HERE = os.path.dirname(os.path.abspath(__file__))
MIRROR = os.path.join(HERE, "..", "..", "wforce-mirror", "wforce.org")

PARENTS = ["team", "board-of-directors", "academic-advisory-board"]
STRIP = re.compile(r"<(script|style|noscript|svg|form)\b.*?</\1>", re.S | re.I)
BLOCK = re.compile(r"<(h1|h2|h3|h4|h5|h6|p)\b[^>]*>(.*?)</\1>", re.S | re.I)
TAGS = re.compile(r"<[^>]+>")


def text(raw):
    return re.sub(r"\s+", " ", html.unescape(TAGS.sub(" ", raw))).strip()


def main():
    people = []
    for parent in PARENTS:
        base = os.path.join(MIRROR, parent)
        for slug in sorted(os.listdir(base)):
            page = os.path.join(base, slug, "index.html")
            if not os.path.isdir(os.path.join(base, slug)) or not os.path.exists(page):
                continue
            src = STRIP.sub(" ", html.unescape(
                open(page, encoding="utf-8", errors="replace").read()))
            title = re.search(r"<title[^>]*>(.*?)</title>", src, re.S | re.I)
            title = re.sub(r"\s*[-|]\s*Workforce Opportunity Services\s*$", "",
                           text(title.group(1))) if title else slug
            img = re.search(
                r'<img[^>]+src="([^"]*wp-content/uploads/[^"]+)"[^>]*>(?![\s\S]*<h1)', src)
            images = re.findall(r'<img[^>]+src="([^"]*wp-content/uploads/[^"]+)"', src)
            photo = next((i for i in images
                          if not os.path.basename(i).startswith(
                              ("WOS-Logo", "footer-logo", "Site-Icon"))), None)
            people.append({
                "slug": slug,
                "parent": parent,
                "name": title,
                "photo": "/images/" + re.sub(r"-\d+x\d+(\.\w+)$", r"\1",
                                             os.path.basename(photo)) if photo else None,
                "raw": [(t.lower(), text(inner)) for t, inner in BLOCK.findall(src)
                        if text(inner)],
            })

    # Chrome again: a block on most of the person pages is the nav or the footer.
    counts = Counter(b for p in people for b in set(p["raw"]))
    chrome = {b for b, n in counts.items() if n > len(people) / 2}
    for p in people:
        blocks = [{"kind": "heading" if t != "p" else "para", "text": v}
                  for t, v in p["raw"] if (t, v) not in chrome and v != p["name"]]
        p["blocks"] = blocks
        del p["raw"]

    body = """// Individual person pages, from the nested paths in the mirror.
//
// The sitemap treats these nested URLs as canonical and the index cards link to
// top-level duplicates; see PROGRESS.md. These are the canonical ones.

export type PersonPage = {
  slug: string;
  parent: string;
  name: string;
  photo: string | null;
  blocks: { kind: "heading" | "para"; text: string }[];
};

export const PERSON_PAGES: PersonPage[] = %s;
""" % json.dumps(people, indent=2, ensure_ascii=False)
    body = re.sub(r'"(slug|parent|name|photo|blocks|kind|text)":', r"\1:", body)
    open(os.path.join(HERE, "..", "content", "person-pages.ts"), "w",
         encoding="utf-8").write(body)

    for p in people:
        print(f"{p['parent']}/{p['slug']:<24} {len(p['blocks']):>2} blocks  "
              f"{'photo' if p['photo'] else 'NO PHOTO'}")
    print(f"\n{len(people)} person pages")


if __name__ == "__main__":
    main()
