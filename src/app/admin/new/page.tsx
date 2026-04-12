import { categories } from "@/lib/posts";
import { createPostAction } from "../actions";

type Props = { searchParams: Promise<{ error?: string }> };

export default async function NewPostPage({ searchParams }: Props) {
  const { error } = await searchParams;
  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="p-6 max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-black text-white">New Post</h1>
        <p className="text-slate-400 text-sm mt-1">Write and publish a new blog post</p>
      </div>

      {error === "slug" && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg px-4 py-3 mb-6">
          A post with this slug already exists. Please use a different slug.
        </div>
      )}

      <form action={createPostAction} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-slate-300 text-sm font-medium mb-1.5">
            Title <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            name="title"
            required
            placeholder="Post title..."
            className="w-full bg-slate-800 border border-slate-600 text-slate-100 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-colors"
          />
        </div>

        {/* Slug */}
        <div>
          <label className="block text-slate-300 text-sm font-medium mb-1.5">
            Slug <span className="text-red-400">*</span>
            <span className="text-slate-500 font-normal ml-2">— URL: /blog/your-slug</span>
          </label>
          <input
            type="text"
            name="slug"
            required
            placeholder="my-post-slug"
            className="w-full bg-slate-800 border border-slate-600 text-slate-100 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-colors font-mono"
          />
        </div>

        {/* Category + Date + Read Time */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-slate-300 text-sm font-medium mb-1.5">
              Category <span className="text-red-400">*</span>
            </label>
            <select
              name="category"
              required
              className="w-full bg-slate-800 border border-slate-600 text-slate-100 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-colors"
            >
              {categories.map((cat) => (
                <option key={cat.slug} value={cat.slug}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-slate-300 text-sm font-medium mb-1.5">
              Date
            </label>
            <input
              type="text"
              name="date"
              defaultValue={today}
              className="w-full bg-slate-800 border border-slate-600 text-slate-100 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-slate-300 text-sm font-medium mb-1.5">
              Read Time
            </label>
            <input
              type="text"
              name="readTime"
              defaultValue="5 min read"
              className="w-full bg-slate-800 border border-slate-600 text-slate-100 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>
        </div>

        {/* Author */}
        <div>
          <label className="block text-slate-300 text-sm font-medium mb-1.5">
            Author
          </label>
          <input
            type="text"
            name="author"
            defaultValue="TurkVerse Team"
            className="w-full bg-slate-800 border border-slate-600 text-slate-100 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-colors"
          />
        </div>

        {/* Image */}
        <div>
          <label className="block text-slate-300 text-sm font-medium mb-1.5">
            Featured Image URL <span className="text-red-400">*</span>
          </label>
          <input
            type="url"
            name="imageUrl"
            required
            placeholder="https://images.unsplash.com/..."
            className="w-full bg-slate-800 border border-slate-600 text-slate-100 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-colors"
          />
        </div>

        {/* Tags */}
        <div>
          <label className="block text-slate-300 text-sm font-medium mb-1.5">
            Tags
            <span className="text-slate-500 font-normal ml-2">— comma separated</span>
          </label>
          <input
            type="text"
            name="tags"
            placeholder="Kurulus Osman, Season 6, ATV"
            className="w-full bg-slate-800 border border-slate-600 text-slate-100 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-colors"
          />
        </div>

        {/* Excerpt */}
        <div>
          <label className="block text-slate-300 text-sm font-medium mb-1.5">
            Excerpt <span className="text-red-400">*</span>
            <span className="text-slate-500 font-normal ml-2">— short description shown in cards</span>
          </label>
          <textarea
            name="excerpt"
            required
            rows={3}
            placeholder="Brief description of the post..."
            className="w-full bg-slate-800 border border-slate-600 text-slate-100 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-colors resize-y"
          />
        </div>

        {/* Content */}
        <div>
          <label className="block text-slate-300 text-sm font-medium mb-1.5">
            Content (HTML) <span className="text-red-400">*</span>
          </label>
          <div className="text-slate-500 text-xs mb-2 space-x-4">
            <span>Use: &lt;h2&gt; &lt;p&gt; &lt;ul&gt; &lt;li&gt; &lt;strong&gt; &lt;blockquote&gt;</span>
          </div>
          <textarea
            name="content"
            required
            rows={18}
            placeholder="<h2>Heading</h2>&#10;<p>Your content here...</p>"
            className="w-full bg-slate-800 border border-slate-600 text-slate-100 rounded-lg px-4 py-3 text-sm font-mono focus:outline-none focus:border-amber-500 transition-colors resize-y"
          />
        </div>

        {/* FAQs */}
        <div>
          <label className="block text-slate-300 text-sm font-medium mb-1.5">
            FAQs
            <span className="text-slate-500 font-normal ml-2">— Google rich snippets ke liye (optional)</span>
          </label>
          <p className="text-slate-500 text-xs mb-2">
            Har FAQ ek line mein likho: <code className="bg-slate-700 px-1 rounded">Sawal:::Jawab</code>
          </p>
          <textarea
            name="faqs"
            rows={4}
            placeholder={"When will Kurulus Osman Season 6 release?:::Season 6 is expected in October 2025.\nWhere to watch with subtitles?:::On the Kayi Family YouTube channel."}
            className="w-full bg-slate-800 border border-slate-600 text-slate-100 rounded-lg px-4 py-3 text-sm font-mono focus:outline-none focus:border-amber-500 transition-colors resize-y"
          />
        </div>

        {/* Submit */}
        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            className="bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold text-sm px-6 py-2.5 rounded-lg transition-colors"
          >
            Publish Post
          </button>
          <a
            href="/admin"
            className="text-slate-400 hover:text-white text-sm transition-colors"
          >
            Cancel
          </a>
        </div>
      </form>
    </div>
  );
}
