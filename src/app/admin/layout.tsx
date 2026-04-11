import Link from "next/link";
import { logoutAction } from "./actions";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-900 flex">
      {/* Sidebar */}
      <aside className="w-56 min-h-screen bg-slate-800 border-r border-slate-700 flex flex-col flex-shrink-0">
        {/* Brand */}
        <div className="px-5 py-5 border-b border-slate-700">
          <Link href="/admin" className="flex items-center gap-1.5">
            <span className="text-lg font-black text-white">Turk</span>
            <span className="text-lg font-black text-amber-500">Verse</span>
          </Link>
          <p className="text-slate-500 text-xs mt-0.5">Admin Panel</p>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          <Link
            href="/admin"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-white text-sm transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
            All Posts
          </Link>
          <Link
            href="/admin/new"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-white text-sm transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Post
          </Link>
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-white text-sm transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            View Site
          </Link>
        </nav>

        {/* Logout */}
        <div className="px-3 py-4 border-t border-slate-700">
          <form action={logoutAction}>
            <button
              type="submit"
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-slate-400 hover:bg-red-500/10 hover:text-red-400 text-sm transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </form>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
