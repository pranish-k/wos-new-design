// The write side of the people store, used only by the dev-only admin.
//
// Split from store.ts so the page graph never pulls in sharp or the fs write path.
// Every function here throws outside development, because the admin routes that call
// them are a local convenience and not an authenticated endpoint.

import fs from "node:fs";
import path from "node:path";
import { processPhoto } from "@/tools/people-image.mjs";
import { PEOPLE_DIR } from "./store.fs";
import type { PersonRecord } from "./types";

function assertDev() {
  if (process.env.NODE_ENV !== "development") {
    throw new Error("the people admin is available in development only");
  }
}

// Fixed key order so a saved record diffs against a hand-edited one cleanly, rather
// than reordering every key the first time the admin touches a file.
const KEYS = [
  "slug",
  "name",
  "role",
  "membership",
  "groups",
  "status",
  "order",
  "photo",
  "bio",
  "legacyPaths",
] as const;

function serialise(rec: PersonRecord): string {
  const ordered: Record<string, unknown> = {};
  for (const k of KEYS) {
    if (rec[k] !== undefined) ordered[k] = rec[k];
  }
  return JSON.stringify(ordered, null, 2) + "\n";
}

export function savePerson(rec: PersonRecord): void {
  assertDev();
  if (!/^[a-z0-9-]+$/.test(rec.slug)) throw new Error(`bad slug ${rec.slug}`);
  fs.writeFileSync(path.join(PEOPLE_DIR, `${rec.slug}.json`), serialise(rec), "utf8");
}

export function deletePerson(slug: string): void {
  assertDev();
  if (!/^[a-z0-9-]+$/.test(slug)) throw new Error(`bad slug ${slug}`);
  const file = path.join(PEOPLE_DIR, `${slug}.json`);
  if (!fs.existsSync(file)) throw new Error(`no record for ${slug}`);
  // The photo goes with the record. Nothing else references it: the filename is the
  // slug, so it cannot belong to anyone else.
  const photo = path.join(process.cwd(), "public", "images", "people", `${slug}.webp`);
  if (fs.existsSync(photo)) fs.unlinkSync(photo);
  fs.unlinkSync(file);
}

/** Runs an uploaded file through the same pipeline as the CLI and returns its path. */
export async function savePhoto(slug: string, bytes: Buffer): Promise<string> {
  assertDev();
  if (!/^[a-z0-9-]+$/.test(slug)) throw new Error(`bad slug ${slug}`);
  return processPhoto(slug, bytes);
}
