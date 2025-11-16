// src/components/pricing/PricingSection.jsx
"use client";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { plans } from "@/constants";

export default function PricingSection() {
  return (
    <section
      id="pricing"
      className="py-20 flex justify-center items-center bg-gradient-to-br from-yellow-50 via-white to-yellow-100 dark:from-neutral-900 dark:via-neutral-950 dark:to-neutral-900"
    >
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-extrabold mb-4">
          خطط الاشتراك <span className="text-[#FABC05]">Webscale</span>
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-12">
          اختر الخطة الأنسب لك وابدأ رحلتك مع مجتمعنا
        </p>

        <div dir="rtl" className="grid md:grid-cols-3 gap-8 ">
          {plans.map((plan, idx) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2 }}
              className={`relative flex flex-col justify-between rounded-3xl shadow-xl p-8 backdrop-blur-lg border transition hover:scale-[1.03] hover:shadow-2xl
                ${
                  plan.highlighted
                    ? "bg-gradient-to-br from-[#FABC05] to-[#f3ac39] text-black border-yellow-300"
                    : "bg-white/80 dark:bg-neutral-900/80 border-gray-200 dark:border-neutral-700"
                }`}
            >
              <div>
                {/* ⭐ Badge الأكثر شيوعاً */}
                {plan.highlighted && (
                  <span className="absolute -top-4 right-6 bg-black text-[#FABC05] text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                    المنصوح به
                  </span>
                )}

                <h3
                  className={`text-2xl font-bold mb-4 ${
                    plan.highlighted
                      ? "text-black"
                      : "text-gray-800 dark:text-gray-200"
                  }`}
                >
                  {plan.name}
                </h3>

                {/* السعر + ملاحظة بدون رسوم */}
                <div className="mb-6">
                  <p className="text-4xl font-extrabold">{plan.price}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    اشتراك {plan.name === "سنوي" ? "سنوي" : "نصف سنوي"} بدون احتساب رسوم إضافية
                  </p>
                </div>

                <ul dir="rtl" className="space-y-3 text-right">
                  {plan.features.map((f, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm leading-relaxed"
                    >
                      <CheckCircle
                        className={`w-5 h-5 shrink-0 ${
                          plan.highlighted ? "text-black" : "text-[#FABC05]"
                        }`}
                      />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <a href="#register">
                <button
                  className={`mt-8 w-full rounded-xl py-3 font-semibold shadow-md transition hover:shadow-lg
                    ${
                      plan.highlighted
                        ? "bg-black text-[#FABC05] hover:bg-neutral-800"
                        : "bg-[#FABC05] text-black hover:bg-yellow-400"
                    }`}
                >
                  اشترك الآن
                </button>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
