"use server";

import fs from "fs";
import path from "path";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getPosts, savePosts } from "@/lib/posts";
import type { Post } from "@/lib/posts";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "turkverse2026";

async function resolveImage(formData: FormData): Promise<string> {
  const file = formData.get("imageFile") as File | null;

  if (file && file.size > 0) {
    const buffer = Buffer.from(await file.arrayBuffer());
    const ext = (file.name.split(".").pop() ?? "jpg").toLowerCase();
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    fs.mkdirSync(uploadDir, { recursive: true });
    fs.writeFileSync(path.join(uploadDir, filename), buffer);
    return `/uploads/${filename}`;
  }

  return (formData.get("imageUrl") as string ?? "").trim();
}

async function buildPost(formData: FormData): Promise<Post> {
  const faqRaw = (formData.get("faqs") as string ?? "").trim();
  const faqs = faqRaw
    .split("\n")
    .map((line) => line.split(":::"))
    .filter((parts) => parts.length === 2 && parts[0].trim())
    .map(([q, a]) => ({ q: q.trim(), a: a.trim() }));

  return {
    slug: (formData.get("slug") as string).trim(),
    title: (formData.get("title") as string).trim(),
    excerpt: (formData.get("excerpt") as string).trim(),
    content: (formData.get("content") as string).trim(),
    category: (formData.get("category") as string).trim(),
    image: await resolveImage(formData),
    author: (formData.get("author") as string).trim() || "TurkVerse Team",
    date: (formData.get("date") as string).trim(),
    readTime: (formData.get("readTime") as string).trim() || "5 min read",
    tags: (formData.get("tags") as string)
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean),
    faqs: faqs.length > 0 ? faqs : undefined,
  };
}

export async function loginAction(formData: FormData) {
  const password = formData.get("password") as string;
  if (password === ADMIN_PASSWORD) {
    const cookieStore = await cookies();
    cookieStore.set("admin_session", "tv_admin_ok", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
      sameSite: "lax",
    });
    redirect("/admin");
  }
  redirect("/admin/login?error=1");
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");
  redirect("/admin/login");
}

export async function createPostAction(formData: FormData) {
  const post = await buildPost(formData);
  const all = getPosts();
  if (all.some((p) => p.slug === post.slug)) {
    redirect("/admin/new?error=slug");
  }
  all.unshift(post);
  savePosts(all);
  revalidatePath("/");
  revalidatePath("/blog/[slug]", "page");
  revalidatePath("/category/[category]", "page");
  redirect("/admin");
}

export async function updatePostAction(originalSlug: string, formData: FormData) {
  const updated = await buildPost(formData);
  // If no new image provided, keep the old one
  if (!updated.image) {
    const existing = getPosts().find((p) => p.slug === originalSlug);
    if (existing) updated.image = existing.image;
  }
  const all = getPosts();
  const idx = all.findIndex((p) => p.slug === originalSlug);
  if (idx !== -1) {
    all[idx] = updated;
    savePosts(all);
  }
  revalidatePath("/");
  revalidatePath("/blog/[slug]", "page");
  revalidatePath("/category/[category]", "page");
  redirect("/admin");
}

export async function deletePostAction(formData: FormData) {
  const slug = formData.get("slug") as string;
  const all = getPosts().filter((p) => p.slug !== slug);
  savePosts(all);
  revalidatePath("/");
  revalidatePath("/blog/[slug]", "page");
  revalidatePath("/category/[category]", "page");
  redirect("/admin");
}
