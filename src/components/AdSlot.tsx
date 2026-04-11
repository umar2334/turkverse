"use client";

import { useEffect, useRef } from "react";

type Props = {
  slot: string;
  format?: "auto" | "rectangle" | "horizontal" | "vertical";
  className?: string;
};

const PUB_ID = process.env.NEXT_PUBLIC_ADSENSE_PUB_ID;

export default function AdSlot({ slot, format = "auto", className = "" }: Props) {
  const ref = useRef<HTMLModElement>(null);

  useEffect(() => {
    if (!PUB_ID) return;
    try {
      // @ts-expect-error adsbygoogle is injected by Google
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // silently ignore
    }
  }, []);

  if (!PUB_ID) {
    return (
      <div className={`bg-slate-800 border border-dashed border-slate-600 rounded-xl flex items-center justify-center ${className}`}>
        <div className="text-center">
          <p className="text-slate-500 text-xs font-medium">Advertisement</p>
          <p className="text-slate-700 text-xs mt-0.5">AdSense ID not set</p>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <ins
        ref={ref}
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={PUB_ID}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
