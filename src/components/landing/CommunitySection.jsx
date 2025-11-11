// src/components/landing/CommunitySection.jsx
import AOS from "aos";
import "aos/dist/aos.css";
import { BookOpen, Calendar, CheckCircle2, Clock, MessageCircle, Network, Users, Video } from "lucide-react";
import { useEffect } from "react";

const CommunitySection = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const experts = [
    {
      name: "أ. سليم بن اعراب",
      specialty: "الادارة والتسيير",
      image: "/experts/benarab.png",
      color: "from-amber-500 to-orange-500"
    },
    {
      name: "عبد الرحيم عبداللاوي",
      specialty: "التسويق",
      image: "/experts/abderrahim.jpg",
      color: "from-blue-500 to-cyan-500"
    },
    {
      name: "عبدالمالك شتى",
      specialty: "تنظيم ورقمنة المؤسسات",
      image: "/experts/chetta.png",
      color: "from-purple-500 to-pink-500"
    },
    {
      name: "نورالدين هواري",
      specialty: "استخدامات الذكاء الاصطناعي",
      image: "/experts/noureddine houari.jpg",
      color: "from-green-500 to-emerald-500"
    }
  ];

  const features = [
    { icon: Video, text: "تسجيل لجميع اللقاءات الاسبوعية", color: "text-red-500" },
    { icon: MessageCircle, text: "امكانية طرح الاسئلة واستشارة الخبراء", color: "text-blue-500" },
    { icon: BookOpen, text: "دورات تدريبية مسجلة", color: "text-purple-500" },
    { icon: MessageCircle, text: "امكانية النشر والتعليق والمشاركة في النقاشات", color: "text-green-500" },
    { icon: Network, text: "امكانية التواصل مع اعضاء المجتمع في الخاص وتشبيك العلاقات", color: "text-indigo-500" },
    { icon: Clock, text: "امكانية الوصول في اي وقت ومن اي مكان", color: "text-orange-500" },
    { icon: CheckCircle2, text: "الاولوية في التسجيل في خدمات ومنتجات واب سكايل القادمة", color: "text-teal-500" }
  ];

  return (
    <section
      id="community"
      dir="rtl"
      className="py-20 px-4 bg-gradient-to-b from-white to-amber-50 dark:from-neutral-900 dark:to-amber-900/10"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <div className="inline-flex items-center justify-center gap-2 mb-4">
            <Users className="text-[#fbbc05]" size={40} />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-4">
            مجتمع <span className="text-[#fbbc05]">واب سكايل</span>
          </h2>
          <p className="text-xl text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto leading-relaxed">
            مجتمع تفاعلي خاص لأرباب العمل مع محتوى عملي
          </p>
        </div>

        {/* Weekly Consultations Header */}
        <div className="mb-12" data-aos="fade-up">
          <div className="bg-gradient-to-r from-[#fbbc05] to-[#f59e0b] rounded-2xl p-8 text-white text-center">
            <h3 className="text-3xl font-bold mb-3">لقاءان للاستشارة الجماعية</h3>
            <p className="text-xl opacity-90">كل أسبوع مع خبراء في 4 مجالات</p>
          </div>
        </div>

        {/* Expert Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {experts.map((expert, idx) => (
            <div
              key={idx}
              className="group"
              data-aos="fade-up"
              data-aos-delay={idx * 100}
            >
              <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-3 overflow-hidden border-2 border-gray-100 dark:border-neutral-700 hover:border-[#fbbc05]/50">
                {/* Large Avatar Section */}
                <div className="relative pt-8 pb-6 px-6">
                  {/* Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${expert.color} opacity-5`}></div>
                  
                  {/* Large Circular Avatar */}
                  <div className="relative z-10">
                    <div className="w-36 h-36 mx-auto rounded-full overflow-hidden shadow-2xl group-hover:shadow-[0_20px_60px_-15px_rgba(251,188,5,0.5)] transition-all duration-300 border-4 border-white dark:border-neutral-700 group-hover:scale-105 ring-4 ring-gray-100 dark:ring-neutral-600 group-hover:ring-[#fbbc05]/30">
                      <img 
                        src={expert.image} 
                        alt={expert.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Decorative gradient circle behind */}
                    <div className={`absolute inset-0 -z-10 w-36 h-36 mx-auto rounded-full bg-gradient-to-br ${expert.color} blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-300`}></div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="px-6 pb-8 text-center">
                  <h4 className="font-bold text-xl text-neutral-900 dark:text-white mb-3 leading-tight">
                    {expert.name}
                  </h4>
                  <div className={`inline-block px-4 py-2 rounded-full bg-gradient-to-r ${expert.color} bg-opacity-10 mb-2`}>
                    <p className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                      {expert.specialty}
                    </p>
                  </div>
                </div>

                {/* Bottom gradient accent */}
                <div className={`h-1 bg-gradient-to-r ${expert.color}`}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="space-y-4" data-aos="fade-up" data-aos-delay="400">
          <h3 className="text-2xl font-bold text-neutral-900 dark:text-white text-center mb-8">
            مميزات المجتمع
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="flex items-start gap-4 p-5 bg-white dark:bg-neutral-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-neutral-700 group"
                data-aos="fade-up"
                data-aos-delay={500 + idx * 50}
              >
                <div className={`${feature.color} bg-opacity-10 p-3 rounded-lg group-hover:scale-110 transition-transform`}>
                  <feature.icon className={feature.color} size={24} />
                </div>
                <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed flex-1">
                  {feature.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Card */}
        <div
          className="mt-12 bg-gradient-to-r from-[#fbbc05]/10 to-[#f59e0b]/10 dark:from-[#fbbc05]/20 dark:to-[#f59e0b]/20 rounded-2xl p-8 border border-[#fbbc05]/30 text-center"
          data-aos="fade-up"
          data-aos-delay="800"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Calendar className="text-[#fbbc05]" size={32} />
            <h4 className="text-2xl font-bold text-neutral-900 dark:text-white">
              انضم إلى المجتمع اليوم
            </h4>
          </div>
          <p className="text-lg text-neutral-700 dark:text-neutral-300">
            استفد من خبرات المتخصصين وتواصل مع أرباب العمل من جميع أنحاء الجزائر
          </p>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;

