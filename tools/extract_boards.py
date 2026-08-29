"""
Pull the two orphan boards out of the mirror into the people registry.

Industry Advisory Board has a live page nobody can reach, with 12 member cards.
HR Advisory Board has four canonical member pages and no landing page in the mirror at
all, so its group entry carries no intro copy. Both are on the unreachable list in
wforce-header-asis.txt, and giving them a path is what closes open decision 1.

Member bios on the Industry page sit behind Popup Maker modals whose content is loaded
over AJAX and is not in the mirror, so those members are card only.
"""

import html
import json
import pathlib
import re
import shutil
import subprocess
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
MIRROR = ROOT.parent / "wforce-mirror" / "wforce.org"
OUT = ROOT / "content" / "people"
IMG = ROOT / "public" / "images"

IMG_RE = re.compile(r'src="([^"]*wp-content/uploads/[^"]*\.(?:jpg|jpeg|png))"')
TXT_RE = re.compile(r"<(h[1-6]|p|div)[^>]*>([^<]{2,90})</\1>")


def slugify(name):
    return re.sub(r"[^a-z0-9]+", "-", name.lower()).strip("-")


def read(rel):
    return (MIRROR / rel).read_text(encoding="utf-8", errors="ignore")


def copy_photo(url):
    """Copy the full-size original out of the mirror and return its public path."""
    name = url.split("/")[-1]
    src = next(MIRROR.rglob(name), None)
    if not src:
        sys.exit(f"photo {name} not found in the mirror")
    shutil.copy(src, IMG / name)
    return f"/images/{name}"


def load(slug):
    f = OUT / f"{slug}.json"
    return json.loads(f.read_text(encoding="utf-8")) if f.exists() else None


def save(rec):
    (OUT / f"{rec['slug']}.json").write_text(
        json.dumps(rec, indent=2, ensure_ascii=False) + "\n", encoding="utf-8"
    )


def by_name(name):
    """An existing record for this person, matched on name ignoring titles."""
    key = re.sub(r"[^a-z]", "", name.lower())
    for f in OUT.glob("*.json"):
        rec = json.loads(f.read_text(encoding="utf-8"))
        other = re.sub(r"[^a-z]", "", rec["name"].lower())
        if key in other or other in key:
            return rec
    return None


def industry():
    raw = read("industry-advisory-board/index.html")
    toks = [(m.start(), "img", m.group(1)) for m in IMG_RE.finditer(raw)]
    toks += [(m.start(), "txt", html.unescape(m.group(2)).strip()) for m in TXT_RE.finditer(raw)]
    toks.sort()

    # The card block is a strict image, name, role triple repeated 12 times. Anchor on
    # the first member rather than on markup classes, which Kubio regenerates.
    start = next(i for i, t in enumerate(toks) if "Kippelman" in t[2])
    added, tagged = 0, 0
    for i in range(start, start + 36, 3):
        photo_url, name, role = toks[i][2], toks[i + 1][2], toks[i + 2][2]
        assert toks[i][1] == "img" and toks[i + 1][1] == "txt", f"card shape broke at {name}"
        # The live cards put the board office in the name, as the Board of Directors page
        # does. It is a role, so it moves to the role field.
        m = re.match(r"^(Chair|Co-Chair|Secretary|Vice Chair):\s*(.+)$", name)
        if m:
            name, role = m.group(2), f"{m.group(1)}, Industry Advisory Board. {role}"

        existing = by_name(name)
        if existing:
            # Already on staff or on another board. One record, two groups, and the board
            # portfolio kept as a per-group role so the job title survives too.
            if "industry-advisory-board" not in existing["groups"]:
                existing["groups"].append("industry-advisory-board")
            existing.setdefault("membership", {})["industry-advisory-board"] = {
                "role": role,
                "order": (i - start) // 3,
            }
            save(existing)
            tagged += 1
            continue

        save(
            {
                "slug": slugify(name),
                "name": name,
                "role": role,
                "groups": ["industry-advisory-board"],
                "status": "published",
                "order": (i - start) // 3,
                "photo": copy_photo(photo_url),
                # The bios are in Popup Maker modals loaded over AJAX and are not in the
                # mirror, so there is nothing to put on a page.
                "bio": [],
                "legacyPaths": [],
            }
        )
        added += 1
    print(f"industry advisory board: {added} new, {tagged} already in the registry")


def page_lines(raw):
    """Visible text as deduplicated lines, in document order."""
    body = re.sub(r"<(script|style|noscript)[^>]*>.*?</\1>", "", raw, flags=re.S)
    text = html.unescape(re.sub(r"<[^>]+>", "\n", body))
    out = []
    for line in (x.strip() for x in text.split("\n")):
        if line and line not in out:
            out.append(line)
    return out


def hr():
    """
    The four member pages, whose bios are plain page copy.

    Chrome is stripped by frequency rather than by markup, because Kubio emits no
    landmarks: a line that appears on three of the four pages is the nav or the footer.
    """
    dirs = sorted(p.name for p in (MIRROR / "hr-advisory-board").iterdir() if p.is_dir())
    pages = {d: page_lines(read(f"hr-advisory-board/{d}/index.html")) for d in dirs}

    counts = {}
    for lines in pages.values():
        for line in lines:
            counts[line] = counts.get(line, 0) + 1
    chrome = {line for line, n in counts.items() if n >= 3}

    for n, d in enumerate(dirs):
        raw = read(f"hr-advisory-board/{d}/index.html")
        own = [line for line in pages[d] if line not in chrome]
        # The page title repeats the name, then the card gives name, job title, bio.
        own = [line for line in own if " - Workforce Opportunity Services" not in line]
        if len(own) < 2:
            sys.exit(f"{d}: expected a name, a title and a bio, found {own}")
        # The consultation form carries per-page scrambled word fragments as a spam trap,
        # which are unique per page and so survive the frequency pass. Every real bio here
        # is one long paragraph, and no fragment comes close to that length.
        name, role = own[0], own[1]
        bio = [t for t in own[2:] if len(t) > 200]
        if not bio:
            sys.exit(f"{d}: no bio paragraph found")
        save(
            {
                "slug": d,
                "name": name,
                "role": role,
                "groups": ["hr-advisory-board"],
                "status": "published",
                "order": n,
                "photo": copy_photo(
                    next(u for u in IMG_RE.findall(raw) if not re.search(r"logo|Site-Icon|footer", u, re.I))
                ),
                "bio": [{"kind": "para", "text": t} for t in bio],
                "legacyPaths": [],
            }
        )
    print(f"hr advisory board: {len(dirs)} member pages")


IMG.mkdir(parents=True, exist_ok=True)
industry()
hr()
subprocess.run(["node", "tools/people-image.mjs", "--all"], cwd=ROOT, check=True)
