// src/components/landing/SmartManagerSection.jsx
import { Bot, Brain, Sparkles, CheckCircle2, Zap, Target, Shield } from "lucide-react";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const SmartManagerSection = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const features = [
    {
      icon: Brain,
      title: "حكمة محلية",
      description: "مدرب على خبرات وحكمة التسيير الجزائري",
      color: "text-green-500"
    },
    {
      icon: Target,
      title: "إجابات دقيقة",
      description: "ضمان جودة الإجابات تحت إشراف خبراء",
      color: "text-blue-500"
    },
    {
      icon: Zap,
      title: "سرعة الاستجابة",
      description: "احصل على إجابات فورية لاستفساراتك",
      color: "text-yellow-500"
    },
    {
      icon: Shield,
      title: "موثوق وآمن",
      description: "معلومات محدثة ومراجعة من قبل متخصصين",
      color: "text-purple-500"
    }
  ];

  const useCases = [
    "استشارات إدارية وتنظيمية",
    "حلول للتحديات اليومية",
    "نصائح في التسويق والمبيعات",
    "استراتيجيات النمو والتطوير",
    "أتمتة العمليات",
    "التحول الرقمي"
  ];

  return (
    <section
      id="smart-manager"
      dir="rtl"
      className="py-20 px-4 bg-gradient-to-b from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <div className="inline-flex items-center justify-center gap-3 mb-4">
            <Bot className="text-green-500" size={48} />
            <Sparkles className="text-emerald-500" size={32} />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-4">
            <span className="text-green-500">المسير</span> الذكي
          </h2>
          <p className="text-xl text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto leading-relaxed">
            ذكاء اصطناعي خاص بتسيير المؤسسات
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Left Column - Description */}
          <div data-aos="fade-up" data-aos-delay="100">
            <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-neutral-700 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                  <Brain className="text-white" size={24} />
                </div>
                <h3 className="text-2xl font-bold text-neutral-900 dark:text-white">
                  عن المشروع
                </h3>
              </div>
              
              <p className="text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed mb-6">
                كوننا نؤمن أن طفرة النمو تحدث عند استخدام التكنولوجيا، نعمل على انشاء <strong>المسير الذكي</strong> عبارة عن ذكاء اصطناعي خاص بتسيير المؤسسات تحت تأطير خبراء لتدريبه على الحكمة المحلية في التسيير وضمان جودة الاجابات التي يقدمها
              </p>

              {/* Use Cases */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6 border border-green-100 dark:border-green-800">
                <h4 className="font-bold text-neutral-900 dark:text-white mb-4 flex items-center gap-2">
                  <Target className="text-green-500" size={20} />
                  مجالات الاستخدام
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {useCases.map((useCase, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircle2 className="text-green-500 flex-shrink-0" size={16} />
                      <span className="text-sm text-neutral-700 dark:text-neutral-300">
                        {useCase}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Features */}
          <div className="space-y-4" data-aos="fade-up" data-aos-delay="200">
            <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">
              المميزات الرئيسية
            </h3>
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-neutral-700 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                data-aos="fade-up"
                data-aos-delay={300 + idx * 100}
              >
                <div className="flex items-start gap-4">
                  <div className={`${feature.color} bg-opacity-10 p-3 rounded-lg`}>
                    <feature.icon className={feature.color} size={28} />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-neutral-900 dark:text-white mb-2">
                      {feature.title}
                    </h4>
                    <p className="text-neutral-600 dark:text-neutral-400">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Status Banner */}
        <div
          className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-8 text-white text-center shadow-2xl"
          data-aos="fade-up"
          data-aos-delay="600"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles size={32} className="animate-pulse" />
            <h3 className="text-3xl font-bold">قريباً - تحت التطوير</h3>
            <Sparkles size={32} className="animate-pulse" />
          </div>
          <p className="text-xl opacity-90 mb-6">
            نعمل على تطوير المسير الذكي بمعايير عالية لضمان أفضل تجربة لك
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <div className="px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full">
              <span className="font-semibold">مدعوم بخبراء محليين</span>
            </div>
            <div className="px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full">
              <span className="font-semibold">تقنيات ذكاء اصطناعي متطورة</span>
            </div>
            <div className="px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full">
              <span className="font-semibold">متاح للأعضاء قريباً</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SmartManagerSection;

