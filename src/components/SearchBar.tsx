"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchBar({ onSubmit }: { onSubmit?: () => void }) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    router.push(`/search?q=${encodeURIComponent(q)}`);
    onSubmit?.();
    setQuery("");
  }

  return (
    <form onSubmit={handleSubmit} className="relative flex items-center">
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search Turkish dramas..."
        aria-label="Search"
        className="w-full bg-slate-800 border border-slate-700 text-slate-200 text-sm rounded-full pl-9 pr-3 py-1.5 focus:outline-none focus:border-amber-500 placeholder:text-slate-500"
      />
      <svg
        className="absolute left-3 w-4 h-4 text-slate-500 pointer-events-none"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
      </svg>
    </form>
  );
}
