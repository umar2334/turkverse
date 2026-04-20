import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getAllSeries, getSeriesBySlug } from "@/lib/series";
import { getEpisodesBySeries, getEpisodeSlug } from "@/lib/episodes";
import { getPosts } from "@/lib/posts";
import PostCard from "@/components/PostCard";
import Breadcrumbs from "@/components/Breadcrumbs";
import FaqSchema from "@/components/FaqSchema";
import AdSlot from "@/components/AdSlot";
import WatchlistButton from "@/components/WatchlistButton";

const BASE_URL = "https://www.turkdrama.live";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllSeries().map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const series = getSeriesBySlug(slug);
  if (!series) return { title: "Series Not Found" };
  const urduKeywords = [
    `${series.name} urdu`,
    `${series.name} urdu recap`,
    `${series.name} episode recap urdu`,
    `${series.name} story in urdu`,
    `${series.name} cast`,
    `${series.name} cast biography`,
    `${series.name} season 1`,
    `${series.name} where to watch`,
    `${series.name} urdu subtitles review`,
    `${series.name} ${series.firstAired}`,
    `watch ${series.name} legally in pakistan`,
  ];
  return {
    title: `${series.name} — Urdu Recap, Episode Guide, Cast Biography & Where to Watch`,
    description: `${series.name} (${series.firstAired}) in Urdu — ${series.tagline}. Complete story summary, episode-wise recaps, cast biographies, ${series.seasons} seasons on ${series.network}, and legal streaming options in Pakistan. ${series.description.slice(0, 100)}`,
    keywords: [...series.tags, ...urduKeywords],
    alternates: { canonical: `${BASE_URL}/series/${series.slug}` },
    openGraph: {
      title: `${series.name} — Complete Urdu Recap & Episode Guide`,
      description: `${series.tagline} — Urdu recap, cast bios and where to watch legally.`,
      images: [{ url: series.poster, width: 1200, height: 630, alt: series.name }],
      type: "article",
    },
  };
}

