// src/pages/AboutUs.jsx
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import Testimonials from "@/components/Testimonials";
import heroVideo from "@/assets/video1.mp4";
import teamLead from "@/assets/profile-pictures/user1.jpg";
import teamOps from "@/assets/profile-pictures/user2.jpg";
import teamPrograms from "@/assets/profile-pictures/user3.jpg";
import { aboutNav, aboutPlatformLinks, aboutResourcesLinks, communityLinks } from "@/constants";

const values = [
  {
    title: "مجتمع مغلق عالي الثقة",
    description: "ننتقي الأعضاء بعناية لضمان بيئة مليئة بالمصداقية والدعم المتبادل بين أصحاب القرار.",
  },
  {
    title: "تعلّم تطبيقي",
    description: "نركز على المحتوى العملي، اللقاءات التشاركية، والورشات التي تعالج تحديات واقعية.",
  },
  {
    title: "شبكة علاقات نشطة",
    description: "نصنع فرص تعاون واستثمار فعلية عبر منصات التواصل الخاصة بنا واللقاءات الحضورية.",
  },
  {
    title: "قيادة محلية برؤية عالمية",
    description: "نصمم المبادرات بخصوصية السوق الجزائري مع الاستفادة من أفضل التجارب العالمية.",
  },
];

const impactStats = [
  { label: "شركات أعضاء", value: "+120" },
  { label: "جلسات واستشارات", value: "85" },
  { label: "استثمارات وشراكات", value: "32" },
  { label: "مدن تمثلها العضوية", value: "14" },
];

const milestones = [
  {
    year: "2021",
    title: "البداية",
    description: "إطلاق أول لقاءات WEBSCALE لفهم احتياجات أصحاب الشركات في الجزائر.",
  },
  {
    year: "2022",
    title: "نمو المجتمع",
    description: "تأسيس المنصة الرقمية الخاصة وتوسيع شبكة المستشارين والمتحدثين.",
  },
  {
    year: "2023",
    title: "الأحداث الكبرى",
    description: "تنظيم ملتقيات تطبيقية وورشات متخصصة في الذكاء الاصطناعي والنمو الرقمي.",
  },
  {
    year: "2024",
    title: "التوسع الإقليمي",
    description: "إطلاق برامج الشراكات مع المستثمرين والجهات الحكومية والتهيئة للتوسع المغاربي.",
  },
];

const teamMembers = [
  {
    name: "أحمد بن علي",
    role: "المدير العام والمؤسس",
    experience: "15 سنة في بناء الشركات الرقمية وبرامج المسرعات.",
    image: teamLead,
  },
  {
    name: "ليلى مراد",
    role: "مديرة العمليات المجتمعية",
    experience: "تقود تصميم مسارات الأعضاء وتدير اللقاءات الأسبوعية.",
    image: teamOps,
  },
  {
    name: "سامي يوسف",
    role: "مسؤول البرامج والشراكات",
    experience: "ينسق مع الخبراء والرعاة ويطوّر المحتوى التعليمي.",
    image: teamPrograms,
  },
];

