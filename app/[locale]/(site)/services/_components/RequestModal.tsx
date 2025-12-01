"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader } from "lucide-react";
import Image from "next/image";
type RequestModalProps = {
  isOpen: boolean;
  service: any;
  onClose: () => void;
};

export default function RequestModal({ isOpen, service, onClose }: RequestModalProps) {

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const submit = async (e: any) => {
    e.preventDefault();
    setStatus("loading");

    const form = new FormData(e.target);

    const res = await fetch("/api/send-request", {
      method: "POST",
      body: JSON.stringify({
        company: form.get("company"),
        email: form.get("email"),
        details: form.get("details"),
        service: service.title,
        serviceCode: service.code,
      }),
    });

    const data = await res.json();

    if (data.ok) {
      setStatus("success");
      setTimeout(() => {
        onClose();
        setStatus("idle");
      }, 3000);
    } else {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  /* ------------------------------------------------------ */
  /* LOADER */
  /* ------------------------------------------------------ */
  const FuturisticLoader = () => (
    <div className="flex flex-col items-center justify-center p-10 h-[300px] w-full text-center">
      <motion.div className="w-20 h-20 relative mb-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <motion.div
          className="absolute inset-0 border-4 border-yellow-400 rounded-full"
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5], rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.div
          className="absolute inset-2 flex items-center justify-center bg-yellow-400 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
        >
          <Loader size={24} className="text-neutral-900" />
        </motion.div>
      </motion.div>

      <h3 className="text-xl font-bold font-mono text-yellow-400 mb-1">PROCESSING | YOUR REQUEST</h3>
      <p className="text-sm text-neutral-400">Authenticating request...</p>

      <div className="mt-6 w-full h-1 bg-neutral-800 rounded-full">
        <motion.div className="h-full bg-yellow-400" initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 2 }} />
      </div>
    </div>
  );

  /* ------------------------------------------------------ */
  /* SUCCESS SCREEN */
  /* ------------------------------------------------------ */
  const SuccessScreen = () => (
    <div className="flex flex-col items-center justify-center p-10 h-[300px] w-full text-center">
      <motion.div
        className="w-20 h-20 relative mb-6"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="absolute inset-0 rounded-full border-4 border-green-400" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Image src="/services/sent.png" alt="Success" width={30} height={30} />
        </div>
      </motion.div>

      <h3 className="text-xl font-bold font-mono text-green-400 mb-1">REQUEST RECEIVED</h3>
      <p className="text-sm text-neutral-400">Thank you. Our team will contact you soon.</p>
    </div>
  );

  /* ------------------------------------------------------ */
  /* ERROR SCREEN */
  /* ------------------------------------------------------ */
  const ErrorScreen = () => (
    <div className="flex flex-col items-center justify-center p-10 h-[300px] w-full text-center">
      <motion.div
        className="w-20 h-20 relative mb-6"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="absolute inset-0 rounded-full border-4 border-red-400" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Image src="/services/warning.png" alt="Error" width={30} height={30} />
        </div>
      </motion.div>

      <h3 className="text-xl font-bold font-mono text-red-400 mb-1">REQUEST FAILED</h3>
      <p className="text-sm text-neutral-400">Something went wrong. Please try again.</p>
    </div>
  );

  /* ------------------------------------------------------ */
  /* MAIN RETURN */
  /* ------------------------------------------------------ */
  return (
    <AnimatePresence>
      {isOpen && service && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">

          {/* BACKDROP */}
          <motion.div
            className="absolute inset-0 bg-neutral-900/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => status === "idle" && onClose()}
          />

          {/* MODAL */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 60 }}
            className="
              relative w-full max-w-md 
              bg-white dark:bg-neutral-900 
              rounded-2xl shadow-2xl overflow-hidden 
              border-t-4 border-yellow-400
            "
          >

            {/* LOADER / SUCCESS / ERROR */}
            {status === "loading" && <FuturisticLoader />}
            {status === "success" && <SuccessScreen />}
            {status === "error" && <ErrorScreen />}

            {/* FORM */}
            {status === "idle" && (
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="text-xl font-bold">{service.title}</h3>
                    <p className="text-xs font-mono text-yellow-500 mt-1">
                      REQ-ID: {service.code.toUpperCase()}
                    </p>
                  </div>

                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full"
                  >
                    <X size={20} />
                  </button>
                </div>

                <form className="space-y-4" onSubmit={submit}>
                  <input name="company" placeholder="Company Name" className="input" required />
                  <input name="email" type="email" placeholder="Business Email" className="input" required />
                  <textarea name="details" rows={3} placeholder="Describe cargo..." className="input resize-none" required />

                  <button className="btn-yellow w-full py-3 font-bold">SUBMIT REQUEST</button>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
