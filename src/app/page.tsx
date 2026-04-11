import type { Metadata } from "next";
import { getPosts, categories } from "@/lib/posts";
import PostCard from "@/components/PostCard";
import Sidebar from "@/components/Sidebar";
import Link from "next/link";

export const metadata: Metadata = {
  title: "TurkVerse — Turkish Series News, Reviews & Cast Biographies",
  description:
    "Latest Turkish drama news, episode reviews, cast biographies, and release dates. Your #1 source for Kurulus Osman, Dirilis Ertugrul, and all popular Turkish series.",
};

export default function HomePage() {
  const posts = getPosts();
  const [featured] = posts;
  const sidePostsTop = posts.slice(1, 4);
  const gridPosts = posts.slice(0, 6);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">

      {/* Hero — Featured + Side cards */}
      <section className="mb-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <PostCard post={featured} variant="featured" />
          </div>
          <div className="flex flex-col gap-4">
            {sidePostsTop.map((p) => (
              <PostCard key={p.slug} post={p} variant="featured" />
            ))}
          </div>
        </div>
      </section>

      {/* Category Pills */}
      <section className="mb-8 flex flex-wrap gap-3">
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/category/${cat.slug}`}
            className={`${cat.color} text-white text-sm font-bold px-4 py-2 rounded-full hover:opacity-80 transition-opacity`}
          >
            {cat.name}
          </Link>
        ))}
      </section>

      {/* AdSense Banner slot */}
      <div className="mb-8 bg-slate-800 border border-dashed border-slate-600 rounded-xl h-24 flex items-center justify-center">
        <p className="text-slate-500 text-sm">Advertisement — 728×90 Leaderboard</p>
      </div>

      {/* Main content + Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Blog grid */}
        <div className="lg:col-span-2 space-y-10">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="w-1 h-6 bg-amber-500 rounded-full" />
              <h2 className="text-xl font-bold text-white">Latest Articles</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {gridPosts.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
          </div>

          {/* Second AdSense slot */}
          <div className="bg-slate-800 border border-dashed border-slate-600 rounded-xl h-24 flex items-center justify-center">
            <p className="text-slate-500 text-sm">Advertisement — 728×90</p>
          </div>

          {/* Series Reviews section */}
          <div>
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <span className="w-1 h-6 bg-amber-500 rounded-full" />
                <h2 className="text-xl font-bold text-white">Series Reviews</h2>
              </div>
              <Link href="/category/reviews" className="text-amber-500 hover:text-amber-400 text-sm font-semibold">
                View All →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {posts.filter((p) => p.category === "reviews").map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
          </div>

          {/* Cast Bio section */}
          <div>
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <span className="w-1 h-6 bg-blue-500 rounded-full" />
                <h2 className="text-xl font-bold text-white">Cast Biographies</h2>
              </div>
              <Link href="/category/cast" className="text-amber-500 hover:text-amber-400 text-sm font-semibold">
                View All →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {posts.filter((p) => p.category === "cast").map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
