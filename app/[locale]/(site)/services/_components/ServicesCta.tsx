"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Code2 } from "lucide-react";
import { Link } from "@/lib/i18n/navigation";
import { useTranslations } from "next-intl";

export default function ServicesCTA() {
  const t = useTranslations("services.cta");

  return (
    <section className="relative overflow-hidden bg-white dark:bg-[#050505] border-t border-slate-200 dark:border-white/5 py-24 transition-colors duration-500">
      <div className="relative z-10 max-w-7xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center"
        >
          <h2 className="text-5xl md:text-6xl font-bold tracking-tight text-[#24365C] dark:text-white leading-[1.1] mb-8">
            {t('titleMain')} <br />
            <span className="font-thin italic opacity-40">{t('titleItalic')}</span>
          </h2>

          <p className="mt-6 text-slate-500 dark:text-white/40 max-w-2xl mx-auto text-lg leading-relaxed font-medium">
            {t('description')}
          </p>

          {/* ACTION CONSOLE */}
          <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
            <Link href="/service-request" className="block w-fit">
              <button className="group relative flex items-center gap-4 px-10 py-5 bg-[#24365C] dark:bg-white text-white dark:text-[#050505] overflow-hidden transition-all duration-500 hover:shadow-[0_20px_40px_rgba(36,28,114,0.2)] dark:hover:shadow-[0_20px_40px_rgba(255,255,255,0.1)]">
                
                {/* High-End "Active" Edge Indicator */}
                <div className="absolute top-0 left-0 h-full w-[3px] bg-[#0af3d4] scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-bottom" />

                {/* Subtle Background Slide Effect */}
                <div className="absolute inset-0 bg-white/5 dark:bg-black/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />

                <span className="relative z-10 text-[12px] font-mono font-black uppercase tracking-[0.3em]">
                  {t('button')}
                </span>

                <div className="relative z-10 p-1 bg-white/10 dark:bg-black/5 rounded-sm">
                  <ArrowUpRight
                    size={18}
                    className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-500 ease-out"
                  />
                </div>

                {/* Technical Metadata */}
                <span className="absolute bottom-1 right-2 text-[6px] font-mono opacity-20 uppercase tracking-tighter">
                  {t('metadata')}
                </span>
              </button>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* CORNER DECORATION */}
      <div className="absolute bottom-0 right-0 p-8 opacity-20 pointer-events-none">
        <Code2 size={120} strokeWidth={0.5} className="text-[#241c72] dark:text-white" />
      </div>
    </section>
  );
}