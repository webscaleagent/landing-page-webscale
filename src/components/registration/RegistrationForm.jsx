// src/components/registration/RegistrationForm.jsx
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import AlgeriaWilayas from "../shared/AlgeriaWilayas";
import OptionPills from "./OptionPills";

const PUBLIC_SUBMIT_URL = `https://crmgo.webscale.dz/api/v1/public/forms/47401ef7-042c-4994-8645-569b14749758/submit`;

const fieldBase =
  "w-full rounded-xl border px-3 py-2 outline-none transition " +
  "border-gray-300 bg-white text-gray-900 " +
  "dark:border-neutral-600 dark:bg-neutral-800 dark:text-gray-100 " +
  "hover:border-[#FABC05]/60 hover:bg-[#FABC05]/5 " + // ← تم التحديث هنا
  "focus:border-[var(--brand)] focus:ring-2 focus:ring-[color:var(--brand)]/40";

const labelBase =
  "block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200";

const errorText = "mt-1 text-xs text-red-600 dark:text-red-400";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  jobTitle: "",
  company: "",
  wilaya: "",
  sector: "",
  employees: "",
  subscription: "",
  decisionMaker: "", // جديد
  bestCallTime: "", // جديد
  notes: "",
  honey: "",
};

export default function RegistrationForm() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modal, setModal] = useState(null); // {type, message}

  // ✅ refs لكل الحقول
  const fieldRefs = {
    name: useRef(null),
    email: useRef(null),
    phone: useRef(null),
    jobTitle: useRef(null),
    company: useRef(null),
    wilaya: useRef(null),
    sector: useRef(null),
    employees: useRef(null),
    subscription: useRef(null),
    decisionMaker: useRef(null), // جديد
    bestCallTime: useRef(null), // جديد
  };

  // إغلاق النافذة تلقائيًا بعد 5 ثوانٍ
  useEffect(() => {
    if (modal) {
      const timer = setTimeout(() => setModal(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [modal]);

  const disabled = useMemo(() => {
    return (
      isSubmitting ||
      !(
        form.name &&
        form.email &&
        form.phone &&
        form.jobTitle &&
        form.company &&
        form.wilaya &&
        form.sector &&
        form.employees &&
        form.subscription &&
        form.decisionMaker &&
        form.bestCallTime
      )
    );
  }, [form, isSubmitting]);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "هذا الحقل مطلوب";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "بريد غير صحيح";
    if (!form.phone.trim()) e.phone = "هذا الحقل مطلوب";
    if (!form.jobTitle) e.jobTitle = "اختر المسمى الوظيفي";
    if (!form.company.trim()) e.company = "هذا الحقل مطلوب";
    if (!form.wilaya) e.wilaya = "اختر الولاية";
    if (!form.sector.trim()) e.sector = "هذا الحقل مطلوب";
    if (!form.employees) e.employees = "اختر عدد الموظفين";
    if (!form.subscription) e.subscription = "اختر مدة الاشتراك";
    if (!form.decisionMaker) e.decisionMaker = "حدد إذا كنت صاحب القرار"; // جديد
    if (!form.bestCallTime) e.bestCallTime = "اختر أفضل وقت للاتصال"; // جديد
    // تحقق أن الولاية ضمن القائمة المعتمدة
    const allowedWilayas = [
      "أدرار",
      "الشلف",
      "الأغواط",
      "أم البواقي",
      "باتنة",
      "بجاية",
      "بسكرة",
      "بشار",
      "البليدة",
      "البويرة",
      "تمنراست",
      "تبسة",
      "تلمسان",
      "تيارت",
      "تيزي وزو",
      "الجزائر",
      "الجلفة",
      "جيجل",
      "سطيف",
      "سعيدة",
      "سكيكدة",
      "سيدي بلعباس",
      "عنابة",
      "قالمة",
      "قسنطينة",
      "المدية",
      "مستغانم",
      "المسيلة",
      "معسكر",
      "ورقلة",
      "وهران",
      "البيض",
      "إليزي",
      "برج بوعريريج",
      "بومرداس",
      "الطارف",
      "تندوف",
      "تيسمسيلت",
      "الوادي",
      "خنشلة",
      "سوق أهراس",
      "تيبازة",
      "ميلة",
      "عين الدفلى",
      "النعامة",
      "عين تموشنت",
      "غرداية",
      "غليزان",
      "تيميمون",
      "برج باجي مختار",
      "أولاد جلال",
      "بني عباس",
      "إن صالح",
      "إن قزام",
      "تقرت",
      "جانت",
      "المغير",
      "المنيعة",
    ];
    if (form.wilaya && !allowedWilayas.includes(form.wilaya)) {
      e.wilaya = "الولاية المختارة غير صالحة";
    }
    return e;
  };

  const validatePhone = (phone) => {
    // مطابق للنمط المطلوب: ^(\+213|0)(5|6|7)[0-9]{8}$
    const regex = /^(\+213|0)(5|6|7)[0-9]{8}$/;
    return regex.test(phone);
  };

  const fillMockData = () => {
    const mock = {
      name: "يوسف بن خدة",
      email: "youssef.benkhadda@example.com",
      phone: "+213551234567",
      jobTitle: "مدير قسم",
      company: "Webscale",
      wilaya: "الجزائر",
      sector: "تكنولوجيا",
      employees: "من 5 إلى 20",
      subscription: "مدة الاشتراك",
      projectProgress: "في مرحلة الإطلاق التجريبي (MVP)",
      trainingBudget: "من 2 الى 4 مليون سنتيم",
      decisionMaker: "نعم، أنا صاحب القرار",
      bestCallTime: "بعد الظهر (14:00 - 17:00)",
      notes: "بيانات تجريبية للتأكد من تدفق الإرسال.",
      honey: "",
    };
    setForm(mock);
    // امسح الأخطاء الظاهرة بعد التعبئة
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.honey) return; // 🐝 حماية من bots

    const v = validate();
    setErrors(v);

    // ✅ إذا فيه أخطاء → مرر للشاشة لأول خطأ
    if (Object.keys(v).length) {
      const firstErrorField = Object.keys(v)[0];
      if (fieldRefs[firstErrorField]?.current) {
        fieldRefs[firstErrorField].current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        fieldRefs[firstErrorField].current.focus();
      }
      return;
    }

    // ✅ تحقق إضافي للهاتف
    if (!validatePhone(form.phone)) {
      const err = {
        ...errors,
        phone:
          "⚠️ الرجاء إدخال رقم هاتف صحيح (9 أرقام على الأقل، مع إمكانية + في البداية).",
      };
      setErrors(err);
      fieldRefs.phone.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      fieldRefs.phone.current.focus();
      return;
    }

    setIsSubmitting(true);

    try {
      // تحويل القيم لمفاتيح عربية مطابقة لحقول الـ CRM
      const payload = {
        user_id: "public-user",
        data: {
          "الاسم الكامل": form.name,
          "البريد الإلكتروني": form.email,
          "رقم الهاتف (واتساب مفضل)": form.phone,
          "المسمى الوظيفي": form.jobTitle,
          "اسم المؤسسة": form.company,
          الولاية: form.wilaya,
          "القطاع الذي تعمل فيه": form.sector,
          "عدد الموظفين في الشركة": form.employees,
          "هل انت صاحب القرار في الشركة (قرار الاشتراك والدفع)":
            form.decisionMaker,
          "ما هو الوقت الأفضل للاتصال بك": form.bestCallTime,
          "مدة الاشتراك": form.subscription,
          "ملاحظات إضافية أو استفسار؟": form.notes || "",
        },
      };

      try {
        // المحاولة الأساسية: fetch قياسي مع JSON
        const res = await fetch(PUBLIC_SUBMIT_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(payload),
        });

        const data = await res.json().catch(() => ({}));

        // Check if status is 2xx (success)
        if (res.ok && res.status >= 200 && res.status < 300) {
          setModal({
            type: "success",
            message: "✅ تم تسجيلك بنجاح! سنراجع طلبك ونتواصل معك قريبًا.",
          });
          setForm(initialForm);
          return;
        }

        const msg1 = data?.error || data?.message || "⚠️ حدث خطأ غير متوقع.";
        if (msg1.includes("البريد الإلكتروني") && msg1.includes("exists")) {
          setErrors({
            ...errors,
            email: "⚠️ هذا البريد الإلكتروني مسجل مسبقًا.",
          });
          fieldRefs.email.current?.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
          fieldRefs.email.current?.focus();
          return;
        }
        if (msg1.includes("رقم الهاتف")) {
          setErrors({ ...errors, phone: msg1 });
          fieldRefs.phone.current?.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
          fieldRefs.phone.current?.focus();
          return;
        }
        // إن لم يكن ناجحًا ولا رسالة واضحة، سنجرب no-cors لاحقًا
      } catch (_) {
        // فشل الشبكة/ CORS → سنحاول fallback أدناه
      }

      try {
        // خطة بديلة: simple request بدون ترويسات (قد ينتج رد opaque لا يمكن قراءته)
        await fetch(PUBLIC_SUBMIT_URL, {
          method: "POST",
          body: JSON.stringify(payload),
        });

        // لا يمكن قراءة الاستجابة في no-cors، لذلك نعرض نجاحًا تفاؤليًا
        setModal({
          type: "success",
          message: "✅ تم إرسال طلبك. سنراجعه ونتواصل معك قريبًا.",
        });
        setForm(initialForm);
      } catch (e) {
        setModal({
          type: "error",
          message: "⚠️ تعذر إرسال الطلب. حاول لاحقًا.",
        });
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setModal({
        type: "error",
        message: "⚠️ حدث خطأ في الاتصال. تحقق من الإنترنت وحاول مجددًا.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* ✅ نافذة منبثقة */}
      <AnimatePresence>
        {modal && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`max-w-md w-full rounded-2xl p-6 shadow-2xl text-center relative
              ${
                modal.type === "success"
                  ? "bg-gradient-to-br from-green-50 to-green-100 border border-green-300 text-green-900"
                  : "bg-gradient-to-br from-red-50 to-red-100 border border-red-300 text-red-900"
              }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-4xl mb-3">
              {modal.type === "success" ? "✅" : "⚠️"}
            </div>
            <h3 className="text-2xl font-bold mb-2">
              {modal.type === "success" ? "تم تسجيل طلبك" : "حدث خطأ"}
            </h3>
            <p className="leading-relaxed text-sm md:text-base">
              {modal.message}
            </p>
            <div className="mt-5 flex flex-wrap gap-3 justify-center">
              <button
                onClick={() => setModal(null)}
                className="px-5 py-2 rounded-xl bg-[var(--brand)] text-black font-medium shadow hover:shadow-lg transition"
              >
                إغلاق
              </button>
              {modal.type === "success" && (
                <button
                  onClick={() => {
                    setModal(null);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="px-5 py-2 rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-medium shadow hover:shadow-lg transition"
                >
                  العودة للرئيسية
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ✅ الفورم */}
      <motion.div
        id="register"
        transition={{ duration: 0.6 }}
        className="lg:col-span-2 rounded-3xl border border-gray-200 dark:border-neutral-700 
                   bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl p-8 shadow-xl hover:shadow-2xl transition"
        whileHover={{ y: -3 }}
      >
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* زر تعبئة تلقائية للتجربة */}
          <div className="md:col-span-2 justify-end order-first hidden">
            <button
              type="button"
              onClick={fillMockData}
              className="px-3 py-2 text-xs rounded-lg border border-gray-300 dark:border-neutral-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-neutral-800 transition"
            >
              تعبئة تلقائية للتجربة
            </button>
          </div>
          {/* الاسم الكامل */}
          <div>
            <label className={labelBase}>
              الاسم الكامل <span className="text-red-500">*</span>
            </label>
            <input
              ref={fieldRefs.name}
              className={fieldBase}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            {errors.name && <div className={errorText}>{errors.name}</div>}
          </div>

          {/* البريد الإلكتروني */}
          <div>
            <label className={labelBase}>
              البريد الإلكتروني <span className="text-red-500">*</span>
            </label>
            <input
              ref={fieldRefs.email}
              type="email"
              className={fieldBase}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            {errors.email && <div className={errorText}>{errors.email}</div>}
          </div>

          {/* رقم الهاتف */}
          <div>
            <label className={labelBase}>
              رقم الهاتف (واتساب مفضل) <span className="text-red-500">*</span>
            </label>
            <input
              ref={fieldRefs.phone}
              type="tel"
              className={fieldBase}
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="مثال: +2135XXXXXXXX أو 05XXXXXXXX"
              dir="ltr"
            />
            {errors.phone && <div className={errorText}>{errors.phone}</div>}
          </div>

          {/* المسمى الوظيفي */}
          <div>
            <label className={labelBase}>
              المسمى الوظيفي <span className="text-red-500">*</span>
            </label>
            <select
              ref={fieldRefs.jobTitle}
              className={fieldBase}
              value={form.jobTitle}
              onChange={(e) => setForm({ ...form, jobTitle: e.target.value })}
            >
              <option value="">اختر</option>
              <option value="المدير العام">المدير العام</option>
              <option value="مسير الشركة">مسير الشركة</option>
              <option value="مدير فرع">مدير فرع</option>
              <option value="مدير قسم">مدير قسم</option>
              <option value="موظف">موظف</option>
              <option value="بدون عمل">بدون عمل</option>
            </select>
            {errors.jobTitle && (
              <div className={errorText}>{errors.jobTitle}</div>
            )}
          </div>

          {/* اسم المؤسسة */}
          <div>
            <label className={labelBase}>
              اسم المؤسسة <span className="text-red-500">*</span>
            </label>
            <input
              ref={fieldRefs.company}
              className={fieldBase}
              value={form.company}
              onChange={(e) => setForm({ ...form, company: e.target.value })}
            />
            {errors.company && (
              <div className={errorText}>{errors.company}</div>
            )}
          </div>

          {/* الولاية */}
          <div>
            <label htmlFor="wilaya" className={labelBase}>
              الولاية <span className="text-red-500">*</span>
            </label>
            <div ref={fieldRefs.wilaya}>
              <AlgeriaWilayas
                value={form.wilaya}
                onChange={(val) => setForm({ ...form, wilaya: val })}
                name="wilaya"
              />
            </div>
            {errors.wilaya && <div className={errorText}>{errors.wilaya}</div>}
          </div>

          {/* القطاع */}
          <div>
            <label className={labelBase}>
              القطاع الذي تعمل فيه <span className="text-red-500">*</span>
            </label>
            <input
              ref={fieldRefs.sector}
              className={fieldBase}
              value={form.sector}
              onChange={(e) => setForm({ ...form, sector: e.target.value })}
              placeholder="تقنية، تجارة، تعليم، خدمات... إلخ"
            />
            {errors.sector && <div className={errorText}>{errors.sector}</div>}
          </div>

          {/* عدد الموظفين */}
          <div ref={fieldRefs.employees} className="md:col-span-2">
            <OptionPills
              label="عدد الموظفين في الشركة"
              required
              name="employees"
              options={[
                "من 1 الى 10",
                "من 10 الى 20",
                "من 20 الى 100",
                "اكثر من 100",
              ]}
              value={form.employees}
              onChange={(val) => setForm({ ...form, employees: val })}
            />
            {errors.employees && (
              <div className={errorText}>{errors.employees}</div>
            )}
          </div>

          {/* صاحب القرار - جديد */}
          <div className="md:col-span-2">
            <label className={labelBase}>
              هل انت صاحب القرار في الشركة (قرار الاشتراك والدفع){" "}
              <span className="text-red-500">*</span>
            </label>
            <select
              ref={fieldRefs.decisionMaker}
              className={fieldBase}
              value={form.decisionMaker}
              onChange={(e) =>
                setForm({ ...form, decisionMaker: e.target.value })
              }
            >
              <option value="">اختر</option>
              <option value="نعم، أنا صاحب القرار">نعم، أنا صاحب القرار</option>
              <option value="لا، لكن يمكنني التأثير على القرار">
                لا، لكن يمكنني التأثير على القرار
              </option>
              <option value="لا، أحتاج لموافقة الإدارة">
                لا، أحتاج لموافقة الإدارة
              </option>
            </select>
            {errors.decisionMaker && (
              <div className={errorText}>{errors.decisionMaker}</div>
            )}
          </div>

          {/* أفضل وقت للاتصال - جديد */}
          <div className="md:col-span-2">
            <label className={labelBase}>
              ما هو الوقت الأفضل للاتصال بك{" "}
              <span className="text-red-500">*</span>
            </label>
            <select
              ref={fieldRefs.bestCallTime}
              className={fieldBase}
              value={form.bestCallTime}
              onChange={(e) =>
                setForm({ ...form, bestCallTime: e.target.value })
              }
            >
              <option value="">اختر الوقت المناسب</option>
              <option value="الصباح (8:00 - 12:00)">
                الصباح (8:00 - 12:00)
              </option>
              <option value="الظهيرة (12:00 - 14:00)">
                الظهيرة (12:00 - 14:00)
              </option>
              <option value="بعد الظهر (14:00 - 17:00)">
                بعد الظهر (14:00 - 17:00)
              </option>
              <option value="المساء (17:00 - 20:00)">
                المساء (17:00 - 20:00)
              </option>
              <option value="في أي وقت">في أي وقت</option>
            </select>
            {errors.bestCallTime && (
              <div className={errorText}>{errors.bestCallTime}</div>
            )}
          </div>

          {/* ملكية الحساب */}
          <div ref={fieldRefs.subscription} className="md:col-span-2">
            <OptionPills
              label="مدة الاشتراك"
              required
              name="subscription"
              options={["نصف سنوي", "سنوي"]}
              value={form.subscription}
              onChange={(val) => setForm({ ...form, subscription: val })}
            />
            {errors.subscription && (
              <div className={errorText}>{errors.subscription}</div>
            )}
          </div>

          {/* الاشتراك - تمت إزالته */}

          {/* ملاحظات */}
          <div className="md:col-span-2">
            <label className={labelBase}>ملاحظات إضافية أو استفسار؟</label>
            <textarea
              rows={4}
              className={fieldBase + " resize-none"}
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
            />
          </div>

          {/* Honeypot field - hidden from users */}
          <input
            type="text"
            name="honey"
            value={form.honey}
            onChange={(e) => setForm({ ...form, honey: e.target.value })}
            style={{ display: "none" }}
            tabIndex={-1}
            autoComplete="off"
          />

          {/* تحذير الحقول الإلزامية */}
          <div className="md:col-span-2 pt-4 pb-2">
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-300 dark:border-yellow-700 rounded-lg p-3">
              <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200 text-center">
                ⚠️ يرجى ملء جميع الحقول الإلزامية (المميزة بـ *) وإلا لن تتمكن من الإرسال
              </p>
            </div>
          </div>

          {/* زر الإرسال */}
          <div className="md:col-span-2 flex flex-col sm:flex-row items-start sm:items-center gap-3 mt-2">
            <motion.button
              whileHover={{ scale: disabled ? 1 : 1.03 }}
              whileTap={{ scale: disabled ? 1 : 0.97 }}
              type="submit"
              disabled={disabled}
              className="rounded-xl px-6 py-3 text-sm font-semibold shadow-md hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed
                         text-black bg-[var(--brand)]"
            >
              {isSubmitting ? "جاري الإرسال..." : "إرسال الطلب"}
            </motion.button>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              بالنقر على "إرسال الطلب"، أوافق على معالجة بياناتي لأغراض التسويق
              والتواصل.
            </p>
          </div>
        </form>
      </motion.div>
    </>
  );
}
