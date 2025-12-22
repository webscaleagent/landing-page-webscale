import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AlgeriaWilayas from "./shared/AlgeriaWilayas";

const SCRIPT_URL = import.meta.env.VITE_SCRIPT_URL || "https://crmgo.webscale.dz/api/v1/public/forms/47401ef7-042c-4994-8645-569b14749758/submit";

// زر اختيار
const ChoiceButton = ({ value, selected, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`px-4 py-2 rounded-lg border transition text-sm
      ${selected
        ? "bg-gradient-to-r from-[#fbbc05] to-[#715a1a] text-white border-transparent"
        : "border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800"
      }`}
  >
    {value}
  </button>
);

export default function RegistrationForm() {
  const [status, setStatus] = useState("idle");
  const [showOtherInput, setShowOtherInput] = useState({
    sector: false,
    sponsorshipType: false,
    sponsorshipGoals: false
  });
  const [otherValues, setOtherValues] = useState({
    sector: "",
    sponsorshipType: "",
    sponsorshipGoals: ""
  });

  const [formDataState, setFormDataState] = useState({
    sector: "",
    companySize: "",
    wilaya: "",
    sponsorshipType: [],
    sponsorshipGoals: [],
    budget: "",
    consent: false
  });

  const toggleMultiSelect = (field, value) => {
    if (value === "أخرى") {
      setShowOtherInput((prev) => ({ ...prev, [field]: !prev[field] }));
      if (!formDataState[field].includes("أخرى")) {
        setFormDataState((prev) => ({
          ...prev,
          [field]: [...prev[field], "أخرى"]
        }));
      }
    } else {
      setFormDataState((prev) => ({
        ...prev,
        [field]: prev[field].includes(value)
          ? prev[field].filter((v) => v !== value)
          : [...prev[field], value]
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formDataState.consent) {
      alert("يجب الموافقة على التواصل قبل الإرسال");
      return;
    }

    const finalState = { ...formDataState };

    // دمج قيم "أخرى" مع الحقول
    if (showOtherInput.sector && otherValues.sector) {
      finalState.sector = otherValues.sector;
    }
    if (showOtherInput.sponsorshipType && otherValues.sponsorshipType) {
      finalState.sponsorshipType = [
        ...formDataState.sponsorshipType.filter((v) => v !== "أخرى"),
        otherValues.sponsorshipType
      ];
    }
    if (showOtherInput.sponsorshipGoals && otherValues.sponsorshipGoals) {
      finalState.sponsorshipGoals = [
        ...formDataState.sponsorshipGoals.filter((v) => v !== "أخرى"),
        otherValues.sponsorshipGoals
      ];
    }

    setStatus("loading");
    try {
      const formData = new FormData(e.target);
      Object.entries(finalState).forEach(([k, v]) =>
        formData.set(k, Array.isArray(v) ? v.join(", ") : v)
      );
      const res = await fetch(SCRIPT_URL, { method: "POST", body: formData });
      
      // Check if status is 2xx (success)
      if (res.ok && res.status >= 200 && res.status < 300) {
        setStatus("success");
        e.target.reset();
        setFormDataState({
          sector: "",
          companySize: "",
          wilaya: "",
          sponsorshipType: [],
          sponsorshipGoals: [],
          budget: "",
          consent: false
        });
        setOtherValues({ sector: "", sponsorshipType: "", sponsorshipGoals: "" });
        setShowOtherInput({ sector: false, sponsorshipType: false, sponsorshipGoals: false });
        alert("✅ تم إرسال بياناتك بنجاح!");
        setTimeout(() => setStatus("idle"), 10000);
      } else {
        setStatus("error");
        let errorMsg = "حدث خطأ أثناء الإرسال";
        try {
          const errorData = await res.json();
          if (errorData.error || errorData.message) {
            errorMsg = errorData.error || errorData.message;
          }
        } catch {
          // Keep default error message
        }
        alert(`⚠️ ${errorMsg}`);
      }
    } catch {
      setStatus("error");
      alert("⚠️ حدث خطأ في الاتصال. تحقق من الإنترنت وحاول مجددًا.");
    }
  };

  return (
    <section id="register" dir="rtl" className="py-20 dark:bg-neutral-900 px-4">
      <div className="max-w-4xl mx-auto">
        <Card className="bg-white dark:bg-neutral-800 border-none shadow-xl">
          <CardHeader>
            <CardTitle className="text-center text-3xl font-bold">
              استمارة تسجيل الرعاة <span className="text-[#fbbc05]">ملتقى WEBSCALE</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {status === "success" ? (
              <div className="text-center py-10">
                <h3 className="text-2xl font-bold text-green-500">✅ تم إرسال بياناتك!</h3>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8 text-right">
                
                {/* القسم 1 – معلومات الشركة */}
                <div>
                  <h4 className="font-bold mb-4 text-lg">القسم 1 – معلومات الشركة</h4>
                  <Label>اسم الشركة / المؤسسة *</Label>
                  <Input name="companyName" required className="mb-4" />

                  <Label>المجال أو القطاع</Label>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {["تجارة إلكترونية", "خدمات رقمية", "تكنولوجيا", "صناعات صغيرة", "شركات ناشئة", "أخرى"].map((s) => (
                      <ChoiceButton
                        key={s}
                        value={s}
                        selected={formDataState.sector === s}
                        onClick={() => {
                          if (s === "أخرى") {
                            setShowOtherInput((prev) => ({ ...prev, sector: !prev.sector }));
                            setFormDataState((prev) => ({ ...prev, sector: s }));
                          } else {
                            setFormDataState((prev) => ({ ...prev, sector: s }));
                          }
                        }}
                      />
                    ))}
                  </div>
                  {showOtherInput.sector && (
                    <Input
                      placeholder="يرجى التحديد..."
                      value={otherValues.sector}
                      onChange={(e) => setOtherValues((prev) => ({ ...prev, sector: e.target.value }))}
                      className="mb-4 border-yellow-500"
                    />
                  )}

                  <Label>حجم الشركة</Label>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {["أقل من 10 موظفين", "10–50 موظف", "أكثر من 50 موظف"].map((size) => (
                      <ChoiceButton
                        key={size}
                        value={size}
                        selected={formDataState.companySize === size}
                        onClick={() => setFormDataState((prev) => ({ ...prev, companySize: size }))}
                      />
                    ))}
                  </div>

                  <Label>الموقع الجغرافي / الولاية</Label>
                  <AlgeriaWilayas
                    value={formDataState.wilaya} name="location"
                    onChange={(val) => setFormDataState((prev) => ({ ...prev, wilaya: val }))}
                  />
                </div>

                {/* القسم 3 – الاهتمامات وفرص الرعاية */}
                <div>
                  <h4 className="font-bold mb-4 text-lg">القسم 3 – الاهتمامات وفرص الرعاية</h4>
                  <Label>نوع الرعاية</Label>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {["راعٍ ذهبي", "راعٍ فضي", "راعٍ برونزي", "شريك تقني / لوجستي", "أخرى"].map((t) => (
                      <ChoiceButton
                        key={t}
                        value={t}
                        selected={formDataState.sponsorshipType.includes(t)}
                        onClick={() => toggleMultiSelect("sponsorshipType", t)}
                      />
                    ))}
                  </div>
                  {showOtherInput.sponsorshipType && (
                    <Input
                      placeholder="يرجى التحديد..."
                      value={otherValues.sponsorshipType}
                      onChange={(e) => setOtherValues((prev) => ({ ...prev, sponsorshipType: e.target.value }))}
                      className="mb-4 border-yellow-500"
                    />
                  )}

                  <Label>أهدافكم من الرعاية</Label>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {["زيادة الوعي بالعلامة التجارية", "الوصول إلى شريحة مستهدفة من أصحاب الأعمال", "توليد عملاء محتملين", "بناء شراكات استراتيجية", "أخرى"].map((goal) => (
                      <ChoiceButton
                        key={goal}
                        value={goal}
                        selected={formDataState.sponsorshipGoals.includes(goal)}
                        onClick={() => toggleMultiSelect("sponsorshipGoals", goal)}
                      />
                    ))}
                  </div>
                  {showOtherInput.sponsorshipGoals && (
                    <Input
                      placeholder="يرجى التحديد..."
                      value={otherValues.sponsorshipGoals}
                      onChange={(e) => setOtherValues((prev) => ({ ...prev, sponsorshipGoals: e.target.value }))}
                      className="mb-4 border-yellow-500"
                    />
                  )}
                </div>

                {/* القسم 4 – ملاحظات إضافية */}
                <div>
                  <h4 className="font-bold mb-4 text-lg">القسم 4 – ملاحظات إضافية</h4>
                  <Textarea name="notes" rows={3} />
                </div>

                {/* القسم 5 – الموافقة */}
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="agreement"
                    checked={formDataState.consent}
                    onChange={(e) => setFormDataState((prev) => ({ ...prev, consent: e.target.checked }))}
                    required
                  />
                  <Label>أوافق على أن يتواصل معي فريق WEBSCALE لمناقشة فرص الرعاية</Label>
                </div>

                {/* الحالة */}
                {status === "loading" && <p className="text-blue-500">⏳ جاري الإرسال...</p>}
                {status === "error" && <p className="text-red-500">⚠️ حدث خطأ أثناء الإرسال</p>}

                {/* تحذير الحقول الإلزامية */}
                <div className="pt-4 pb-2">
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-300 dark:border-yellow-700 rounded-lg p-3">
                    <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200 text-center">
                      ⚠️ يرجى ملء جميع الحقول الإلزامية (المميزة بـ *) وإلا لن تتمكن من الإرسال
                    </p>
                  </div>
                </div>

                {/* إرسال */}
                <Button type="submit" disabled={status === "loading"} className="w-full bg-gradient-to-r from-[#fbbc05] to-[#715a1a] text-white">
                  إرسال
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
