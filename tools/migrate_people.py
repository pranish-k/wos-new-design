"""
One-shot migration of the three old people sources into content/people/*.json.

Reads content/people.ts (the index cards), content/person-pages.ts (the bios), and the
redirect table in next.config.ts, and merges them into one record per person. The three
sources duplicated name and photo with nothing keeping them in sync, which is the reason
for the merge.

Run once. The sources are deleted in the same change.
"""

import json
import pathlib
import subprocess
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT = ROOT / "content" / "people"

GROUP_TITLES = {
    "Board of Directors",
    "Academic Advisory Board",
    "Management Team",
}

GROUP_TITLE_BY_ID = {
    "team": "Management Team",
    "board-of-directors": "Board of Directors",
    "academic-advisory-board": "Academic Advisory Board",
}

GROUP_OF_ARRAY = {
    "TEAM": "team",
    "BOARD_OF_DIRECTORS": "board-of-directors",
    "ACADEMIC_ADVISORY_BOARD": "academic-advisory-board",
}


def read(p):
    return (ROOT / p).read_text(encoding="utf-8")


def parse_index():
    """
    key -> card, from the three arrays in content/people.ts.

    Keyed by href where there is one, because the two files disagree about names: the
    card says "Julie L. Brickell, Esquire" and the bio page says "Julie L. Brickell".
    That drift is exactly what this migration exists to end.
    """
    src = read("content/people.ts")
    out = {}
    for array, group in GROUP_OF_ARRAY.items():
        m = re.search(rf"export const {array}: Person\[\] = \[(.*?)\n\];", src, re.S)
        if not m:
            sys.exit(f"array {array} not found")
        for entry in re.finditer(r"\{(.*?)\}", m.group(1), re.S):
            body = entry.group(1)

            def field(k):
                f = re.search(rf'{k}:\s*("(?:[^"\\]|\\.)*"|null)', body)
                if not f:
                    return None
                v = f.group(1)
                return None if v == "null" else json.loads(v)

            name = field("name")
            href = field("href")
            # The array order is the live page's card order, which is deliberate: chairs
            # and founders sit at the top of the board pages. Alphabetical would lose it.
            order = len(out)
            out[href or f"name:{name}"] = {
                "name": name,
                "role": field("role") or "",
                "photo": field("photo"),
                "href": href,
                "group": group,
                "order": order,
            }
    return out


def parse_pages():
    """(parent, slug) -> record, from content/person-pages.ts."""
    src = read("content/person-pages.ts")
    body = src[src.index("export const PERSON_PAGES") :]
    out = {}
    # Each record starts at a slug field; split on those rather than brace matching,
    # which the bio text would defeat.
    starts = [m.start() for m in re.finditer(r"\n  \{\n    slug:", body)]
    starts.append(len(body))
    for i in range(len(starts) - 1):
        chunk = body[starts[i] : starts[i + 1]]
        slug = json.loads(re.search(r'slug:\s*("(?:[^"\\]|\\.)*")', chunk).group(1))
        parent = json.loads(re.search(r'parent:\s*("(?:[^"\\]|\\.)*")', chunk).group(1))
        name = json.loads(re.search(r'name:\s*("(?:[^"\\]|\\.)*")', chunk).group(1))
        photo_raw = re.search(r'photo:\s*("(?:[^"\\]|\\.)*"|null)', chunk).group(1)
        photo = None if photo_raw == "null" else json.loads(photo_raw)
        blocks = [
            {"kind": k, "text": json.loads(t)}
            for k, t in re.findall(
                r'kind:\s*"(heading|para)",\s*\n\s*text:\s*("(?:[^"\\]|\\.)*")', chunk
            )
        ]
        out[(parent, slug)] = {"name": name, "photo": photo, "bio": blocks}
    return out


def parse_redirects():
    """
    destination path -> [legacy sources].

    Read from git rather than the working tree: next.config.ts derives its redirects from
    the registry now, so the hand-written table this migration consumes only exists in
    the commit before it.
    """
    src = subprocess.run(
        ["git", "show", "HEAD:next.config.ts"], cwd=ROOT, capture_output=True, text=True, check=True
    ).stdout
    out = {}
    for s, d in re.findall(r'source:\s*"([^"]+)",\s*destination:\s*"([^"]+)"', src):
        out.setdefault(d, []).append(s)
    return out


def split_chair(name):
    """
    The live board cards put the board office in the name field ("Chair: Camille J.
    Bryant"). It is a role, so it moves to the role field where it can be styled.
    """
    m = re.match(r"^(Chair|Co-Chair|Secretary|Vice Chair):\s*(.+)$", name)
    return (m.group(2), m.group(1)) if m else (name, None)


