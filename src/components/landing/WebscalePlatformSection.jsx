// src/components/landing/WebscalePlatformSection.jsx
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  BarChart3,
  Bot,
  CheckCircle2,
  Compass,
  LayoutDashboard,
  Sparkles,
  Target,
  TrendingUp,
  Zap,
} from "lucide-react";

const features = [
  {
    Icon: Target,
    title: "أسئلة جوهرية",
    description:
      "أسئلة تشخيصية يومية تقيّم تركيزك وإنجازاتك لتبقى على المسار الصحيح.",
  },
  {
    Icon: Bot,
    title: "مستشار باجي الذكي",
    description:
      "مستشار إداري مدرب على منهجية شركات الاستشارة العالمية يشخص أعمالك ويقدم توصيات دقيقة قابلة للتنفيذ.",
  },
  {
    Icon: BarChart3,
    title: "لوحة تحكم MANAGER يومية",
    description:
      "نظرة شاملة على تنبيهاتك ومؤشراتك وجدولك — ابدأ يومك بوضوح تام.",
  },
  {
    Icon: Zap,
    title: "مكتبة الوكلاء والدورات",
    description:
      "وكلاء ذكاء اصطناعي متخصصون ودورات مختصرة لتطوير قدراتك القيادية.",
  },
  {
    Icon: TrendingUp,
    title: "نتائج مستوى النضج",
    description:
      "تقييم شامل لنضج مؤسستك عبر 5 أبعاد مع تقارير مفصلة وخطط تطوير.",
  },
  {
    Icon: Compass,
    title: "نظام الإدارة (Management System)",
    description:
      "مجموعة أنظمة إدارية جاهزة (+ Playbooks و Prompts) لتثبيت طريقة تسيير شركتك بشكل عملي.",
  },
];

const platformHighlights = [
  "أسئلة جوهرية وتشخيص يومي",
  "مستشار باجي ولوحة MANAGER",
  "مكتبة وكلاء وتكوينات قصيرة",
  "تقييم نضج وخطط تطوير",
  "أنظمة إدارية و Playbooks جاهزة",
  "تكامل في منصة واحدة",
];

const bannerTags = [
  "مصمم للمسيرين في الجزائر",
  "تنفيذ وقيادة يومية",
  "متاح للأعضاء",
];

export default function WebscalePlatformSection() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <section
      id="platform"
      lang="ar"
      dir="rtl"
      className="bg-gradient-to-b from-green-50 to-emerald-50 py-20 px-4 dark:from-green-900/10 dark:to-emerald-900/10"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center" data-aos="fade-up">
          <div className="mb-4 inline-flex items-center justify-center gap-3">
            <LayoutDashboard className="text-green-500" size={48} />
            <Sparkles className="text-emerald-500" size={32} />
          </div>
          <p className="mb-2 text-sm font-semibold text-green-600 dark:text-green-400">
            ما يقدمه WEBSCALE
          </p>
          <h2 className="mb-4 text-4xl font-bold text-neutral-900 dark:text-white md:text-5xl">
            <span className="text-green-500">كل أدوات القيادة</span>
            {" في منصة واحدة"}
          </h2>
          <p className="mx-auto max-w-3xl text-xl leading-relaxed text-neutral-600 dark:text-neutral-300">
            نظام تنفيذي متكامل يغطي كل جانب من جوانب عملك اليومي والاستراتيجي
          </p>
        </div>

        <div className="mb-12 grid gap-8 lg:grid-cols-2">
          <div data-aos="fade-up" data-aos-delay="100">
            <div className="h-full rounded-2xl border border-gray-100 bg-white p-8 shadow-xl dark:border-neutral-700 dark:bg-neutral-800">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-green-500 to-emerald-500">
                  <LayoutDashboard className="text-white" size={24} />
                </div>
                <h3 className="text-2xl font-bold text-neutral-900 dark:text-white">
                  عن المنصة
                </h3>
              </div>
              <p className="mb-6 text-lg leading-relaxed text-neutral-700 dark:text-neutral-300">
                تجمع <strong>منصة Webscale</strong> بين التوجيه اليومي، الذكاء
                الاصطناعي المحلي، والأنظمة الجاهزة لتمنحك وضوحًا في القرار
                وسرعة في التنفيذ — دون تشتيت بين أدوات متفرقة.
              </p>
              <div className="rounded-xl border border-green-100 bg-gradient-to-r from-green-50 to-emerald-50 p-6 dark:border-green-800 dark:from-green-900/20 dark:to-emerald-900/20">
                <h4 className="mb-4 flex items-center gap-2 font-bold text-neutral-900 dark:text-white">
                  <Target className="text-green-500" size={20} />
                  ما الذي ستجدُه داخل المنصة
                </h4>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {platformHighlights.map((line, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-green-500" />
                      <span className="text-sm text-neutral-700 dark:text-neutral-300">
                        {line}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4" data-aos="fade-up" data-aos-delay="200">
            <h3 className="mb-6 text-2xl font-bold text-neutral-900 dark:text-white">
              الوحدات الرئيسية
            </h3>
            {features.map((feature, idx) => (
              <div
                key={feature.title}
                className="transform rounded-xl border border-gray-100 bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-neutral-700 dark:bg-neutral-800"
                data-aos="fade-up"
                data-aos-delay={300 + idx * 80}
              >
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-green-500/10 p-3 text-green-600 dark:text-green-400">
                    <feature.Icon size={28} strokeWidth={1.75} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="mb-2 text-lg font-bold text-neutral-900 dark:text-white">
                      {feature.title}
                    </h4>
                    <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 md:text-base">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          className="rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 p-8 text-center text-white shadow-2xl"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          <div className="mb-4 flex flex-wrap items-center justify-center gap-3">
            <Sparkles size={28} className="animate-pulse" />
            <h3 className="text-2xl font-bold md:text-3xl">
              جاهز لاستكشاف المنصة
            </h3>
            <Sparkles size={28} className="animate-pulse" />
          </div>
          <p className="mx-auto mb-6 max-w-2xl text-lg opacity-90">
            اطّلع على اللوحة اليومية، مستشار باجي، وتقييم النضج — كلها في
            منصة واحدة مصممة لتنفيذك القيادي.
          </p>
          <a
            href="https://webceo.webscale.dz/welcome/index.html"
            className="mb-8 inline-flex min-h-[3rem] items-center justify-center rounded-xl bg-white px-10 py-3 text-center text-sm font-bold text-green-700 shadow-md transition hover:bg-green-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            اكتشف المنصة
          </a>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {bannerTags.map((tag) => (
              <div
                key={tag}
                className="rounded-full bg-white/20 px-5 py-2.5 backdrop-blur-sm"
              >
                <span className="text-sm font-semibold">{tag}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
