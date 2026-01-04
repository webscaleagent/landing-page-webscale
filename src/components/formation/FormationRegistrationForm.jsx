import { useEffect, useMemo, useRef, useState } from "react";
import AlgeriaWilayas from "../shared/AlgeriaWilayas";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

// ============================================
// CONFIGURATION
// ============================================
const FORM_ID = "9699183e-5d2b-4969-832b-9abf4dddea48";
const PUBLIC_SUBMIT_URL = `https://crmgo.webscale.dz/api/v1/public/forms/${FORM_ID}/submit`;

const fieldBase =
  "w-full rounded-xl border px-3 py-2 outline-none transition " +
  "border-gray-300 bg-white text-gray-900 " +
  "dark:border-neutral-600 dark:bg-neutral-800 dark:text-gray-100 " +
  "hover:border-[#FABC05]/60 hover:bg-[#FABC05]/5 " +
  "focus:border-[var(--brand)] focus:ring-2 focus:ring-[color:var(--brand)]/40";

const labelBase = "block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200";
const errorText = "mt-1 text-xs text-red-600 dark:text-red-400";

// ============================================
// Form fields - Matching CRM structure
// ============================================
const initialForm = {
  companyName: "", // "اسم الشركة" - required, order 1
  employeeCount: "", // "عدد الموظفين" - required, order 2
  jobTitle: "", // "Job Title" - optional
  fullName: "", // "الاسم واللقب" - required, order 3
  phone: "", // "رقم الواتس آب" - required, unique, order 4
  email: "", // "الايميل" - required, unique, order 5
  cohort: "", // "اختر الفوج" - required, order 6
  state: "", // "الولاية" - optional, order 7
  isWebscaleMember: "", // "هل أنت عضو في Webscale؟" - optional, order 8
  honey: "", // Honeypot for bot protection - DO NOT REMOVE
};

