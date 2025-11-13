"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle } from "lucide-react";

export default function Toast({
  text,
  type = "success",
  onClose,
}: {
  text: string;
  type?: "success" | "error";
  onClose: () => void;
}) {
  useEffect(() => {
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <AnimatePresence>
      {text && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-xl border px-4 py-3 shadow-xl text-sm font-medium backdrop-blur-md transition-all duration-300
          ${
            type === "success"
              ? "border-emerald-300/40 bg-emerald-500/10 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300"
              : "border-red-300/40 bg-red-500/10 text-red-700 dark:bg-red-400/10 dark:text-red-300"
          }`}
        >
          {type === "success" ? (
            <CheckCircle2 className="h-5 w-5" />
          ) : (
            <XCircle className="h-5 w-5" />
          )}
          {text}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
