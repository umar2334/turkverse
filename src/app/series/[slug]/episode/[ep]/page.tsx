import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getSeriesBySlug } from "@/lib/series";
import {
  getEpisode,
  getEpisodesBySeries,
  getAllEpisodes,
  getEpisodeSlug,
  parseEpisodeSlug,
} from "@/lib/episodes";
import Breadcrumbs from "@/components/Breadcrumbs";
import AdSlot from "@/components/AdSlot";

const BASE_URL = "https://www.turkdrama.live";

type Props = { params: Promise<{ slug: string; ep: string }> };

export async function generateStaticParams() {
  return getAllEpisodes().map((e) => ({
    slug: e.seriesSlug,
    ep: getEpisodeSlug(e.season, e.episode),
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, ep } = await params;
  const parsed = parseEpisodeSlug(ep);
  const series = getSeriesBySlug(slug);
  if (!parsed || !series) return { title: "Episode Not Found" };
  const episode = getEpisode(slug, parsed.season, parsed.episode);
  if (!episode) return { title: "Episode Not Found" };

  const title = `${series.name} Season ${episode.season} Episode ${episode.episode} — Urdu Recap & Review (${episode.title})`;
  const description = `${series.name} S${episode.season}E${episode.episode} "${episode.title}" (${episode.titleUrdu}) — complete Urdu story recap, key moments, cast analysis, and where to watch legally. ${episode.spoilerFree}`;

  return {
    title,
    description,
    keywords: [
      ...episode.keywords,
      `${series.name} season ${episode.season} episode ${episode.episode} urdu`,
      `${series.name} s${episode.season}e${episode.episode} recap`,
      `${series.name} episode ${episode.episode} story urdu`,
      `${series.name} urdu`,
    ],
    alternates: {
      canonical: `${BASE_URL}/series/${series.slug}/episode/${ep}`,
    },
    openGraph: {
      title,
      description: episode.spoilerFree,
      images: [{ url: series.poster, width: 1200, height: 630, alt: series.name }],
      type: "article",
    },
  };
}

export default async function EpisodePage({ params }: Props) {
  const { slug, ep } = await params;
  const parsed = parseEpisodeSlug(ep);
  const series = getSeriesBySlug(slug);
  if (!parsed || !series) notFound();
  const episode = getEpisode(slug, parsed.season, parsed.episode);
  if (!episode) notFound();

  const allEpisodes = getEpisodesBySeries(slug);
  const currentIdx = allEpisodes.findIndex(
    (e) => e.season === episode.season && e.episode === episode.episode
  );
  const prev = currentIdx > 0 ? allEpisodes[currentIdx - 1] : null;
  const next = currentIdx < allEpisodes.length - 1 ? allEpisodes[currentIdx + 1] : null;

  const tvEpisodeSchema = {
    "@context": "https://schema.org",
    "@type": "TVEpisode",
    name: episode.title,
    alternateName: episode.titleUrdu,
    episodeNumber: episode.episode,
    seasonNumber: episode.season,
    datePublished: episode.airDate,
    description: episode.summary,
    partOfSeries: {
      "@type": "TVSeries",
      name: series.name,
      url: `${BASE_URL}/series/${series.slug}`,
    },
    partOfSeason: {
      "@type": "TVSeason",
      seasonNumber: episode.season,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(tvEpisodeSchema) }}
      />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: "Series", href: "/series" },
            { name: series.name, href: `/series/${series.slug}` },
            { name: `S${episode.season}E${episode.episode}` },
          ]}
        />

        {/* Hero */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-amber-500 font-semibold mb-2">
            <Link href={`/series/${series.slug}`} className="hover:text-amber-400">
              {series.name}
            </Link>
            <span className="text-slate-600">·</span>
            <span>Season {episode.season}</span>
            <span className="text-slate-600">·</span>
            <span>Episode {episode.episode}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-white mb-2">
            {series.name} S{episode.season}E{episode.episode} — Urdu Recap: {episode.title}
          </h1>
          <p className="text-amber-400 text-lg italic mb-3">{episode.titleUrdu}</p>
          <div className="flex flex-wrap gap-3 text-sm text-slate-400">
            <span>📅 Aired {episode.airDate}</span>
            <span>⏱ {episode.duration}</span>
          </div>
        </div>

        <div className="relative aspect-video rounded-xl overflow-hidden mb-8">
          <Image
            src={series.poster}
            alt={`${series.name} S${episode.season}E${episode.episode}`}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
        </div>

        {/* Spoiler-free summary */}
        <section className="mb-8 bg-amber-500/10 border border-amber-500/30 rounded-xl p-5">
          <h2 className="text-amber-400 font-bold text-sm uppercase tracking-wider mb-2">
            Spoiler-Free Overview
          </h2>
          <p className="text-slate-200 leading-relaxed">{episode.spoilerFree}</p>
        </section>

        {/* Full summary */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-1 h-6 bg-amber-500 rounded-full" />
            <h2 className="text-2xl font-bold text-white">
              Full Urdu Recap — S{episode.season}E{episode.episode} Story Summary
            </h2>
          </div>
          <p className="text-slate-300 leading-relaxed text-lg">{episode.summary}</p>
        </section>

        <AdSlot slot="4444444444" format="horizontal" className="h-24 mb-10" />

        {/* Key moments */}
        <section className="mb-10 bg-slate-800 border border-slate-700 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-1 h-6 bg-green-500 rounded-full" />
            <h2 className="text-xl font-bold text-white">Key Moments & Highlights</h2>
          </div>
          <ul className="space-y-3">
            {episode.keyMoments.map((m, i) => (
              <li key={i} className="flex items-start gap-3 text-slate-200">
                <span className="bg-amber-500 text-slate-900 text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <span className="leading-relaxed">{m}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Analysis */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-1 h-6 bg-blue-500 rounded-full" />
            <h2 className="text-2xl font-bold text-white">Episode Analysis & Review</h2>
          </div>
          <p className="text-slate-300 leading-relaxed">{episode.analysis}</p>
        </section>

        {/* Where to watch */}
        <section className="mb-10 bg-slate-800 border border-slate-700 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-1 h-6 bg-green-500 rounded-full" />
            <h2 className="text-xl font-bold text-white">
              Where to Watch {series.name} Episode {episode.episode} Legally
            </h2>
          </div>
          <ul className="space-y-2">
            {episode.whereToWatch.map((w, i) => (
              <li key={i} className="flex items-start gap-2 text-slate-300">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>{w}</span>
              </li>
            ))}
          </ul>
          <p className="text-slate-500 text-xs mt-4">
            TurkVerse does not host or stream videos. Platforms listed are third-party legal services.
          </p>
        </section>

        {/* Prev/Next */}
        <nav className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          {prev ? (
            <Link
              href={`/series/${series.slug}/episode/${getEpisodeSlug(prev.season, prev.episode)}`}
              className="bg-slate-800 border border-slate-700 hover:border-amber-500 rounded-xl p-4 transition-colors"
            >
              <p className="text-slate-500 text-xs uppercase tracking-wider mb-1">← Previous Episode</p>
              <p className="text-white font-semibold">
                S{prev.season}E{prev.episode}: {prev.title}
              </p>
            </Link>
          ) : (
            <div />
          )}
          {next ? (
            <Link
              href={`/series/${series.slug}/episode/${getEpisodeSlug(next.season, next.episode)}`}
              className="bg-slate-800 border border-slate-700 hover:border-amber-500 rounded-xl p-4 transition-colors sm:text-right"
            >
              <p className="text-slate-500 text-xs uppercase tracking-wider mb-1">Next Episode →</p>
              <p className="text-white font-semibold">
                S{next.season}E{next.episode}: {next.title}
              </p>
            </Link>
          ) : (
            <div />
          )}
        </nav>

        {/* All episodes list */}
        {allEpisodes.length > 1 && (
          <section className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-1 h-6 bg-amber-500 rounded-full" />
              <h2 className="text-xl font-bold text-white">
                All {series.name} Episode Recaps
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {allEpisodes.map((e) => {
                const active = e.season === episode.season && e.episode === episode.episode;
                return (
                  <Link
                    key={`${e.season}-${e.episode}`}
                    href={`/series/${series.slug}/episode/${getEpisodeSlug(e.season, e.episode)}`}
                    className={`rounded-lg p-3 border transition-colors ${
                      active
                        ? "bg-amber-500/20 border-amber-500 text-white"
                        : "bg-slate-800 border-slate-700 hover:border-amber-500 text-slate-300"
                    }`}
                  >
                    <p className="text-xs text-slate-500 mb-0.5">
                      Season {e.season} · Episode {e.episode}
                    </p>
                    <p className="text-sm font-semibold">{e.title}</p>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        <div className="text-center bg-gradient-to-br from-amber-500/20 to-amber-600/10 border border-amber-500/30 rounded-xl p-6">
          <p className="text-slate-300 text-sm mb-3">
            Want more {series.name} content?
          </p>
          <Link
            href={`/series/${series.slug}`}
            className="inline-block bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold text-sm px-6 py-2 rounded-lg transition-colors"
          >
            Back to {series.name} Main Page
          </Link>
        </div>
      </div>
    </>
  );
}
