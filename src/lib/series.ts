import seriesData from "../../data/series.json";

export type SeriesCastMember = {
  name: string;
  role: string;
};

export type SeriesFaq = {
  q: string;
  a: string;
};

export type Series = {
  slug: string;
  name: string;
  tagline: string;
  poster: string;
  description: string;
  seasons: number;
  firstAired: string;
  status: string;
  network: string;
  genre: string;
  language: string;
  episodes: string;
  leadCast: SeriesCastMember[];
  whereToWatch: string[];
  tags: string[];
  faqs: SeriesFaq[];
};

const allSeries = seriesData as Series[];

export function getAllSeries(): Series[] {
  return allSeries;
}

export function getSeriesBySlug(slug: string): Series | undefined {
  return allSeries.find((s) => s.slug === slug);
}
