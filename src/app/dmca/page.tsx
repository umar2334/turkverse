import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "DMCA Policy",
  description: "TurkVerse DMCA and copyright policy. How to submit a takedown request.",
};

export default function DmcaPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <nav className="text-sm text-slate-400 mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-amber-400">Home</Link>
        <span>/</span>
        <span className="text-slate-300">DMCA Policy</span>
      </nav>

      <h1 className="text-3xl font-black text-white mb-2">DMCA & Copyright Policy</h1>
      <div className="w-16 h-1 bg-amber-500 rounded-full mb-2" />
      <p className="text-slate-500 text-sm mb-8">Last updated: April 11, 2026</p>

      <div className="prose max-w-none space-y-6">
        <p>
          <strong>TurkVerse</strong> respects the intellectual property rights of others and expects our users to do the same. We take copyright infringement seriously and will respond promptly to notices of alleged copyright infringement.
        </p>

        <h2>Our Content Policy</h2>
        <p>
          TurkVerse is an informational website. We publish:
        </p>
        <ul>
          <li>Original articles, reviews, and opinions written by our team</li>
          <li>Cast biographies and factual information (news)</li>
          <li>Episode summaries and analysis</li>
        </ul>
        <p>
          <strong>We do NOT:</strong> host, stream, upload, or provide links to copyrighted video content. We do not distribute episodes, seasons, or any pirated material. All images used on this site are sourced from Unsplash (licensed) or used under editorial fair use for review and commentary.
        </p>

        <h2>DMCA Takedown Notices</h2>
        <p>
          If you believe that content on TurkVerse infringes your copyright, please send a written DMCA takedown notice to us containing:
        </p>
        <ul>
          <li>Your name and contact information (email address)</li>
          <li>A description of the copyrighted work you claim has been infringed</li>
          <li>The exact URL(s) on TurkVerse where the infringing material appears</li>
          <li>A statement that you have a good faith belief that the use is not authorised by the copyright owner</li>
          <li>A statement, under penalty of perjury, that the information in your notice is accurate and that you are the copyright owner or authorised to act on their behalf</li>
          <li>Your electronic or physical signature</li>
        </ul>

        <h2>Submit a DMCA Request</h2>
        <p>
          Send all DMCA notices to: <span className="text-amber-500">dmca@turkverse.com</span>
        </p>
        <p>
          We will acknowledge receipt of your complaint within 48 hours and will investigate and respond within 10 business days.
        </p>

        <h2>Counter-Notices</h2>
        <p>
          If you believe that content was removed from TurkVerse in error, you may submit a counter-notice. A counter-notice must include the same elements as a takedown notice plus a statement that you consent to the jurisdiction of the Federal Court for your district.
        </p>

        <h2>Questions?</h2>
        <p>
          For any copyright-related questions, please <Link href="/contact" className="text-amber-500 hover:text-amber-400">contact us</Link>.
        </p>
      </div>
    </div>
  );
}
