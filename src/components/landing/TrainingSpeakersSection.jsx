// src/components/landing/TrainingSpeakersSection.jsx
import { GraduationCap, Award, Calendar } from "lucide-react";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const TrainingSpeakersSection = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const speakers = [
    {
      name: "عبد الرحيم عبداللاوي",
      title: "خبير التسويق",
      course: "Marketing Day",
      description: "دورة متخصصة في استراتيجيات التسويق الحديثة",
      color: "from-blue-500 to-blue-600",
      icon: "💼",
    },
    {
      name: "سليم بن اعراب",
      title: "خبير الإدارة والتسيير",
      course: "دورة جودة الادارة",
      description: "تطوير مهارات الإدارة وتحسين جودة التسيير",
      color: "from-indigo-500 to-indigo-600",
      icon: "📊",
    },
    {
      name: "راسلام",
      title: "خبير الذكاء الاصطناعي",
      course: "دورة الاتمتة بالذكاء الاصطناعي",
      description: "تعلم كيفية استخدام الذكاء الاصطناعي لأتمتة العمليات",
      color: "from-purple-500 to-purple-600",
      icon: "🤖",
    },
  ];

  return (
    <section
      id="training-courses"
      dir="rtl"
      className="py-20 px-4 bg-white dark:bg-neutral-900"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <div className="inline-flex items-center justify-center gap-2 mb-4">
            <GraduationCap className="text-blue-500" size={40} />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-4">
            <span className="text-blue-500">دورات تدريبية</span> متخصصة
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto leading-relaxed">
            على غرار الدورات المسجلة في المنصة، تقدم واب سكايل مجموعة من الدورات المتخصصة والحضورية في عدة مجالات تهم أصحاب المؤسسات وإطاراتهم
          </p>
        </div>

        {/* Speaker Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {speakers.map((speaker, idx) => (
            <div
              key={idx}
              className="group"
              data-aos="fade-up"
              data-aos-delay={idx * 100}
            >
              <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-neutral-700 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                {/* Gradient Header */}
                <div className={`bg-gradient-to-r ${speaker.color} p-6 text-center relative overflow-hidden`}>
                  {/* Decorative circles */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
                  <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full -ml-8 -mb-8"></div>
                  
                  {/* Avatar Circle */}
                  <div className="relative inline-block">
                    <div className="w-24 h-24 mx-auto bg-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <span className="text-5xl">{speaker.icon}</span>
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-2 shadow-md">
                      <Award className="text-blue-500" size={20} />
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-1 text-center">
                    {speaker.name}
                  </h3>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4 text-center">
                    {speaker.title}
                  </p>
                  
                  <div className="space-y-3">
                    {/* Course Badge */}
                    <div className={`bg-gradient-to-r ${speaker.color} bg-opacity-10 rounded-xl p-3 text-center`}>
                      <p className="font-semibold text-neutral-800 dark:text-white text-base">
                        {speaker.course}
                      </p>
                    </div>
                    
                    {/* Description */}
                    <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed text-center">
                      {speaker.description}
                    </p>
                  </div>
                </div>

                {/* Footer */}
                <div className={`bg-gradient-to-r ${speaker.color} bg-opacity-5 dark:bg-opacity-10 px-6 py-3 border-t border-gray-100 dark:border-neutral-700`}>
                  <div className="flex items-center justify-center gap-2 text-xs text-neutral-600 dark:text-neutral-400">
                    <Calendar size={14} />
                    <span>قريباً</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info Card */}
        <div
          className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-8 border border-blue-100 dark:border-blue-800"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          <div className="text-center">
            <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-3">
              المزيد من الدورات قريباً
            </h3>
            <p className="text-neutral-700 dark:text-neutral-300 text-lg">
              نعمل على إضافة المزيد من الدورات التدريبية المتخصصة في مجالات مختلفة
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <div className="px-4 py-2 bg-white dark:bg-neutral-800 rounded-full shadow-sm">
                <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  دورات جديدة كل شهر
                </span>
              </div>
              <div className="px-4 py-2 bg-white dark:bg-neutral-800 rounded-full shadow-sm">
                <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  شهادات معتمدة
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrainingSpeakersSection;

