// src/pages/MobileFormPage.jsx
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import logo from "../assets/logo.png";

const fieldBase =
  "w-full rounded-xl border px-4 py-3 outline-none transition text-base " +
  "border-gray-300 bg-white text-gray-900 " +
  "focus:border-[#FABC05] focus:ring-2 focus:ring-[#FABC05]/40";

const labelBase =
  "block text-sm font-medium mb-2 text-gray-700";

const errorText = "mt-1 text-xs text-red-600";

// Field type mappings
const FIELD_TYPES = {
  text: 'text',
  email: 'email',
  tel: 'tel',
  number: 'number',
  textarea: 'textarea',
  select: 'select',
  radio: 'radio',
  checkbox: 'checkbox',
  date: 'date',
  url: 'url'
};

// Arabic field labels mapping
const FIELD_LABELS = {
  name: "الاسم الكامل",
  fullName: "الاسم الكامل",
  firstName: "الاسم الأول",
  lastName: "اسم العائلة",
  email: "البريد الإلكتروني",
  phone: "رقم الهاتف",
  mobile: "رقم الجوال",
  company: "اسم الشركة",
  companyName: "اسم الشركة",
  message: "الرسالة",
  notes: "ملاحظات",
  sector: "القطاع",
  industry: "المجال",
  wilaya: "الولاية",
  city: "المدينة",
  address: "العنوان",
  website: "الموقع الإلكتروني",
  jobTitle: "المسمى الوظيفي",
  position: "المنصب",
  budget: "الميزانية",
  employees: "عدد الموظفين",
  experience: "سنوات الخبرة",
  description: "الوصف"
};

