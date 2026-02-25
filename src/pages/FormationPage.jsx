import {
  AlarmClock,
  ArrowLeft,
  BadgeCheck,
  Building2,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Factory,
  Facebook,
  Handshake,
  Instagram,
  Landmark,
  Linkedin,
  Mail,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  Users,
  Youtube,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import logo from "../assets/logo.png";

const benefits = [
  "تمكين المشاركين من التحضير الاحترافي لزيارة معرض كانتون",
  "فهم آليات البحث عن الموردين في الصين",
  "التعرف على معايير شراء خطوط الإنتاج والمعدات الصناعية",
  "تفادي الأخطاء الشائعة في الدفع والشحن والمطابقة",
  "بناء تصور عملي لمشروع استيراد قابل للتنفيذ في الجزائر",
  "خلق شبكة علاقات بين المهتمين بالاستيراد والصناعة",
  "نقل تجربة عملية واقعية تحاكي مشروع استيراد من الصين إلى الجزائر",
];

const audience = [
  "رجال الأعمال والمستثمرون",
  "أصحاب المصانع وورشات الإنتاج",
  "الراغبون في إطلاق مشاريع صناعية",
  "التجار والمستوردون",
  "أصحاب المشاريع الناشئة",
  "المهتمون بزيارة معرض كانتون لأول مرة",
];

const timeline = [
  "17:00 استقبال الضيوف وتسجيل الحضور",
  "صلاة المغرب",
  "إفطار جماعي",
  "أجواء تواصل احترافية وبناء شبكة أعمال",
  "صلاة العشاء",
  "بداية البرنامج الرسمي",
  "كلمات افتتاحية",
  "المحاضرات الرئيسية",
  "كلمة ختامية",
  "تكريمات",
  "استراحة شاي وتعارف",
  "00:00 نهاية الحدث",
];

const workshopQuestions = [
  "ما هو المنتج أو الخدمة التي ستطلقونها؟",
  "كيف ستجدون المورد في الصين؟",
  "ما طريقة الدفع المستخدمة ولماذا؟",
  "ما طريقة الشحن وكيف ستديرونه؟",
  "كيف ستبيعون المنتج في الجزائر؟",
];

const workshopOutcomes = [
  "تحفيز التفكير الاستراتيجي",
  "خلق نقاش عملي بين المشاركين",
  "محاكاة مشروع استيراد حقيقي قبل اتخاذ قرارات فعلية",
  "فقرة Reality Check لتصحيح الأخطاء الشائعة (الدفع، الشهادات، المطابقة، تقدير الشحن)",
];

const includedItems = [
  "5 لقاءات مباشرة أونلاين",
  "يوم حضوري تطبيقي مكثف",
  "نشاط تفاعلي لمحاكاة مشروع استيراد",
  "إفطار جماعي احترافي",
  "محاضرات متخصصة",
  "تكريمات",
  "فرصة بناء شبكة علاقات أعمال قوية",
];

const faqs = [
  {
    q: "هل البرنامج مناسب للمبتدئين في الاستيراد؟",
    a: "نعم. المحتوى مبني بشكل عملي يبدأ من الأساسيات ويصل إلى قرارات تنفيذية واضحة تناسب من يزور معرض كانتون لأول مرة.",
  },
  {
    q: "هل يمكنني اختيار نوع مشاركة مختلف؟",
    a: "نعم، يمكنك اختيار العرض الكامل أو حضور الإفطار فقط أو الجلسات الأونلاين فقط حسب هدفك ووقتك.",
  },
  {
    q: "كيف أتأكد من مقعدي؟",
    a: "بعد تعبئة نموذج التسجيل، سيتواصل فريق وابسكيل معك لتأكيد الحجز وإرسال خطوات الدفع والتفاصيل التنظيمية.",
  },
];

const speakerCards = [
  {
    name: "الأستاذ عرفات الحراحشة",
    points: [
      "رائد أعمال عربي مقيم في الصين منذ 1987",
      "رئيس منتدى رجال الأعمال العرب في الصين سابقاً",
      "رئيس المجلس الاستشاري لمنتدى رجال الأعمال العرب في الصين حالياً",
      "محور المداخلة: نصائح وتوجيهات عملية حول زيارة معرض كانتون وبناء العلاقات التجارية",
    ],
  },
  {
    name: "الدكتور حمزة المداني",
    points: [
      "خبير في توريد وفحص المعدات الصناعية من الصين",
      "دكتوراه في التصنيع الميكانيكي والأتمتة",
      "خبرة 13 سنة في التصنيع والتوريد",
      "محور المداخلة: معايير شراء خطوط الإنتاج والمعدات الصناعية",
    ],
  },
  {
    name: "الدكتور عبد الملك الحداد",
    points: [
      "رجل أعمال ومستثمر في الصين",
      "مؤسس ورئيس تنفيذي شركة CPLANO",
      "حلول توريد وتشطيب وتأثيث المشاريع السكنية والفندقية",
      "MBA",
      "عضو جمعية الاقتصاد السعودية",
    ],
  },
  {
    name: "الأستاذ سليم بن أعراب",
    points: [
      "مستشار جزائري في التسيير الاستراتيجي وتحويل المؤسسات",
      "+30 سنة خبرة في قيادة الشركات وبناء الاستراتيجيات",
      "خبرة عملية في إدارة فرق تصل إلى 580 موظف",
      "خبرة في قطاعات: صناعة، توزيع، تجارة، FMCG",
      "تولى مناصب: مدير عام، مدير تجاري، مدير استراتيجيات",
      "يجمع بين الرؤية والهيكلة وتحقيق النتائج",
    ],
  },
];

const pricing = [
  {
    title: "50,000 دج",
    subtitle: "العرض الكامل",
    description: "اللقاءات أونلاين + الحدث الحضوري + الإفطار",
    featured: true,
  },
  {
    title: "20,000 دج",
    subtitle: "حضور الإفطار فقط",
    description: "فرصة حضور الإفطار وبناء العلاقات",
    featured: false,
  },
  {
    title: "30,000 دج",
    subtitle: "حضور الجلسات أونلاين فقط",
    description: "5 لقاءات مباشرة للتحضير العملي",
    featured: false,
  },
];

const FormationPage = () => {
  const [activeFaq, setActiveFaq] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    participationType: "العرض الكامل",
  });

  const trustBadges = useMemo(
    () => ["5 لقاءات أونلاين", "يوم حضوري تطبيقي", "200 مقعد فقط", "تنظيم Webscale"],
    []
  );

  const scrollToRegister = () => {
    const register = document.getElementById("register");
    register?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);
  };

  const renderSectionTitle = (title, subtitle, eyebrow) => (
    <div className="mx-auto mb-10 max-w-3xl text-center">
      {eyebrow ? (
        <p className="mb-3 text-sm font-semibold text-amber-500">{eyebrow}</p>
      ) : null}
      <h2 className="text-2xl font-black leading-tight text-slate-900 md:text-4xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-4 text-base leading-7 text-slate-600 md:text-lg">
          {subtitle}
        </p>
      ) : null}
    </div>
  );

  return (
    <div dir="rtl" className="scroll-smooth bg-slate-50 text-slate-900">
      <Helmet>
        <title>استعد لمعرض كانتون مع وابسكيل</title>
        <meta
          name="description"
          content="برنامج تأهيلي عملي للتحضير لزيارة معرض كانتون وبناء صفقات استيراد ناجحة من الصين."
        />
      </Helmet>

      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Webscale" className="h-9 w-auto" />
            <div>
              <p className="text-sm font-semibold text-slate-500">وابسكيل</p>
              <p className="text-base font-bold">الجهة المنظمة</p>
            </div>
          </div>
          <button
            onClick={scrollToRegister}
            className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-slate-800"
          >
            احجز مقعدك الآن
          </button>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-b from-white to-slate-100">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-2 md:items-center md:px-8 md:py-20">
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-300 bg-amber-50 px-4 py-1 text-xs font-bold text-amber-700">
                <Sparkles className="h-4 w-4" />
                برنامج عملي محدود المقاعد
              </p>
              <h1 className="text-3xl font-black leading-tight md:text-5xl">
                استعد لمعرض كانتون مع وابسكيل
              </h1>
              <p className="mt-4 text-lg font-semibold text-slate-700 md:text-xl">
                برنامج تأهيلي عملي للتحضير لزيارة معرض كانتون وبناء صفقات استيراد ناجحة من الصين
              </p>
              <p className="mt-5 text-base leading-8 text-slate-600">
                هذا البرنامج مصمم لرواد الأعمال الجزائريين والمصنّعين والمستوردين الذين يريدون دخول سوق
                الاستيراد من الصين بقرارات أوضح ومخاطر أقل. ستتعلم كيف تبحث عن المورد الصحيح، تتفادى
                الأخطاء المكلفة، وتبني فرص استيراد حقيقية قابلة للتنفيذ في الجزائر.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  onClick={scrollToRegister}
                  className="rounded-xl bg-amber-500 px-6 py-3 text-sm font-extrabold text-slate-950 transition hover:-translate-y-0.5 hover:bg-amber-400"
                >
                  احجز مقعدك الآن
                </button>
                <button
                  onClick={scrollToRegister}
                  className="rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-bold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
                >
                  اطلب التفاصيل
                </button>
                <a
                  href="https://wa.me/213563565936"
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-emerald-500"
                >
                  <MessageCircle className="h-4 w-4" />
                  تواصل معنا عبر واتساب
                </a>
              </div>
              <div className="mt-7 flex flex-wrap gap-2">
                {trustBadges.map((badge) => (
                  <span
                    key={badge}
                    className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xl md:p-7">
                <div className="mb-4 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-xs font-semibold text-slate-500">المرحلة الأولى</p>
                    <p className="mt-1 text-sm font-extrabold">5 لقاءات أونلاين مباشرة</p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-xs font-semibold text-slate-500">المرحلة الثانية</p>
                    <p className="mt-1 text-sm font-extrabold">لقاء حضوري + إفطار جماعي</p>
                  </div>
                </div>
                <div className="rounded-2xl bg-slate-900 p-5 text-white">
                  <p className="text-sm font-semibold text-slate-300">معلومات اليوم الحضوري</p>
                  <div className="mt-4 space-y-3 text-sm">
                    <p className="flex items-center gap-2">
                      <Landmark className="h-4 w-4 text-amber-400" />
                      المكان: المعهد العالي للعلوم
                    </p>
                    <p className="flex items-center gap-2">
                      <CalendarDays className="h-4 w-4 text-amber-400" />
                      التاريخ: 23 رمضان
                    </p>
                    <p className="flex items-center gap-2">
                      <Clock3 className="h-4 w-4 text-amber-400" />
                      التوقيت: من 17:00 إلى 00:00
                    </p>
                  </div>
                </div>
                <p className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-2 text-center text-sm font-bold text-amber-700">
                  المقاعد محدودة: 200 مقعد فقط
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-slate-200 bg-white px-4 py-14 md:px-8">
          <div className="mx-auto max-w-7xl">
            {renderSectionTitle("لماذا يجب أن تحضر هذا البرنامج؟")}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {benefits.map((item) => (
                <article
                  key={item}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <Target className="mb-3 h-5 w-5 text-amber-500" />
                  <p className="text-sm font-semibold leading-7 text-slate-700">{item}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-slate-200 bg-slate-50 px-4 py-14 md:px-8">
          <div className="mx-auto max-w-7xl">
            {renderSectionTitle("هذا البرنامج مناسب لمن؟")}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {audience.map((segment, index) => (
                <div
                  key={segment}
                  className="rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  {index % 3 === 0 ? (
                    <Users className="mx-auto mb-3 h-6 w-6 text-slate-900" />
                  ) : index % 3 === 1 ? (
                    <Factory className="mx-auto mb-3 h-6 w-6 text-slate-900" />
                  ) : (
                    <Building2 className="mx-auto mb-3 h-6 w-6 text-slate-900" />
                  )}
                  <p className="text-sm font-bold text-slate-700">{segment}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-slate-200 bg-white px-4 py-14 md:px-8">
          <div className="mx-auto max-w-7xl">
            {renderSectionTitle("ماذا ستستفيد داخل البرنامج؟")}
            <div className="grid gap-6 md:grid-cols-2">
              <article className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
                <p className="mb-3 inline-flex rounded-full bg-slate-900 px-3 py-1 text-xs font-bold text-white">
                  المرحلة التحضيرية (أونلاين)
                </p>
                <h3 className="text-xl font-black">5 لقاءات مباشرة أونلاين تحضيرية</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  هذه المرحلة تُجهّز المشاركين قبل اليوم الحضوري لفهم آليات الزيارة الاحترافية لمعرض
                  كانتون، منهجية التفاوض، ومعايير اتخاذ القرار في مشاريع الاستيراد.
                </p>
              </article>
              <article className="rounded-2xl border border-amber-300 bg-amber-50 p-6 shadow-sm">
                <p className="mb-3 inline-flex rounded-full bg-amber-500 px-3 py-1 text-xs font-bold text-slate-900">
                  اللقاء الحضوري + الإفطار الجماعي
                </p>
                <div className="space-y-2 text-sm font-semibold text-slate-700">
                  <p className="flex items-center gap-2">
                    <Landmark className="h-4 w-4 text-amber-600" />
                    المكان: المعهد العالي للعلوم
                  </p>
                  <p className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 text-amber-600" />
                    التاريخ: 23 رمضان
                  </p>
                  <p className="flex items-center gap-2">
                    <Clock3 className="h-4 w-4 text-amber-600" />
                    التوقيت العام: من 17:00 إلى 00:00
                  </p>
                </div>
              </article>
            </div>

            <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-900 p-6 text-white shadow-xl md:p-8">
              <div className="mb-6 flex items-center gap-2">
                <AlarmClock className="h-5 w-5 text-amber-400" />
                <h3 className="text-xl font-black">الجدول الزمني لليوم الحضوري</h3>
              </div>
              <div className="space-y-4">
                {timeline.map((item, index) => (
                  <div key={item} className="relative pr-8">
                    <span className="absolute right-0 top-1.5 h-3 w-3 rounded-full bg-amber-400" />
                    {index !== timeline.length - 1 ? (
                      <span className="absolute right-[5px] top-5 h-full w-0.5 bg-slate-700" />
                    ) : null}
                    <div className="flex items-center gap-2">
                      {index === 0 ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/20 px-2 py-0.5 text-[11px] font-bold text-amber-300">
                          <Sparkles className="h-3.5 w-3.5" />
                          افتتاح الحدث
                        </span>
                      ) : null}
                      {index === timeline.length - 1 ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-2 py-0.5 text-[11px] font-bold text-emerald-300">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          ختام الحدث
                        </span>
                      ) : null}
                      <p className="text-sm font-medium text-slate-200">{item}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-slate-200 bg-slate-50 px-4 py-14 md:px-8">
          <div className="mx-auto max-w-7xl">
            {renderSectionTitle(
              "نشاط تطبيقي: محاكاة مشروع استيراد",
              "سيتم تقسيم المشاركين إلى فرق (5 أشخاص لكل طاولة)، وكل عضو يمثل وظيفة أساسية داخل المشروع."
            )}
            <div className="grid gap-6 md:grid-cols-2">
              <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="mb-3 text-lg font-black">الأدوار داخل كل فريق</h3>
                <div className="grid grid-cols-2 gap-3 text-sm font-bold text-slate-700">
                  <span className="rounded-xl bg-slate-100 px-3 py-2">Finance</span>
                  <span className="rounded-xl bg-slate-100 px-3 py-2">Sourcing</span>
                  <span className="rounded-xl bg-slate-100 px-3 py-2">Logistics</span>
                  <span className="rounded-xl bg-slate-100 px-3 py-2">Legal</span>
                  <span className="rounded-xl bg-slate-100 px-3 py-2">Marketing</span>
                </div>
                <h4 className="mb-3 mt-6 text-base font-extrabold">أسئلة الورشة</h4>
                <ul className="space-y-3 text-sm text-slate-700">
                  {workshopQuestions.map((question) => (
                    <li key={question} className="flex items-start gap-2">
                      <ArrowLeft className="mt-1 h-4 w-4 text-amber-500" />
                      {question}
                    </li>
                  ))}
                </ul>
              </article>
              <article className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 shadow-sm">
                <h3 className="mb-3 text-lg font-black text-emerald-900">مخرجات النشاط</h3>
                <ul className="space-y-3 text-sm font-semibold text-emerald-900">
                  {workshopOutcomes.map((outcome) => (
                    <li key={outcome} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4" />
                      {outcome}
                    </li>
                  ))}
                </ul>
              </article>
            </div>
          </div>
        </section>

        <section className="border-b border-slate-200 bg-white px-4 py-14 md:px-8">
          <div className="mx-auto max-w-7xl">
            {renderSectionTitle("المحاضرون والخبراء")}
            <div className="grid gap-5 lg:grid-cols-2">
              {speakerCards.map((speaker) => (
                <article
                  key={speaker.name}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="mb-4 flex items-center gap-2">
                    <Star className="h-5 w-5 text-amber-500" />
                    <h3 className="text-lg font-black">{speaker.name}</h3>
                  </div>
                  <ul className="space-y-2 text-sm leading-7 text-slate-700">
                    {speaker.points.map((point) => (
                      <li key={point} className="flex items-start gap-2">
                        <BadgeCheck className="mt-1 h-4 w-4 shrink-0 text-emerald-600" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
            <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm">
              <p className="text-sm font-semibold text-slate-600">كما يشارك أيضًا:</p>
              <p className="mt-2 text-base font-extrabold text-slate-900">
                الأستاذ فيصل بن عمارة • الأستاذ ناصر بن ديب • الشيخ عمار رقبة
              </p>
            </div>
          </div>
        </section>

        <section className="border-b border-slate-200 bg-slate-50 px-4 py-14 md:px-8">
          <div className="mx-auto max-w-7xl">
            {renderSectionTitle("العرض يشمل")}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {includedItems.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-2 rounded-2xl border border-slate-200 bg-white p-4 text-sm font-semibold text-slate-700 shadow-sm"
                >
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-slate-200 bg-white px-4 py-14 md:px-8">
          <div className="mx-auto max-w-7xl">
            {renderSectionTitle(
              "خيارات المشاركة",
              "اختر الصيغة الأنسب لك، مع أفضلية واضحة للعرض الكامل."
            )}
            <div className="grid gap-5 lg:grid-cols-3">
              {pricing.map((plan) => (
                <article
                  key={plan.title}
                  className={`rounded-3xl border p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg ${
                    plan.featured
                      ? "border-amber-400 bg-amber-50 ring-2 ring-amber-300"
                      : "border-slate-200 bg-slate-50"
                  }`}
                >
                  {plan.featured ? (
                    <p className="mb-3 inline-flex rounded-full bg-slate-900 px-3 py-1 text-xs font-bold text-white">
                      أفضل قيمة
                    </p>
                  ) : null}
                  <h3 className="text-3xl font-black text-slate-900">{plan.title}</h3>
                  <p className="mt-2 text-base font-bold text-slate-700">{plan.subtitle}</p>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{plan.description}</p>
                  <button
                    onClick={scrollToRegister}
                    className={`mt-6 w-full rounded-xl px-4 py-3 text-sm font-extrabold transition ${
                      plan.featured
                        ? "bg-amber-500 text-slate-900 hover:bg-amber-400"
                        : "bg-slate-900 text-white hover:bg-slate-800"
                    }`}
                  >
                    احجز مقعدك الآن
                  </button>
                </article>
              ))}
            </div>
            <p className="mt-6 text-center text-lg font-extrabold text-rose-600">
              عدد المقاعد: 200 مقعد فقط
            </p>
          </div>
        </section>

        <section
          id="register"
          className="border-b border-slate-200 bg-slate-900 px-4 py-14 text-white md:px-8"
        >
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-black leading-tight md:text-4xl">
                إذا كنت تريد دخول عالم الاستيراد من الصين بوعي أكبر، أخطاء أقل، وعلاقات أقوى —
                فهذا البرنامج صُمم لك.
              </h2>
              <p className="mt-4 text-slate-300">
                المقاعد محدودة، والتسجيل في هذا النموذج يضعك ضمن قائمة التأكيد المباشر مع فريق وابسكيل.
              </p>
              <div className="mt-6 space-y-3 text-sm font-semibold">
                <p className="flex items-center gap-2">
                  <Handshake className="h-4 w-4 text-amber-400" />
                  تركيز كامل على نتائج عملية وقابلة للتنفيذ
                </p>
                <p className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-amber-400" />
                  هدف واحد واضح: تحويلك إلى مستورد أذكى وأكثر جاهزية
                </p>
              </div>
              <a
                href="https://wa.me/213563565936"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-extrabold text-white transition hover:bg-emerald-500"
              >
                <MessageCircle className="h-4 w-4" />
                تواصل معنا عبر واتساب
              </a>
            </div>
            <form onSubmit={handleSubmit} className="rounded-3xl bg-white p-6 text-slate-900 shadow-2xl">
              <h3 className="text-xl font-black">احجز مقعدك الآن</h3>
              <p className="mt-1 text-sm text-slate-600">املأ البيانات وسنتواصل معك بسرعة.</p>
              <div className="mt-5 space-y-4">
                <div>
                  <label htmlFor="fullName" className="mb-1 block text-sm font-bold">
                    الاسم الكامل
                  </label>
                  <input
                    id="fullName"
                    required
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, fullName: e.target.value }))
                    }
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-amber-400"
                    placeholder="أدخل اسمك الكامل"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="mb-1 block text-sm font-bold">
                    رقم الهاتف
                  </label>
                  <input
                    id="phone"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-amber-400"
                    placeholder="05xx xx xx xx"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="mb-1 block text-sm font-bold">
                    البريد الإلكتروني
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-amber-400"
                    placeholder="name@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="participation" className="mb-1 block text-sm font-bold">
                    نوع المشاركة
                  </label>
                  <select
                    id="participation"
                    value={formData.participationType}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, participationType: e.target.value }))
                    }
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-amber-400"
                  >
                    <option>العرض الكامل</option>
                    <option>حضور الإفطار فقط</option>
                    <option>حضور الجلسات أونلاين فقط</option>
                  </select>
                </div>
              </div>
              <button
                type="submit"
                className="mt-5 w-full rounded-xl bg-amber-500 px-5 py-3 text-sm font-extrabold text-slate-950 transition hover:bg-amber-400"
              >
                احجز مقعدك الآن
              </button>
              {formSubmitted ? (
                <p className="mt-3 rounded-xl bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700">
                  تم استلام طلبك بنجاح. سيقوم فريقنا بالتواصل معك قريبًا.
                </p>
              ) : null}
            </form>
          </div>
        </section>

        <section className="border-b border-slate-200 bg-slate-50 px-4 py-14 md:px-8">
          <div className="mx-auto max-w-5xl">
            {renderSectionTitle("أسئلة شائعة")}
            <div className="space-y-3">
              {faqs.map((item, index) => (
                <article key={item.q} className="rounded-2xl border border-slate-200 bg-white shadow-sm">
                  <button
                    className="flex w-full items-center justify-between gap-3 px-5 py-4 text-right"
                    onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  >
                    <span className="text-sm font-bold text-slate-800">{item.q}</span>
                    <span className="text-xl font-bold text-amber-500">
                      {activeFaq === index ? "−" : "+"}
                    </span>
                  </button>
                  {activeFaq === index ? (
                    <p className="border-t border-slate-100 px-5 py-4 text-sm leading-7 text-slate-600">
                      {item.a}
                    </p>
                  ) : null}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-slate-950 px-4 py-14 text-center text-white md:px-8">
          <div className="mx-auto max-w-4xl">
            <p className="inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-amber-300">
              المقاعد محدودة
            </p>
            <h2 className="mt-4 text-3xl font-black md:text-4xl">اتخذ قرارك الآن قبل اكتمال المقاعد</h2>
            <p className="mt-3 text-slate-300">
              برنامج مصمم لنتائج حقيقية، مع خبراء لديهم خبرة عملية مباشرة في السوق الصيني.
            </p>
            <button
              onClick={scrollToRegister}
              className="mt-7 rounded-xl bg-amber-500 px-7 py-3 text-sm font-extrabold text-slate-950 transition hover:bg-amber-400"
            >
              احجز مقعدك الآن
            </button>
          </div>
        </section>
      </main>

      <footer className="bg-white px-4 py-10 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 border-t border-slate-200 pt-8 md:grid-cols-3">
          <div>
            <div className="mb-2 flex items-center gap-3">
              <img src={logo} alt="Webscale" className="h-9 w-auto" />
              <p className="text-lg font-black text-slate-900">وابسكيل</p>
            </div>
            <p className="text-sm font-semibold text-slate-600">الجهة المنظمة</p>
          </div>
          <div className="space-y-2 text-sm text-slate-600">
            <p className="flex items-center gap-2">
              <Phone className="h-4 w-4" /> الهاتف: +213563565936
            </p>
            <p className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" /> واتساب: +213563565936
            </p>
            <a
              href="mailto:contact@webscale.dz"
              className="flex items-center gap-2 transition hover:text-slate-900"
            >
              <Mail className="h-4 w-4" /> البريد: contact@webscale.dz
            </a>
          </div>
          <div className="text-sm text-slate-600">
            <p className="font-bold text-slate-800">روابط اجتماعية</p>
            <div className="mt-3 space-y-2">
              <a
                href="https://www.facebook.com/webscaledz"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 transition hover:text-slate-900"
              >
                <Facebook className="h-4 w-4" />
                Facebook
              </a>
              <a
                href="https://www.instagram.com/webs.cale/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 transition hover:text-slate-900"
              >
                <Instagram className="h-4 w-4" />
                Instagram
              </a>
              <a
                href="https://www.youtube.com/@webscaledz"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 transition hover:text-slate-900"
              >
                <Youtube className="h-4 w-4" />
                YouTube
              </a>
              <a
                href="https://www.linkedin.com/company/webscaledz/posts/?feedView=all"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 transition hover:text-slate-900"
              >
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </footer>

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 p-3 backdrop-blur md:hidden">
        <button
          onClick={scrollToRegister}
          className="w-full rounded-xl bg-slate-900 px-5 py-3 text-sm font-extrabold text-white"
        >
          احجز مقعدك الآن
        </button>
      </div>
    </div>
  );
};

export default FormationPage;


