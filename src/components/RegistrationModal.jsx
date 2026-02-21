import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { getUTMParams } from "../utils/utm";

const SCRIPT_URL = import.meta.env.VITE_SCRIPT_URL || "https://crmgo.webscale.dz/api/v1/public/forms/47401ef7-042c-4994-8645-569b14749758/submit";

const RegistrationModal = ({ isOpen, onClose }) => {
  const [status, setStatus] = useState("idle");
  const overlayRef = useRef(null);
  const firstInputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => firstInputRef.current?.focus(), 80);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  // Close when backdrop clicked
  const onBackdropClick = (e) => {
    if (e.target === overlayRef.current) onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");

    try {
      const form = e.target;
      const formData = new FormData(form);

      // Capture UTM parameters
      const utms = getUTMParams();

      // Set UTM fields in FormData
      Object.entries(utms).forEach(([k, v]) => {
        if (v) formData.set(k, v);
      });

      const res = await fetch(SCRIPT_URL, {
        method: "POST",
        body: formData,
      });

      // Check if status is 2xx (success)
      if (res.ok && res.status >= 200 && res.status < 300) {
        setStatus("success");
        form.reset();
        alert("✅ تم إرسال بياناتك بنجاح!");
        setTimeout(() => {
          setStatus("idle");
          onClose();
        }, 1800);
      } else {
        setStatus("error");
        let errorMsg = "حدث خطأ أثناء الإرسال. حاول لاحقًا.";
        try {
          const errorData = await res.json();
          if (errorData.error || errorData.message) {
            errorMsg = errorData.error || errorData.message;
          }
        } catch {
          // Keep default error message
          console.error("submit failed", res.status);
        }
        alert(`⚠️ ${errorMsg}`);
      }
    } catch (err) {
      console.error("submit error", err);
      setStatus("error");
      alert("⚠️ حدث خطأ في الاتصال. تحقق من الإنترنت وحاول مجددًا.");
    }
  };

  return (
    <AnimatePresence>
        {isOpen && (
        // Backdrop
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          ref={overlayRef}
          onMouseDown={onBackdropClick}
          aria-hidden={!isOpen}
        >
          {/* translucent backdrop */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

          {/* Modal panel */}
          <motion.section
            role="dialog"
            aria-modal="true"
            aria-labelledby="reg-modal-title"
            aria-describedby="reg-modal-desc"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-2xl p-6"
            onMouseDown={(e) => e.stopPropagation()} 
          >
            {/* Close */}
            <div className="flex justify-end">
              <button
                type="button"
                aria-label="Close"
                onClick={onClose}
                className="p-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800"
              >
                ✕
              </button>
            </div>

            <header className="text-center mt-[-6]">
              <h2 id="reg-modal-title" className="text-2xl font-bold mb-1">
                🔷 التسجيل في ملتقى WEBSCALE
              </h2>
              <p id="reg-modal-desc" className="text-sm text-neutral-600 dark:text-neutral-400">
                📅 30 سبتمبر 2025 — 📍 المركز الثقافي بجامع الجزائر
              </p>
            </header>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium mb-1">الاسم الكامل<span className="text-red-500"> *</span></label>
                  <input
                    ref={firstInputRef}
                    name="fullName"
                    required
                    className="w-full px-3 py-2 rounded-md border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-[#fbbc05]/40"
                    placeholder="الاسم الكامل"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">المؤسسة</label>
                  <input
                    name="companyName"
                    className="w-full px-3 py-2 rounded-md border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:outline-none"
                    placeholder="اسم المؤسسة أو النشاط"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">الوظيفة</label>
                  <input
                    name="role"
                    className="w-full px-3 py-2 rounded-md border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:outline-none"
                    placeholder="مثال: مدير مشاريع"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">رقم الهاتف<span className="text-red-500"> *</span></label>
                  <input
                    name="phone"
                    type="tel"
                    required
                    className="w-full px-3 py-2 rounded-md border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:outline-none"
                    placeholder="مثال: +213xxxxxxxxx"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium mb-1">البريد الإلكتروني<span className="text-red-500"> *</span></label>
                  <input
                    name="email"
                    type="email"
                    required
                    className="w-full px-3 py-2 rounded-md border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:outline-none"
                    placeholder="name@domain.com"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium mb-2">القطاع</p>
                  <div className="flex flex-wrap gap-3">
                    {["تجارة إلكترونية", "خدمات رقمية", "صناعات صغيرة", "تكنولوجيا", "أخرى"].map((s) => (
                      <label key={s} className="inline-flex items-center gap-2 px-3 py-1 rounded-md border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 cursor-pointer">
                        <input type="radio" name="sector" value={s} className="accent-[#fbbc05]" />
                        <span className="text-sm">{s}</span>
                      </label>
                    ))}
                  </div>
                  <div className="mt-2">
                    <input name="otherSector" placeholder="اذكر القطاع إن اخترت أخرى" className="w-full px-3 py-2 rounded-md border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800" />
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium mb-2">هل تستخدم أدوات ذكاء اصطناعي؟</p>
                  <div className="flex gap-4">
                    {["نعم", "لا", "أفكر في البدء"].map((o) => (
                      <label key={o} className="inline-flex items-center gap-2 px-3 py-1 rounded-md border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 cursor-pointer">
                        <input type="radio" name="aiUsage" value={o} className="accent-[#fbbc05]" />
                        <span className="text-sm">{o}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium mb-2">ما أكثر محور يهمك؟</p>
                  <div className="flex flex-wrap gap-3">
                    {["تحسين تجربة الزبون", "أتمتة العمليات", "تحليل البيانات", "أدوات تسويق ذكية"].map((t) => (
                      <label key={t} className="inline-flex items-center gap-2 px-3 py-1 rounded-md border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 cursor-pointer">
                        <input type="radio" name="interest" value={t} className="accent-[#fbbc05]" />
                        <span className="text-sm">{t}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium mb-2">هل ترغب في تلقي محتوى حصري بعد الحدث؟</p>
                  <div className="flex gap-4">
                    {["نعم", "لا"].map((c) => (
                      <label key={c} className="inline-flex items-center gap-2 px-3 py-1 rounded-md border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 cursor-pointer">
                        <input type="radio" name="receiveContent" value={c} className="accent-[#fbbc05]" />
                        <span className="text-sm">{c}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Mandatory Fields Warning */}
              <div className="pt-4 pb-2">
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-300 dark:border-yellow-700 rounded-lg p-3">
                  <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200 text-center">
                    ⚠️ يرجى ملء جميع الحقول الإلزامية (المميزة بـ *) وإلا لن تتمكن من الإرسال
                  </p>
                </div>
              </div>

              {/* status messages */}
              <div className="min-h-[24px]">
                {status === "loading" && <p className="text-sm text-blue-600">⏳ جاري الإرسال...</p>}
                {status === "success" && <p className="text-sm text-green-600">✅ تم إرسال بياناتك بنجاح!</p>}
                {status === "error" && <p className="text-sm text-red-600">⚠️ حدث خطأ أثناء الإرسال. حاول لاحقًا.</p>}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-end mt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-md bg-neutral-100 dark:bg-neutral-800 hover:opacity-95"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="px-4 py-2 rounded-md bg-gradient-to-r from-[#fbbc05] to-[#715a1a] text-white font-semibold hover:opacity-95 disabled:opacity-60"
                >
                  إرسال
                </button>
              </div>
            </form>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RegistrationModal;

