import Link from "next/link";

interface BreadcrumbItem {
  name: string;
  href?: string;
}

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      ...(item.href && { item: `https://www.turkdrama.live${item.href}` }),
    })),
  };

  return (
    <>
      <nav aria-label="Breadcrumb" className="text-sm mb-4">
        <ol className="flex flex-wrap items-center gap-2 text-slate-400">
          {items.map((item, index) => (
            <li key={index} className="flex items-center gap-2">
              {index > 0 && <span className="text-slate-500">/</span>}
              {item.href ? (
                <Link href={item.href} className="hover:text-amber-400 transition-colors">
                  {item.name}
                </Link>
              ) : (
                <span aria-current="page" className="text-slate-200 font-medium">
                  {item.name}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
    </>
  );
}
