import { loginAction } from "../actions";

type Props = { searchParams: Promise<{ error?: string }> };

export default async function LoginPage({ searchParams }: Props) {
  const { error } = await searchParams;

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="text-3xl font-black text-white">Turk</span>
            <span className="text-3xl font-black text-amber-500">Verse</span>
          </div>
          <p className="text-slate-400 text-sm">Admin Dashboard</p>
        </div>

        {/* Card */}
        <div className="bg-slate-800 rounded-2xl border border-slate-700 p-8">
          <h1 className="text-white font-bold text-xl mb-6">Sign In</h1>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg px-4 py-3 mb-5">
              Wrong password. Please try again.
            </div>
          )}

          <form action={loginAction} className="space-y-4">
            <div>
              <label className="block text-slate-300 text-sm font-medium mb-1.5">
                Password
              </label>
              <input
                type="password"
                name="password"
                required
                autoFocus
                placeholder="Enter admin password"
                className="w-full bg-slate-900 border border-slate-600 text-slate-100 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold text-sm py-2.5 rounded-lg transition-colors"
            >
              Sign In
            </button>
          </form>
        </div>

        <p className="text-center text-slate-600 text-xs mt-6">
          TurkVerse Admin — Private Access Only
        </p>
      </div>
    </div>
  );
}
