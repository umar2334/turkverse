import { kv } from "@vercel/kv";
import fs from "fs";
import path from "path";

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  image: string;
  author: string;
  date: string;
  readTime: string;
  tags: string[];
  faqs?: { q: string; a: string }[];
};

export const categories = [
  { name: "Latest News", slug: "news", color: "bg-red-500" },
  { name: "Series Reviews", slug: "reviews", color: "bg-amber-500" },
  { name: "Cast Biographies", slug: "cast", color: "bg-blue-500" },
  { name: "Release Dates", slug: "release-dates", color: "bg-green-500" },
];

const DATA_FILE = path.join(process.cwd(), "data", "posts.json");

function getPostsFromFile(): Post[] {
  try {
    const raw = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(raw) as Post[];
  } catch {
    return [];
  }
}

export async function getPosts(): Promise<Post[]> {
  try {
    const posts = await kv.get<Post[]>("posts");
    if (posts && posts.length > 0) return posts;
    // Fallback to file (for migration / local dev)
    return getPostsFromFile();
  } catch {
    return getPostsFromFile();
  }
}

export async function savePosts(posts: Post[]): Promise<void> {
  await kv.set("posts", posts);
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  const posts = await getPosts();
  return posts.find((p) => p.slug === slug);
}

export async function getPostsByCategory(category: string): Promise<Post[]> {
  const posts = await getPosts();
  return posts.filter((p) => p.category === category);
}

export async function getRecentPosts(count = 4): Promise<Post[]> {
  const posts = await getPosts();
  return posts.slice(0, count);
}
