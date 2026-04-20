import type { Metadata } from "next";
import Link from "next/link";
import { getPosts } from "@/lib/posts";
import PostCard from "@/components/PostCard";
import Breadcrumbs from "@/components/Breadcrumbs";

type Props = { searchParams: Promise<{ q?: string }> };

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { q } = await searchParams;
  const query = q?.trim() ?? "";
  return {
    title: query ? `Search: ${query}` : "Search",
    description: query
      ? `Search results for "${query}" — Turkish drama reviews, news and cast bios.`
      : "Search Turkish drama reviews, news and cast biographies on TurkVerse.",
    robots: { index: false, follow: true },
  };
}

export const dynamic = "force-dynamic";

export default async function SearchPage({ searchParams }: Props) {
  const { q } = await searchParams;
  const query = q?.trim() ?? "";
  const allPosts = await getPosts();

  const words = query
    .toLowerCase()
    .split(/\s+/)
    .filter((w) => w.length > 0);

  const results = words.length
    ? allPosts.filter((p) => {
        const haystack = [p.title, p.excerpt, p.tags.join(" "), p.category]
          .join(" ")
          .toLowerCase();
        return words.every((w) => haystack.includes(w));
      })
    : [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Search" }]} />

      <h1 className="text-2xl md:text-3xl font-black text-white mb-2">
        {query ? `Search: "${query}"` : "Search Turkish Dramas"}
      </h1>
      <p className="text-slate-400 mb-6">
        {query
          ? `${results.length} result${results.length === 1 ? "" : "s"} found`
          : "Type a series name, actor or keyword in the search bar above."}
      </p>

      {query && results.length === 0 && (
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-8 text-center">
          <p className="text-slate-300 mb-3">No posts match that search.</p>
          <p className="text-slate-500 text-sm mb-5">Try a different keyword — e.g. <em>Kurulus Osman</em>, <em>Esra Bilgic</em>, <em>season</em>.</p>
          <Link href="/" className="inline-block bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold text-sm px-5 py-2 rounded-lg transition-colors">
            Back to Home
          </Link>
        </div>
      )}

      {results.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {results.map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </div>
      )}
    </div>
  );
}
