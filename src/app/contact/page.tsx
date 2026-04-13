import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with the TurkVerse team for questions, suggestions, or partnership opportunities.",
};

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <nav className="text-sm text-slate-400 mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-amber-400">Home</Link>
        <span>/</span>
        <span className="text-slate-300">Contact Us</span>
      </nav>

      <h1 className="text-3xl font-black text-white mb-2">Contact Us</h1>
      <div className="w-16 h-1 bg-amber-500 rounded-full mb-8" />

      <p className="text-slate-400 mb-8">
        Have a question, feedback, or a story tip? We would love to hear from you. Fill out the form below and our team will respond within 48 hours.
      </p>

      <form className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-2">Your Name *</label>
          <input
            type="text"
            required
            placeholder="e.g. Ahmed Ali"
            className="w-full bg-slate-800 border border-slate-600 text-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:border-amber-500 transition-colors placeholder:text-slate-500"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-2">Email Address *</label>
          <input
            type="email"
            required
            placeholder="you@example.com"
            className="w-full bg-slate-800 border border-slate-600 text-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:border-amber-500 transition-colors placeholder:text-slate-500"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-2">Subject *</label>
          <select className="w-full bg-slate-800 border border-slate-600 text-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:border-amber-500 transition-colors">
            <option value="">Select a topic…</option>
            <option value="general">General Inquiry</option>
            <option value="correction">Content Correction</option>
            <option value="dmca">Copyright / DMCA</option>
            <option value="partnership">Partnership / Advertising</option>
            <option value="contribute">Write for Us</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-2">Message *</label>
          <textarea
            required
            rows={6}
            placeholder="Type your message here…"
            className="w-full bg-slate-800 border border-slate-600 text-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:border-amber-500 transition-colors placeholder:text-slate-500 resize-none"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-amber-500 hover:bg-amber-400 text-slate-900 font-black py-3 rounded-lg transition-colors text-base"
        >
          Send Message
        </button>
      </form>

      <div className="mt-10 pt-8 border-t border-slate-700 text-sm text-slate-400">
        <p>You can also reach us at: <span className="text-amber-500">contact@turkdrama.live</span></p>
        <p className="mt-1">Response time: within 48 hours (Mon–Fri)</p>
      </div>
    </div>
  );
}
