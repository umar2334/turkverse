"use client";
import { useSyncExternalStore } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Series } from "@/lib/series";
import {
  getWatchlist,
  getServerWatchlist,
  subscribeWatchlist,
} from "@/lib/watchlist";

export default function WatchlistClient({ allSeries }: { allSeries: Series[] }) {
  const slugs = useSyncExternalStore(subscribeWatchlist, getWatchlist, getServerWatchlist);
  const saved = allSeries.filter((s) => slugs.includes(s.slug));

  if (saved.length === 0) {
    return (
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-10 text-center">
        <p className="text-slate-300 text-lg mb-2">Your watchlist is empty</p>
        <p className="text-slate-500 text-sm mb-6">
          Browse our series database and click <strong>Save to Watchlist</strong> to keep track of dramas you want to watch.
        </p>
        <Link
          href="/series"
          className="inline-block bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold text-sm px-6 py-2 rounded-lg transition-colors"
        >
          Browse All Series
        </Link>
      </div>
    );
  }

  return (
    <>
      <p className="text-slate-400 text-sm mb-6">{saved.length} series saved · stored on this device only</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {saved.map((s) => (
          <Link
            key={s.slug}
            href={`/series/${s.slug}`}
            className="group bg-slate-800 border border-slate-700 hover:border-amber-500 rounded-xl overflow-hidden transition-colors"
          >
            <div className="relative h-40">
              <Image src={s.poster} alt={s.name} fill className="object-cover" />
            </div>
            <div className="p-4">
              <h2 className="text-white font-bold group-hover:text-amber-400 transition-colors">{s.name}</h2>
              <p className="text-slate-400 text-xs mt-1">{s.seasons} seasons · {s.network}</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