export default function FormationRegistrationForm({ onSuccess }) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modal, setModal] = useState(null); // {type: "success"|"error", message: string}

  // Refs for field focus management
  const fieldRefs = {
    companyName: useRef(null),
    employeeCount: useRef(null),
    jobTitle: useRef(null),
    fullName: useRef(null),
    phone: useRef(null),
    email: useRef(null),
    cohort: useRef(null),
    state: useRef(null),
    isWebscaleMember: useRef(null),
  };

  // Auto-close modal after 5 seconds
  useEffect(() => {
    if (modal) {
      const timer = setTimeout(() => setModal(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [modal]);

  // Form disabled state
  const disabled = useMemo(() => {
    return (
      isSubmitting ||
      !(
        form.companyName &&
        form.employeeCount &&
        form.jobTitle &&
        form.fullName &&
        form.phone &&
        form.email &&
        form.cohort
      )
    );
  }, [form, isSubmitting]);

  // Validation logic
  const validate = () => {
    const e = {};

    // Required fields (matching CRM requirements)
    if (!form.companyName.trim()) e.companyName = "هذا الحقل مطلوب";
    if (!form.employeeCount) e.employeeCount = "اختر عدد الموظفين";
    if (!form.jobTitle) e.jobTitle = "اختر المنصب الوظيفي";
    if (!form.fullName.trim()) e.fullName = "هذا الحقل مطلوب";
    if (!form.phone.trim()) e.phone = "هذا الحقل مطلوب";
    if (!form.email.trim()) e.email = "هذا الحقل مطلوب";
    if (!form.cohort) e.cohort = "اختر الفوج";

    // Email format validation
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = "بريد غير صحيح";
    }

    // State is optional, no validation needed

    return e;
  };

  // Phone validation (Algerian format)
  const validatePhone = (phone) => {
    const regex = /^(\+213|0)(5|6|7)[0-9]{8}$/;
    return regex.test(phone);
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Bot protection
    if (form.honey) return;

    // Validate
    const v = validate();
    setErrors(v);

    // Scroll to first error
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

    // Additional phone validation
    if (!validatePhone(form.phone)) {
      const err = {
        ...errors,
        phone: "⚠️ الرجاء إدخال رقم هاتف صحيح (9 أرقام على الأقل، مع إمكانية + في البداية).",
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
      // Map form data to CRM fields (using exact Arabic labels from CRM)
      const payload = {
        user_id: "public-user",
        data: {
          "اسم الشركة": form.companyName,
          "عدد الموظفين": form.employeeCount,
          "المنصب الوظيفي": form.jobTitle,
          "الاسم واللقب": form.fullName,
          "رقم الواتس آب": form.phone,
          "الايميل": form.email,
          "اختر الفوج": form.cohort,
          "الولاية": form.state || "", // Optional field
          "هل أنت عضو في Webscale؟": form.isWebscaleMember || "", // Optional field, order 8
        },
      };

      try {
        // Primary attempt: Standard fetch
        const res = await fetch(PUBLIC_SUBMIT_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(payload),
        });

        const data = await res.json().catch(() => ({}));

        // Success
        if (res.ok && res.status >= 200 && res.status < 300) {
          setModal({
            type: "success",
            message: "✅ تم إرسال طلبك بنجاح! سنتواصل معك قريبًا.",
          });
          setForm(initialForm); // Reset form
          if (onSuccess) onSuccess();
          return;
        }

        // Handle errors
        const msg1 = data?.error || data?.message || "⚠️ حدث خطأ غير متوقع.";

        // Handle unique email validation error
        if (msg1.includes("الايميل") || msg1.includes("البريد") || (msg1.includes("email") && msg1.includes("exists"))) {
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

        // Handle unique phone validation error
        if (msg1.includes("رقم الواتس") || msg1.includes("الهاتف") || (msg1.includes("phone") && msg1.includes("exists"))) {
          setErrors({ ...errors, phone: "⚠️ رقم الواتس آب هذا مسجل مسبقًا." });
          fieldRefs.phone.current?.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
          fieldRefs.phone.current?.focus();
          return;
        }

        setModal({
          type: "error",
          message: msg1,
        });
      } catch (_) {
        // Network/CORS error - try fallback
        try {
          await fetch(PUBLIC_SUBMIT_URL, {
            method: "POST",
            body: JSON.stringify(payload),
          });

          setModal({
            type: "success",
            message: "✅ تم إرسال طلبك. سنراجعه ونتواصل معك قريبًا.",
          });
          setForm(initialForm);
          if (onSuccess) onSuccess();
        } catch (e) {
          setModal({
            type: "error",
            message: "⚠️ تعذر إرسال الطلب. حاول لاحقًا.",
          });
        }
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
      {/* Success/Error Modal */}
      <Dialog open={!!modal} onOpenChange={(open) => !open && setModal(null)}>
        <DialogContent
          className={`max-w-md ${
            modal?.type === "success"
              ? "bg-gradient-to-br from-green-50 to-green-100 border-green-300 dark:from-green-900/20 dark:to-green-800/20 dark:border-green-700"
              : "bg-gradient-to-br from-red-50 to-red-100 border-red-300 dark:from-red-900/20 dark:to-red-800/20 dark:border-red-700"
          }`}
        >
          <DialogHeader>
            <div className="text-4xl mb-3 text-center">
              {modal?.type === "success" ? "✅" : "⚠️"}
            </div>
            <DialogTitle
              className={`text-2xl font-bold text-center ${
                modal?.type === "success"
                  ? "text-green-900 dark:text-green-100"
                  : "text-red-900 dark:text-red-100"
              }`}
            >
              {modal?.type === "success" ? "تم إرسال طلبك" : "حدث خطأ"}
            </DialogTitle>
            <DialogDescription
              className={`text-base leading-relaxed text-center mt-2 ${
                modal?.type === "success"
                  ? "text-green-800 dark:text-green-200"
                  : "text-red-800 dark:text-red-200"
              }`}
            >
              {modal?.message}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-col sm:flex-row gap-3 justify-center mt-4">
            <button
              onClick={() => setModal(null)}
              className="px-5 py-2 rounded-xl bg-[var(--brand)] text-black font-medium shadow hover:shadow-lg transition"
            >
              إغلاق
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Company Name Field - Order 1 */}
        <div>
          <label className={labelBase}>
            اسم الشركة <span className="text-red-500">*</span>
          </label>
          <input
            ref={fieldRefs.companyName}
            className={fieldBase}
            value={form.companyName}
            onChange={(e) => setForm({ ...form, companyName: e.target.value })}
            placeholder="اسم الشركة"
          />
          {errors.companyName && <div className={errorText}>{errors.companyName}</div>}
        </div>

        {/* Employee Count Field - Order 2 */}
        <div>
          <label className={labelBase}>
            عدد الموظفين <span className="text-red-500">*</span>
          </label>
          <Select
            value={form.employeeCount}
            onValueChange={(value) => setForm({ ...form, employeeCount: value })}
            
          >
            <SelectTrigger className={fieldBase}>
              <SelectValue placeholder="اختر عدد الموظفين" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="أقل من 5">أقل من 5</SelectItem>
              <SelectItem value="من 05 إلى 10 موظفين">من 05 إلى 10 موظفين</SelectItem>
              <SelectItem value="من 10 إلى 50 موظف">من 10 إلى 50 موظف</SelectItem>
              <SelectItem value="من 50 موظف فما فوق">من 50 موظف فما فوق</SelectItem>
            </SelectContent>
          </Select>
          {errors.employeeCount && <div className={errorText}>{errors.employeeCount}</div>}
        </div>

        {/* Job Title Field */}
        <div>
          <label className={labelBase}>
            المنصب الوظيفي <span className="text-red-500">*</span>
          </label>
          <Select
            value={form.jobTitle}
            onValueChange={(value) => setForm({ ...form, jobTitle: value })}
          >
            <SelectTrigger className={fieldBase} ref={fieldRefs.jobTitle}>
              <SelectValue placeholder="اختر المنصب الوظيفي" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="رئيس الشركة">رئيس الشركة</SelectItem>
              <SelectItem value="مدير">مسير</SelectItem>
              <SelectItem value="موظف">موظف</SelectItem>
            </SelectContent>
          </Select>
          {errors.jobTitle && <div className={errorText}>{errors.jobTitle}</div>}
        </div>

        {/* Full Name Field - Order 3 */}
        <div>
          <label className={labelBase}>
            الاسم واللقب <span className="text-red-500">*</span>
          </label>
          <input
            ref={fieldRefs.fullName}
            className={fieldBase}
            value={form.fullName}
            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
            placeholder="الاسم واللقب"
          />
          {errors.fullName && <div className={errorText}>{errors.fullName}</div>}
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Phone Field - Order 4 */}
          <div>
            <label className={labelBase}>
              رقم الواتس آب <span className="text-red-500">*</span>
            </label>
            <input
              ref={fieldRefs.phone}
              type="tel"
              className={fieldBase}
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="مثال: +2135 XXXXXXXXX05 أو XXXXXXXX"
              dir="ltr"
            />
            {errors.phone && <div className={errorText}>{errors.phone}</div>}
          </div>

          {/* Email Field - Order 5 */}
          <div>
            <label className={labelBase}>
              الايميل <span className="text-red-500">*</span>
            </label>
            <input
              ref={fieldRefs.email}
              type="email"
              className={fieldBase}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="example@email.com"
            />
            {errors.email && <div className={errorText}>{errors.email}</div>}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Cohort Field - Order 6 */}
          <div>
            <label className={labelBase}>
              اختر الفوج <span className="text-red-500">*</span>
            </label>
            <Select
              value={form.cohort}
              onValueChange={(value) => setForm({ ...form, cohort: value })}
            >
              <SelectTrigger className={fieldBase}>
                <SelectValue placeholder="اختر الفوج" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="فوج 13, 14, 15 ديسمبر" disabled>فوج 13, 14, 15 ديسمبر (ممتلئ)</SelectItem>
                <SelectItem value="فوج 27, 28, 29 ديسمبر" disabled>فوج 27, 28, 29 ديسمبر (ممتلئ)</SelectItem>
                <SelectItem value="الفوج الثالث - 10, 11, 12 جانفي">الفوج الثالث - 10, 11, 12 جانفي</SelectItem>
                <SelectItem value="الفوج الرابع - 13, 14, 15 جانفي">الفوج الرابع - 13, 14, 15 جانفي</SelectItem>
                <SelectItem value="الفوج الخامس - 17, 18, 19 جانفي">الفوج الخامس - 17, 18, 19 جانفي</SelectItem>
                <SelectItem value="الفوج السادس - 20, 21, 22 جانفي">الفوج السادس - 20, 21, 22 جانفي</SelectItem>
              </SelectContent>
            </Select>
            {errors.cohort && <div className={errorText}>{errors.cohort}</div>}
          </div>

          {/* State Field - Order 7 (Optional) */}
          <div>
            <label className={labelBase}>الولاية</label>
            <AlgeriaWilayas
              value={form.state}
              onChange={(value) => setForm({ ...form, state: value })}
            />
            {errors.state && <div className={errorText}>{errors.state}</div>}
          </div>
        </div>

        {/* Webscale Member Field - Order 8 (Optional) */}
        <div>
          <label className={labelBase}>هل أنت عضو في Webscale؟</label>
          <div className="flex gap-4 mt-2">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                ref={fieldRefs.isWebscaleMember}
                type="radio"
                name="isWebscaleMember"
                value="نعم"
                checked={form.isWebscaleMember === "نعم"}
                onChange={(e) => setForm({ ...form, isWebscaleMember: e.target.value })}
                className="w-4 h-4 text-[#FABC05] border-gray-300 focus:ring-[#FABC05] focus:ring-2 cursor-pointer"
              />
              <span className="text-gray-700 dark:text-gray-300 group-hover:text-[#FABC05] transition-colors duration-300">نعم</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                type="radio"
                name="isWebscaleMember"
                value="لا"
                checked={form.isWebscaleMember === "لا"}
                onChange={(e) => setForm({ ...form, isWebscaleMember: e.target.value })}
                className="w-4 h-4 text-[#FABC05] border-gray-300 focus:ring-[#FABC05] focus:ring-2 cursor-pointer"
              />
              <span className="text-gray-700 dark:text-gray-300 group-hover:text-[#FABC05] transition-colors duration-300">لا</span>
            </label>
          </div>
          {errors.isWebscaleMember && <div className={errorText}>{errors.isWebscaleMember}</div>}
        </div>

        {/* Honeypot Field - DO NOT REMOVE */}
        <input
          type="text"
          name="honey"
          value={form.honey}
          onChange={(e) => setForm({ ...form, honey: e.target.value })}
          style={{ display: "none" }}
          tabIndex={-1}
          autoComplete="off"
        />

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={disabled}
            className="w-full rounded-xl px-6 py-3 text-sm font-semibold shadow-md hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed text-black bg-[var(--brand)]"
          >
            {isSubmitting ? "جاري الإرسال..." : "إرسال التسجيل"}
          </button>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 text-center">
            بالنقر على "إرسال التسجيل"، أوافق على معالجة بياناتي لأغراض التواصل.
          </p>
        </div>
      </form>
    </>
  );
}
