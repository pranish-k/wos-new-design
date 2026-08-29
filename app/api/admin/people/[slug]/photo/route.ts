import { NextResponse } from "next/server";
import { savePhoto } from "@/lib/people/store.write";

const DEV = process.env.NODE_ENV === "development";

// Generous rather than tight: the point of the pipeline is that whatever comes off a
// phone or out of a press kit is acceptable input, and it is normalised on the way in.
const MAX_BYTES = 25 * 1024 * 1024;

export async function POST(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  if (!DEV) return NextResponse.json({ error: "not found" }, { status: 404 });
  const { slug } = await params;
  try {
    const form = await request.formData();
    const file = form.get("photo");
    if (!(file instanceof File)) return NextResponse.json({ error: "no file" }, { status: 400 });
    if (file.size > MAX_BYTES) return NextResponse.json({ error: "file too large" }, { status: 400 });
    const photo = await savePhoto(slug, Buffer.from(await file.arrayBuffer()));
    return NextResponse.json({ photo });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 400 });
  }
}
