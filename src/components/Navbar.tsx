"use client";
import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Latest News", href: "/category/news" },
  { label: "Reviews", href: "/category/reviews" },
  { label: "Cast Bio", href: "/category/cast" },
  { label: "Release Dates", href: "/category/release-dates" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-slate-900 border-b border-slate-700 shadow-lg">
      {/* Top bar */}
      <div className="bg-amber-500 text-slate-900 text-xs text-center py-1 font-semibold tracking-wide">
        Latest: Kurulus Osman Season 6 premiere date revealed! &nbsp;|&nbsp; Esra Bilgic joins new project
      </div>

      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-black text-amber-500 tracking-tight">TURK</span>
          <span className="text-2xl font-black text-white tracking-tight">VERSE</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-slate-300 hover:text-amber-400 transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-slate-300 hover:text-amber-400"
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-slate-800 border-t border-slate-700 px-4 py-3 flex flex-col gap-3">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-sm font-medium text-slate-300 hover:text-amber-400 py-1"
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
