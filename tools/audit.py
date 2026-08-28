#!/usr/bin/env python3
"""
Compare the built site against the mirror, route by route.

Three questions, all of which have caught real bugs already:
  text     how much of the live page's copy actually reaches the built page
  images   how many of the live page's content images reach it
  links    does every internal href in the built HTML resolve to a built page

Run after `npm run build`. Usage: python3 tools/audit.py
"""

import html
import json
import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
BUILT = os.path.join(HERE, "..", ".next", "server", "app")
EXTRACTED = os.path.join(HERE, "extracted")
CHROME = ("WOS-Logo", "footer-logo", "Site-Icon")
TAGS = re.compile(r"<[^>]+>")


def rendered(route):
    path = os.path.join(BUILT, (route or "index") + ".html")
    if not os.path.exists(path):
        return None
    return open(path, encoding="utf-8", errors="replace").read()


def visible(page_html):
    body = re.sub(r"<(script|style)\b.*?</\1>", " ", page_html, flags=re.S | re.I)
    return re.sub(r"\s+", " ", html.unescape(TAGS.sub(" ", body)))


def main():
    routes = []
    for name in sorted(os.listdir(EXTRACTED)):
        if name.startswith("_"):
            continue
        routes.append(json.load(open(os.path.join(EXTRACTED, name))))

    print(f"{'route':<40} {'text':>12} {'images':>12}")
    print("-" * 66)
    for data in routes:
        route = data["route"].strip("/")
        page = rendered(route)
        if page is None:
            print(f"{'/' + route:<40} {'NO PAGE':>12}")
            continue
        text = visible(page)

        # A block counts as carried when a distinctive slice of it appears in the output.
        blocks = [b["text"] for b in data["blocks"]
                  if b["tag"] != "img" and len(b["text"]) > 25]
        carried = sum(1 for b in blocks if b[:60] in text)

        # Only the first background counts: the rest are Kubio section fills laid
        # behind body text, which the rebuild deliberately does not reproduce.
        want, seen_bg = set(), False
        for i in data["images"]:
            base = os.path.basename(i["src"])
            if base.startswith(CHROME):
                continue
            if i.get("role") == "background":
                if seen_bg:
                    continue
                seen_bg = True
            want.add(base)
        # Next/Image proxies rasters through /_next/image but leaves SVG as a plain
        # src, so both forms have to be counted or every diagram reads as missing.
        got = {html.unescape(g) for g in re.findall(r"url=%2Fimages%2F([^&\"]+)", page)}
        got |= {os.path.basename(g) for g in re.findall(r'src="(/images/[^"]+)"', page)}
        have = len({w for w in want if w in got or w.replace("+", " ") in got})

        flag = ""
        if blocks and carried / len(blocks) < 0.8:
            flag = "  <-- copy missing"
        if want and have == 0:
            flag += "  <-- images missing"
        print(f"{'/' + route:<40} {carried:>5}/{len(blocks):<6} {have:>5}/{len(want):<6}{flag}")

    # Internal links that go nowhere.
    built = set()
    for root, _, files in os.walk(BUILT):
        for f in files:
            if f.endswith(".html"):
                rel = os.path.relpath(os.path.join(root, f), BUILT)[:-5]
                built.add("/" + ("" if rel == "index" else rel))
    broken = {}
    for root, _, files in os.walk(BUILT):
        for f in files:
            if not f.endswith(".html"):
                continue
            src = open(os.path.join(root, f), encoding="utf-8", errors="replace").read()
            for href in set(re.findall(r'href="(/[^"#?]*)"', src)):
                if href.startswith("/_next") or href.endswith((".pdf", ".xml", ".txt")):
                    continue
                if href.rstrip("/") or href == "/":
                    target = href.rstrip("/") or "/"
                    if target not in built:
                        broken.setdefault(target, set()).add(f[:-5] or "index")
    print("\nBroken internal links:")
    if not broken:
        print("  none")
    for target, pages in sorted(broken.items()):
        print(f"  {target:<44} from {sorted(pages)[:4]}")


if __name__ == "__main__":
    main()
