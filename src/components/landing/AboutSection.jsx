// src/components/landing/AboutSection.jsx
import { Eye, Rocket, Star } from "lucide-react";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const AboutSection = () => {
  const values = ["الحكمة", "الابتكار", "التطبيق", "الشفافية", "الشراكة", "الأثر"];

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <section
      id="about-webscale"
      dir="rtl"
      className="py-20 px-4 dark:bg-neutral-900 transition-colors duration-300"
    >
      <div className="max-w-4xl mx-auto space-y-8" data-aos="fade-up">
        <h2 className="text-4xl font-bold text-neutral-900 dark:text-white text-center mb-6">
          من هي <span className="text-[#fbbc05]">واب سكايل؟</span>
        </h2>
        
        <div className="bg-gradient-to-br from-[#fbbc05]/10 to-[#fbbc05]/5 dark:from-[#fbbc05]/20 dark:to-[#fbbc05]/10 rounded-2xl p-8 border border-[#fbbc05]/20">
          <p className="text-xl text-neutral-800 dark:text-neutral-200 leading-relaxed text-center font-medium">
            مجتمع مغلق خاص لأصحاب الشركات والمسيرين. يهدف إلى تمكين المؤسسات من اكتساب حكمة التسيير، وتطوير قدرتها على استخدام التكنولوجيا الحديثة لتحقيق نمو أسرع وأكثر استدامة
          </p>
        </div>

        {/* الرؤية */}
        <div className="flex items-start gap-4 p-6 bg-white dark:bg-neutral-800 rounded-xl shadow-sm">
          <Eye className="text-[#fbbc05] mt-1 flex-shrink-0" size={28} />
          <div>
            <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-2">الرؤية</h3>
            <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">
              أن تكون WEBSCALE المرجع الجزائري لبيئة الأعمال الحديثة.
            </p>
          </div>
        </div>

        {/* الرسالة */}
        <div className="flex items-start gap-4 p-6 bg-white dark:bg-neutral-800 rounded-xl shadow-sm">
          <Rocket className="text-[#fbbc05] mt-1 flex-shrink-0" size={28} />
          <div>
            <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-2">الرسالة</h3>
            <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">
              تمكين القادة من فهم عميق وتطبيق فوري عبر محتوى تطبيقي، مجتمعات مغلقة،
              وبرامج بث أسبوعية مع خبراء.
            </p>
          </div>
        </div>

        {/* القيم */}
        <div className="flex items-start gap-4 p-6 bg-white dark:bg-neutral-800 rounded-xl shadow-sm">
          <Star className="text-[#fbbc05] mt-1 flex-shrink-0" size={28} />
          <div>
            <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-3">القيم</h3>
            <div className="flex flex-wrap gap-3">
              {values.map((val, idx) => (
                <span
                  key={idx}
                  className="px-4 py-2 text-base rounded-full bg-[#fbbc05]/20 text-[#b58600] dark:bg-[#fbbc05]/10 dark:text-[#fbbc05] font-medium"
                >
                  {val}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

