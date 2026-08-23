"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowDown01Icon,
} from "@hugeicons/core-free-icons";
import { FAQS, EVENT_DETAILS } from "@/lib/data";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="relative py-16 sm:py-24 px-3 sm:px-6 lg:px-8 max-w-4xl mx-auto z-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-2xl mb-8 sm:mb-12"
      >
        <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-widest text-[#8E35EA] dark:text-[#AD5CFF] block mb-1.5">
          FAQ
        </span>
        <h2 className="text-2xl sm:text-4xl font-black text-slate-950 dark:text-white tracking-tight leading-tight">
          Frequently Asked Questions
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          Information regarding tickets, student eligibility, hands-on lab prerequisites, and certificates.
        </p>
      </motion.div>

      {/* Accordion with Staggered View Reveal */}
      <div className="space-y-2.5">
        {FAQS.map((faq, index) => {
          const isOpen = openIndex === index;

          return (
            <motion.div
              key={faq.question}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.45, delay: index * 0.04 }}
              className={`rounded-xl transition-colors border overflow-hidden shadow-sm ${
                isOpen
                  ? "bg-purple-50/40 dark:bg-[#0C1028] border-[#AD5CFF]/30 shadow-lg shadow-purple-500/5 dark:shadow-[#AD5CFF]/5"
                  : "bg-white dark:bg-[#090E1E] border-slate-200/80 dark:border-white/[0.06] hover:border-slate-300 dark:hover:border-white/15"
              }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 focus:outline-none cursor-pointer"
              >
                <span className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white">
                  {faq.question}
                </span>
                <div
                  className={`h-6 w-6 rounded flex items-center justify-center shrink-0 transition-transform duration-200 ${
                    isOpen ? "rotate-180 text-[#8E35EA] dark:text-[#AD5CFF]" : "text-slate-400"
                  }`}
                >
                  <HugeiconsIcon icon={ArrowDown01Icon} className="h-4 w-4" />
                </div>
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-white/[0.05]">
                      <p>{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Direct Contact Line */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-8 text-center text-xs text-slate-500 dark:text-slate-400"
      >
        Still have a question? Contact the student team directly at{" "}
        <a
          href={`mailto:${EVENT_DETAILS.email}`}
          className="text-[#8E35EA] dark:text-[#BE7BFF] hover:underline font-semibold"
        >
          {EVENT_DETAILS.email}
        </a>
      </motion.div>
    </section>
  );
}
