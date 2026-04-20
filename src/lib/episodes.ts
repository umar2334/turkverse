import episodesData from "../../data/episodes.json";

export type Episode = {
  seriesSlug: string;
  season: number;
  episode: number;
  title: string;
  titleUrdu: string;
  airDate: string;
  duration: string;
  summary: string;
  keyMoments: string[];
  analysis: string;
  spoilerFree: string;
  whereToWatch: string[];
  keywords: string[];
};

const allEpisodes = episodesData as Episode[];

export function getAllEpisodes(): Episode[] {
  return allEpisodes;
}

export function getEpisodesBySeries(seriesSlug: string): Episode[] {
  return allEpisodes
    .filter((e) => e.seriesSlug === seriesSlug)
    .sort((a, b) => a.season - b.season || a.episode - b.episode);
}

export function getEpisode(
  seriesSlug: string,
  season: number,
  episode: number
): Episode | undefined {
  return allEpisodes.find(
    (e) =>
      e.seriesSlug === seriesSlug && e.season === season && e.episode === episode
  );
}

export function getEpisodeSlug(season: number, episode: number): string {
  return `s${season}e${episode}`;
}

export function parseEpisodeSlug(
  slug: string
): { season: number; episode: number } | null {
  const match = slug.match(/^s(\d+)e(\d+)$/i);
  if (!match) return null;
  return { season: parseInt(match[1], 10), episode: parseInt(match[2], 10) };
}
