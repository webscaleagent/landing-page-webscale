import { useEffect, useMemo, useRef, useState } from "react";
import { getUTMParams } from "../../utils/utm";
import OptionPills from "../registration/OptionPills";
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
// Default form ID for backward compatibility
const DEFAULT_FORM_ID = "9699183e-5d2b-4969-832b-9abf4dddea48";

// Default cohorts for backward compatibility
const DEFAULT_COHORTS = [
  { value: "قائمة الانتظار", label: "✅ قائمة الانتظار - احصل على أولوية عند فتح مقاعد جديدة", disabled: false },
  { value: "فوج 13, 14, 15 ديسمبر", label: "فوج 13, 14, 15 ديسمبر (ممتلئ)", disabled: true },
  { value: "فوج 27, 28, 29 ديسمبر", label: "فوج 27, 28, 29 ديسمبر (ممتلئ)", disabled: true },
  { value: "الفوج الثالث - 10, 11, 12 جانفي", label: "الفوج الثالث - 10, 11, 12 جانفي (ممتلئ)", disabled: true },
  { value: "الفوج الرابع - 13, 14, 15 جانفي", label: "الفوج الرابع - 13, 14, 15 جانفي (ممتلئ)", disabled: true },
  { value: "الفوج الخامس - 17, 18, 19 جانفي", label: "الفوج الخامس - 17, 18, 19 جانفي (ممتلئ)", disabled: true },
  { value: "الفوج السادس - 20, 21, 22 جانفي", label: "الفوج السادس - 20, 21, 22 جانفي (ممتلئ)", disabled: true },
  { value: "الفوج السابع - 31 جانفي 02 , 01 فيفري", label: "الفوج السابع - 31 جانفي 02 , 01 فيفري (ممتلئ)", disabled: true },
];

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
  legalForm: "", // "ما هو الشكل القانوني لشركتك؟" - required
  otherLegalForm: "", // "شكل قانوني آخر" - optional, shown when legalForm is "أخرى"
  companyEstablished: "", // "منذ متى تأسست شركتك؟" - required
  businessSector: "", // "القطاع" - optional
  otherBusinessSector: "", // "قطاع آخر" - optional, shown when businessSector is "أخرى"
  jobTitle: "", // "Job Title" - optional
  managerExperienceDuration: "", // "مدة الخبرة في المنصب" - optional, shown when jobTitle is "مسير"
  fullName: "", // "الاسم واللقب" - required, order 3
  phone: "", // "رقم الواتس آب" - required, unique, order 4
  email: "", // "الايميل" - required, unique, order 5
  cohort: "", // "اختر الفوج" - required, order 6
  state: "", // "الولاية" - optional, order 7
  isWebscaleMember: "", // "هل أنت عضو في Webscale؟" - optional, order 8
  honey: "", // Honeypot for bot protection - DO NOT REMOVE
};

