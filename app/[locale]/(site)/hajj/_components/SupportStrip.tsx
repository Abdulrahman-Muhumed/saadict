"use client";

import { useTranslations } from "next-intl";

const PRIMARY = "#241c72";

export default function SupportStrip({ onOpen }: { onOpen: () => void }) {
  const t = useTranslations("hajj.faq");

  const blocks = [
    { title: t("title1"), body: t("body1") },
    { title: t("title2"), body: t("body2") },
    {
      title: t("title3"),
      body: t("body3"),
      cta: t("cta"),
    },
  ];

  return (
    <section className="relative bg-gradient-to-b from-white/90 to-indigo-50/40 dark:from-neutral-950 dark:to-[#241c72]/10 py-20">
      <div className="mx-auto max-w-7xl px-6 grid gap-8 md:grid-cols-3">
        {blocks.map((b, i) => (
          <div
            key={i}
            className="rounded-2xl border p-6 shadow-2xl bg-white/70 dark:bg-neutral-900/70 backdrop-blur-xl"
            style={{ borderColor: `${PRIMARY}1a` }}
          >
            <h4 className="text-lg font-bold text-slate-900 dark:text-white">
              {b.title}
            </h4>
            <p className="mt-2 text-slate-600 dark:text-slate-300">{b.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
