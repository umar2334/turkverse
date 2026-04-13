import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getPostBySlug, getPosts } from "@/lib/posts";
import PostCard from "@/components/PostCard";
import Sidebar from "@/components/Sidebar";
import AdSlot from "@/components/AdSlot";
import FaqSchema from "@/components/FaqSchema";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://turkdrama.live";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
    alternates: { canonical: `${BASE_URL}/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.image, width: 1200, height: 630, alt: post.title }],
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  };
}

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

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

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const allPosts = await getPosts();
  const related = allPosts.filter((p) => p.category === post.category && p.slug !== post.slug).slice(0, 3);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: post.image,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Organization", name: post.author, url: BASE_URL },
    publisher: {
      "@type": "Organization",
      name: "TurkVerse",
      url: BASE_URL,
      logo: { "@type": "ImageObject", url: `${BASE_URL}/favicon.ico` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${BASE_URL}/blog/${post.slug}` },
    keywords: post.tags.join(", "),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: categoryLabels[post.category] ?? post.category, item: `${BASE_URL}/category/${post.category}` },
      { "@type": "ListItem", position: 3, name: post.title, item: `${BASE_URL}/blog/${post.slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Article */}
        <article className="lg:col-span-2">
          {/* Breadcrumb */}
          <nav className="text-sm text-slate-400 mb-4 flex items-center gap-2">
            <Link href="/" className="hover:text-amber-400">Home</Link>
            <span>/</span>
            <Link href={`/category/${post.category}`} className="hover:text-amber-400 capitalize">
              {categoryLabels[post.category] ?? post.category}
            </Link>
            <span>/</span>
            <span className="text-slate-300 truncate">{post.title}</span>
          </nav>

          {/* Badge */}
          <span className={`text-xs font-bold px-3 py-1 rounded-full text-white ${categoryColors[post.category] ?? "bg-slate-500"}`}>
            {categoryLabels[post.category] ?? post.category}
          </span>

          {/* Title */}
          <h1 className="text-2xl md:text-3xl font-black text-white mt-4 mb-4 leading-tight">
            {post.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400 mb-6 pb-4 border-b border-slate-700">
            <span>By <strong className="text-slate-300">{post.author}</strong></span>
            <span>{post.date}</span>
            <span>{post.readTime}</span>
          </div>

          {/* Featured image */}
          <div className="relative w-full h-64 md:h-96 rounded-xl overflow-hidden mb-6">
            <Image src={post.image} alt={post.title} fill className="object-cover" priority />
          </div>

          {/* AdSense — above content (best performing position) */}
          <AdSlot slot="1234567890" format="horizontal" className="h-24 mb-6" />

          {/* Excerpt */}
          <p className="text-slate-300 text-lg leading-relaxed mb-6 font-medium border-l-4 border-amber-500 pl-4 bg-slate-800/50 py-3 rounded-r-lg">
            {post.excerpt}
          </p>

          {/* Content */}
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* FAQs — Google rich snippets */}
          {post.faqs && post.faqs.length > 0 && (
            <FaqSchema faqs={post.faqs} postUrl={`${BASE_URL}/blog/${post.slug}`} />
          )}

          {/* AdSense — after content (high visibility) */}
          <AdSlot slot="0987654321" format="rectangle" className="h-64 my-8" />

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag) => (
              <span key={tag} className="bg-slate-700 text-slate-300 text-xs px-3 py-1 rounded-full">
                #{tag}
              </span>
            ))}
          </div>

          {/* Share buttons */}
          <div className="bg-slate-800 rounded-xl p-5 border border-slate-700 mb-8">
            <p className="text-white font-semibold mb-3">Share this article:</p>
            <div className="flex flex-wrap gap-3">
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`${BASE_URL}/blog/${post.slug}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
              >
                Facebook
              </a>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`${BASE_URL}/blog/${post.slug}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-sky-500 hover:bg-sky-400 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
              >
                Twitter / X
              </a>
              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`${post.title} - ${BASE_URL}/blog/${post.slug}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 hover:bg-green-500 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
              >
                WhatsApp
              </a>
            </div>
          </div>

          {/* Related posts */}
          {related.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="w-1 h-6 bg-amber-500 rounded-full" />
                <h2 className="text-xl font-bold text-white">Related Articles</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {related.map((p) => (
                  <PostCard key={p.slug} post={p} />
                ))}
              </div>
            </div>
          )}
        </article>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Sidebar />
        </div>
      </div>
    </div>
    </>
  );
}
