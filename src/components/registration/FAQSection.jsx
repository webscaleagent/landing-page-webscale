// src/components/registration/FAQSection.jsx
"use client";
import { motion } from "framer-motion";
import FAQItem from "./FAQItem";

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

export default function FAQSection() {
  return (
    <section
      id="faq"
      dir="rtl"
      className="relative py-20 md:py-28 bg-gradient-to-b from-yellow-50 via-white to-yellow-100 
                 dark:from-neutral-900 dark:via-neutral-950 dark:to-neutral-900 overflow-hidden"
    >
      {/* دوائر خلفية مزخرفة */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-10 right-10 w-72 h-72 bg-yellow-300/20 dark:bg-yellow-500/20 rounded-full blur-3xl opacity-70"
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.7, 0.5] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-80 h-80 bg-yellow-400/20 dark:bg-yellow-600/20 rounded-full blur-3xl opacity-70"
          animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.6, 0.4] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      {/* المحتوى */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* العنوان */}
        <motion.div
          {...fadeInUp}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
            الأسئلة الشائعة
          </h2>
          <p className="mt-3 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            إجابات على أكثر التساؤلات التي تردنا حول الانضمام والمجتمع.
          </p>
        </motion.div>

        {/* الأسئلة */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {[
            {
              q: "من يمكنه الانضمام؟",
              a: "المجتمع مخصص حصرياً لأصحاب الشركات والمسيرين. يتم التحقق من الهوية والصفة عبر نموذج التقديم.",
            },
            {
              q: "كيف يتم القبول؟",
              a: "نراجع الطلبات خلال فترة قصيرة. حال الموافقة، نرسل لك رابط دعوة خاص على البريد لتنضم الى مجتمعنا.",
            },
            {
              q: "ما هي مواعيد البثوث؟",
              a: "مواعيد البثوث والاستشارات الجماعية: كل سبت واثنين من الأسبوع. تُسجَّل الجلسات وتُنشر داخل المجتمع مع خلاصة تنفيذية.",
            },
            {
              q: "هل توجد خطة مجانية؟",
              a: "نعم! توجد خطة مجانية تحتوي على بعض البثوث المسجلة و بالاضافة الى بعض الدورات التدريبية مثل facebook ads و التسوق بالمحتوى.",
            },
            {
              q: "ما تكلفة العضوية؟",
              a: "نوفر خطتين: الخطة نصف سنوية (35,000 دج) والخطة السنوية (60,000 دج). كلا الخطتين تشمل الوصول الكامل للمجتمع، حضور الاستشارات الأسبوعية، والدورات المسجلة.",
            },
            {
              q: "هل المحتوى باللغة العربية؟",
              a: "نعم، جميع الجلسات والمواد باللغة العربية مع خبراء محليين وإقليميين. نركز على السوق الجزائري والمغاربي.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              {...fadeInUp}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="rounded-2xl border border-gray-200 dark:border-neutral-700 
                         bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl 
                         shadow-md hover:shadow-xl transition overflow-hidden"
            >
              <FAQItem q={item.q} a={item.a} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
