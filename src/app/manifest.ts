import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "TurkVerse — Turkish Drama Reviews",
    short_name: "TurkVerse",
    description:
      "Turkish drama reviews, news, cast biographies and release dates for Kurulus Osman, Ertugrul and more.",
    start_url: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#020617",
    theme_color: "#f59e0b",
    categories: ["entertainment", "news", "lifestyle"],
    lang: "en",
    icons: [
      { src: "/favicon.ico", sizes: "any", type: "image/x-icon" },
    ],
  };
}
