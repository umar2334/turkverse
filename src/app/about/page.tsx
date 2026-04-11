import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about TurkVerse — your ultimate guide to Turkish dramas, series reviews, cast biographies, and the latest news.",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <nav className="text-sm text-slate-400 mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-amber-400">Home</Link>
        <span>/</span>
        <span className="text-slate-300">About Us</span>
      </nav>

      <h1 className="text-3xl font-black text-white mb-2">About TurkVerse</h1>
      <div className="w-16 h-1 bg-amber-500 rounded-full mb-8" />

      <div className="prose max-w-none space-y-6">
        <p>
          Welcome to <strong>TurkVerse</strong> — your number one source for everything related to Turkish dramas and series. We are passionate fans and writers dedicated to bringing you the most accurate, up-to-date, and engaging content about the Turkish television industry.
        </p>

        <h2>Our Mission</h2>
        <p>
          Our mission is simple: to be the most trusted English-language resource for Turkish drama fans around the world — especially in Pakistan, India, and the broader South Asian diaspora. We believe that great storytelling has no borders, and Turkish television has proven that time and again.
        </p>

        <h2>What We Cover</h2>
        <ul>
          <li><strong>Series Reviews</strong> — Detailed, honest reviews of popular Turkish dramas</li>
          <li><strong>Cast Biographies</strong> — In-depth profiles of your favourite Turkish actors and actresses</li>
          <li><strong>Release Dates</strong> — Latest information on when new seasons and episodes air</li>
          <li><strong>Latest News</strong> — Breaking news from the Turkish entertainment industry</li>
          <li><strong>Episode Guides</strong> — Season-by-season episode summaries and analysis</li>
        </ul>

        <h2>Our Editorial Standards</h2>
        <p>
          All content on TurkVerse is original and written by our team of dedicated writers. We do not copy content from other websites. We fact-check our information and aim to publish only verified news and accurate biographies.
        </p>

        <h2>Copyright Policy</h2>
        <p>
          TurkVerse is a fan-information site. We do not host, stream, or distribute any copyrighted video content. All images used on this site are either licensed through Unsplash or are used under fair use for review and commentary purposes. If you have a copyright concern, please visit our <Link href="/dmca" className="text-amber-500 hover:text-amber-400">DMCA page</Link>.
        </p>

        <h2>Contact Us</h2>
        <p>
          Have a question, suggestion, or want to write for us? Visit our <Link href="/contact" className="text-amber-500 hover:text-amber-400">Contact page</Link> and we will get back to you within 48 hours.
        </p>
      </div>
    </div>
  );
}
