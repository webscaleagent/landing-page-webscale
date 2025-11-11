// src/components/landing/EventsSection.jsx
import { Calendar, MapPin } from "lucide-react";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const EventsSection = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const events = [
    {
      title: "الحدث الاول",
      subtitle: "انظمة ادارة علاقات العملاء CRM",
      description: "يوم دراسي متخصص لفهم وتطبيق أنظمة CRM في مؤسستك",
      icon: "📊",
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "الحدث الثاني",
      subtitle: "الاعوان الذكية في خدمة تجارتك الالكترونية",
      description: "كيف تستخدم الذكاء الاصطناعي لتطوير تجارتك الإلكترونية",
      icon: "🤖",
      color: "from-purple-500 to-purple-600"
    },
    {
      title: "رحلات عمل جماعية",
      subtitle: "زيارة اهم المعارض الدولية",
      description: "فرصة لاكتشاف أحدث التقنيات والتواصل مع الخبراء العالميين",
      icon: "✈️",
      color: "from-cyan-500 to-cyan-600"
    },
    {
      title: "لقاءات تشبيك",
      subtitle: "تطوير العمل وتشبيك العلاقات",
      description: "لقاءات دورية لبناء شراكات استراتيجية مع أرباب العمل",
      icon: "🤝",
      color: "from-green-500 to-green-600"
    }
  ];

  return (
    <section
      id="events"
      dir="rtl"
      className="py-20 px-4 bg-gradient-to-b from-purple-50 to-white dark:from-purple-900/10 dark:to-neutral-900"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <div className="inline-flex items-center justify-center gap-2 mb-4">
            <Calendar className="text-purple-500" size={40} />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-4">
            <span className="text-purple-500">احداث</span> وفعاليات
          </h2>
          <p className="text-xl text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto leading-relaxed">
            ايام دراسية عالية المستوى في مجالات جد مهمة
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {events.map((event, idx) => (
            <div
              key={idx}
              className="group"
              data-aos="fade-up"
              data-aos-delay={idx * 100}
            >
              <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100 dark:border-neutral-700 h-full">
                {/* Gradient Header */}
                <div className={`bg-gradient-to-r ${event.color} p-6 relative overflow-hidden`}>
                  {/* Decorative Elements */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
                  
                  <div className="relative z-10 flex items-start gap-4">
                    {/* Icon Circle */}
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg flex-shrink-0 group-hover:scale-110 transition-transform">
                      <span className="text-3xl">{event.icon}</span>
                    </div>
                    
                    {/* Title */}
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-2">
                        {event.title}
                      </h3>
                      <p className="text-white/90 text-base leading-relaxed">
                        {event.subtitle}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
                    {event.description}
                  </p>
                  
                  {/* Footer */}
                  <div className="mt-6 pt-4 border-t border-gray-200 dark:border-neutral-700">
                    <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                      <MapPin size={16} />
                      <span>جامع الجزائر</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default EventsSection;

