// src/components/sponsoring/UnifiedRegistrationForm.jsx
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import AlgeriaWilayas from "../shared/AlgeriaWilayas";

const SCRIPT_URL = "https://crmgo.webscale.dz/api/v1/public/forms/e8558b7d-60ae-4d89-9be3-1a4ebe4175b2/submit";

export default function UnifiedRegistrationForm({ mode = "inline", isOpen = false, onClose }) {
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [showOtherSector, setShowOtherSector] = useState(false);
  const [showOtherSponsorType, setShowOtherSponsorType] = useState(false);
  const [showOtherGoal, setShowOtherGoal] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "",
    sector: "",
    otherSector: "",
    companySize: "",
    wilaya: "",
    fullName: "",
    role: "",
    email: "",
    phone: "",
    sponsorshipType: [],
    otherSponsorType: "",
    sponsorshipGoals: [],
    otherGoal: "",
    budget: "",
    notes: "",
    consent: false
  });

  const firstInputRef = useRef(null);

  useEffect(() => {
    if (mode === "modal" && isOpen) {
      setTimeout(() => firstInputRef.current?.focus(), 100);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => (document.body.style.overflow = "");
  }, [mode, isOpen]);

  const handleCheckboxArray = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(v => v !== value)
        : [...prev[field], value]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.consent) {
      alert("يجب الموافقة على التواصل قبل الإرسال");
      return;
    }
    setStatus("loading");
    setErrorMessage(""); // Clear any previous error messages
    try {
      // Map form data to the required Arabic field names
      const payload = {
        user_id: "public-user",
        data: {
          "اسم الشركة / المؤسسة": formData.companyName,
          "المجال أو القطاع": formData.sector === "أخرى" ? formData.otherSector : formData.sector,
          "حجم الشركة": formData.companySize,
          "الموقع الجغرافي / الولاية": formData.wilaya,
          "الاسم الكامل": formData.fullName,
          "المنصب / الدور": formData.role,
          "رقم الهاتف": formData.phone,
          "البريد الإلكتروني": formData.email,
          "ملاحظات أو متطلبات خاصة": formData.notes
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
        setStatus("success");
        setErrorMessage(""); // Clear error message on success
        setFormData({
          companyName: "",
          sector: "",
          otherSector: "",
          companySize: "",
          wilaya: "",
          fullName: "",
          role: "",
          email: "",
          phone: "",
          sponsorshipType: [],
          otherSponsorType: "",
          sponsorshipGoals: [],
          otherGoal: "",
          budget: "",
          notes: "",
          consent: false
        });
        alert("✅ تم إرسال بياناتك بنجاح! سنتواصل معك قريباً.");
        setTimeout(() => {
          setStatus("idle");
          if (mode === "modal") onClose?.();
        }, 2500);
      } else {
        // Try to parse error response
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
        setStatus("error");
        alert(`⚠️ ${errorMsg}`);
      }
    } catch {
      const errorMsg = "حدث خطأ في الاتصال بالخادم";
      setErrorMessage(errorMsg);
      setStatus("error");
      alert(`⚠️ ${errorMsg}`);
    }
  };

  const FormUI = (
    <form id="register" onSubmit={handleSubmit} className="space-y-8 text-right">
      {/* القسم 1 – معلومات الشركة */}
      <div>
        <h4 className="font-bold mb-4 text-lg">القسم 1 – معلومات الشركة</h4>
        <Label>اسم الشركة / المؤسسة *</Label>
        <Input ref={firstInputRef} value={formData.companyName} onChange={(e) => setFormData({...formData, companyName: e.target.value})} required className="mb-4" />

        <Label>المجال أو القطاع</Label>
        <Select onValueChange={(val) => { setFormData({...formData, sector: val}); setShowOtherSector(val === "أخرى"); }}>
          <SelectTrigger dir="rtl" className="mb-4">
            <SelectValue placeholder="اختر القطاع" />
          </SelectTrigger>
          <SelectContent dir="rtl">
            {["تجارة إلكترونية", "خدمات رقمية", "تكنولوجيا", "صناعات صغيرة", "شركات ناشئة", "أخرى"].map((s) => (
              <SelectItem dir="rtl" key={s} value={s}>{s}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        {showOtherSector && (
          <Input placeholder="اذكر القطاع" value={formData.otherSector} onChange={(e) => setFormData({...formData, otherSector: e.target.value})} className="mb-4" />
        )}

        <Label>حجم الشركة</Label>
        <div className="flex flex-wrap gap-2 mb-4">
          {["أقل من 10 موظفين", "10–50 موظف", "أكثر من 50 موظف"].map(size => (
            <Button type="button" key={size} variant={formData.companySize === size ? "default" : "outline"} onClick={() => setFormData({...formData, companySize: size})}>{size}</Button>
          ))}
        </div>

        {/* الموقع الجغرافي / الولاية */}
<Label>الموقع الجغرافي / الولاية</Label>
<AlgeriaWilayas
  value={formData.wilaya}
  onChange={(val) => setFormData({ ...formData, wilaya: val })}
/>
      </div>

      {/* القسم 2 – بيانات التواصل */}
      <div>
        <h4 className="font-bold mb-4 text-lg">القسم 2 – بيانات التواصل</h4>
        <Input placeholder="الاسم الكامل" required value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})} className="mb-3" />
        <Input placeholder="المنصب / الدور" required value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})} className="mb-3" />
        <Input type="email" placeholder="البريد الإلكتروني" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="mb-3" />
        <Input type="tel" placeholder="رقم الهاتف" required value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
      </div>

      {/* القسم 3 – الاهتمامات */}
      <div className="hidden">
        <h4 className="font-bold mb-4 text-lg">القسم 3 – الاهتمامات وفرص الرعاية</h4>
        <Label>نوع الرعاية</Label>
        <div className="flex flex-wrap gap-3 mb-4">
          {["راعٍ ذهبي", "راعٍ فضي", "راعٍ برونزي", "راع بلاتيني"].map(type => (
            <div key={type} className="flex items-center gap-2">
              <Checkbox checked={formData.sponsorshipType.includes(type)} onCheckedChange={() => { handleCheckboxArray("sponsorshipType", type); if (type === "أخرى") setShowOtherSponsorType(!showOtherSponsorType); }} />
              <span>{type}</span>
            </div>
          ))}
        </div>
        {showOtherSponsorType && (
          <Input placeholder="اذكر نوع الرعاية" value={formData.otherSponsorType} onChange={(e) => setFormData({...formData, otherSponsorType: e.target.value})} className="mb-4" />
        )}

        <Label>أهدافكم من الرعاية</Label>
        <div className="flex flex-wrap gap-3 mb-4">
          {["زيادة الوعي بالعلامة التجارية", "الوصول إلى شريحة مستهدفة", "توليد عملاء محتملين", "بناء شراكات استراتيجية", "أخرى"].map(goal => (
            <div key={goal} className="flex items-center gap-2">
              <Checkbox checked={formData.sponsorshipGoals.includes(goal)} onCheckedChange={() => { handleCheckboxArray("sponsorshipGoals", goal); if (goal === "أخرى") setShowOtherGoal(!showOtherGoal); }} />
              <span>{goal}</span>
            </div>
          ))}
        </div>
        {showOtherGoal && (
          <Input placeholder="اذكر الهدف" value={formData.otherGoal} onChange={(e) => setFormData({...formData, otherGoal: e.target.value})} className="mb-4" />
        )}

        <Label>ميزانية الرعاية</Label>
        <div className="flex flex-wrap gap-2 mb-4">
          {["أقل من 200,000 دج", "200,000 – 500,000 دج", "أكثر من 500,000 دج"].map(b => (
            <Button type="button" key={b} variant={formData.budget === b ? "default" : "outline"} onClick={() => setFormData({...formData, budget: b})}>{b}</Button>
          ))}
        </div>
      </div>

      {/* القسم 4 – ملاحظات */}
      <div>
        <h4 className="font-bold mb-4 text-lg">القسم 4 – ملاحظات إضافية</h4>
        <Textarea placeholder="ملاحظات أو متطلبات خاصة" value={formData.notes} onChange={(e) => setFormData({...formData, notes: e.target.value})} />
      </div>

      {/* القسم 5 – الموافقة */}
      <div className="flex items-center gap-2">
        <Checkbox checked={formData.consent} onCheckedChange={(val) => setFormData({...formData, consent: val})} />
        <Label>أؤكد حضوري للفعالية في حالة قبولي للحضور</Label>
      </div>

      {/* رسائل الحالة */}
      {status === "loading" && <p className="text-blue-500">⏳ جاري الإرسال...</p>}
      {status === "success" && <p className="text-green-500">✅ تم إرسال بياناتك!</p>}
      {status === "error" && (
        <div className="text-red-500">
          <p className="font-semibold">⚠️ حدث خطأ أثناء الإرسال</p>
          {errorMessage && (
            <p className="mt-2 text-sm bg-red-50 dark:bg-red-900/20 p-3 rounded-md border border-red-200 dark:border-red-800">
              {errorMessage}
            </p>
          )}
        </div>
      )}  

      {/* تحذير الحقول الإلزامية */}
      <div className="pt-4 pb-2">
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-300 dark:border-yellow-700 rounded-lg p-3">
          <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200 text-center">
            ⚠️ يرجى ملء جميع الحقول الإلزامية (المميزة بـ *) وإلا لن تتمكن من الإرسال
          </p>
        </div>
      </div>

      {/* زر الإرسال */}
      <Button type="submit" disabled={status === "loading"} className="w-full bg-gradient-to-r from-[#fbbc05] to-[#f3ac39] hover:scale-[1.01] text-white">
        إرسال
      </Button>
    </form>
  );

  if (mode === "modal") {
    return (
      <AnimatePresence>
        {isOpen && (
          <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
            <motion.section initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="relative z-10 w-full max-w-4xl bg-white dark:bg-neutral-900 rounded-xl shadow-xl p-6 overflow-y-auto max-h-[90vh]">
              <div className="flex justify-end">
                <button onClick={onClose} className="text-lg">✕</button>
              </div>
              <CardTitle className="text-center text-2xl font-bold mb-6">استمارة تسجيل الحضور <span className="text-[#fbbc05]">ملتقى WEBSCALE</span></CardTitle>
              {FormUI}
            </motion.section>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  return (
    <section dir="rtl" className="py-20 dark:bg-neutral-900 px-4">
      <div className="max-w-4xl mx-auto">
        <Card className="bg-white dark:bg-neutral-800 border-none shadow-xl">
          <CardHeader>
            <CardTitle className="text-center text-3xl font-bold">استمارة تسجيل الحضور <span className="text-[#fbbc05]">ملتقى WEBSCALE</span></CardTitle>
          </CardHeader>
          <CardContent>{FormUI}</CardContent>
        </Card>
      </div>
    </section>
  );
}
