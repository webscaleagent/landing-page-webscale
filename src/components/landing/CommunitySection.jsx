// src/components/landing/CommunitySection.jsx
import AOS from "aos";
import "aos/dist/aos.css";
import { BookOpen, Calendar, CheckCircle2, ChevronLeft, ChevronRight, Clock, MessageCircle, Network, Users, Video } from "lucide-react";
import { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const CommunitySection = () => {
  const swiperRef = useRef(null);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const experts = [
    {
      name: "أ. سليم بن اعراب",
      specialty: "الادارة والتسيير",
      image: "/experts/benarab.png",
      color: "from-amber-500 to-orange-500",
      bgColor: "bg-orange-50",
      buttonColor: "bg-orange-500"
    },
    {
      name: "عبد الرحيم عبداللاوي",
      specialty: "التسويق",
      image: "/experts/abderrahim.jpg",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      buttonColor: "bg-blue-500"
    },
    {
      name: "عبدالمالك شتى",
      specialty: "تنظيم ورقمنة المؤسسات",
      image: "/experts/chetta.png",
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50",
      buttonColor: "bg-purple-500"
    },
    {
      name: "نورالدين هواري",
      specialty: "استخدامات الذكاء الاصطناعي",
      image: "/experts/noureddine houari.jpg",
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50",
      buttonColor: "bg-green-500"
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

  const clientLogos = Array.from({ length: 14 }, (_, i) => i + 1);

  return (
    <section
      id="community"
      dir="rtl"
      className="py-20 px-4 bg-gradient-to-b from-white to-amber-50 dark:from-neutral-900 dark:to-amber-900/10"
    >
      <div className="max-w-[1600px] mx-auto">
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
        <div className="mb-12 px-8 md:px-16 lg:px-24 xl:px-32" data-aos="fade-up">
          <div className="bg-gradient-to-r from-[#fbbc05] to-[#f59e0b] rounded-2xl p-8 text-white text-center">
            <h3 className="text-3xl font-bold mb-3">لقاءان للاستشارة الجماعية</h3>
            <p className="text-xl opacity-90">كل أسبوع مع خبراء في 4 مجالات</p>
          </div>
        </div>

        {/* Expert Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 px-8 md:px-16 lg:px-24 xl:px-32">
          {experts.map((expert, idx) => (
            <div
              key={idx}
              className="group"
              data-aos="fade-up"
              data-aos-delay={idx * 100}
            >
              <div className={`${expert.bgColor} dark:bg-neutral-800 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden cursor-pointer relative`}>
                {/* Yellow accent line on hover */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-[#fbbc05] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-2xl"></div>
                
                {/* Card Content */}
                <div className="px-6 pt-8 pb-6 text-center">
                  {/* Circular Avatar */}
                  <div className="mb-4">
                    <div className="w-32 h-32 mx-auto rounded-full overflow-hidden shadow-md border-2 border-white">
                      <img 
                        src={expert.image} 
                        alt={expert.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Name */}
                  <h4 className="font-bold text-lg text-neutral-900 dark:text-white mb-4 leading-tight">
                    {expert.name}
                  </h4>

                  {/* Specialty Button */}
                  <div className="mb-4">
                    <button className={`px-4 py-2 rounded-lg text-sm font-semibold text-white ${expert.buttonColor} shadow-sm hover:shadow-md transition-all duration-300`}>
                      {expert.specialty}
                    </button>
                  </div>
                </div>

                {/* Bottom gradient border */}
                <div className={`h-1.5 bg-gradient-to-r ${expert.color}`}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Our Clients Section */}
        <div className="mb-16" data-aos="fade-up" data-aos-delay="300">
          <h3 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white text-center mb-10">
            عملاؤنا
          </h3>
          <div className="relative w-full -mx-4">
            <Swiper
              ref={swiperRef}
              modules={[Autoplay, Navigation]}
              spaceBetween={24}
              slidesPerView="auto"
              autoplay={{
                delay: 1000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              loop={true}
              navigation={{
                nextEl: '.swiper-button-next-custom',
                prevEl: '.swiper-button-prev-custom',
              }}
              breakpoints={{
                320: {
                  slidesPerView: 2,
                  spaceBetween: 16,
                },
                640: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 4,
                  spaceBetween: 24,
                },
                1024: {
                  slidesPerView: 5,
                  spaceBetween: 24,
                },
                1280: {
                  slidesPerView: 6,
                  spaceBetween: 24,
                },
              }}
              className="py-4"
            >
              {clientLogos.map((num) => (
                <SwiperSlide key={num} style={{ width: '180px' }}>
                  <div
                    className="bg-gradient-to-br from-white to-gray-50 dark:from-neutral-800 dark:to-neutral-900 p-3 md:p-4 shadow-lg hover:shadow-2xl transition-all duration-500 flex items-center justify-center relative overflow-hidden transform hover:-translate-y-1 hover:scale-105 group"
                    style={{ 
                      width: "180px",
                      height: "160px"
                    }}
                  >
                    {/* Background gradient on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#fbbc05]/0 to-[#f59e0b]/0 group-hover:from-[#fbbc05]/5 group-hover:to-[#f59e0b]/5 transition-all duration-500"></div>
                    
                    {/* Glowing effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#fbbc05]/10 to-transparent blur-xl"></div>
                    </div>
                    
                    {/* Logo */}
                    <img
                      src={`/clients/${num}.png`}
                      alt={`Client ${num}`}
                      className="relative z-10 w-full h-full object-contain opacity-80 group-hover:opacity-100 transition-all duration-500"
                    />
                    
                    {/* Corner accent */}
                    <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-br from-[#fbbc05]/0 to-transparent group-hover:from-[#fbbc05]/20 transition-all duration-500 rounded-bl-full"></div>
                    <div className="absolute bottom-0 left-0 w-12 h-12 bg-gradient-to-tr from-[#f59e0b]/0 to-transparent group-hover:from-[#f59e0b]/20 transition-all duration-500 rounded-tr-full"></div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Custom Navigation Buttons */}
            <button
              className="swiper-button-prev-custom absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-neutral-800 rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-300 opacity-100 hover:scale-110 cursor-pointer"
              aria-label="Previous"
            >
              <ChevronRight className="w-6 h-6 text-[#fbbc05]" />
            </button>

            <button
              className="swiper-button-next-custom absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-neutral-800 rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-300 opacity-100 hover:scale-110 cursor-pointer"
              aria-label="Next"
            >
              <ChevronLeft className="w-6 h-6 text-[#fbbc05]" />
            </button>
          </div>
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

