import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getAllSeries } from "@/lib/series";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "All Turkish Dramas — Complete Series Database",
  description:
    "Browse every Turkish drama on TurkVerse — Kurulus Osman, Dirilis Ertugrul, Barbaros, Alparslan, Teskilat, Kardeslerim, Yali Capkini and more. Find cast, seasons, ratings and where to watch.",
  alternates: { canonical: "https://www.turkdrama.live/series" },
};

export default function SeriesListPage() {
  const series = getAllSeries();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "All Series" }]} />

      <h1 className="text-2xl md:text-4xl font-black text-white mb-2">Turkish Drama Series Database</h1>
      <div className="w-16 h-1 bg-amber-500 rounded-full mb-4" />
      <p className="text-slate-400 mb-8 max-w-3xl">
        Complete guide to the biggest Turkish dramas — cast, episodes, seasons, and where to watch each series with Urdu subtitles in Pakistan.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {series.map((s) => (
          <Link
            key={s.slug}
            href={`/series/${s.slug}`}
            className="group bg-slate-800 border border-slate-700 hover:border-amber-500 rounded-xl overflow-hidden transition-colors"
          >
            <div className="relative h-48">
              <Image src={s.poster} alt={s.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent" />
              <span className="absolute top-3 right-3 bg-amber-500 text-slate-900 text-xs font-bold px-2 py-1 rounded-full">
                {s.status}
              </span>
            </div>
            <div className="p-5">
              <h2 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors mb-1">
                {s.name}
              </h2>
              <p className="text-slate-400 text-sm mb-3 italic">{s.tagline}</p>
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="bg-slate-700 text-slate-300 px-2 py-1 rounded">{s.seasons} Seasons</span>
                <span className="bg-slate-700 text-slate-300 px-2 py-1 rounded">{s.network}</span>
                <span className="bg-slate-700 text-slate-300 px-2 py-1 rounded">{s.firstAired}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
