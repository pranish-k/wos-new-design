"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import type { Group, GroupId, PersonRecord } from "@/lib/people/types";

const BLANK: PersonRecord = {
  slug: "",
  name: "",
  role: "",
  groups: ["team"],
  status: "published",
  order: null,
  photo: null,
  bio: [],
  legacyPaths: [],
};

function slugify(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export default function PeopleAdmin({ people, groups }: { people: PersonRecord[]; groups: Group[] }) {
  const [filter, setFilter] = useState<GroupId | "all">("all");
  const [draft, setDraft] = useState<PersonRecord | null>(null);
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState("");

  const shown = useMemo(
    () => people.filter((p) => filter === "all" || p.groups.includes(filter)),
    [people, filter],
  );

  // A full reload after every write, because the page it edits is rendered from the
  // files it just changed. Reconciling a local copy would only be a second source of
  // truth for the thing this whole registry exists to have one of.
  const reload = () => window.location.reload();

  async function save() {
    if (!draft) return;
    const slug = draft.slug || slugify(draft.name);
    if (!slug) return setNote("A name is required.");
    setBusy(true);
    const res = await fetch(`/api/admin/people/${slug}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ...draft, slug }),
    });
    setBusy(false);
    if (!res.ok) return setNote((await res.json()).error ?? "Save failed.");
    reload();
  }

  async function remove() {
    if (!draft?.slug) return;
    setBusy(true);
    const res = await fetch(`/api/admin/people/${draft.slug}`, { method: "DELETE" });
    setBusy(false);
    if (!res.ok) return setNote((await res.json()).error ?? "Delete failed.");
    reload();
  }

  async function upload(file: File) {
    if (!draft) return;
    const slug = draft.slug || slugify(draft.name);
    if (!slug) return setNote("Give the person a name first, so the photo can be named.");
    setBusy(true);
    const body = new FormData();
    body.append("photo", file);
    const res = await fetch(`/api/admin/people/${slug}/photo`, { method: "POST", body });
    setBusy(false);
    const json = await res.json();
    if (!res.ok) return setNote(json.error ?? "Upload failed.");
    setDraft({ ...draft, slug, photo: `${json.photo}?t=${Date.now()}` });
    setNote("Photo normalised. Save to keep it on the record.");
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <p className="font-heading text-[11px] font-bold uppercase tracking-[0.18em] text-ink-muted">
        Development only
      </p>
      <h1 className="mt-2 font-heading text-[34px] font-semibold leading-[1.1] tracking-[-0.02em] text-ink">
        People
      </h1>
      <p className="mt-3 max-w-2xl text-[15px] leading-[1.6] text-ink-muted">
        Edits write to <code>content/people/</code>. Publishing is a commit and a deploy.
      </p>

      <div className="mt-8 grid gap-10 md:grid-cols-[300px_1fr]">
        <div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as GroupId | "all")}
            className="w-full border border-hairline bg-white px-3 py-2 text-[15px] text-ink"
          >
            <option value="all">All groups ({people.length})</option>
            {groups.map((g) => (
              <option key={g.id} value={g.id}>
                {g.title} ({people.filter((p) => p.groups.includes(g.id)).length})
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={() => {
              setDraft({ ...BLANK, groups: [filter === "all" ? "team" : filter] });
              setNote("");
            }}
            className="mt-3 w-full bg-action px-4 py-2 font-heading text-[14px] font-semibold text-white"
          >
            Add a person
          </button>

          <ul className="m-0 mt-5 max-h-[70vh] list-none overflow-y-auto p-0">
            {shown.map((p) => (
              <li key={p.slug}>
                <button
                  type="button"
                  onClick={() => {
                    setDraft(p);
                    setNote("");
                  }}
                  className={`flex w-full items-center gap-3 border-b border-hairline px-2 py-2 text-left ${
                    draft?.slug === p.slug ? "bg-surface-tint" : ""
                  }`}
                >
                  <span className="block h-9 w-9 shrink-0 bg-surface-tint">
                    {p.photo && (
                      <Image src={p.photo} alt="" width={36} height={36} className="h-9 w-9 object-cover" />
                    )}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-[14px] font-semibold text-ink">{p.name}</span>
                    <span className="block truncate text-[12px] text-ink-muted">
                      {p.status === "hidden" ? "Hidden" : p.groups.join(", ")}
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {draft ? (
          <Editor
            draft={draft}
            groups={groups}
            busy={busy}
            note={note}
            onChange={setDraft}
            onUpload={upload}
            onSave={save}
            onDelete={remove}
            onCancel={() => setDraft(null)}
          />
        ) : (
          <p className="text-[15px] text-ink-muted">Pick someone from the list, or add a person.</p>
        )}
      </div>
    </div>
  );
}

const field = "w-full border border-hairline bg-white px-3 py-2 text-[15px] text-ink";
const label = "block font-heading text-[11px] font-bold uppercase tracking-[0.14em] text-ink-muted";

function Editor({
  draft,
  groups,
  busy,
  note,
  onChange,
  onUpload,
  onSave,
  onDelete,
  onCancel,
}: {
  draft: PersonRecord;
  groups: Group[];
  busy: boolean;
  note: string;
  onChange: (p: PersonRecord) => void;
  onUpload: (f: File) => void;
  onSave: () => void;
  onDelete: () => void;
  onCancel: () => void;
}) {
  const set = <K extends keyof PersonRecord>(k: K, v: PersonRecord[K]) => onChange({ ...draft, [k]: v });

  return (
    <div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="name">
            Name
          </label>
          <input id="name" className={`${field} mt-2`} value={draft.name} onChange={(e) => set("name", e.target.value)} />
        </div>
        <div>
          <label className={label} htmlFor="role">
            Role
          </label>
          <input id="role" className={`${field} mt-2`} value={draft.role} onChange={(e) => set("role", e.target.value)} />
        </div>
      </div>

      <fieldset className="mt-6 border-0 p-0">
        <legend className={label}>Groups</legend>
        <p className="mt-1 text-[13px] text-ink-muted">
          The first one owns the URL. Someone on two boards still has one page.
        </p>
        <div className="mt-2 flex flex-wrap gap-x-5 gap-y-2">
          {groups.map((g) => (
            <label key={g.id} className="flex items-center gap-2 text-[14px] text-ink">
              <input
                type="checkbox"
                checked={draft.groups.includes(g.id)}
                onChange={(e) =>
                  set(
                    "groups",
                    e.target.checked
                      ? [...draft.groups, g.id]
                      : draft.groups.filter((x) => x !== g.id),
                  )
                }
              />
              {g.title}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="status">
            Status
          </label>
          <select
            id="status"
            className={`${field} mt-2`}
            value={draft.status}
            onChange={(e) => set("status", e.target.value as PersonRecord["status"])}
          >
            <option value="published">Published</option>
            <option value="hidden">Hidden, keeps the record</option>
          </select>
        </div>
        <div>
          <label className={label} htmlFor="order">
            Position
          </label>
          <input
            id="order"
            className={`${field} mt-2`}
            type="number"
            placeholder="blank sorts by surname"
            value={draft.order ?? ""}
            onChange={(e) => set("order", e.target.value === "" ? null : Number(e.target.value))}
          />
        </div>
      </div>

      <div className="mt-6">
        <span className={label}>Photo</span>
        <div className="mt-2 flex items-start gap-5">
          <span className="block h-28 w-28 shrink-0 bg-surface-tint">
            {draft.photo && (
              <Image src={draft.photo} alt="" width={112} height={112} className="h-28 w-28 object-cover" unoptimized />
            )}
          </span>
          <div>
            <input
              type="file"
              accept="image/*"
              className="text-[14px] text-ink-muted"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) onUpload(f);
              }}
            />
            <p className="mt-2 max-w-sm text-[13px] leading-[1.5] text-ink-muted">
              Any size or shape. It is rotated upright, cropped square on the face, and written as
              WebP named after the slug.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <label className={label} htmlFor="bio">
          Biography
        </label>
        <p className="mt-1 text-[13px] text-ink-muted">
          One paragraph per line. Empty means a card with no page.
        </p>
        <textarea
          id="bio"
          rows={10}
          className={`${field} mt-2`}
          value={draft.bio.map((b) => b.text).join("\n\n")}
          onChange={(e) =>
            set(
              "bio",
              e.target.value
                .split(/\n\s*\n|\n/)
                .map((t) => t.trim())
                .filter(Boolean)
                .map((text) => ({ kind: "para" as const, text })),
            )
          }
        />
      </div>

      <div className="mt-6">
        <label className={label} htmlFor="legacy">
          Legacy URLs
        </label>
        <p className="mt-1 text-[13px] text-ink-muted">
          One per line. Each redirects permanently to this person. Next reads the redirect
          table once at startup, so a new one needs the dev server restarted.
        </p>
        <textarea
          id="legacy"
          rows={2}
          className={`${field} mt-2`}
          value={draft.legacyPaths.join("\n")}
          onChange={(e) =>
            set("legacyPaths", e.target.value.split("\n").map((s) => s.trim()).filter(Boolean))
          }
        />
      </div>

      {note && <p className="mt-5 text-[14px] text-action-deep">{note}</p>}

      <div className="mt-7 flex flex-wrap items-center gap-4">
        <button
          type="button"
          disabled={busy}
          onClick={onSave}
          className="bg-action px-5 py-2 font-heading text-[14px] font-semibold text-white disabled:opacity-50"
        >
          {busy ? "Working" : "Save"}
        </button>
        <button type="button" onClick={onCancel} className="text-[14px] text-ink-muted underline">
          Cancel
        </button>
        {draft.slug && (
          <button type="button" disabled={busy} onClick={onDelete} className="ml-auto text-[14px] text-action-deep underline">
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
