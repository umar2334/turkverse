import { notFound } from "next/navigation";
import { getPostBySlug, categories } from "@/lib/posts";
import { updatePostAction } from "../../actions";

type Props = { params: Promise<{ slug: string }> };

export default async function EditPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const updateWithSlug = updatePostAction.bind(null, slug);

  return (
    <div className="p-6 max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-black text-white">Edit Post</h1>
        <p className="text-slate-400 text-sm mt-1 font-mono">/blog/{post.slug}</p>
      </div>

      <form action={updateWithSlug} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-slate-300 text-sm font-medium mb-1.5">
            Title <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            name="title"
            required
            defaultValue={post.title}
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
            defaultValue={post.slug}
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
              defaultValue={post.category}
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
            <label className="block text-slate-300 text-sm font-medium mb-1.5">Date</label>
            <input
              type="text"
              name="date"
              defaultValue={post.date}
              className="w-full bg-slate-800 border border-slate-600 text-slate-100 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-slate-300 text-sm font-medium mb-1.5">Read Time</label>
            <input
              type="text"
              name="readTime"
              defaultValue={post.readTime}
              className="w-full bg-slate-800 border border-slate-600 text-slate-100 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>
        </div>

        {/* Author */}
        <div>
          <label className="block text-slate-300 text-sm font-medium mb-1.5">Author</label>
          <input
            type="text"
            name="author"
            defaultValue={post.author}
            className="w-full bg-slate-800 border border-slate-600 text-slate-100 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-colors"
          />
        </div>

        {/* Image */}
        <div>
          <label className="block text-slate-300 text-sm font-medium mb-3">
            Featured Image
          </label>
          {/* Current image preview */}
          {post.image && (
            <div className="mb-3 flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={post.image} alt="current" className="w-20 h-14 object-cover rounded-lg border border-slate-600" />
              <p className="text-slate-400 text-xs break-all">{post.image}</p>
            </div>
          )}
          <div className="space-y-3">
            <div>
              <p className="text-slate-500 text-xs mb-1.5">Nai image upload karo (optional)</p>
              <input
                type="file"
                name="imageFile"
                accept="image/*"
                className="w-full bg-slate-800 border border-slate-600 text-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-colors file:mr-3 file:py-1 file:px-3 file:rounded-md file:border-0 file:bg-amber-500 file:text-slate-900 file:text-xs file:font-bold cursor-pointer"
              />
            </div>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-slate-700" />
              <span className="text-slate-500 text-xs">ya URL badlo</span>
              <div className="flex-1 h-px bg-slate-700" />
            </div>
            <div>
              <input
                type="url"
                name="imageUrl"
                defaultValue={post.image}
                placeholder="https://..."
                className="w-full bg-slate-800 border border-slate-600 text-slate-100 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>
          </div>
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
            defaultValue={post.tags.join(", ")}
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
            defaultValue={post.excerpt}
            className="w-full bg-slate-800 border border-slate-600 text-slate-100 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-colors resize-y"
          />
        </div>

        {/* Content */}
        <div>
          <label className="block text-slate-300 text-sm font-medium mb-1.5">
            Content (HTML) <span className="text-red-400">*</span>
          </label>
          <div className="text-slate-500 text-xs mb-2">
            <span>Use: &lt;h2&gt; &lt;p&gt; &lt;ul&gt; &lt;li&gt; &lt;strong&gt; &lt;blockquote&gt;</span>
          </div>
          <textarea
            name="content"
            required
            rows={18}
            defaultValue={post.content}
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
            defaultValue={post.faqs?.map((f) => `${f.q}:::${f.a}`).join("\n") ?? ""}
            className="w-full bg-slate-800 border border-slate-600 text-slate-100 rounded-lg px-4 py-3 text-sm font-mono focus:outline-none focus:border-amber-500 transition-colors resize-y"
          />
        </div>

        {/* Submit */}
        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            className="bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold text-sm px-6 py-2.5 rounded-lg transition-colors"
          >
            Save Changes
          </button>
          <a href="/admin" className="text-slate-400 hover:text-white text-sm transition-colors">
            Cancel
          </a>
          <a
            href={`/blog/${post.slug}`}
            target="_blank"
            className="ml-auto text-slate-400 hover:text-amber-400 text-sm transition-colors"
          >
            View Post →
          </a>
        </div>
      </form>
    </div>
  );
}
