import { NextRequest, NextResponse } from "next/server";
import { savePosts } from "@/lib/posts";
import posts from "../../../../data/posts.json";

export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");
  if (secret !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  await savePosts(posts as Parameters<typeof savePosts>[0]);
  return NextResponse.json({ ok: true, count: posts.length });
}
