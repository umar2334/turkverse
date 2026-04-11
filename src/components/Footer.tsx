import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-700 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-1 mb-3">
              <span className="text-xl font-black text-amber-500">TURK</span>
              <span className="text-xl font-black text-white">VERSE</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Your ultimate guide to Turkish series, cast biographies, reviews, and latest drama news.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">Categories</h4>
            <ul className="space-y-2">
              {[
                { label: "Latest News", href: "/category/news" },
                { label: "Series Reviews", href: "/category/reviews" },
                { label: "Cast Biographies", href: "/category/cast" },
                { label: "Release Dates", href: "/category/release-dates" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-slate-400 hover:text-amber-400 text-sm transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Series */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">Popular Series</h4>
            <ul className="space-y-2">
              {["Kurulus: Osman", "Dirilis: Ertugrul", "Barbaros Hayreddin", "Alparslan", "Teskilat"].map((s) => (
                <li key={s}>
                  <span className="text-slate-400 text-sm">{s}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">Legal</h4>
            <ul className="space-y-2">
              {[
                { label: "About Us", href: "/about" },
                { label: "Contact Us", href: "/contact" },
                { label: "Privacy Policy", href: "/privacy-policy" },
                { label: "DMCA Policy", href: "/dmca" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-slate-400 hover:text-amber-400 text-sm transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-700 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            © 2026 TurkVerse. All rights reserved.
          </p>
          <p className="text-slate-600 text-xs">
            This site provides reviews, news, and cast information. We do not host or distribute any copyrighted video content.
          </p>
        </div>
      </div>
    </footer>
  );
}
