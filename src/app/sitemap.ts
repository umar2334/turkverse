import { MetadataRoute } from "next";
import { getPosts } from "@/lib/posts";
import { getAllSeries } from "@/lib/series";
import { getAllEpisodes, getEpisodeSlug } from "@/lib/episodes";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts();
  const series = getAllSeries();
  const episodes = getAllEpisodes();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: "https://www.turkdrama.live",
      lastModified: new Date(),
      priority: 1,
      changeFrequency: "daily" as const,
    },
    {
      url: "https://www.turkdrama.live/category/news",
      lastModified: new Date(),
      priority: 0.8,
      changeFrequency: "daily" as const,
    },
    {
      url: "https://www.turkdrama.live/category/reviews",
      lastModified: new Date(),
      priority: 0.8,
      changeFrequency: "weekly" as const,
    },
    {
      url: "https://www.turkdrama.live/category/cast",
      lastModified: new Date(),
      priority: 0.8,
      changeFrequency: "weekly" as const,
    },
    {
      url: "https://www.turkdrama.live/category/release-dates",
      lastModified: new Date(),
      priority: 0.8,
      changeFrequency: "weekly" as const,
    },
    {
      url: "https://www.turkdrama.live/about",
      lastModified: new Date(),
      priority: 0.5,
      changeFrequency: "monthly" as const,
    },
    {
      url: "https://www.turkdrama.live/contact",
      lastModified: new Date(),
      priority: 0.5,
      changeFrequency: "monthly" as const,
    },
    {
      url: "https://www.turkdrama.live/privacy-policy",
      lastModified: new Date(),
      priority: 0.3,
      changeFrequency: "yearly" as const,
    },
    {
      url: "https://www.turkdrama.live/dmca",
      lastModified: new Date(),
      priority: 0.3,
      changeFrequency: "yearly" as const,
    },
    {
      url: "https://www.turkdrama.live/series",
      lastModified: new Date(),
      priority: 0.9,
      changeFrequency: "weekly" as const,
    },
  ];

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `https://www.turkdrama.live/blog/${post.slug}`,
    lastModified: new Date(post.date),
    priority: 0.7,
    changeFrequency: "monthly" as const,
  }));

  const seriesRoutes: MetadataRoute.Sitemap = series.map((s) => ({
    url: `https://www.turkdrama.live/series/${s.slug}`,
    lastModified: new Date(),
    priority: 0.85,
    changeFrequency: "weekly" as const,
  }));

  const episodeRoutes: MetadataRoute.Sitemap = episodes.map((e) => ({
    url: `https://www.turkdrama.live/series/${e.seriesSlug}/episode/${getEpisodeSlug(e.season, e.episode)}`,
    lastModified: new Date(e.airDate),
    priority: 0.75,
    changeFrequency: "monthly" as const,
  }));

  return [...staticRoutes, ...postRoutes, ...seriesRoutes, ...episodeRoutes];
}
