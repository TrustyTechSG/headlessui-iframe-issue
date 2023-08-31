import { kv } from "@vercel/kv";
import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function GET(request) {
  const tag = request.nextUrl.searchParams.get("tag");
  const lastRevalidate = new Date().toISOString();

  await kv.hset(request.nextUrl.hostname, {
    lastRevalidate,
  });

  if (tag) {
    revalidateTag(tag);

    return NextResponse.json({ revalidated: true, revalidateTag: tag, lastRevalidate });
  } else {
    const path = "/[host]/[lang]";
    revalidatePath(path);

    return NextResponse.json({ revalidated: true, revalidatePath: path, lastRevalidate });
  }
}
