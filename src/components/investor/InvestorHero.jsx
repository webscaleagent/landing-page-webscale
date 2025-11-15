// src/components/investor/InvestorHero.jsx
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const InvestorHero = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    whatsappNumber: "",
    investmentReasons: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Send data to Google Apps Script
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbzElu1gzDoKOWtwNDsB95EssmStuW6X7v_5nmB2W4ITUBs-nh2JlDCc98snhEWh3N2GgA/exec",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
          mode: "no-cors",
        }
      );

      // With no-cors mode, we can't check the response status
      // But if the fetch completes without throwing, we assume success
      // Success - Google Apps Script processed the request
      alert("شكراً لاهتمامكم! تم حفظ بياناتكم بنجاح وسنتواصل معكم قريباً.");
      setFormData({ fullName: "", whatsappNumber: "", investmentReasons: "" });
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("⚠️ حدث خطأ أثناء إرسال النموذج. يرجى المحاولة مرة أخرى.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
        className="min-h-screen bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-16 sm:py-20 md:py-24 lg:py-28"
        dir="rtl"
      >
      <div className="max-w-4xl mx-auto text-center">
        {/* Back to Home Link */}
        <div className="mb-8 text-right">
          <Link
            to="/"
            className="inline-flex items-center text-neutral-400 hover:text-[#fbbc05] transition-colors duration-200"
          >
            العودة إلى الصفحة الرئيسية
            <ArrowRight className="mr-2 h-4 w-4 rotate-180" />
          </Link>
        </div>

        {/* Welcome Message */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            مرحبا بك،
            <br />
            <span className="bg-gradient-to-r from-[#fbbc05] to-[#e0bb57] text-transparent bg-clip-text">
              اليوم webscale
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-neutral-300 mb-8 leading-relaxed">
            تفتح الباب للمستثمرين المهتمين بالانضمام إلى رحلتنا نحو بناء مجتمع
            قوي لأصحاب المؤسسات ورواد الأعمال.
          </p>
          <p className="text-lg text-neutral-400 mb-12">
            نضع بين أيديكم هذا الاستبيان لمعرفة الأسباب التي تجعلكم تهتمون
            بالاستثمار في webscale
          </p>

          {/* Meeting Announcement */}
          <div className="bg-gradient-to-r from-[#fbbc05]/20 to-[#e0bb57]/20 border border-[#fbbc05]/30 rounded-xl p-6 mb-8 text-right">
            <div className="flex items-center justify-center mb-4">
              <h3 className="text-xl font-bold text-[#fbbc05]">
                اجتماع المستثمرين القادم
              </h3>
              <div className="w-3 h-3 bg-[#fbbc05] rounded-full animate-pulse mr-3"></div>
            </div>
            <p className="text-lg text-white font-medium mb-2">
              الخميس القادم في الساعة 9:00 مساءً
            </p>
            <p className="text-neutral-300">
              اجتماع أونلاين لمناقشة فرص الاستثمار في webscale
            </p>
          </div>
        </div>

        {/* Investment Interest Form */}
        <Card className="bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl">
          <CardContent className="p-8 text-right">
            <h2 className="text-2xl font-bold text-white mb-6">
              استبيان اهتمام المستثمرين
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6" dir="rtl">
              {/* Full Name Field */}
              <div className="text-right">
                <Label
                  htmlFor="fullName"
                  className="text-white text-lg font-medium mb-2 block text-right"
                >
                  الإسم و اللقب *
                </Label>
                <Input
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="bg-white/20 border-white/30 text-white placeholder:text-neutral-400 focus:border-[#fbbc05] focus:ring-[#fbbc05] text-right"
                  placeholder="أدخل اسمك الكامل"
                  dir="rtl"
                  required
                />
              </div>

              {/* WhatsApp Number Field */}
              <div className="text-right">
                <Label
                  htmlFor="whatsappNumber"
                  className="text-white text-lg font-medium mb-2 block text-right"
                >
                  رقم الواتساب *
                </Label>
                <Input
                  id="whatsappNumber"
                  name="whatsappNumber"
                  value={formData.whatsappNumber}
                  onChange={handleInputChange}
                  className="bg-white/20 border-white/30 text-white placeholder:text-neutral-400 focus:border-[#fbbc05] focus:ring-[#fbbc05] text-right"
                  placeholder="+213 770 00 44 44"
                  dir="ltr"
                  required
                />
              </div>

              {/* Investment Reasons Field */}
              <div className="text-right">
                <Label
                  htmlFor="investmentReasons"
                  className="text-white text-lg font-medium mb-2 block text-right"
                >
                  ما هي الأسباب التي تجعلكم تهتمون بالاستثمار في webscale؟ *
                </Label>
                <Textarea
                  id="investmentReasons"
                  name="investmentReasons"
                  value={formData.investmentReasons}
                  onChange={handleInputChange}
                  className="bg-white/20 border-white/30 text-white placeholder:text-neutral-400 focus:border-[#fbbc05] focus:ring-[#fbbc05] min-h-[120px] resize-none text-right"
                  placeholder="يرجى توضيح أسباب اهتمامكم بالاستثمار في webscale..."
                  dir="rtl"
                  required
                />
              </div>

              {/* Mandatory Fields Warning */}
              <div className="pt-4 pb-2">
                <div className="bg-yellow-500/20 border border-yellow-400/50 rounded-lg p-3">
                  <p className="text-sm font-medium text-yellow-200 text-center">
                    ⚠️ يرجى ملء جميع الحقول الإلزامية (المميزة بـ *) وإلا لن تتمكن من الإرسال
                  </p>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-[#fbbc05] to-[#e0bb57] hover:from-[#fbbc05]/90 hover:to-[#e0bb57]/90 text-black font-bold text-lg py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  {isSubmitting ? "جاري الإرسال..." : "إرسال الاستبيان"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Additional Info */}
        <div className="mt-12 text-center text-right">
          <p className="text-neutral-400 text-lg">
            سنراجع استبيانكم وسنتواصل معكم في أقرب وقت ممكن لمناقشة فرص
            الاستثمار المتاحة
          </p>
        </div>
      </div>
    </section>
  );
};

export default InvestorHero;
