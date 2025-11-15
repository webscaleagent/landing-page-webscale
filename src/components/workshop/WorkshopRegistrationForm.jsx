// src/components/workshop/WorkshopRegistrationForm.jsx
import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

const SCRIPT_URL = "https://crmgo.webscale.dz/api/v1/public/forms/72fd520f-7d5a-4f62-9c86-45f84bb320fd/submit";

const WorkshopRegistrationForm = ({ workshops }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    businessType: "",
    customBusinessType: "",
    selectedWorkshop: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [showCustomBusinessType, setShowCustomBusinessType] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validatePhone = (phone) => {
    const phonePattern = /^(\+213|0)(5|6|7)[0-9]{8}$/;
    return phonePattern.test(phone);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrorMessage("");

    // Validate phone number
    if (!validatePhone(formData.phone)) {
      setErrorMessage("رقم الهاتف غير صحيح. يجب أن يبدأ بـ +213 أو 0 ويتبع بـ 5، 6، أو 7");
      setIsSubmitting(false);
      return;
    }

    try {
      // Map form data to the required field structure
      const payload = {
        user_id: "public-user",
        data: {
          "الاسم الكامل": formData.fullName,
          "البريد الإلكتروني": formData.email,
          "رقم الهاتف": formData.phone,
          "نوع النشاط": formData.businessType === "أخرى" ? formData.customBusinessType : formData.businessType,
          "اختيار الورشة": formData.selectedWorkshop
        }
      };

      const res = await fetch(SCRIPT_URL, { 
        method: "POST", 
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });
      
      // Check if status is 2xx (success)
      if (res.ok && res.status >= 200 && res.status < 300) {
        setSubmitStatus('success');
        setErrorMessage("");
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          businessType: "",
          customBusinessType: "",
          selectedWorkshop: ""
        });
        setShowCustomBusinessType(false);
        alert("✅ تم التسجيل بنجاح! سنتواصل معك قريباً لتأكيد الحضور.");
      } else {
        let errorMsg = "حدث خطأ أثناء الإرسال";
        try {
          const errorData = await res.json();
          if (errorData.error) {
            errorMsg = errorData.error;
          }
        } catch {
          // Keep default error message
        }
        setErrorMessage(errorMsg);
        setSubmitStatus('error');
        alert(`⚠️ ${errorMsg}`);
      }
    } catch (error) {
      const errorMsg = "حدث خطأ في الاتصال بالخادم";
      setErrorMessage(errorMsg);
      setSubmitStatus('error');
      alert(`⚠️ ${errorMsg}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="registration-form" className="max-w-2xl mx-auto">
        <Card className="shadow-2xl border-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
            نموذج التسجيل
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-gray-700 dark:text-gray-300 font-medium">
                الاسم الكامل *
              </Label>
              <Input
                id="fullName"
                type="text"
                value={formData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                placeholder="أدخل اسمك الكامل"
                required
                className="h-12 text-right"
                dir="rtl"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700 dark:text-gray-300 font-medium">
                البريد الإلكتروني *
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="example@email.com"
                required
                className="h-12"
              />
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-gray-700 dark:text-gray-300 font-medium">
                رقم الهاتف *
              </Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="+213 XXX XXX XXX"
                required
                className="h-12 text-right"
                dir="rtl"
              />
            </div>

            {/* Business Type */}
            <div className="space-y-2">
              <Label htmlFor="businessType" className="text-gray-700 dark:text-gray-300 font-medium">
                نوع النشاط (اختياري)
              </Label>
              <Select 
                value={formData.businessType} 
                onValueChange={(value) => {
                  handleInputChange('businessType', value);
                  setShowCustomBusinessType(value === "أخرى");
                }}
              >
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="اختر نوع نشاطك" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="تجارة إلكترونية">تجارة إلكترونية</SelectItem>
                  <SelectItem value="تجارة تقليدية">تجارة تقليدية</SelectItem>
                  <SelectItem value="خدمات">خدمات</SelectItem>
                  <SelectItem value="استشارات">استشارات</SelectItem>
                  <SelectItem value="أخرى">أخرى</SelectItem>
                </SelectContent>
              </Select>
              
              {showCustomBusinessType && (
                <div className="mt-2">
                  <Input
                    type="text"
                    value={formData.customBusinessType}
                    onChange={(e) => handleInputChange('customBusinessType', e.target.value)}
                    placeholder="أدخل نوع النشاط"
                    className="h-12 text-right"
                    dir="rtl"
                  />
                </div>
              )}
            </div>

            {/* Workshop Selection */}
            <div className="space-y-2">
              <Label className="text-gray-700 dark:text-gray-300 font-medium">
                اختيار الورشة *
              </Label>
              <Select value={formData.selectedWorkshop} onValueChange={(value) => handleInputChange('selectedWorkshop', value)}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="اختر الورشة التي تود حضورها" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Jumia">Jumia</SelectItem>
                  <SelectItem value="العربي محمد هوامل">العربي محمد هوامل</SelectItem>
                  <SelectItem value="راسلام">راسلام</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Mandatory Fields Warning */}
            <div className="pt-4 pb-2">
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-300 dark:border-yellow-700 rounded-lg p-3">
                <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200 text-center">
                  ⚠️ يرجى ملء جميع الحقول الإلزامية (المميزة بـ *) وإلا لن تتمكن من الإرسال
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <Button
                type="submit"
                disabled={isSubmitting || !formData.fullName || !formData.email || !formData.phone || !formData.selectedWorkshop}
                className="w-full h-14 bg-gradient-to-r from-[#fbbc05] to-[#e0bb57] hover:from-[#fbbc05]/90 hover:to-[#e0bb57]/90 text-white text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center space-x-2 space-x-reverse">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>جاري التسجيل...</span>
                  </div>
                ) : (
                  "سجّل الآن"
                )}
              </Button>
            </div>

            {/* Status Messages */}
            {submitStatus === 'success' && (
              <div className="mt-4 p-4 bg-green-100 dark:bg-green-900/20 border border-green-300 dark:border-green-700 rounded-lg">
                <p className="text-green-800 dark:text-green-200 text-center font-medium">
                  ✅ تم التسجيل بنجاح! سنتواصل معك قريباً لتأكيد الحضور.
                </p>
              </div>
            )}

            {(submitStatus === 'error' || errorMessage) && (
              <div className="mt-4 p-4 bg-red-100 dark:bg-red-900/20 border border-red-300 dark:border-red-700 rounded-lg">
                <p className="text-red-800 dark:text-red-200 text-center font-medium">
                  ❌ {errorMessage || "حدث خطأ أثناء التسجيل. يرجى المحاولة مرة أخرى."}
                </p>
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default WorkshopRegistrationForm;
