# Form Logic Template - Reusable Form Logic

This document contains the core form logic extracted from `RegistrationForm.jsx` that you can copy and adapt for other landing pages.

## Table of Contents
1. [State Management](#state-management)
2. [Form Initialization](#form-initialization)
3. [Validation Logic](#validation-logic)
4. [Submission Logic](#submission-logic)
5. [Error Handling](#error-handling)
6. [Complete Example](#complete-example)

---

## State Management

```javascript
import { useEffect, useMemo, useRef, useState } from "react";

// 1. Initial Form State
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
  notes: "",
  honey: "", // Honeypot for bot protection
};

// 2. Component State
const [form, setForm] = useState(initialForm);
const [errors, setErrors] = useState({});
const [isSubmitting, setIsSubmitting] = useState(false);
const [modal, setModal] = useState(null); // {type: "success"|"error", message: string}

// 3. Refs for Field Focus Management
const fieldRefs = {
  name: useRef(null),
  email: useRef(null),
  phone: useRef(null),
  jobTitle: useRef(null),
  company: useRef(null),
  // ... add refs for all fields
};
```

---

## Form Initialization

```javascript
// API Endpoint
const PUBLIC_SUBMIT_URL = `https://crmgo.webscale.dz/api/v1/public/forms/YOUR_FORM_ID/submit`;

// CSS Classes
const fieldBase =
  "w-full rounded-xl border px-3 py-2 outline-none transition " +
  "border-gray-300 bg-white text-gray-900 " +
  "dark:border-neutral-600 dark:bg-neutral-800 dark:text-gray-100 " +
  "hover:border-[#FABC05]/60 hover:bg-[#FABC05]/5 " +
  "focus:border-[var(--brand)] focus:ring-2 focus:ring-[color:var(--brand)]/40";

const labelBase =
  "block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200";

const errorText = "mt-1 text-xs text-red-600 dark:text-red-400";
```

---

## Validation Logic

### Basic Validation Function

```javascript
const validate = () => {
  const e = {};
  
  // Required field validation
  if (!form.name.trim()) e.name = "هذا الحقل مطلوب";
  if (!form.email.trim()) e.email = "هذا الحقل مطلوب";
  if (!form.phone.trim()) e.phone = "هذا الحقل مطلوب";
  
  // Email format validation
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
    e.email = "بريد غير صحيح";
  
  // Select/dropdown validation
  if (!form.jobTitle) e.jobTitle = "اختر المسمى الوظيفي";
  
  // Return errors object
  return e;
};
```

### Phone Number Validation

```javascript
const validatePhone = (phone) => {
  // Algerian phone number format: (+213|0)(5|6|7)[0-9]{8}
  const regex = /^(\+213|0)(5|6|7)[0-9]{8}$/;
  return regex.test(phone);
};
```

### Form Disabled State

```javascript
const disabled = useMemo(() => {
  return (
    isSubmitting ||
    !(
      form.name &&
      form.email &&
      form.phone &&
      form.jobTitle &&
      // ... add all required fields
    )
  );
}, [form, isSubmitting]);
```

---

## Submission Logic

### Main Submit Handler

```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  
  // 🐝 Honeypot bot protection
  if (form.honey) return;
  
  // 1. Validate form
  const v = validate();
  setErrors(v);
  
  // 2. Scroll to first error if validation fails
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
  
  // 3. Additional phone validation
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
  
  // 4. Set submitting state
  setIsSubmitting(true);
  
  // 5. Prepare payload (map to Arabic field names for CRM)
  const payload = {
    user_id: "public-user",
    data: {
      "الاسم الكامل": form.name,
      "البريد الإلكتروني": form.email,
      "رقم الهاتف (واتساب مفضل)": form.phone,
      "المسمى الوظيفي": form.jobTitle,
      "اسم المؤسسة": form.company,
      // ... map all fields to Arabic labels
      "ملاحظات إضافية أو استفسار؟": form.notes || "",
    },
  };
  
  // 6. Submit with error handling (see error handling section below)
  // ...
};
```

---

## Error Handling

### Complete Submission with Error Handling

```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  if (form.honey) return;
  
  const v = validate();
  setErrors(v);
  
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
  
  if (!validatePhone(form.phone)) {
    const err = {
      ...errors,
      phone: "⚠️ الرجاء إدخال رقم هاتف صحيح.",
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
    const payload = {
      user_id: "public-user",
      data: {
        "الاسم الكامل": form.name,
        "البريد الإلكتروني": form.email,
        "رقم الهاتف (واتساب مفضل)": form.phone,
        // ... other fields
      },
    };
    
    try {
      // Primary attempt: Standard fetch with JSON
      const res = await fetch(PUBLIC_SUBMIT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });
      
      const data = await res.json().catch(() => ({}));
      
      // Success case
      if (res.ok && res.status >= 200 && res.status < 300) {
        setModal({
          type: "success",
          message: "✅ تم تسجيلك بنجاح! سنراجع طلبك ونتواصل معك قريبًا.",
        });
        setForm(initialForm); // Reset form
        return;
      }
      
      // Handle specific errors
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
      // Network/CORS error - try fallback below
    }
    
    // Fallback: No-cors request (for CORS issues)
    try {
      await fetch(PUBLIC_SUBMIT_URL, {
        method: "POST",
        body: JSON.stringify(payload),
      });
      
      // Optimistic success (can't read response in no-cors)
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
```

---

## Modal Management

### Auto-close Modal After 5 Seconds

```javascript
useEffect(() => {
  if (modal) {
    const timer = setTimeout(() => setModal(null), 5000);
    return () => clearTimeout(timer);
  }
}, [modal]);
```

### Modal Component (using shadcn/ui Dialog)

```javascript
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

// In JSX:
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
      <DialogTitle className={`text-2xl font-bold text-center ${
        modal?.type === "success"
          ? "text-green-900 dark:text-green-100"
          : "text-red-900 dark:text-red-100"
      }`}>
        {modal?.type === "success" ? "تم تسجيل طلبك" : "حدث خطأ"}
      </DialogTitle>
      <DialogDescription className={`text-base leading-relaxed text-center mt-2 ${
        modal?.type === "success"
          ? "text-green-800 dark:text-green-200"
          : "text-red-800 dark:text-red-200"
      }`}>
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
```

---

## Form Field Pattern

### Text Input Field

```javascript
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
```

### Email Input Field

```javascript
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
```

### Phone Input Field

```javascript
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
```

### Select/Dropdown Field

```javascript
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
    {/* ... more options */}
  </select>
  {errors.jobTitle && <div className={errorText}>{errors.jobTitle}</div>}
</div>
```

### Textarea Field

```javascript
<div>
  <label className={labelBase}>ملاحظات إضافية أو استفسار؟</label>
  <textarea
    rows={4}
    className={fieldBase + " resize-none"}
    value={form.notes}
    onChange={(e) => setForm({ ...form, notes: e.target.value })}
  />
</div>
```

### Honeypot Field (Hidden Bot Protection)

```javascript
<input
  type="text"
  name="honey"
  value={form.honey}
  onChange={(e) => setForm({ ...form, honey: e.target.value })}
  style={{ display: "none" }}
  tabIndex={-1}
  autoComplete="off"
/>
```

---

## Submit Button Pattern

```javascript
<motion.button
  whileHover={{ scale: disabled ? 1 : 1.03 }}
  whileTap={{ scale: disabled ? 1 : 0.97 }}
  type="submit"
  disabled={disabled}
  className="rounded-xl px-6 py-3 text-sm font-semibold shadow-md hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed text-black bg-[var(--brand)]"
>
  {isSubmitting ? "جاري الإرسال..." : "إرسال الطلب"}
</motion.button>
```

---

## Key Features

### ✅ Features Included:
1. **State Management** - React hooks for form state, errors, and submission status
2. **Validation** - Client-side validation with error messages
3. **Phone Validation** - Algerian phone number format validation
4. **Error Handling** - Comprehensive error handling with fallback strategies
5. **Auto-scroll to Errors** - Automatically scrolls to first error field
6. **Field Focus Management** - Uses refs to focus on error fields
7. **Modal Feedback** - Success/error modals with auto-close
8. **Bot Protection** - Honeypot field to prevent spam
9. **Disabled State** - Button disabled until all required fields filled
10. **Loading State** - Shows "جاري الإرسال..." during submission
11. **CORS Fallback** - Handles CORS issues with no-cors fallback
12. **Form Reset** - Resets form after successful submission

---

## Quick Start Checklist

To use this logic in a new form:

1. ✅ Copy the state management setup
2. ✅ Define your `initialForm` with your fields
3. ✅ Add refs for each field in `fieldRefs`
4. ✅ Update `validate()` function with your validation rules
5. ✅ Update `disabled` useMemo with your required fields
6. ✅ Map your form fields to Arabic labels in the payload
7. ✅ Update `PUBLIC_SUBMIT_URL` with your form ID
8. ✅ Customize modal messages
9. ✅ Add your form fields in JSX using the patterns above
10. ✅ Test the form submission

---

## Example: Simple Contact Form

Here's a simplified version for a basic contact form:

```javascript
// Initial form state (simpler)
const initialForm = {
  name: "",
  email: "",
  phone: "",
  message: "",
  honey: "",
};

// Simplified validation
const validate = () => {
  const e = {};
  if (!form.name.trim()) e.name = "هذا الحقل مطلوب";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
    e.email = "بريد غير صحيح";
  if (!form.phone.trim()) e.phone = "هذا الحقل مطلوب";
  if (!form.message.trim()) e.message = "هذا الحقل مطلوب";
  return e;
};

// Simplified disabled state
const disabled = useMemo(() => {
  return (
    isSubmitting ||
    !(form.name && form.email && form.phone && form.message)
  );
}, [form, isSubmitting]);

// Simplified payload
const payload = {
  user_id: "public-user",
  data: {
    "الاسم الكامل": form.name,
    "البريد الإلكتروني": form.email,
    "رقم الهاتف": form.phone,
    "الرسالة": form.message,
  },
};
```

---

## Notes

- **Form ID**: Replace `YOUR_FORM_ID` in `PUBLIC_SUBMIT_URL` with your actual form ID from the CRM
- **Field Mapping**: Make sure the Arabic field names in the payload match your CRM form fields exactly
- **Brand Color**: Update `var(--brand)` CSS variable or replace with your brand color
- **Error Messages**: Customize error messages to match your application's tone
- **Validation Rules**: Adjust validation rules based on your requirements

