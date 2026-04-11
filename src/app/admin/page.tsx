import Link from "next/link";
import { getPosts, categories } from "@/lib/posts";
import DeleteButton from "./DeleteButton";

const categoryLabels: Record<string, string> = {
  news: "Latest News",
  reviews: "Series Reviews",
  cast: "Cast Bio",
  "release-dates": "Release Dates",
};

const categoryColors: Record<string, string> = {
  news: "bg-red-500/10 text-red-400",
  reviews: "bg-amber-500/10 text-amber-400",
  cast: "bg-blue-500/10 text-blue-400",
  "release-dates": "bg-green-500/10 text-green-400",
};

export default function AdminDashboard() {
  const posts = getPosts();

  const stats = categories.map((cat) => ({
    ...cat,
    count: posts.filter((p) => p.category === cat.slug).length,
  }));

  return (
    <div className="p-6 max-w-5xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-black text-white">All Posts</h1>
          <p className="text-slate-400 text-sm mt-1">{posts.length} total posts</p>
        </div>
        <Link
          href="/admin/new"
          className="bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold text-sm px-4 py-2.5 rounded-lg transition-colors flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          New Post
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => (
          <div key={s.slug} className="bg-slate-800 border border-slate-700 rounded-xl p-4">
            <p className="text-slate-400 text-xs font-medium">{s.name}</p>
            <p className="text-white text-2xl font-black mt-1">{s.count}</p>
          </div>
        ))}
      </div>

      {/* Posts table */}
      {posts.length === 0 ? (
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-12 text-center">
          <p className="text-slate-400">No posts yet.</p>
          <Link href="/admin/new" className="inline-block mt-4 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold px-5 py-2 rounded-lg text-sm transition-colors">
            Create First Post
          </Link>
        </div>
      ) : (
        <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left text-slate-400 font-medium px-5 py-3">Title</th>
                <th className="text-left text-slate-400 font-medium px-4 py-3 hidden md:table-cell">Category</th>
                <th className="text-left text-slate-400 font-medium px-4 py-3 hidden lg:table-cell">Date</th>
                <th className="text-right text-slate-400 font-medium px-5 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.slug} className="border-b border-slate-700/50 last:border-0 hover:bg-slate-700/30 transition-colors">
                  <td className="px-5 py-4">
                    <p className="text-white font-medium line-clamp-1">{post.title}</p>
                    <p className="text-slate-500 text-xs mt-0.5">/blog/{post.slug}</p>
                  </td>
                  <td className="px-4 py-4 hidden md:table-cell">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${categoryColors[post.category] ?? "bg-slate-700 text-slate-300"}`}>
                      {categoryLabels[post.category] ?? post.category}
                    </span>
                  </td>
                  <td className="px-4 py-4 hidden lg:table-cell text-slate-400">
                    {post.date}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/blog/${post.slug}`}
                        target="_blank"
                        className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-600 transition-colors"
                        title="View post"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </Link>
                      <Link
                        href={`/admin/edit/${post.slug}`}
                        className="text-slate-400 hover:text-amber-400 p-1.5 rounded-lg hover:bg-slate-600 transition-colors"
                        title="Edit post"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </Link>
                      <DeleteButton slug={post.slug} title={post.title} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