def slugify(name):
    s = name.lower()
    s = re.sub(r"[^a-z0-9]+", "-", s)
    return s.strip("-")


def main():
    index = parse_index()
    pages = parse_pages()
    redirects = parse_redirects()

    records = {}

    def put(slug, rec):
        if slug in records:
            sys.exit(f"duplicate slug {slug}")
        records[slug] = rec

    # Bios first: they carry the canonical slug and parent.
    matched = set()
    for (parent, slug), page in pages.items():
        idx = index.get(f"/{parent}/{slug}")
        if idx:
            matched.add(f"/{parent}/{slug}")
        # The first paragraph of every bio is the job title. The index card carries the
        # same title as a real field, so prefer that and drop the duplicate paragraph.
        bio = page["bio"]
        # Leading headings are card chrome, not content: either the person's own name or
        # the name of the board they sit on. Both are already in the page header.
        surname = page["name"].split()[-1]
        while bio and bio[0]["kind"] == "heading" and (
            surname in bio[0]["text"] or bio[0]["text"].strip() in GROUP_TITLES
        ):
            bio = bio[1:]
        # Four people have a bio page but no index card, so their job title exists only
        # as the opening paragraph of the bio.
        role = idx["role"] if idx else ""
        if not role and bio and bio[0]["kind"] == "para" and len(bio[0]["text"]) < 120:
            role = bio[0]["text"]
        if bio and bio[0]["kind"] == "para" and bio[0]["text"].strip() == role.strip():
            bio = bio[1:]

        groups = [parent]
        if idx and idx["group"] != parent:
            groups.append(idx["group"])

        put(
            slug,
            {
                "slug": slug,
                # The card carries the fuller form including any credential, and the bio
                # page repeats it as its opening heading, which is dropped above.
                "name": (idx or {}).get("name") or page["name"],
                "role": role,
                "groups": groups,
                "status": "published",
                "order": idx["order"] if idx else None,
                "photo": (idx or {}).get("photo") or page["photo"],
                "bio": bio,
                "legacyPaths": sorted(redirects.get(f"/{parent}/{slug}", [])),
            },
        )
    # Then index-only people: a card with no page anywhere on the live site.
    for key, idx in index.items():
        if key in matched:
            continue
        if idx["href"]:
            sys.exit(f"{idx['name']} has href {idx['href']} but no bio page")
        name = idx["name"]
        put(
            slugify(name),
            {
                "slug": slugify(name),
                "name": name,
                "role": idx["role"],
                "groups": [idx["group"]],
                "status": "published",
                "order": idx["order"],
                "photo": idx["photo"],
                "bio": [],
                "legacyPaths": [],
            },
        )

    # The board office lives in the name on the live cards; move it to the role.
    for rec in records.values():
        name, office = split_chair(rec["name"])
        if office:
            rec["name"] = name
            # Name the body they chair. It is the page the card sits on, so this states
            # what the live layout implied rather than adding a fact.
            held = f"{office}, {GROUP_TITLE_BY_ID[rec['groups'][0]]}"
            rec["role"] = f"{held}. {rec['role']}" if rec["role"] else held

    # Arthur Langer has a board record with a page and a separate card-only record on the
    # team page. Same person, two records, which is the duplication this registry exists
    # to end. Merge the card into the record that has the page, so his team card links.
    merged = []
    for slug, rec in list(records.items()):
        if rec["bio"]:
            continue
        twin = next(
            (r for r in records.values() if r["bio"] and r["name"] == rec["name"]), None
        )
        if not twin:
            continue
        for g in rec["groups"]:
            if g not in twin["groups"]:
                twin["groups"].append(g)
        del records[slug]
        merged.append(f"{slug} -> {twin['slug']}")

    OUT.mkdir(parents=True, exist_ok=True)
    for slug, rec in records.items():
        (OUT / f"{slug}.json").write_text(
            json.dumps(rec, indent=2, ensure_ascii=False) + "\n", encoding="utf-8"
        )

    for m in merged:
        print(f"merged duplicate: {m}")
    carried = sum(len(r["legacyPaths"]) for r in records.values())
    total_redirects = sum(len(v) for v in redirects.values())
    print(f"{len(records)} records ({len(pages)} with pages, {len(records) - len(pages)} card only)")
    print(f"{carried}/{total_redirects} redirects carried")
    if carried != total_redirects:
        missing = {d: s for d, s in redirects.items() if d.count("/") == 2 and f"/{d.split('/')[1]}/{d.split('/')[2]}" not in [f"/{r['groups'][0]}/{r['slug']}" for r in records.values()]}
        print("unmatched:", missing)
        sys.exit(1)


main()
