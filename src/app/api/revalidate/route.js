import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function GET(request) {
  const tag = request.nextUrl.searchParams.get("tag");

  if (tag) {
    revalidateTag(tag);

    return NextResponse.json({ revalidated: true, revalidateTag: tag, now: new Date().toISOString() });
  } else {
    const path = "/[host]/[lang]";
    revalidatePath(path);

    return NextResponse.json({ revalidated: true, revalidatePath: path, now: new Date().toISOString() });
  }
}
