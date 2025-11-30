// src/pages/AboutUs.jsx
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
// import Testimonials from "@/components/Testimonials";
import heroVideo from "@/assets/video1.mp4";
import { aboutNav, aboutPlatformLinks, aboutResourcesLinks, communityLinks } from "@/constants";

const services = [
  {
    title: "شبكة مسيرين مغلقة",
    description: "تتعرف فيها على أصحاب مشاريع من نفس الواقع وتتبادل معهم الخبرة.",
    number: "1",
  },
  {
    title: "جلسات لايف أسبوعية",
    description: "تفهم فيها مشاكلك الحقيقية وتحصل على حلول مباشرة قابلة للتطبيق.",
    number: "2",
  },
  {
    title: "ورشات حضورية تطبيقية",
    description: "لقاءات تطبيقية مع خبراء في التسيير، التسويق، والإدارة الحديثة.",
    number: "3",
  },
  {
    title: "دورات رقمية مسجّلة (Recorded Classes)",
    description: "دروس قصيرة وجاهزة تساعدك على التعلم بسرعة من أي مكان وفي أي وقت.",
    number: "4",
  },
  {
    title: "محتوى ملخّص، بسيط، وقابل للتنفيذ الفوري",
    description: "مقالات، فيديوهات، ودروس قصيرة لشرح كيفية تنظيم العمل خطوة بخطوة.",
    number: "5",
  },
  {
    title: "أدوات رقمية لتنظيم التسيير",
    description: "حلول ذكية تساعدك على تحويل المعرفة إلى نظام فعلي داخل الشركة.",
    number: "6",
  },
];

const whyWeCare = [
  {
    title: "تسيير واضح",
    description: "نؤمن أن مستقبل الشركات في الجزائر يعتمد على تسيير واضح ومنظم.",
  },
  {
    title: "قرارات مبنية على المعرفة",
    description: "نوفر لك المعرفة والأدوات اللازمة لاتخاذ قرارات مدروسة.",
  },
  {
    title: "استخدام ذكي للتقنيات",
    description: "نساعدك على الاستفادة من التكنولوجيا دون تعقيد.",
  },
  {
    title: "بناء شبكات قوية",
    description: "نربطك بمسيرين آخرين لتبادل الخبرة والتعاون.",
  },
];

