import { getRecentPosts } from "@/lib/posts";
import PostCard from "./PostCard";
import AdSlot from "./AdSlot";
import Newsletter from "./Newsletter";

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
      <Newsletter />
    </aside>
  );
}
