// src/components/registration/Hero.jsx
import { motion } from "framer-motion";
import { scrollToSection } from "../../utils/scroll";

const Hero = () => {
  return (
    <section
      id="hero"
      dir="rtl"
      className="relative overflow-hidden bg-gradient-to-tr from-yellow-50 via-white to-yellow-100 dark:from-neutral-900 dark:via-neutral-950 dark:to-neutral-900"
    >
      {/* خلفية مزخرفة */}
      <div className="absolute inset-0">
        <div className="absolute top-32 right-0 w-72 h-72 bg-[#FABC05]/20 rounded-full blur-3xl opacity-60 animate-pulse"></div>
        <div className="absolute bottom-32 left-0 w-72 h-72 bg-[#FABC05]/30 rounded-full blur-3xl opacity-60 animate-pulse"></div>
      </div>

      <div className="container relative mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-16 sm:py-20 md:py-24 lg:py-28">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* النص */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="px-4 py-1 text-sm font-medium bg-[#FABC05]/20 text-[#FABC05] rounded-full shadow-sm">
              مجتمع حصري · لأرباب العمل
            </span>
            <h1 className="mt-6 text-4xl md:text-5xl font-extrabold leading-[1.15] text-gray-900 dark:text-white">
              مجتمع خاص بمسيري الشركات في الجزائر
            </h1>
            <p className="mt-5 text-gray-700 dark:text-gray-300 text-lg leading-8">
              WEBSCALE هو مجتمع مدفوع ومغلق لأصحاب الشركات والمسيرين. نوفِّر
              محتوى عملياً، جلسات مباشرة أسبوعية، وأحداثاً حضورية، مع شبكة
              علاقات عالية القيمة.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection("apply")}
                className="rounded-xl bg-[#FABC05] text-black font-semibold px-6 py-3 text-sm shadow-lg hover:shadow-xl transition-all"
              >
                قدِّم طلب الانضمام
              </motion.button>
              {/* <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/investor"
                  className="inline-block rounded-xl border-2 border-[#fa0505] text-[#FABC05] font-semibold px-6 py-3 text-sm shadow-lg hover:bg-[#FABC05] hover:text-black transition-all"
                >
                  فرص الاستثمار
                </Link>
              </motion.div> */}
              {/* <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection("benefits")}
                className="rounded-xl border border-gray-300 px-6 py-3 text-sm text-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-800 transition-colors"
              >
                تعرَّف على المزايا
              </motion.button> */}
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
              <span>
                مواعيد الجلسات المباشرة مع الخبراء: السبت/الأربعاء ·
              </span>
              <span className="hidden md:inline">•</span>
              <span>يوم دراسي مرة كل شهرين— المركز الثقافي لجامع الجزائر</span>
            </div>
          </motion.div>

          {/* YouTube Video */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Animated Border Container with Glass Effect */}
            <div className="relative w-full mx-auto rounded-3xl" style={{ maxWidth: "450px", padding: "4px" }}>
              {/* Glass morphism border with gradient */}
              <div 
                className="absolute inset-0 rounded-3xl backdrop-blur-xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(250, 188, 5, 0.9))',
                  backgroundSize: '200% 200%',
                  animation: 'gradient-shift 3s ease infinite',
                  boxShadow: '0 8px 32px 0 rgba(250, 188, 5, 0.2), inset 0 0 20px rgba(255, 255, 255, 0.5)'
                }}
              ></div>
              
              {/* Inner glow effect */}
              <div 
                className="absolute inset-0 rounded-3xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.4), rgba(250, 188, 5, 0.4))',
                  filter: 'blur(8px)',
                  animation: 'glow-pulse 2s ease-in-out infinite'
                }}
              ></div>
              
              {/* Video container */}
              <div className="relative overflow-hidden rounded-3xl shadow-2xl bg-black" style={{ backdropFilter: 'blur(10px)' }}>
                <div className="relative" style={{ paddingBottom: "177.78%" }}>
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src="https://www.youtube.com/embed/ATB5Kjy4Wck?autoplay=1&loop=1&playlist=ATB5Kjy4Wck&controls=0&showinfo=0&rel=0&modestbranding=1"
                    title="WEBSCALE"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
            
            {/* Keyframes for animations */}
            <style>{`
              @keyframes gradient-shift {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
              }
              
              @keyframes glow-pulse {
                0%, 100% { opacity: 0.6; }
                50% { opacity: 0.9; }
              }
            `}</style>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
