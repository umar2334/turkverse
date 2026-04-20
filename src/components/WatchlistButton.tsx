"use client";
import { useSyncExternalStore } from "react";
import {
  getWatchlist,
  getServerWatchlist,
  subscribeWatchlist,
  toggleWatchlist,
} from "@/lib/watchlist";

export default function WatchlistButton({ slug, name }: { slug: string; name: string }) {
  const list = useSyncExternalStore(subscribeWatchlist, getWatchlist, getServerWatchlist);
  const saved = list.includes(slug);

  return (
    <button
      onClick={() => toggleWatchlist(slug)}
      aria-label={saved ? `Remove ${name} from watchlist` : `Add ${name} to watchlist`}
      className={`inline-flex items-center gap-2 font-semibold text-sm px-4 py-2 rounded-lg transition-colors ${
        saved
          ? "bg-amber-500 hover:bg-amber-400 text-slate-900"
          : "bg-slate-700 hover:bg-slate-600 text-slate-200 border border-slate-600"
      }`}
    >
      <svg className="w-4 h-4" fill={saved ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
      </svg>
      <span>{saved ? "Saved" : "Save to Watchlist"}</span>
    </button>
  );
}
