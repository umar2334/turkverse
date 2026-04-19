type FaqItem = { q: string; a: string };

type Props = {
  faqs: FaqItem[];
};

export default function FaqSchema({ faqs }: Props) {
  if (!faqs.length) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 mb-8">
        <h2 className="text-white font-bold text-lg mb-5 flex items-center gap-2">
          <span className="w-1 h-5 bg-amber-500 rounded-full" />
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((f, i) => (
            <details key={i} className="group">
              <summary className="cursor-pointer text-slate-200 font-medium text-sm list-none flex items-center justify-between gap-3 py-2 border-b border-slate-700">
                <span>{f.q}</span>
                <svg
                  className="w-4 h-4 text-amber-500 flex-shrink-0 group-open:rotate-180 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="text-slate-400 text-sm leading-relaxed pt-3 pb-1">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </>
  );
}