export default function AboutUs() {
  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100">
      <Helmet>
        <title>WEBSCALE | من نحن</title>
        <meta
          name="description"
          content="تعرف على قصة WEBSCALE، رسالتنا في تمكين أصحاب الشركات الجزائرية، والقيم التي نبني عليها مجتمعنا المغلق."
        />
        <meta property="og:title" content="WEBSCALE | من نحن" />
        <meta
          property="og:description"
          content="مجتمع حصري لأصحاب الشركات في الجزائر يوفر محتوى تطبيقي، شبكة علاقات، وبرامج نمو مستمرة."
        />
        <meta property="og:url" content="https://webscale.dz/about" />
        <link rel="canonical" href="https://webscale.dz/about" />
      </Helmet>

      <Navbar navConfig={aboutNav} />

      <main className="flex-grow">
        <section
          id="about-hero"
          className="relative isolate overflow-hidden bg-neutral-900 text-neutral-50 py-20"
        >
          <div className="absolute inset-0 opacity-30">
            <video
              className="w-full h-full object-cover"
              src={heroVideo}
              autoPlay
              loop
              muted
              playsInline
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-neutral-900 via-neutral-900/70 to-transparent" />
          </div>
          <div className="relative container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl ml-auto space-y-6 text-right" dir="rtl">
              <p className="text-sm tracking-[0.3em] uppercase text-[#fbbc05]">WEBSCALE</p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-relaxed">
                نبني مجتمعاً نخبوياً لأصحاب الشركات والمسيرين في الجزائر
              </h1>
              <p className="text-lg text-neutral-200 leading-relaxed">
                بدأنا من حاجة بسيطة: منصة تسمح لأصحاب القرار بالوصول إلى محتوى تطبيقي، شبكة علاقات
                جدية، ودعم تشغيلي يساعدهم على النمو بثقة. اليوم نقود أكبر مجتمع مغلق لرواد الأعمال
                في الجزائر ونصنع فرص تعاون واستثمار حقيقية.
              </p>
              <div className="flex flex-wrap gap-4 justify-end">
                <Link
                  to="/"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-[#fbbc05] text-neutral-900 font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                  ابدأ رحلتك مع المجتمع
                </Link>
                <a
                  href="#about-mission"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-neutral-200/70 hover:border-[#fbbc05] transition-colors"
                >
                  اكتشف رسالتنا
                </a>
              </div>
            </div>
          </div>
        </section>

        <section
          id="about-mission"
          className="container mx-auto px-4 lg:px-8 py-16 grid gap-10 lg:grid-cols-[1.2fr_1fr]"
          dir="rtl"
        >
          <div className="bg-white dark:bg-neutral-900 rounded-3xl shadow-xl border border-neutral-200/70 dark:border-neutral-800 p-8">
            <p className="text-sm text-[#fbbc05] font-semibold mb-4">رسالتنا</p>
            <h2 className="text-3xl font-bold mb-6">نوجّه القادة لبناء أعمال مستدامة وقابلة للنمو</h2>
            <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed mb-6">
              نعمل مع أصحاب الشركات، المسيرين، والمستثمرين في الجزائر لتسريع انتقالهم من الأفكار
              إلى التنفيذ عبر محتوى غني، أدوات مخصصة، وشبكة خبراء تعمل كفريق واحد.
            </p>
            <ul className="space-y-4 text-neutral-700 dark:text-neutral-200">
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-[#fbbc05]" />
                تجهيز المؤسسات لموجة الذكاء الاصطناعي والتحول الرقمي.
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-[#fbbc05]" />
                خلق مسارات تعاون بين القطاع الخاص، المستثمرين، والجهات الحكومية.
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-[#fbbc05]" />
                توفير محتوى محلي عالي الجودة مصمم خصيصاً للسوق الجزائري.
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-700 rounded-3xl p-8 text-neutral-50">
            <p className="text-sm uppercase tracking-[0.4em] text-[#fbbc05]">FOCUS</p>
            <h3 className="text-2xl font-bold mt-4 mb-6">ثلاث ركائز تحكم كل مبادرة</h3>
            <ul className="space-y-5 text-neutral-200">
              <li>
                <span className="font-semibold text-white block">المعرفة التطبيقيّة</span>
                تحويل الخبرة إلى أدوات جاهزة للتنفيذ.
              </li>
              <li>
                <span className="font-semibold text-white block">التشبيك الذكي</span>
                جمع الأشخاص المناسبين لحل التحديات المشتركة.
              </li>
              <li>
                <span className="font-semibold text-white block">النتائج القابلة للقياس</span>
                نراقب أثر كل برنامج عبر مؤشرات أداء واضحة.
              </li>
            </ul>
          </div>
        </section>

        <section
          id="about-values"
          className="bg-white dark:bg-neutral-900 py-16 border-y border-neutral-200/80 dark:border-neutral-800"
          dir="rtl"
        >
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-2xl ml-auto text-right mb-12">
              <p className="text-sm text-[#fbbc05] font-semibold">قيمنا</p>
              <h2 className="text-3xl font-bold mt-2">القيم التي نحتكم إليها</h2>
              <p className="text-neutral-600 dark:text-neutral-300 mt-4">
                كل قرار يتخذه فريق WEBSCALE يمر عبر هذه القيم لضمان تجربة متسقة لجميع الأعضاء.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {values.map((value) => (
                <div
                  key={value.title}
                  className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6 hover:border-[#fbbc05] transition-colors"
                >
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="about-impact"
          className="container mx-auto px-4 lg:px-8 py-16 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]"
          dir="rtl"
        >
          <div className="rounded-3xl bg-gradient-to-tr from-[#111111] via-[#1c1c1c] to-[#2a2a2a] text-neutral-50 p-10 shadow-xl">
            <p className="text-sm text-[#fbbc05] font-semibold">أثر يمكن قياسه</p>
            <h2 className="text-3xl font-bold mt-3 mb-6">أرقام توضح تأثير المجتمع</h2>
            <div className="grid grid-cols-2 gap-6">
              {impactStats.map((stat) => (
                <div key={stat.label} className="border border-white/10 rounded-2xl p-5 text-center">
                  <div className="text-3xl font-extrabold text-[#fbbc05]">{stat.value}</div>
                  <p className="text-sm text-neutral-200 mt-2">{stat.label}</p>
                </div>
              ))}
            </div>
            <p className="text-neutral-300 mt-6 leading-relaxed">
              نحدّث هذه المؤشرات نهاية كل فصل ونتيحها للأعضاء لضمان الشفافية وبناء الثقة في البرامج
              التي نقدمها.
            </p>
          </div>

          <div className="rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-8">
            <p className="text-sm text-[#fbbc05] font-semibold">رحلتنا</p>
            <h3 className="text-2xl font-bold mt-2 mb-6">محطات رئيسية</h3>
            <div className="space-y-6">
              {milestones.map((item) => (
                <div key={item.year} className="relative pl-6 border-r border-neutral-200 dark:border-neutral-800">
                  <span className="absolute -right-2 top-0 h-4 w-4 rounded-full bg-[#fbbc05]" />
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">{item.year}</p>
                  <h4 className="text-lg font-semibold">{item.title}</h4>
                  <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="about-team"
          className="bg-neutral-100 dark:bg-neutral-900 py-16"
          dir="rtl"
        >
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-2xl ml-auto text-right mb-12">
              <p className="text-sm text-[#fbbc05] font-semibold">فريقنا</p>
              <h2 className="text-3xl font-bold mt-2">نقود العمل بخبرة حقيقية في بناء الشركات</h2>
              <p className="text-neutral-600 dark:text-neutral-300 mt-4">
                يعمل فريق WEBSCALE مع شبكة واسعة من الخبراء والمدربين والمستشارين لضمان وصول الأعضاء
                إلى أفضل الممارسات.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {teamMembers.map((member) => (
                <article
                  key={member.name}
                  className="rounded-3xl bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 p-6 shadow-xl"
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 rounded-2xl object-cover border-2 border-[#fbbc05] mb-6 ml-auto"
                  />
                  <h3 className="text-xl font-semibold">{member.name}</h3>
                  <p className="text-sm text-[#fbbc05] mt-2">{member.role}</p>
                  <p className="text-neutral-600 dark:text-neutral-300 mt-4 leading-relaxed">
                    {member.experience}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <Testimonials />

        <section id="contact" className="container mx-auto px-4 lg:px-8 py-16" dir="rtl">
          <div className="rounded-3xl bg-gradient-to-br from-[#fbbc05] to-[#d29c04] text-neutral-900 p-10 flex flex-col lg:flex-row gap-10 items-center">
            <div className="flex-1 text-right space-y-4">
              <p className="text-sm font-semibold tracking-[0.3em] uppercase">تواصل معنا</p>
              <h2 className="text-3xl font-bold">مستعدون للشراكة معك</h2>
              <p className="text-neutral-900/80">
                أخبرنا عن هدفك القادم وسنصمم لك تجربة مخصصة في WEBSCALE؛ سواء أردت رعاية فعالية،
                إطلاق برنامج تدريبي لفريقك، أو الحصول على دعم من شبكة أعضائنا.
              </p>
              <div>
                <p className="font-semibold">البريد:</p>
                <a href="mailto:contact@webscale.dz" className="underline">
                  contact@webscale.dz
                </a>
              </div>
              <div>
                <p className="font-semibold">الواتساب:</p>
                <a href="https://wa.me/213000000000" target="_blank" rel="noreferrer" className="underline">
                  +213 00 00 00 00
                </a>
              </div>
            </div>
            <div className="flex flex-col gap-4 w-full max-w-sm">
              <Link
                to="/"
                className="w-full text-center px-6 py-4 rounded-2xl bg-neutral-900 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                طلب الانضمام للمجتمع
              </Link>
              <a
                href="https://www.webscale.pro/"
                target="_blank"
                rel="noreferrer"
                className="w-full text-center px-6 py-4 rounded-2xl border-2 border-neutral-900 font-semibold"
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

