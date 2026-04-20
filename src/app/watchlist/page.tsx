import type { Metadata } from "next";
import { getAllSeries } from "@/lib/series";
import Breadcrumbs from "@/components/Breadcrumbs";
import WatchlistClient from "./WatchlistClient";

export const metadata: Metadata = {
  title: "My Watchlist",
  description: "Your saved Turkish dramas — keep track of series you want to watch or recommend to friends.",
  robots: { index: false, follow: true },
};

export default function WatchlistPage() {
  const series = getAllSeries();
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "My Watchlist" }]} />
      <h1 className="text-2xl md:text-3xl font-black text-white mb-2">My Watchlist</h1>
      <div className="w-16 h-1 bg-amber-500 rounded-full mb-6" />
      <WatchlistClient allSeries={series} />
    </div>
  );
}
