"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { fadeUp } from "./animations";
import { Link } from "@/lib/i18n/navigation";

export default function FinalCTASection() {
  return (
    <section className="py-20 md:py-24 bg-neutral-50 dark:bg-neutral-950">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          variants={fadeUp(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-3xl md:text-4xl font-extrabold">
            Ready to Partner with a Logistical Powerhouse?
          </h2>
          <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400">
            Whether it&apos;s a single pallet, a full container or complex
            project cargo, our expert team is ready to deliver assured logistics
            for your business.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-black bg-yellow-400 shadow-md hover:bg-yellow-300 transition uppercase tracking-wider"
            >
              Contact Our Sales Team
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold border border-neutral-300 text-neutral-800 hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-100 dark:hover:bg-neutral-900"
            >
              Explore Services
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
