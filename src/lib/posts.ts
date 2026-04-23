import { Redis } from "@upstash/redis";
import fs from "fs";
import path from "path";

const REDIS_URL =
  process.env.STORAGE_KV_REST_API_URL ??
  process.env.KV_REST_API_URL ??
  process.env.UPSTASH_REDIS_REST_URL;

const REDIS_TOKEN =
  process.env.STORAGE_KV_REST_API_TOKEN ??
  process.env.KV_REST_API_TOKEN ??
  process.env.UPSTASH_REDIS_REST_TOKEN;

const redis =
  REDIS_URL && REDIS_TOKEN
    ? new Redis({ url: REDIS_URL, token: REDIS_TOKEN })
    : null;

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
  const filePosts = getPostsFromFile();
  if (!redis) return filePosts;
  try {
    const redisPosts = (await redis.get<Post[]>("posts")) ?? [];
    const seen = new Set(filePosts.map((p) => p.slug));
    const adminOnly = redisPosts.filter((p) => !seen.has(p.slug));
    const merged = [...filePosts, ...adminOnly];
    merged.sort((a, b) => {
      const da = Date.parse(a.date);
      const db = Date.parse(b.date);
      if (isNaN(da) && isNaN(db)) return 0;
      if (isNaN(da)) return 1;
      if (isNaN(db)) return -1;
      return db - da;
    });
    return merged;
  } catch {
    return filePosts;
  }
}

export async function savePosts(posts: Post[]): Promise<void> {
  if (!redis) return;
  await redis.set("posts", posts);
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
