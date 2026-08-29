// Write endpoints for the people admin.
//
// Development only. This is a local convenience, not an authenticated API: with the
// guard removed and a writable filesystem it would be an unauthenticated write.
import { NextResponse } from "next/server";
import { deletePerson, savePerson } from "@/lib/people/store.write";
import type { PersonRecord } from "@/lib/people/types";

const DEV = process.env.NODE_ENV === "development";

type Params = { params: Promise<{ slug: string }> };

export async function PUT(request: Request, { params }: Params) {
  if (!DEV) return NextResponse.json({ error: "not found" }, { status: 404 });
  const { slug } = await params;
  try {
    const body = (await request.json()) as PersonRecord;
    savePerson({ ...body, slug });
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 400 });
  }
}

export async function DELETE(_request: Request, { params }: Params) {
  if (!DEV) return NextResponse.json({ error: "not found" }, { status: 404 });
  const { slug } = await params;
  try {
    deletePerson(slug);
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 400 });
  }
}
