import Link from "next/link";
import Image from "next/image";
import type { Post } from "@/lib/posts";

type Props = {
  post: Post;
  variant?: "default" | "horizontal" | "featured";
};

const categoryColors: Record<string, string> = {
  news: "bg-red-500",
  reviews: "bg-amber-500",
  cast: "bg-blue-500",
  "release-dates": "bg-green-500",
};

const categoryLabels: Record<string, string> = {
  news: "Latest News",
  reviews: "Review",
  cast: "Cast Bio",
  "release-dates": "Release Date",
};

export default function PostCard({ post, variant = "default" }: Props) {
  const badgeColor = categoryColors[post.category] ?? "bg-slate-500";
  const badgeLabel = categoryLabels[post.category] ?? post.category;

  if (variant === "featured") {
    return (
      <Link href={`/blog/${post.slug}`} className="group block relative overflow-hidden rounded-xl h-80">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <span className={`text-xs font-bold px-2 py-1 rounded-full text-white ${badgeColor}`}>{badgeLabel}</span>
          <h2 className="mt-2 text-white font-bold text-xl line-clamp-2 group-hover:text-amber-400 transition-colors">
            {post.title}
          </h2>
          <p className="text-slate-300 text-sm mt-1">{post.date} · {post.readTime}</p>
        </div>
      </Link>
    );
  }

  if (variant === "horizontal") {
    return (
      <Link href={`/blog/${post.slug}`} className="group flex gap-3 items-start">
        <div className="relative w-20 h-16 rounded-lg overflow-hidden flex-shrink-0">
          <Image src={post.image} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs text-amber-500 font-semibold mb-1">{badgeLabel}</p>
          <h4 className="text-sm font-semibold text-slate-200 line-clamp-2 group-hover:text-amber-400 transition-colors">
            {post.title}
          </h4>
          <p className="text-xs text-slate-500 mt-1">{post.date}</p>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/blog/${post.slug}`} className="group bg-slate-800 rounded-xl overflow-hidden border border-slate-700 hover:border-amber-500/50 transition-all duration-300 flex flex-col">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3">
          <span className={`text-xs font-bold px-2 py-1 rounded-full text-white ${badgeColor}`}>{badgeLabel}</span>
        </div>
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-bold text-slate-100 line-clamp-2 group-hover:text-amber-400 transition-colors mb-2">
          {post.title}
        </h3>
        <p className="text-slate-400 text-sm line-clamp-2 flex-1">{post.excerpt}</p>
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-700">
          <span className="text-xs text-slate-500">{post.date}</span>
          <span className="text-xs text-slate-500">{post.readTime}</span>
        </div>
      </div>
    </Link>
  );
}
