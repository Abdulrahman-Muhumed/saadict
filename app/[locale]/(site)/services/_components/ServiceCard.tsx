"use client";

import type { ComponentType } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

type ServiceType = {
  icon: ComponentType<{ size?: number; strokeWidth?: number }>;
  code: string;
  title: string;
  desc: string;
};

type ServiceCardProps = {
  service: ServiceType;
  index: number;
  onOpen: (service: ServiceType) => void;
};

export default function ServiceCard({ service, index, onOpen }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.35 }}
      className="
        group relative flex flex-col h-full 
        bg-white dark:bg-neutral-900 
        border border-neutral-200 dark:border-neutral-800 
        rounded-2xl p-6 
        hover:shadow-2xl hover:shadow-yellow-500/10 
        transition-all duration-300 overflow-hidden
      "
    >
      {/* Hover Accent Bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-yellow-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

      {/* Icon + Code */}
      <div className="flex justify-between items-start mb-6">
        <div
          className="
            p-3 rounded-xl 
            bg-neutral-50 dark:bg-neutral-800 
            text-neutral-900 dark:text-neutral-100
            group-hover:bg-yellow-400 group-hover:text-black 
            transition-colors duration-300
          "
        >
          <service.icon size={26} strokeWidth={1.5} />
        </div>

        <span
          className="
            text-[10px] font-mono font-bold 
            text-neutral-300 dark:text-neutral-600 
            border border-neutral-200 dark:border-neutral-800 
            px-2 py-1 rounded
          "
        >
          {service.code}
        </span>
      </div>

      {/* Title + Description */}
      <h3 className="text-lg font-bold mb-3">{service.title}</h3>
      <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed flex-grow mb-8">
        {service.desc}
      </p>

      {/* CTA Button */}
      <button
        onClick={() => onOpen(service)}
        className="
          mt-auto w-full 
          flex items-center justify-center gap-2 py-3 
          bg-neutral-100 dark:bg-neutral-800 
          text-neutral-900 dark:text-neutral-200 
          text-sm font-semibold rounded-lg 
          hover:bg-black hover:text-white dark:hover:bg-yellow-400 dark:hover:text-black 
          transition-all group/btn
        "
      >
        Initiate Request
        <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
      </button>
    </motion.div>
  );
}
