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

export function getPosts(): Post[] {
  try {
    const raw = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(raw) as Post[];
  } catch {
    return [];
  }
}

export function savePosts(posts: Post[]): void {
  fs.writeFileSync(DATA_FILE, JSON.stringify(posts, null, 2), "utf-8");
}

export function getPostBySlug(slug: string): Post | undefined {
  return getPosts().find((p) => p.slug === slug);
}

export function getPostsByCategory(category: string): Post[] {
  return getPosts().filter((p) => p.category === category);
}

export function getRecentPosts(count = 4): Post[] {
  return getPosts().slice(0, count);
}
