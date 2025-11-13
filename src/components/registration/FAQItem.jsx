// src/components/registration/FAQItem.jsx
"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="cursor-pointer select-none"
      onClick={() => setOpen(!open)}
    >
      {/* رأس السؤال */}
      <div className="flex items-center justify-between px-5 py-4">
        <h3 className="font-semibold text-gray-900 dark:text-white text-base">
          {q}
        </h3>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-gray-500 dark:text-gray-400"
        >
          <ChevronDown size={20} />
        </motion.div>
      </div>

      {/* الإجابة */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="px-5 pb-4 text-sm text-gray-700 dark:text-gray-300 leading-relaxed border-t border-gray-200 dark:border-neutral-700 pt-4"
          >
            {a}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