export default async function SeriesDetailPage({ params }: Props) {
  const { slug } = await params;
  const series = getSeriesBySlug(slug);
  if (!series) notFound();

  const allPosts = await getPosts();
  const lowerTags = series.tags.map((t) => t.toLowerCase());
  const relatedPosts = allPosts
    .filter((p) => {
      const haystack = [p.title, p.excerpt, ...p.tags].join(" ").toLowerCase();
      return lowerTags.some((t) => haystack.includes(t));
    })
    .slice(0, 6);

  const episodes = getEpisodesBySeries(slug);

  const tvSchema = {
    "@context": "https://schema.org",
    "@type": "TVSeries",
    name: series.name,
    description: series.description,
    image: series.poster,
    numberOfSeasons: series.seasons,
    numberOfEpisodes: series.episodes,
    genre: series.genre,
    inLanguage: "tr",
    datePublished: series.firstAired,
    countryOfOrigin: { "@type": "Country", name: "Turkey" },
    productionCompany: { "@type": "Organization", name: series.network },
    actor: series.leadCast.map((c) => ({
      "@type": "Person",
      name: c.name,
      characterName: c.role,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(tvSchema) }} />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: "Series", href: "/series" },
            { name: series.name },
          ]}
        />

        {/* Hero */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="relative aspect-[3/4] rounded-xl overflow-hidden">
            <Image src={series.poster} alt={series.name} fill className="object-cover" priority />
          </div>
          <div className="md:col-span-2">
            <span className="inline-block bg-amber-500 text-slate-900 text-xs font-bold px-3 py-1 rounded-full mb-3">
              {series.status} · {series.firstAired}
            </span>
            <h1 className="text-3xl md:text-4xl font-black text-white mb-2">{series.name}</h1>
            <p className="text-amber-400 text-lg italic mb-5">{series.tagline}</p>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <InfoRow label="Network" value={series.network} />
              <InfoRow label="Genre" value={series.genre} />
              <InfoRow label="Seasons" value={String(series.seasons)} />
              <InfoRow label="Episodes" value={series.episodes} />
              <InfoRow label="Language" value={series.language} />
              <InfoRow label="First Aired" value={series.firstAired} />
            </div>

            <p className="text-slate-300 leading-relaxed mb-5">{series.description}</p>

            <WatchlistButton slug={series.slug} name={series.name} />
          </div>
        </div>

        <AdSlot slot="3333333333" format="horizontal" className="h-24 mb-10" />

        {/* Cast */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-5">
            <span className="w-1 h-6 bg-amber-500 rounded-full" />
            <h2 className="text-xl font-bold text-white">Main Cast</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {series.leadCast.map((c) => (
              <div key={c.name} className="bg-slate-800 border border-slate-700 rounded-xl p-4">
                <p className="text-white font-semibold text-sm">{c.name}</p>
                <p className="text-slate-400 text-xs mt-1">as {c.role}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Where to watch */}
        <section className="mb-10 bg-slate-800 border border-slate-700 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-1 h-6 bg-green-500 rounded-full" />
            <h2 className="text-xl font-bold text-white">Where to Watch {series.name}</h2>
          </div>
          <ul className="space-y-2">
            {series.whereToWatch.map((platform, i) => (
              <li key={i} className="flex items-start gap-2 text-slate-300">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>{platform}</span>
              </li>
            ))}
          </ul>
          <p className="text-slate-500 text-xs mt-4">
            TurkVerse does not host or stream videos. Links refer to third-party platforms.
          </p>
        </section>

        {/* Episode Recaps */}
        {episodes.length > 0 && (
          <section className="mb-10">
            <div className="flex items-center gap-3 mb-5">
              <span className="w-1 h-6 bg-amber-500 rounded-full" />
              <h2 className="text-xl font-bold text-white">
                {series.name} Episode Recaps in Urdu
              </h2>
            </div>
            <p className="text-slate-400 text-sm mb-5">
              Complete episode-wise Urdu story summaries, key moments, and analysis. {episodes.length} episode recap{episodes.length === 1 ? "" : "s"} available.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {episodes.map((e) => (
                <Link
                  key={`${e.season}-${e.episode}`}
                  href={`/series/${series.slug}/episode/${getEpisodeSlug(e.season, e.episode)}`}
                  className="group bg-slate-800 border border-slate-700 hover:border-amber-500 rounded-xl p-4 transition-colors"
                >
                  <div className="flex items-center gap-2 text-xs mb-2">
                    <span className="bg-amber-500 text-slate-900 font-bold px-2 py-0.5 rounded">
                      S{e.season}E{e.episode}
                    </span>
                    <span className="text-slate-500">{e.airDate}</span>
                  </div>
                  <h3 className="text-white font-semibold group-hover:text-amber-400 transition-colors mb-1">
                    {e.title}
                  </h3>
                  <p className="text-amber-400 text-xs italic mb-2">{e.titleUrdu}</p>
                  <p className="text-slate-400 text-xs line-clamp-2">{e.spoilerFree}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* FAQs */}
        {series.faqs.length > 0 && <FaqSchema faqs={series.faqs} />}

        {/* Related posts */}
        {relatedPosts.length > 0 && (
          <section className="mb-10">
            <div className="flex items-center gap-3 mb-5">
              <span className="w-1 h-6 bg-amber-500 rounded-full" />
              <h2 className="text-xl font-bold text-white">Latest {series.name} Articles</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {relatedPosts.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
          </section>
        )}

        {/* Other series CTA */}
        <div className="text-center bg-gradient-to-br from-amber-500/20 to-amber-600/10 border border-amber-500/30 rounded-xl p-8">
          <h3 className="text-white font-bold text-lg mb-2">Explore more Turkish dramas</h3>
          <p className="text-slate-400 text-sm mb-4">Find your next favorite series in our complete database.</p>
          <Link href="/series" className="inline-block bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold text-sm px-6 py-2 rounded-lg transition-colors">
            Browse All Series
          </Link>
        </div>
      </div>
    </>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2">
      <p className="text-slate-500 text-xs uppercase tracking-wider">{label}</p>
      <p className="text-slate-200 text-sm font-medium mt-0.5">{value}</p>
    </div>
  );
}
