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
  if (!redis) return getPostsFromFile();
  try {
    const posts = await redis.get<Post[]>("posts");
    if (posts && posts.length > 0) return posts;
    return getPostsFromFile();
  } catch {
    return getPostsFromFile();
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
