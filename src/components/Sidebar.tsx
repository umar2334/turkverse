import { getRecentPosts } from "@/lib/posts";
import PostCard from "./PostCard";
import AdSlot from "./AdSlot";

export default async function Sidebar() {
  const recent = await getRecentPosts(5);

  return (
    <aside className="space-y-6">
      {/* AdSense Slot — sidebar top 300x250 */}
      <AdSlot slot="1111111111" format="rectangle" className="h-64" />

      {/* Recent Posts */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 p-4">
        <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4 pb-3 border-b border-slate-700">
          Recent Posts
        </h3>
        <div className="space-y-4">
          {recent.map((post) => (
            <PostCard key={post.slug} post={post} variant="horizontal" />
          ))}
        </div>
      </div>

      {/* Popular Series Tags */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 p-4">
        <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4 pb-3 border-b border-slate-700">
          Popular Tags
        </h3>
        <div className="flex flex-wrap gap-2">
          {[
            "Kurulus Osman",
            "Dirilis Ertugrul",
            "Barbaros",
            "Esra Bilgic",
            "Alparslan",
            "Teskilat",
            "Season 6",
            "Review",
            "Cast Bio",
            "ATV",
          ].map((tag) => (
            <span
              key={tag}
              className="text-xs bg-slate-700 text-slate-300 hover:bg-amber-500 hover:text-slate-900 px-3 py-1 rounded-full cursor-pointer transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* AdSense Slot — sticky sidebar 160x600 */}
      <div className="sticky top-24">
        <AdSlot slot="2222222222" format="vertical" className="h-[600px]" />
      </div>

      {/* Newsletter */}
      <div className="bg-gradient-to-br from-amber-500/20 to-amber-600/10 border border-amber-500/30 rounded-xl p-5">
        <h3 className="text-white font-bold mb-1">Stay Updated</h3>
        <p className="text-slate-400 text-sm mb-4">Get the latest Turkish drama news in your inbox.</p>
        <input
          type="email"
          placeholder="Your email address"
          className="w-full bg-slate-800 border border-slate-600 text-slate-200 text-sm rounded-lg px-3 py-2 mb-3 focus:outline-none focus:border-amber-500"
        />
        <button className="w-full bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold text-sm py-2 rounded-lg transition-colors">
          Subscribe
        </button>
      </div>
    </aside>
  );
}
