"use client";

import { brand } from "../config/brand";

export default function SectionHeading({
  eyebrow,
  title,
  desc,
}: {
  eyebrow: string;
  title: string;
  desc?: string;
}) {
  return (
    <div className="max-w-3xl mx-auto text-center">
      <div className="flex items-center justify-center gap-3 mb-5">
        <div
          className="h-[2px] w-12 rounded-full"
          style={{
            background: `linear-gradient(to right, ${brand.colors.primary}, ${brand.colors.accent})`,
          }}
        />
        <span
          className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#24365C] dark:text-white"
        >
          {eyebrow}
        </span>
        <div
          className="h-[2px] w-12 rounded-full"
          style={{
            background: `linear-gradient(to right, ${brand.colors.accent}, ${brand.colors.primary})`,
          }}
        />
      </div>

      {(() => {
        const words = title.split(" ");
        const lastWord = words.pop();
        const leadingText = words.join(" ");

        return (
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-slate-900 dark:text-white leading-[1.02]">
            {leadingText}{" "}
            <span className="font-thin italic opacity-40">
              {lastWord}
            </span>
          </h2>
        );
      })()}

      {desc ? (
        <p className="mt-5 text-md md:text-base leading-7 text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          {desc}
        </p>
      ) : null}
    </div>
  );
}