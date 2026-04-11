import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostsByCategory, categories } from "@/lib/posts";
import PostCard from "@/components/PostCard";
import Sidebar from "@/components/Sidebar";
import Link from "next/link";

type Props = { params: Promise<{ category: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const cat = categories.find((c) => c.slug === category);
  if (!cat) return { title: "Category Not Found" };
  return {
    title: `${cat.name} — Turkish Series`,
    description: `Browse all ${cat.name} articles about Turkish dramas on TurkVerse.`,
  };
}

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

const categoryColorBorder: Record<string, string> = {
  news: "border-red-500",
  reviews: "border-amber-500",
  cast: "border-blue-500",
  "release-dates": "border-green-500",
};

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const cat = categories.find((c) => c.slug === category);
  if (!cat) notFound();

  const catPosts = getPostsByCategory(category);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className={`mb-8 pb-6 border-b-4 ${categoryColorBorder[category] ?? "border-slate-600"}`}>
        <nav className="text-sm text-slate-400 mb-3 flex items-center gap-2">
          <Link href="/" className="hover:text-amber-400">Home</Link>
          <span>/</span>
          <span className="text-slate-300">{cat.name}</span>
        </nav>
        <h1 className="text-3xl font-black text-white">{cat.name}</h1>
        <p className="text-slate-400 mt-1">
          {catPosts.length} article{catPosts.length !== 1 ? "s" : ""} in this category
        </p>
      </div>

      {/* Other categories */}
      <div className="flex flex-wrap gap-3 mb-8">
        {categories
          .filter((c) => c.slug !== category)
          .map((c) => (
            <Link
              key={c.slug}
              href={`/category/${c.slug}`}
              className={`${c.color} text-white text-sm font-bold px-4 py-2 rounded-full hover:opacity-80 transition-opacity`}
            >
              {c.name}
            </Link>
          ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Posts */}
        <div className="lg:col-span-2">
          {catPosts.length === 0 ? (
            <div className="bg-slate-800 rounded-xl p-12 text-center border border-slate-700">
              <p className="text-slate-400 text-lg">No articles yet in this category.</p>
              <p className="text-slate-500 text-sm mt-2">Check back soon — new content is added daily!</p>
              <Link href="/" className="inline-block mt-4 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold px-5 py-2 rounded-lg transition-colors">
                Back to Home
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {catPosts.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
