"use client";
import { useState } from "react";

const FORM_ACTION = process.env.NEXT_PUBLIC_NEWSLETTER_FORM_ACTION;

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    if (!FORM_ACTION) {
      setStatus("error");
      return;
    }
    setStatus("submitting");
    try {
      const formData = new FormData();
      formData.append("email_address", email);
      await fetch(FORM_ACTION, { method: "POST", body: formData, mode: "no-cors" });
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="bg-gradient-to-br from-amber-500/20 to-amber-600/10 border border-amber-500/30 rounded-xl p-5">
      <h3 className="text-white font-bold mb-1">Stay Updated</h3>
      <p className="text-slate-400 text-sm mb-4">
        Get the latest Turkish drama news, reviews and release dates in your inbox weekly.
      </p>

      {status === "success" ? (
        <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 text-green-400 text-sm text-center">
          Thanks! Check your inbox to confirm.
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            className="w-full bg-slate-800 border border-slate-600 text-slate-200 text-sm rounded-lg px-3 py-2 mb-3 focus:outline-none focus:border-amber-500"
          />
          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-900 font-bold text-sm py-2 rounded-lg transition-colors"
          >
            {status === "submitting" ? "Subscribing..." : "Subscribe"}
          </button>
          {status === "error" && (
            <p className="text-red-400 text-xs mt-2">Something went wrong. Please try again later.</p>
          )}
        </form>
      )}
    </div>
  );
}
