/**
 * FORM LOGIC TEMPLATE
 * 
 * This is a reusable form logic template extracted from RegistrationForm.jsx
 * Copy this code and adapt it for your needs in other landing pages.
 * 
 * USAGE:
 * 1. Copy this file or the logic below
 * 2. Update the initialForm state with your fields
 * 3. Update validation logic
 * 4. Update the payload mapping to match your CRM fields
 * 5. Update the PUBLIC_SUBMIT_URL with your form ID
 * 6. Customize the JSX form fields
 */

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

// ============================================
// CONFIGURATION
// ============================================
const PUBLIC_SUBMIT_URL = `https://crmgo.webscale.dz/api/v1/public/forms/YOUR_FORM_ID_HERE/submit`;

// CSS Classes
const fieldBase =
  "w-full rounded-xl border px-3 py-2 outline-none transition " +
  "border-gray-300 bg-white text-gray-900 " +
  "dark:border-neutral-600 dark:bg-neutral-800 dark:text-gray-100 " +
  "hover:border-[#FABC05]/60 hover:bg-[#FABC05]/5 " +
  "focus:border-[var(--brand)] focus:ring-2 focus:ring-[color:var(--brand)]/40";

const labelBase = "block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200";
const errorText = "mt-1 text-xs text-red-600 dark:text-red-400";

// ============================================
// STEP 1: Define your form fields
// ============================================
const initialForm = {
  name: "",
  email: "",
  phone: "",
  // Add your custom fields here
  // company: "",
  // message: "",
  honey: "", // Honeypot for bot protection - DO NOT REMOVE
};

// ============================================
// STEP 2: Form Component
// ============================================
export default function YourFormComponent() {
  // State Management
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modal, setModal] = useState(null); // {type: "success"|"error", message: string}

  // Refs for field focus management
  const fieldRefs = {
    name: useRef(null),
    email: useRef(null),
    phone: useRef(null),
    // Add refs for your custom fields
  };

  // Auto-close modal after 5 seconds
  useEffect(() => {
    if (modal) {
      const timer = setTimeout(() => setModal(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [modal]);

  // ============================================
  // STEP 3: Form disabled state (update required fields)
  // ============================================
  const disabled = useMemo(() => {
    return (
      isSubmitting ||
      !(
        form.name &&
        form.email &&
        form.phone
        // Add all required fields here
      )
    );
  }, [form, isSubmitting]);

  // ============================================
  // STEP 4: Validation logic (customize as needed)
  // ============================================
  const validate = () => {
    const e = {};
    
    // Required fields
    if (!form.name.trim()) e.name = "هذا الحقل مطلوب";
    if (!form.email.trim()) e.email = "هذا الحقل مطلوب";
    if (!form.phone.trim()) e.phone = "هذا الحقل مطلوب";
    
    // Email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "بريد غير صحيح";
    
    // Add more validation rules here
    
    return e;
  };

  // Phone validation (Algerian format)
  const validatePhone = (phone) => {
    const regex = /^(\+213|0)(5|6|7)[0-9]{8}$/;
    return regex.test(phone);
  };

  // ============================================
  // STEP 5: Submit handler (core logic)
  // ============================================
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
      // ============================================
      // STEP 6: Map form data to CRM fields (UPDATE THIS)
      // ============================================
      const payload = {
        user_id: "public-user",
        data: {
          "الاسم الكامل": form.name,
          "البريد الإلكتروني": form.email,
          "رقم الهاتف (واتساب مفضل)": form.phone,
          // Map your custom fields to Arabic labels matching your CRM
          // "اسم المؤسسة": form.company,
          // "الرسالة": form.message,
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
          return;
        }
        
        // Handle errors
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
        
      } catch (_) {
        // Network/CORS error - try fallback
      }
      
      // Fallback: No-cors request
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

  // ============================================
  // STEP 7: JSX Form (customize the fields)
  // ============================================
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
        {/* Name Field */}
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

        {/* Email Field */}
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

        {/* Phone Field */}
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

        {/* Add your custom fields here */}
        {/* 
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
          {errors.company && <div className={errorText}>{errors.company}</div>}
        </div>
        */}

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
            {isSubmitting ? "جاري الإرسال..." : "إرسال الطلب"}
          </button>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 text-center">
            بالنقر على "إرسال الطلب"، أوافق على معالجة بياناتي لأغراض التواصل.
          </p>
        </div>
      </form>
    </>
  );
}

/**
 * QUICK REFERENCE:
 * 
 * 1. Update PUBLIC_SUBMIT_URL with your form ID
 * 2. Add your fields to initialForm
 * 3. Add refs to fieldRefs object
 * 4. Update disabled useMemo with required fields
 * 5. Update validate() function
 * 6. Update payload.data mapping to Arabic field names
 * 7. Add your form fields in JSX
 * 
 * KEY FEATURES:
 * ✅ Client-side validation
 * ✅ Phone number validation (Algerian format)
 * ✅ Auto-scroll to errors
 * ✅ Field focus management
 * ✅ Success/error modals
 * ✅ Bot protection (honeypot)
 * ✅ CORS fallback
 * ✅ Form reset after success
 */