export default function AboutUs() {
  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100">
      <Helmet>
        <title>WEBSCALE | من نحن</title>
        <meta
          name="description"
          content="Webscale هي منصة جزائرية تساعد المسيرين وأصحاب المصانع على نمو أسرع بتقنيات أذكى عبر محتوى WEBSCALE، شبكة مسيرين، استشارات حية، ودورات عملية."
        />
        <meta property="og:title" content="WEBSCALE | من نحن" />
        <meta
          property="og:description"
          content="منصة تجمع المسيرين وأصحاب المصانع في فضاء واحد للتعلّم، تبادل الخبرة، وتحويل التسيير من فوضى إلى نظام واضح."
        />
        <meta property="og:url" content="https://webscale.dz/about" />
        <link rel="canonical" href="https://webscale.dz/about" />
      </Helmet>

      <Navbar navConfig={aboutNav} />

      <main className="flex-grow">
        <section
          id="about-hero"
          className="relative isolate overflow-hidden bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 text-neutral-50 py-24 lg:py-32"
        >
          <div className="absolute inset-0 opacity-20">
            <video
              className="w-full h-full object-cover scale-110"
              src={heroVideo}
              autoPlay
              loop
              muted
              playsInline
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-neutral-900 via-neutral-900/80 to-neutral-900/60" />
          </div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(251,188,5,0.1),transparent_50%)]" />
          <div className="relative container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl ml-auto space-y-8 text-right" dir="rtl">
              <div className="inline-block">
                <p className="text-sm tracking-[0.4em] uppercase text-[#fbbc05] font-bold bg-[#fbbc05]/10 px-4 py-2 rounded-full border border-[#fbbc05]/30">
                  WEBSCALE
                </p>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight bg-gradient-to-r from-white via-neutral-100 to-neutral-200 bg-clip-text text-transparent">
                منصة جزائرية تساعد المسيرين وأصحاب المصانع على نمو أسرع بتقنيات أذكى
              </h1>
              <p className="text-xl text-neutral-200 leading-relaxed max-w-3xl">
                عبر محتوى WEBSCALE، شبكة مسيرين، استشارات حية، ودورات عملية تساعدك على تنظيم عملك واتخاذ قرارات أوضح.
              </p>
              <div className="space-y-4 mt-8">
                <div className="flex items-center gap-4 text-neutral-100 group">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#fbbc05]/20 border border-[#fbbc05]/40 flex items-center justify-center group-hover:bg-[#fbbc05]/30 transition-colors">
                    <span className="text-[#fbbc05] text-lg font-bold">✓</span>
                  </div>
                  <span className="text-lg">شبكة احترافية لمسيرين يشبهونك</span>
                </div>
                <div className="flex items-center gap-4 text-neutral-100 group">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#fbbc05]/20 border border-[#fbbc05]/40 flex items-center justify-center group-hover:bg-[#fbbc05]/30 transition-colors">
                    <span className="text-[#fbbc05] text-lg font-bold">✓</span>
                  </div>
                  <span className="text-lg">جلسات مباشرة أسبوعية تساعدك على حل مشكلاتك اليومية</span>
                </div>
                <div className="flex items-center gap-4 text-neutral-100 group">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#fbbc05]/20 border border-[#fbbc05]/40 flex items-center justify-center group-hover:bg-[#fbbc05]/30 transition-colors">
                    <span className="text-[#fbbc05] text-lg font-bold">✓</span>
                  </div>
                  <span className="text-lg">محتوى ودورات عملية جاهزة للتطبيق</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-4 justify-end mt-10">
                <Link
                  to="/"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-gradient-to-r from-[#fbbc05] to-[#d29c04] text-neutral-900 font-bold shadow-2xl shadow-[#fbbc05]/30 hover:shadow-[#fbbc05]/50 hover:scale-105 transition-all duration-300"
                >
                  ابدأ رحلتك مع المجتمع
                </Link>
                <a
                  href="#about-mission"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-xl border-2 border-neutral-200/50 bg-white/5 backdrop-blur-sm hover:border-[#fbbc05] hover:bg-[#fbbc05]/10 transition-all duration-300"
                >
                  اكتشف المزيد
                </a>
              </div>
            </div>
          </div>
        </section>

        <section
          id="about-mission"
          className="container mx-auto px-4 lg:px-8 py-20 space-y-12"
          dir="rtl"
        >
          <div className="relative bg-white dark:bg-neutral-900 rounded-3xl shadow-2xl border border-neutral-200/70 dark:border-neutral-800 p-10 max-w-5xl ml-auto hover:shadow-3xl transition-shadow duration-300 overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#fbbc05]/10 to-transparent rounded-bl-full" />
            <div className="relative">
              <div className="inline-block mb-6">
                <p className="text-sm text-[#fbbc05] font-bold bg-[#fbbc05]/10 px-4 py-2 rounded-full border border-[#fbbc05]/30">
                  باختصار — ماذا هي Webscale؟
                </p>
              </div>
              <h2 className="text-4xl font-extrabold mb-6 bg-gradient-to-r from-neutral-900 to-neutral-700 dark:from-white dark:to-neutral-300 bg-clip-text text-transparent">
                منصة تجمع المسيرين وأصحاب المصانع في فضاء واحد
              </h2>
              <p className="text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed mb-8">
                للتعلّم، تبادل الخبرة، وتحويل التسيير من فوضى إلى نظام واضح.
              </p>
              <div className="bg-gradient-to-r from-neutral-50 to-transparent dark:from-neutral-800/50 rounded-2xl p-6 border border-neutral-200/50 dark:border-neutral-700">
                <p className="text-neutral-800 dark:text-neutral-200 font-bold mb-6 text-lg">نوفر لك:</p>
                <ul className="space-y-4 text-neutral-700 dark:text-neutral-200">
                  {[
                    "شبكة مغلقة لمسيرين من مختلف القطاعات",
                    "محتوى تطبيقي بسيط وواضح",
                    "استشارات مباشرة مع خبراء",
                    "ورشات تدريبية حضورية",
                    "دورات مسجلة يمكنك الرجوع إليها في أي وقت",
                    "أدوات رقمية تساعدك على تنظيم مشروعك بذكاء",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-4 group">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-[#fbbc05] to-[#d29c04] flex items-center justify-center mt-0.5 group-hover:scale-110 transition-transform">
                        <span className="text-white text-xs font-bold">✓</span>
                      </div>
                      <span className="text-base leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="relative bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 rounded-3xl p-10 text-neutral-50 max-w-5xl ml-auto shadow-2xl overflow-hidden hover:shadow-[#fbbc05]/20 transition-shadow duration-300">
            <div className="absolute top-0 left-0 w-40 h-40 bg-[#fbbc05]/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#fbbc05]/5 rounded-full blur-2xl" />
            <div className="relative">
              <div className="inline-block mb-6">
                <p className="text-sm uppercase tracking-[0.4em] text-[#fbbc05] font-bold bg-[#fbbc05]/10 px-4 py-2 rounded-full border border-[#fbbc05]/30">
                  من نحن؟
                </p>
              </div>
              <h3 className="text-3xl font-extrabold mt-4 mb-6">لماذا وُجدت Webscale؟</h3>
              <div className="space-y-6">
                <p className="text-neutral-200 leading-relaxed text-lg">
                  لأن أغلب الشركات في الجزائر تكبر بسرعة بينما يبقى التسيير يعتمد على الاجتهاد الشخصي والذاكرة.
                </p>
                <p className="text-neutral-200 leading-relaxed text-lg">
                  هدفنا هو مساعدة المسيرين على بناء شركات قوية، منظمة، وتستفيد من التكنولوجيا دون تعقيد.
                </p>
                <div className="mt-8 p-6 bg-[#fbbc05]/10 border border-[#fbbc05]/30 rounded-2xl">
                  <p className="text-[#fbbc05] font-bold text-lg">
                    ولهذا نرافقك خطوة بخطوة، مهما كان حجم مشروعك.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="about-services"
          className="container mx-auto px-4 lg:px-8 py-20 bg-gradient-to-b from-white to-neutral-50 dark:from-neutral-900 dark:to-neutral-950"
          dir="rtl"
        >
          <div className="max-w-3xl ml-auto text-right mb-16">
            <div className="inline-block mb-4">
              <p className="text-sm text-[#fbbc05] font-bold bg-[#fbbc05]/10 px-4 py-2 rounded-full border border-[#fbbc05]/30">
                خدمات Webscale الأساسية
              </p>
            </div>
            <h2 className="text-4xl font-extrabold mt-4 bg-gradient-to-r from-neutral-900 to-neutral-700 dark:from-white dark:to-neutral-300 bg-clip-text text-transparent">
              ماذا نفعل؟
            </h2>
            <p className="text-neutral-600 dark:text-neutral-300 mt-6 text-lg">
              في Webscale نقدم لك بيئة كاملة تساعدك على التطوّر:
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <div
                key={service.number}
                className="group relative rounded-3xl bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 text-neutral-50 p-8 shadow-2xl border border-neutral-700 hover:border-[#fbbc05] hover:shadow-[#fbbc05]/20 transition-all duration-300 hover:-translate-y-2 overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#fbbc05]/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#fbbc05] to-[#d29c04] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <span className="text-3xl font-extrabold text-neutral-900">{service.number}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-white">{service.title}</h3>
                  <p className="text-neutral-200 leading-relaxed">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section
          id="about-values"
          className="bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-950 dark:to-neutral-900 py-20 border-y border-neutral-200/80 dark:border-neutral-800"
          dir="rtl"
        >
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl ml-auto text-right mb-16">
              <div className="inline-block mb-4">
                <p className="text-sm text-[#fbbc05] font-bold bg-[#fbbc05]/10 px-4 py-2 rounded-full border border-[#fbbc05]/30">
                  لماذا نهتم؟
                </p>
              </div>
              <h2 className="text-4xl font-extrabold mt-4 bg-gradient-to-r from-neutral-900 to-neutral-700 dark:from-white dark:to-neutral-300 bg-clip-text text-transparent">
                نؤمن أن مستقبل الشركات في الجزائر يعتمد على
              </h2>
              <p className="text-neutral-600 dark:text-neutral-300 mt-6 text-lg">
                ولهذا نرافقك خطوة بخطوة، مهما كان حجم مشروعك.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {whyWeCare.map((item, index) => (
                <div
                  key={item.title}
                  className="group relative rounded-3xl border-2 border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-8 hover:border-[#fbbc05] hover:shadow-2xl hover:shadow-[#fbbc05]/10 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="absolute top-0 right-0 w-20 h-20 bg-[#fbbc05]/5 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#fbbc05] to-[#d29c04] flex items-center justify-center text-white font-bold text-lg shadow-lg">
                        {index + 1}
                      </div>
                      <h3 className="text-2xl font-bold text-neutral-900 dark:text-white">{item.title}</h3>
                    </div>
                    <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed text-base">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* <Testimonials /> */}

        <section id="contact" className="container mx-auto px-4 lg:px-8 py-20" dir="rtl">
          <div className="relative rounded-3xl bg-gradient-to-br from-[#fbbc05] via-[#fbbc05] to-[#d29c04] text-neutral-900 p-12 lg:p-16 flex flex-col lg:flex-row gap-12 items-center shadow-2xl overflow-hidden">
            <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-2xl" />
            <div className="relative flex-1 text-right space-y-6">
              <div className="inline-block">
                <p className="text-sm font-bold tracking-[0.3em] uppercase bg-white/20 px-4 py-2 rounded-full border border-white/30">
                  للتعرف أكثر على Webscale
                </p>
              </div>
              <h2 className="text-4xl lg:text-5xl font-extrabold leading-tight">
                حاب تفهم Webscale في أقل من ساعة؟
              </h2>
              <p className="text-lg text-neutral-900/90 leading-relaxed max-w-2xl">
                سجّل في جلسة تعريفيّة قصيرة نشرح لك فيها المنصة وطريقة عملها وكيف يمكنها مساعدتك.
              </p>
              <div className="space-y-4 pt-4">
                <div className="flex items-center gap-4 bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30">
                  <div className="w-10 h-10 rounded-lg bg-white/30 flex items-center justify-center">
                    <span className="text-xl">📧</span>
                  </div>
                  <div>
                    <p className="font-bold text-sm">البريد الإلكتروني:</p>
                    <a href="mailto:contact@webscale.dz" className="text-neutral-900 hover:underline font-semibold">
                      contact@webscale.dz
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-4 bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30">
                  <div className="w-10 h-10 rounded-lg bg-white/30 flex items-center justify-center">
                    <span className="text-xl">🌐</span>
                  </div>
                  <div>
                    <p className="font-bold text-sm">الموقع:</p>
                    <a href="https://www.webscale.dz" target="_blank" rel="noreferrer" className="text-neutral-900 hover:underline font-semibold">
                      www.webscale.dz
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative flex flex-col gap-4 w-full max-w-sm">
              <Link
                to="/"
                className="w-full text-center px-8 py-5 rounded-2xl bg-neutral-900 text-white font-bold shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300"
              >
                طلب الانضمام للمجتمع
              </Link>
              <a
                href="https://www.webscale.pro/"
                target="_blank"
                rel="noreferrer"
                className="w-full text-center px-8 py-5 rounded-2xl border-2 border-neutral-900 bg-white/20 backdrop-blur-sm font-bold hover:bg-white/30 transition-all duration-300"
              >
                تصفح المنصة
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer
        resourcesLinks={aboutResourcesLinks}
        platformLinks={aboutPlatformLinks}
        communityLinks={communityLinks}
      />
    </div>
  );
}


