// File-backed implementation of the people store.
//
// Records live in content/people/*.json, one per person. Every people route is
// statically generated, so these reads happen at build time and never at request time.
//
// This is the seam. Moving to a hosted CMS later means a second file implementing the
// same three read functions, and no page component changes.

import fs from "node:fs";
import path from "node:path";
import { GROUPS } from "@/content/groups";
import type { BioBlock, Group, GroupId, PersonRecord } from "./types";
import { comparePeople } from "./types";

export const PEOPLE_DIR = path.join(process.cwd(), "content", "people");

const GROUP_IDS = new Set(GROUPS.map((g) => g.id));

/**
 * Throws rather than skipping. A record that fails validation is a typo in a file a
 * human just edited, and the useful outcome is a failed build naming the file, not a
 * card that silently renders blank.
 */
function parse(file: string, raw: string): PersonRecord {
  const bad = (msg: string): never => {
    throw new Error(`content/people/${file}: ${msg}`);
  };
  let v: unknown;
  try {
    v = JSON.parse(raw);
  } catch (e) {
    return bad(`not valid JSON (${(e as Error).message})`);
  }
  if (typeof v !== "object" || v === null) return bad("not an object");
  const r = v as Record<string, unknown>;

  const str = (k: string) => (typeof r[k] === "string" ? (r[k] as string) : bad(`${k} must be a string`));
  const slug = str("slug");
  if (slug !== path.basename(file, ".json")) {
    return bad(`slug "${slug}" does not match the filename`);
  }
  if (!/^[a-z0-9-]+$/.test(slug)) return bad(`slug "${slug}" must be lowercase letters, digits and hyphens`);

  const name = str("name");
  const role = str("role");

  if (!Array.isArray(r.groups) || r.groups.length === 0) return bad("groups must be a non-empty array");
  const groups = r.groups.map((g) =>
    typeof g === "string" && GROUP_IDS.has(g as GroupId) ? (g as GroupId) : bad(`unknown group ${JSON.stringify(g)}`),
  );

  if (r.status !== "published" && r.status !== "hidden") return bad('status must be "published" or "hidden"');
  if (r.order !== null && typeof r.order !== "number") return bad("order must be a number or null");
  if (r.photo !== null && typeof r.photo !== "string") return bad("photo must be a string or null");

  if (!Array.isArray(r.bio)) return bad("bio must be an array");
  const bio: BioBlock[] = r.bio.map((b) => {
    const o = b as Record<string, unknown>;
    const kind = o?.kind;
    if (kind !== "heading" && kind !== "para") return bad("bio blocks must be heading or para");
    if (typeof o.text !== "string" || o.text.trim() === "") return bad("bio blocks need text");
    return { kind, text: o.text };
  });

  if (!Array.isArray(r.legacyPaths)) return bad("legacyPaths must be an array");
  const legacyPaths = r.legacyPaths.map((p) =>
    typeof p === "string" && p.startsWith("/") ? p : bad("legacyPaths must be absolute paths"),
  );

  return {
    slug,
    name,
    role,
    groups,
    status: r.status,
    order: r.order as number | null,
    photo: r.photo as string | null,
    bio,
    legacyPaths,
  };
}

function loadAll(): PersonRecord[] {
  const files = fs.readdirSync(PEOPLE_DIR).filter((f) => f.endsWith(".json"));
  const people = files.map((f) => parse(f, fs.readFileSync(path.join(PEOPLE_DIR, f), "utf8")));

  const seen = new Map<string, string>();
  for (const p of people) {
    // Two people can share a slug only if they never share a group, since the group is
    // the URL parent. In practice a duplicate slug is a copied file.
    const key = `${p.groups[0]}/${p.slug}`;
    const prev = seen.get(key);
    if (prev) throw new Error(`content/people: ${prev} and ${p.slug}.json both claim /${key}`);
    seen.set(key, `${p.slug}.json`);
  }
  return people;
}

// Module scope so the directory is read once per build rather than once per page.
const ALL = loadAll();

/** Published people, ordered. Pass a group to filter to its members. */
export function listPeople(groupId?: GroupId): PersonRecord[] {
  return ALL.filter((p) => p.status === "published" && (!groupId || p.groups.includes(groupId))).sort(comparePeople);
}

/** Every record including hidden ones. For the admin and for redirect generation only. */
export function listAllPeople(): PersonRecord[] {
  return [...ALL].sort(comparePeople);
}

/** A published person by their canonical path. Hidden people resolve to undefined. */
export function getPerson(groupId: string, slug: string): PersonRecord | undefined {
  return ALL.find(
    (p) => p.status === "published" && p.slug === slug && p.groups[0] === groupId && p.bio.length > 0,
  );
}

export function listGroups(): Group[] {
  return [...GROUPS].sort((a, b) => a.order - b.order);
}

export function getGroup(path: string): Group | undefined {
  return GROUPS.find((g) => g.path === path);
}
