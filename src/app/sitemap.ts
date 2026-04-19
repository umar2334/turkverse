import { MetadataRoute } from "next";
import { getPosts } from "@/lib/posts";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts();

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
  ];

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `https://www.turkdrama.live/blog/${post.slug}`,
    lastModified: new Date(post.date),
    priority: 0.7,
    changeFrequency: "monthly" as const,
  }));

  return [...staticRoutes, ...postRoutes];
}