export default function FormationRegistrationForm({ 
  onSuccess, 
  formId = DEFAULT_FORM_ID,
  cohorts = DEFAULT_COHORTS,
  fieldsConfig = {}
}) {
  const PUBLIC_SUBMIT_URL = `https://crmgo.webscale.dz/api/v1/public/forms/${formId}/submit`;
  
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modal, setModal] = useState(null); // {type: "success"|"error", message: string}

  // Refs for field focus management
  const fieldRefs = {
    companyName: useRef(null),
    employeeCount: useRef(null),
    legalForm: useRef(null),
    otherLegalForm: useRef(null),
    companyEstablished: useRef(null),
    businessSector: useRef(null),
    otherBusinessSector: useRef(null),
    jobTitle: useRef(null),
    managerExperienceDuration: useRef(null),
    fullName: useRef(null),
    phone: useRef(null),
    email: useRef(null),
    cohort: useRef(null),
    state: useRef(null),
    isWebscaleMember: useRef(null),
  };

  // State for conditional fields visibility
  const [showOtherBusinessSector, setShowOtherBusinessSector] = useState(false);
  const [showOtherLegalForm, setShowOtherLegalForm] = useState(false);

  // Helper functions for field configuration
  const isRequired = (field) => {
    if (fieldsConfig?.[field]?.required !== undefined) return fieldsConfig[field].required;
    const defaultRequired = [
      "companyName", "employeeCount", "legalForm", "companyEstablished", 
      "jobTitle", "fullName", "phone", "email", "cohort"
    ];
    return defaultRequired.includes(field);
  };

  const isHidden = (field) => fieldsConfig?.[field]?.hidden === true;

  // Auto-close modal after 5 seconds
  useEffect(() => {
    if (modal) {
      const timer = setTimeout(() => setModal(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [modal]);

  // Form disabled state
  const disabled = useMemo(() => {
    if (isSubmitting) return true;

    const fieldsToCheck = [
      "companyName", "employeeCount", "legalForm", "businessSector", "companyEstablished", 
      "jobTitle", "fullName", "phone", "email", "cohort", "isWebscaleMember"
    ];

    for (const field of fieldsToCheck) {
      if (!isHidden(field) && isRequired(field) && !form[field]) return true;
    }

    return false;
  }, [form, isSubmitting, fieldsConfig]);

  // Validation logic
  const validate = () => {
    const e = {};

    // Required fields (matching CRM requirements)
    if (!isHidden("companyName") && isRequired("companyName") && !form.companyName.trim()) e.companyName = "هذا الحقل مطلوب";
    if (!isHidden("employeeCount") && isRequired("employeeCount") && !form.employeeCount) e.employeeCount = "اختر عدد الموظفين";
    if (!isHidden("legalForm") && isRequired("legalForm") && !form.legalForm) e.legalForm = "اختر الشكل القانوني للشركة";
    if (!isHidden("businessSector") && isRequired("businessSector") && !form.businessSector) e.businessSector = "اختر مجال نشاط شركتك";
    if (!isHidden("companyEstablished") && isRequired("companyEstablished") && !form.companyEstablished) e.companyEstablished = "اختر تاريخ تأسيس الشركة";
    if (!isHidden("jobTitle") && isRequired("jobTitle") && !form.jobTitle) e.jobTitle = "اختر المنصب الوظيفي";
    
    // If job title is "مسير", manager experience duration is required
    if (!isHidden("managerExperienceDuration") && form.jobTitle === "مسير" && !form.managerExperienceDuration) {
      e.managerExperienceDuration = "هذا الحقل مطلوب";
    }
    
    if (!isHidden("fullName") && isRequired("fullName") && !form.fullName.trim()) e.fullName = "هذا الحقل مطلوب";
    if (!isHidden("phone") && isRequired("phone") && !form.phone.trim()) e.phone = "هذا الحقل مطلوب";
    if (!isHidden("email") && isRequired("email") && !form.email.trim()) e.email = "هذا الحقل مطلوب";
    if (!isHidden("cohort") && isRequired("cohort") && !form.cohort) e.cohort = "اختر الفوج";
    if (!isHidden("isWebscaleMember") && isRequired("isWebscaleMember") && !form.isWebscaleMember) e.isWebscaleMember = "يرجى تحديد ما إذا كنت عضوًا في Webscale";

    // Email format validation
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = "بريد غير صحيح";
    }

    // If "أخرى" is selected for legal form, otherLegalForm is required
    if (!isHidden("legalForm") && form.legalForm === "أخرى" && !form.otherLegalForm.trim()) {
      e.otherLegalForm = "يرجى تحديد الشكل القانوني";
    }

    // If "أخرى" is selected for business sector, otherBusinessSector is required
    if (!isHidden("businessSector") && form.businessSector === "أخرى" && !form.otherBusinessSector.trim()) {
      e.otherBusinessSector = "يرجى تحديد القطاع";
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
      const utmParams = getUTMParams();
      // Map form data to CRM fields (using exact Arabic labels from CRM)
      const payload = {
        user_id: "public-user",
        ...utmParams,
        data: {
          "اسم الشركة": form.companyName,
          "عدد الموظفين": form.employeeCount,
          "ما هو الشكل القانوني لشركتك؟": form.legalForm === "أخرى" ? form.otherLegalForm : form.legalForm || "",
          "منذ متى تأسست شركتك؟": form.companyEstablished || "",
          [fieldsConfig?.businessSector?.label || "القطاع"]: form.businessSector === "أخرى" ? form.otherBusinessSector : form.businessSector || "",
          "المنصب الوظيفي": form.jobTitle,
          "مدة الخبرة في منصب المسير": form.managerExperienceDuration || "",
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
          setShowOtherBusinessSector(false); // Reset conditional state
          setShowOtherLegalForm(false); // Reset conditional state
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
          setShowOtherBusinessSector(false); // Reset conditional state
          setShowOtherLegalForm(false); // Reset conditional state
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
        {!isHidden("companyName") && (
        <div>
          <label className={labelBase}>
            اسم الشركة {isRequired("companyName") && <span className="text-red-500">*</span>}
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
        )}

        {/* Employee Count Field - Order 2 */}
        {!isHidden("employeeCount") && (
        <div>
          <label className={labelBase}>
            عدد الموظفين {isRequired("employeeCount") && <span className="text-red-500">*</span>}
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
        )}

        {/* Legal Form Field */}
        {!isHidden("legalForm") && (
        <div>
          <OptionPills
            label={<>ما هو الشكل القانوني لشركتك؟ {isRequired("legalForm") && <span className="text-red-500">*</span>}</>}
            required={isRequired("legalForm")}
            name="legalForm"
            options={[
              "مؤسسة فردية",
              "شركة ذات مسؤولية محدودة (SARL)",
              "شركة مساهمة (SPA)",
              "شركة تضامن",
              "تعاونية",
              "شركة ناشئة (Startup)",
              "أخرى"
            ]}
            value={form.legalForm}
            onChange={(val) => {
              setForm({ ...form, legalForm: val, otherLegalForm: "" });
              setShowOtherLegalForm(val === "أخرى");
            }}
          />
          {showOtherLegalForm && (
            <>
              <input
                ref={fieldRefs.otherLegalForm}
                className={`${fieldBase} mt-2`}
                value={form.otherLegalForm}
                onChange={(e) => setForm({ ...form, otherLegalForm: e.target.value })}
                placeholder="أخرى.."
              />
              {errors.otherLegalForm && <div className={errorText}>{errors.otherLegalForm}</div>}
            </>
          )}
          {errors.legalForm && <div className={errorText}>{errors.legalForm}</div>}
        </div>
        )}

        {/* Business Sector Field */}
        {!isHidden("businessSector") && (
        <div>
          <label className={labelBase}>{fieldsConfig?.businessSector?.label || "القطاع"} {isRequired("businessSector") && <span className="text-red-500">*</span>}</label>
          <Select
            value={form.businessSector}
            onValueChange={(value) => {
              setForm({ ...form, businessSector: value, otherBusinessSector: "" });
              setShowOtherBusinessSector(value === "أخرى");
            }}
          >
            <SelectTrigger className={fieldBase} ref={fieldRefs.businessSector}>
              <SelectValue placeholder={fieldsConfig?.businessSector?.placeholder || "اختر القطاع"} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="خدمات">خدمات</SelectItem>
              <SelectItem value="تجارة (جملة / تجزئة)">تجارة (جملة / تجزئة)</SelectItem>
              <SelectItem value="صناعة / إنتاج">صناعة / إنتاج</SelectItem>
              <SelectItem value="فلاحية / زراعية">فلاحية / زراعية</SelectItem>
              <SelectItem value="تكنولوجيا / شركة رقمية">تكنولوجيا / شركة رقمية</SelectItem>
              <SelectItem value="مقاولات / أشغال عمومية">مقاولات / أشغال عمومية</SelectItem>
              <SelectItem value="تعليم وتكوين">تعليم وتكوين</SelectItem>
              <SelectItem value="صحة">صحة</SelectItem>
              <SelectItem value="سياحة">سياحة</SelectItem>
              <SelectItem value="أخرى">أخرى</SelectItem>
            </SelectContent>
          </Select>
          {showOtherBusinessSector && (
            <>
              <input
                ref={fieldRefs.otherBusinessSector}
                className={`${fieldBase} mt-2`}
                value={form.otherBusinessSector}
                onChange={(e) => setForm({ ...form, otherBusinessSector: e.target.value })}
                placeholder="أخرى (يرجى التحديد)"
              />
              {errors.otherBusinessSector && <div className={errorText}>{errors.otherBusinessSector}</div>}
            </>
          )}
          {errors.businessSector && <div className={errorText}>{errors.businessSector}</div>}
        </div>
        )}

        {/* Company Established Field */}
        {!isHidden("companyEstablished") && (
        <div>
          <OptionPills
            label={<>منذ متى تأسست شركتك؟ {isRequired("companyEstablished") && <span className="text-red-500">*</span>}</>}
            required={isRequired("companyEstablished")}
            name="companyEstablished"
            options={[
              "أقل من سنة",
              "من 1 إلى 3 سنوات",
              "من 3 إلى 5 سنوات",
              "أكثر من 5 سنوات."
            ]}
            value={form.companyEstablished}
            onChange={(val) => setForm({ ...form, companyEstablished: val })}
          />
          {errors.companyEstablished && <div className={errorText}>{errors.companyEstablished}</div>}
        </div>
        )}



        {/* Full Name Field - Order 3 */}
        {!isHidden("fullName") && (
        <div>
          <label className={labelBase}>
            الاسم واللقب {isRequired("fullName") && <span className="text-red-500">*</span>}
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
        )}

        <div className="grid md:grid-cols-2 gap-4">
          {/* Phone Field - Order 4 */}
          {!isHidden("phone") && (
          <div>
            <label className={labelBase}>
              رقم الواتس آب {isRequired("phone") && <span className="text-red-500">*</span>}
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
          )}

          {/* Email Field - Order 5 */}
          {!isHidden("email") && (
          <div>
            <label className={labelBase}>
              الايميل {isRequired("email") && <span className="text-red-500">*</span>}
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
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Cohort Field - Order 6 */}
          {!isHidden("cohort") && (
          <div>
            <label className={labelBase}>
              اختر الفوج {isRequired("cohort") && <span className="text-red-500">*</span>}
            </label>
            <Select
              value={form.cohort}
              onValueChange={(value) => setForm({ ...form, cohort: value })}
            >
              <SelectTrigger className={fieldBase}>
                <SelectValue placeholder="اختر الفوج" />
              </SelectTrigger>
              <SelectContent>
                {cohorts.map((cohort) => (
                  <SelectItem 
                    key={cohort.value} 
                    value={cohort.value} 
                    disabled={cohort.disabled}
                  >
                    {cohort.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.cohort && <div className={errorText}>{errors.cohort}</div>}
          </div>
          )}

          {/* State Field - Order 7 (Optional) */}
          {!isHidden("state") && (
          <div>
            <label className={labelBase}>الولاية {isRequired("state") && <span className="text-red-500">*</span>}</label>
            <AlgeriaWilayas
              value={form.state}
              onChange={(value) => setForm({ ...form, state: value })}
            />
            {errors.state && <div className={errorText}>{errors.state}</div>}
          </div>
          )}
        </div>

        {/* Webscale Member Field - Order 8 (Optional) */}
        {!isHidden("isWebscaleMember") && (
        <div>
          <label className={labelBase}>هل أنت عضو في Webscale؟ {isRequired("isWebscaleMember") && <span className="text-red-500">*</span>}</label>
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
        )}


        {/* Job Title Field - Order 9 */}
        {!isHidden("jobTitle") && (
        <div>
          <label className={labelBase}>
            المنصب الوظيفي {isRequired("jobTitle") && <span className="text-red-500">*</span>}
          </label>
          <Select
            value={form.jobTitle}
            onValueChange={(value) => {
              setForm({ ...form, jobTitle: value, managerExperienceDuration: "" });
            }}
          >
            <SelectTrigger className={fieldBase} ref={fieldRefs.jobTitle}>
              <SelectValue placeholder="اختر المنصب الوظيفي" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="رئيس الشركة">رئيس الشركة</SelectItem>
              <SelectItem value="مسير">مسير</SelectItem>
              <SelectItem value="موظف">موظف</SelectItem>
              <SelectItem value="مدير قسم التسويق">مدير قسم التسويق</SelectItem>
              <SelectItem value="مدير قسم المبيعات">مدير قسم المبيعات</SelectItem>
            </SelectContent>
          </Select>
          {errors.jobTitle && <div className={errorText}>{errors.jobTitle}</div>}
        </div>
        )}

        {/* Manager Experience Duration - Conditional Field */}
        {!isHidden("managerExperienceDuration") && form.jobTitle === "مسير" && (
          <div>
            <label className={labelBase}>
              خبرتك الحالية في منصب المسير (بالسنوات) {isRequired("managerExperienceDuration") && <span className="text-red-500">*</span>}
            </label>
            <Select
              value={form.managerExperienceDuration}
              onValueChange={(value) => setForm({ ...form, managerExperienceDuration: value })}
            >
              <SelectTrigger className={fieldBase} ref={fieldRefs.managerExperienceDuration}>
                <SelectValue placeholder="اختر المدة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="أقل من سنة">أقل من سنة</SelectItem>
                <SelectItem value="من سنة إلى سنتين">من سنة إلى سنتين</SelectItem>
                <SelectItem value="من سنتين إلى 5 سنوات">من سنتين إلى 5 سنوات</SelectItem>
                <SelectItem value="من 5 سنوات إلى 10 سنوات">من 5 سنوات إلى 10 سنوات</SelectItem>
                <SelectItem value="أكثر من 10 سنوات">أكثر من 10 سنوات</SelectItem>
              </SelectContent>
            </Select>
            {errors.managerExperienceDuration && <div className={errorText}>{errors.managerExperienceDuration}</div>}
          </div>
        )}

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
