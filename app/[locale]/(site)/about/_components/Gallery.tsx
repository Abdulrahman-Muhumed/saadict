"use client";

import { motion } from "framer-motion";
import { Image as ImageIcon, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { brand } from "@/components/config/brand";
import SectionShell from "@/components/landing/section-shell";

const galleryItems = [
  {
    src: "/visuals/about-01.jpg",
    title: "Digital Presence",
    desc: "High-end website execution and visual credibility.",
    className: "md:col-span-7 md:row-span-2 min-h-[320px]",
  },
  {
    src: "/visuals/about-02.jpg",
    title: "System Architecture",
    desc: "Structured digital systems with modern flow.",
    className: "md:col-span-5 min-h-[180px]",
  },
  {
    src: "/visuals/about-03.jpg",
    title: "Product Thinking",
    desc: "SaaS direction, operational logic, and scalability.",
    className: "md:col-span-5 min-h-[180px]",
  },
  {
    src: "/visuals/about-04.jpg",
    title: "Mobile Capability",
    desc: "Business-ready mobile product delivery.",
    className: "md:col-span-4 min-h-[220px]",
  },
  {
    src: "/visuals/about-05.jpg",
    title: "Brand Precision",
    desc: "Cleaner execution, sharper detail, stronger trust.",
    className: "md:col-span-4 min-h-[220px]",
  },
  {
    src: "/visuals/about-06.jpg",
    title: "Future Systems",
    desc: "Built for growth, not just launch.",
    className: "md:col-span-4 min-h-[220px]",
  },
];

export default function AboutVisualGallery() {
  return (
    <SectionShell>
      <div className="max-w-6xl mx-auto text-center">
        <div className="text-[10px] font-bold uppercase tracking-[0.35em] text-slate-400">
          Visual Gallery
        </div>

        <h2 className="mt-5 text-3xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.03]">
          A visual layer that reflects
          <span className="block">the company’s digital direction.</span>
        </h2>

        <p className="mt-5 max-w-3xl mx-auto text-sm md:text-base leading-8 text-slate-600 dark:text-slate-400">
          This gallery can later contain real project previews, system screens, and branded visuals.
          For now, the layout is designed to make the About page feel more alive, premium, and memorable.
        </p>
      </div>

      <div className="mt-14 grid grid-cols-1 md:grid-cols-12 gap-5 auto-rows-[120px]">
        {galleryItems.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: index * 0.04 }}
            whileHover={{ y: -6 }}
            className={`group relative overflow-hidden rounded-[28px] border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/[0.03] ${item.className}`}
          >
            <Image
              src={item.src}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
            <div
              className="absolute inset-x-0 top-0 h-px"
              style={{
                background: `linear-gradient(to right, transparent, ${brand.colors.accent}, transparent)`,
              }}
            />

            <div className="absolute top-4 left-4">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center border border-white/10 bg-white/10 backdrop-blur-sm">
                <ImageIcon size={18} className="text-white" />
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-200 max-w-md">
                    {item.desc}
                  </p>
                </div>

                <ArrowUpRight size={18} className="text-white/80 shrink-0" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionShell>
  );
}