export default function MobileFormPage() {
  const { form_id } = useParams();
  const [formFields, setFormFields] = useState([]);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState("idle"); // idle, success, error
  const [statusMessage, setStatusMessage] = useState("");
  const [formTitle, setFormTitle] = useState("نموذج التسجيل");

  useEffect(() => {
    // Set viewport meta tag for mobile optimization
    const viewport = document.querySelector('meta[name="viewport"]');
    if (viewport) {
      viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
    }
    
    // Fetch form configuration
    fetchFormConfig();
  }, [form_id]);

  const fetchFormConfig = async () => {
    try {
      setIsLoading(true);
      
      // Try to fetch form configuration from API
      const response = await fetch(`https://crmgo.webscale.dz/api/v1/public/forms/${form_id}/fields`);
      
      if (response.ok) {
        const config = await response.json();
        setFormFields(config.fields || []);
        setFormTitle(config.title || "نموذج التسجيل");
        
        // Initialize form data with default values
        const initialData = {};
        config.fields?.forEach(field => {
          initialData[field.name] = field.defaultValue || "";
        });
        setFormData(initialData);
      } else {
        // Fallback to default form if API fails
        setFormFields(getDefaultFormFields());
        setFormTitle("نموذج التسجيل");
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          message: ""
        });
      }
    } catch (error) {
      console.error("Error fetching form config:", error);
      // Fallback to default form
      setFormFields(getDefaultFormFields());
      setFormTitle("نموذج التسجيل");
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        message: ""
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getDefaultFormFields = () => [
    {
      name: "name",
      type: "text",
      label: "الاسم الكامل",
      required: true,
      placeholder: "أدخل اسمك الكامل"
    },
    {
      name: "email",
      type: "email",
      label: "البريد الإلكتروني",
      required: true,
      placeholder: "example@email.com"
    },
    {
      name: "phone",
      type: "tel",
      label: "رقم الهاتف",
      required: true,
      placeholder: "05xxxxxxxx"
    },
    {
      name: "company",
      type: "text",
      label: "اسم الشركة",
      required: true,
      placeholder: "أدخل اسم الشركة"
    },
    {
      name: "message",
      type: "textarea",
      label: "رسالة إضافية (اختياري)",
      required: false,
      placeholder: "اكتب أي ملاحظات إضافية هنا..."
    }
  ];

  const validate = () => {
    const e = {};
    
    formFields.forEach(field => {
      const value = formData[field.name];
      
      if (field.required && (!value || value.toString().trim() === "")) {
        e[field.name] = `${field.label || field.name} مطلوب`;
      } else if (field.type === "email" && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        e[field.name] = "البريد الإلكتروني غير صحيح";
      } else if (field.type === "tel" && value && !/^[0-9+\-\s()]+$/.test(value)) {
        e[field.name] = "رقم الهاتف غير صحيح";
      } else if (field.type === "url" && value && !/^https?:\/\/.+/.test(value)) {
        e[field.name] = "الرابط غير صحيح";
      }
    });
    
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setStatus("idle");

    try {
      // Construct the form submission URL based on form_id
      const submitUrl = `https://crmgo.webscale.dz/api/v1/public/forms/${form_id}/submit`;
      
      // Map form data to the required field structure (same as workshop form)
      const payload = {
        user_id: "public-user",
        data: {}
      };

      // Map form fields to Arabic labels as keys
      formFields.forEach(field => {
        const value = formData[field.name];
        if (value !== undefined && value !== null && value !== "") {
          // Use the field's label as the key, or fallback to the Arabic mapping
          const key = field.label || FIELD_LABELS[field.name] || field.name;
          payload.data[key] = value;
        }
      });
      
      const response = await fetch(submitUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      // Check if status is 2xx (success)
      if (response.ok && response.status >= 200 && response.status < 300) {
        setStatus("success");
        const successMsg = "تم إرسال النموذج بنجاح!";
        setStatusMessage(successMsg);
        
        // Reset form data
        const resetData = {};
        formFields.forEach(field => {
          resetData[field.name] = field.defaultValue || "";
        });
        setFormData(resetData);
        
        alert(`✅ ${successMsg}`);
      } else {
        let errorMsg = "حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى.";
        try {
          const errorData = await response.json();
          if (errorData.error) {
            errorMsg = errorData.error;
          }
        } catch {
          // Keep default error message
        }
        setStatusMessage(errorMsg);
        setStatus("error");
        alert(`⚠️ ${errorMsg}`);
      }
    } catch (error) {
      const errorMsg = "حدث خطأ في الاتصال. يرجى التحقق من اتصال الإنترنت.";
      setStatus("error");
      setStatusMessage(errorMsg);
      alert(`⚠️ ${errorMsg}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (fieldName, value) => {
    setFormData(prev => ({ ...prev, [fieldName]: value }));
    if (errors[fieldName]) {
      setErrors(prev => ({ ...prev, [fieldName]: "" }));
    }
  };

  const renderField = (field) => {
    const value = formData[field.name] || "";
    const hasError = errors[field.name];
    
    const commonProps = {
      value: value,
      onChange: (e) => handleChange(field.name, e.target.value),
      className: `${fieldBase} ${hasError ? "border-red-500" : ""}`,
      placeholder: field.placeholder || "",
      required: field.required,
      dir: field.type === "email" || field.type === "url" || field.type === "tel" ? "ltr" : "rtl"
    };

    switch (field.type) {
      case "textarea":
        return (
          <textarea
            {...commonProps}
            rows={4}
            className={`${commonProps.className} min-h-[100px] resize-none`}
          />
        );
      
      case "select":
        return (
          <select {...commonProps}>
            <option value="">اختر...</option>
            {field.options?.map((option, index) => (
              <option key={index} value={option.value || option}>
                {option.label || option}
              </option>
            ))}
          </select>
        );
      
      case "radio":
        return (
          <div className="space-y-2">
            {field.options?.map((option, index) => (
              <label key={index} className="flex items-center space-x-2 space-x-reverse">
                <input
                  type="radio"
                  name={field.name}
                  value={option.value || option}
                  checked={value === (option.value || option)}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  className="text-[#FABC05]"
                />
                <span>{option.label || option}</span>
              </label>
            ))}
          </div>
        );
      
      case "checkbox":
        if (field.multiple) {
          const selectedValues = Array.isArray(value) ? value : [];
          return (
            <div className="space-y-2">
              {field.options?.map((option, index) => (
                <label key={index} className="flex items-center space-x-2 space-x-reverse">
                  <input
                    type="checkbox"
                    checked={selectedValues.includes(option.value || option)}
                    onChange={(e) => {
                      const newValues = e.target.checked
                        ? [...selectedValues, option.value || option]
                        : selectedValues.filter(v => v !== (option.value || option));
                      handleChange(field.name, newValues);
                    }}
                    className="text-[#FABC05]"
                  />
                  <span>{option.label || option}</span>
                </label>
              ))}
            </div>
          );
        } else {
          return (
            <label className="flex items-center space-x-2 space-x-reverse">
              <input
                type="checkbox"
                checked={!!value}
                onChange={(e) => handleChange(field.name, e.target.checked)}
                className="text-[#FABC05]"
              />
              <span>{field.label}</span>
            </label>
          );
        }
      
      default:
        return (
          <input
            {...commonProps}
            type={FIELD_TYPES[field.type] || field.type}
          />
        );
    }
  };

  const getFieldLabel = (field) => {
    return field.label || FIELD_LABELS[field.name] || field.name;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FABC05]/10 to-white flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#FABC05] mx-auto mb-4"></div>
          <p className="text-gray-600">جاري تحميل النموذج...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FABC05]/10 to-white p-4">
      <div className="max-w-md mx-auto">
        {/* Header with Logo */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 pt-8"
        >
          <img 
            src={logo} 
            alt="Webscale Logo" 
            className="h-16 mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {formTitle}
          </h1>
          <p className="text-gray-600 text-sm">
            املأ النموذج أدناه للمشاركة في فعالياتنا
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-lg p-6 space-y-6"
        >
          {/* Dynamic Fields */}
          {formFields.map((field, index) => (
            <motion.div
              key={field.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + (index * 0.1) }}
            >
              <label className={labelBase}>
                {getFieldLabel(field)} {field.required && "*"}
              </label>
              {renderField(field)}
              {errors[field.name] && (
                <p className={errorText}>{errors[field.name]}</p>
              )}
            </motion.div>
          ))}

          {/* Status Message */}
          {status === "success" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-4 bg-green-50 border border-green-200 rounded-xl text-green-800 text-center"
            >
              {statusMessage}
            </motion.div>
          )}

          {status === "error" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-800 text-center"
            >
              {statusMessage}
            </motion.div>
          )}

          {/* Mandatory Fields Warning */}
          <div className="pt-4 pb-2">
            <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-3">
              <p className="text-sm font-medium text-yellow-800 text-center">
                ⚠️ يرجى ملء جميع الحقول الإلزامية (المميزة بـ *) وإلا لن تتمكن من الإرسال
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-4 px-6 rounded-xl font-semibold text-white text-lg transition-all duration-200 ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#FABC05] hover:bg-[#FABC05]/90 active:scale-95 shadow-lg"
            }`}
          >
            {isSubmitting ? "جاري الإرسال..." : "إرسال النموذج"}
          </button>
        </motion.form>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center mt-8 pb-8"
        >
          <p className="text-gray-500 text-sm">
            © 2024 Webscale. جميع الحقوق محفوظة.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
