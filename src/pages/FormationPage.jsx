import {
  BadgeCheck,
  Building2,
  CalendarDays,
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
import cantonHeroLogo from "../assets/canton-event-uploaded-logo.png";
import logo from "../assets/logo.png";
import { getUTMParams } from "../utils/utm";

const benefits = [
  "اكتساب منهجية احترافية لاختيار واستيراد خطوط الإنتاج والمعدات الصناعية مباشرة من المصدر",
  "تعلم آليات تقييم المصانع والموردين في الصين قبل الالتزام بأي استثمار مالي",
  "بناء شبكة علاقات استراتيجية مع مستوردين وصناعيين ورواد أعمال يشاركونك نفس الرؤية",
  "تشبيك مباشر مع المختصين والمستشارين ذوي تجربة فعلية في السوق الصيني وسلاسل التوريد",
  "الاستثمار في التوجيه الصحيح لتقليل المخاطر وحماية رأس المال من الأخطاء المكلفة",
  "تحويل فكرة استيراد خط إنتاج إلى مشروع صناعي قابل للتنفيذ بخطة واضحة للسوق الجزائري",
];

const audience = [
  "رجال الأعمال والمستثمرون",
  "أصحاب المصانع وورشات الإنتاج",
  "الراغبون في إطلاق مشاريع صناعية",
  "التجار والمستوردون",
];

const includedItems = [
  "5 جلسات عملية أونلاين",
  "لقاء تكويني تفاعلي",
  "إفطار جماعي",
  "نشاطات تفاعلية و عملية",
  "فرصة بناء و تشبيك علاقات",
  "لقاءات مع مستشارين و مختصين",
];

const faqs = [
  {
    q: "هل البرنامج مناسب للمبتدئين في الاستيراد؟",
    a: "نعم. المحتوى مبني بشكل عملي يبدأ من الأساسيات ويصل إلى قرارات تنفيذية واضحة تناسب من يزور معرض كانتون لأول مرة.",
  },
  {
    q: "هل يمكنني اختيار نوع مشاركة مختلف؟",
    a: "نعم، يمكنك اختيار العرض الكامل أو حضور الإفطار أو الجلسات الأونلاين حسب هدفك ووقتك.",
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
    title: "35,000 دج",
    subtitle: "5 جلسات مباشرة مع 5 مستشارين",
    description: "",
    featured: false,
  },
  {
    title: "50,000 دج",
    subtitle: "العرض المتكامل",
    description: "5 جلسات أونلاين + اللقاء التكويني + الإفطار الجماعي",
    featured: true,
  },
];

const employeeCountOptions = ["أقل من 5", "من 05 إلى 10 موظفين", "من 10 إلى 50 موظف", "من 50 موظف فما فوق"];

const legalFormOptions = [
  "مؤسسة فردية",
  "شركة ذات مسؤولية محدودة (SARL)",
  "شركة مساهمة (SPA)",
  "شركة تضامن",
  "تعاونية",
  "شركة ناشئة (Startup)",
];

const businessSectorOptions = [
  "خدمات",
  "تجارة (جملة / تجزئة)",
  "صناعة / إنتاج",
  "فلاحية / زراعية",
  "تكنولوجيا / شركة رقمية",
  "مقاولات / أشغال عمومية",
  "تعليم وتكوين",
  "صحة",
  "سياحة",
];

const companyEstablishedOptions = ["أقل من سنة", "من 1 إلى 3 سنوات", "من 3 إلى 5 سنوات", "أكثر من 5 سنوات."];

const stateOptions = [
  "أدرار",
  "الشلف",
  "الأغواط",
  "أم البواقي",
  "باتنة",
  "بجاية",
  "بسكرة",
  "بشار",
  "البليدة",
  "البويرة",
  "تمنراست",
  "تبسة",
  "تلمسان",
  "تيارت",
  "تيزي وزو",
  "الجزائر",
  "الجلفة",
  "جيجل",
  "سطيف",
  "سعيدة",
  "سكيكدة",
  "سيدي بلعباس",
  "عنابة",
  "قالمة",
  "قسنطينة",
  "المدية",
  "مستغانم",
  "المسيلة",
  "معسكر",
  "ورقلة",
  "وهران",
  "البيض",
  "إليزي",
  "برج بوعريريج",
  "بومرداس",
  "الطارف",
  "تندوف",
  "تيسمسيلت",
  "الوادي",
  "خنشلة",
  "سوق أهراس",
  "تيبازة",
  "ميلة",
  "عين الدفلى",
  "النعامة",
  "عين تموشنت",
  "غرداية",
  "غليزان",
  "تيميمون",
  "برج باجي مختار",
  "أولاد جلال",
  "بني عباس",
  "إن صالح",
  "إن قزام",
  "تقرت",
  "جانت",
  "المغير",
  "المنيعة",
  "أخرى",
];

const jobTitleOptions = ["رئيس الشركة", "مسير", "موظف", "مدير قسم التسويق", "مدير قسم المبيعات"];

const visitReasonOptions = [
  "البحث عن خطوط إنتاج جديدة",
  "إيجاد موردين ومصانع موثوقة",
  "الاطلاع على المنتجات والتقنيات الحديثة",
  "دراسة السوق والاتجاهات الجديدة",
  "عقد شراكات واتفاقيات تجارية",
  "تطوير مشروع حالي أو إطلاق مشروع جديد",
  "البحث عن فرص استيراد وتوزيع",
  "مقارنة الأسعار وتحسين تكاليف الشراء.",
];

const initialFormData = {
  companyName: "",
  employeeCount: "",
  legalForm: "",
  legalFormCustom: "",
  businessSector: "",
  businessSectorCustom: "",
  companyEstablished: "",
  fullName: "",
  phone: "",
  email: "",
  state: "",
  isWebscaleMember: "",
  jobTitle: "",
  hasAttendedWebscaleTraining: "",
  attendingCantonApril: "",
  attendingCantonAprilCustom: "",
  visitedCantonBefore: "",
  visitedCantonBeforeCustom: "",
  visitReason: "",
  visitReasonCustom: "",
};

const PUBLIC_SUBMIT_URL =
  "https://crmgo.webscale.dz/api/v1/public/forms/ea7afcee-ed47-4386-b787-982cea2d7a48/submit";

const FormationPage = () => {
  const [activeFaq, setActiveFaq] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState(initialFormData);

  const trustBadges = useMemo(
    () => ["5 لقاءات أونلاين", "يوم حضوري تطبيقي", "220 مقعد", "تنظيم Webscale"],
    []
  );

  const scrollToRegister = () => {
    const register = document.getElementById("register");
    register?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormSubmitted(false);
    setSubmitError("");
    setIsSubmitting(true);

    const payload = {
      user_id: "public-user",
      ...getUTMParams(),
      data: {
        "اسم الشركة": formData.companyName,
        "عدد الموظفين": formData.employeeCount,
        "ما هو الشكل القانوني لشركتك؟":
          formData.legalForm === "أخرى" ? formData.legalFormCustom : formData.legalForm,
        "ما هو مجال نشاط شركتك؟":
          formData.businessSector === "أخرى" ? formData.businessSectorCustom : formData.businessSector,
        "منذ متى تأسست شركتك؟": formData.companyEstablished,
        "الاسم واللقب": formData.fullName,
        "رقم الواتس آب": formData.phone,
        الايميل: formData.email,
        الولاية: formData.state,
        "هل أنت عضو في Webscale؟": formData.isWebscaleMember,
        "المنصب الوظيفي": formData.jobTitle,
        "هل سبق لك حضور دورة تدريبية في Webscale؟": formData.hasAttendedWebscaleTraining,
        "هل ستحضر معرض كانتون أفريل 2026":
          formData.attendingCantonApril === "أخرى"
            ? formData.attendingCantonAprilCustom
            : formData.attendingCantonApril,
        "هل زرت معرض كانتون من قبل ":
          formData.visitedCantonBefore === "أخرى"
            ? formData.visitedCantonBeforeCustom
            : formData.visitedCantonBefore,
        "ماهو سبب زيارتك للمعرض؟":
          formData.visitReason === "أخرى" ? formData.visitReasonCustom : formData.visitReason,
      },
    };

    try {
      const res = await fetch(PUBLIC_SUBMIT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok && res.status >= 200 && res.status < 300) {
        setFormSubmitted(true);
        setFormData(initialFormData);
        return;
      }

      const msg = data?.error || data?.message || "⚠️ حدث خطأ غير متوقع.";
      setSubmitError(msg);
    } catch (error) {
      console.error("Canton form submit error:", error);
      setSubmitError("⚠️ حدث خطأ في الاتصال. تحقق من الإنترنت وحاول مجددًا.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderSectionTitle = (title, subtitle, eyebrow) => (
    <div className="mx-auto mb-10 max-w-3xl text-center">
      <img
        src={cantonHeroLogo}
        alt="Canton Fair Webscale 2026"
        className="mx-auto mb-3 h-12 w-auto rounded-lg border border-slate-200 bg-white p-0 shadow-sm"
      />
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
            className="rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 px-5 py-2.5 text-sm font-bold text-slate-900 transition hover:-translate-y-0.5 hover:from-amber-400 hover:to-yellow-300"
          >
            احجز مقعدك الآن
          </button>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-b from-white to-slate-100">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 pb-12 pt-3 md:grid-cols-2 md:items-start md:px-8 md:pb-16 md:pt-12">
            <img
              src={cantonHeroLogo}
              alt="Canton Fair Webscale 2026"
              className="h-auto w-full rounded-2xl border border-slate-200 bg-white p-0 shadow-xl md:hidden"
            />
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-300 bg-amber-50 px-4 py-1 text-xs font-bold text-amber-700">
                <Sparkles className="h-4 w-4" />
                برنامج عملي تأهيلي
              </p>
              <h1 className="font-black leading-tight">
                <span className="block whitespace-nowrap text-xl md:text-4xl">
                  استعد لمعرض كانتون مع وابسكيل
                </span>
              </h1>
              <p className="mt-4 text-lg font-semibold text-slate-700 md:text-xl">
                <span className="md:hidden">
                  برنامج عملي للمصنّعين والمستثمرين الجزائريين لتعلّم استيراد خطوط الإنتاج من الصين بذكاء، وتفادي
                  الأخطاء المكلفة، وبناء صفقات ومشاريع ناجحة.
                </span>
                <span className="hidden md:inline">
                  برنامج تأهيلي عملي يحضرك لزيارة معرض كانتون وبناء صفقات ناجحة واستيراد خطوط الإنتاج الكبيرة
                  والمتوسطة من الصين
                </span>
              </p>
              <p className="mt-5 hidden text-base leading-8 text-slate-600 md:block">
                هذا البرنامج مصمم لرواد الأعمال الجزائريين والمصنّعين والمستوردين المهتمين باستيراد
                خطوط الإنتاج من الصين بقرارات أوضح ومخاطر أقل. ستتعلم كيف تبحث عن المورد الصحيح، تتفادى
                الأخطاء المكلفة، وتبني فرص إنشاء مصانع ناجحة وقابلة للتنفيذ في الجزائر.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  onClick={scrollToRegister}
                  className="rounded-xl bg-amber-500 px-6 py-3 text-sm font-extrabold text-slate-900 transition hover:-translate-y-0.5 hover:bg-amber-400"
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
              <img
                src={cantonHeroLogo}
                alt="Canton Fair Webscale 2026"
                className="mb-4 hidden h-auto w-full rounded-2xl border border-slate-200 bg-white p-0 shadow-xl md:block"
              />
              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xl md:p-7">
                <div className="mb-4">
                  <div className="rounded-2xl border border-amber-200 bg-gradient-to-l from-amber-50 to-white p-4 md:p-5">
                    <p className="mb-2 inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-1 text-[11px] font-bold text-amber-700">
                      <Sparkles className="h-3.5 w-3.5" />
                      البرنامج الأونلاين
                    </p>
                    <h1 className="text-xl font-black leading-tight text-slate-900 md:text-2xl">
                      5 جلسات عملية أونلاين
                    </h1>
                  </div>
                </div>
                <div className="rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-400 p-5 text-slate-900">
                  <p className="text-sm font-semibold text-slate-800">لقاء تكويني تفاعلي + إفطار جماعي</p>
                  <div className="mt-4 space-y-3 text-sm">
                    <p className="flex items-center gap-2">
                      <Landmark className="h-4 w-4 text-slate-800" />
                      المكان: المعهد العالي للعلوم
                    </p>
                    <p className="flex items-center gap-2">
                      <CalendarDays className="h-4 w-4 text-slate-800" />
                      التاريخ: 12 مارس الموافق لـ23 رمضان
                    </p>
                    <p className="flex items-center gap-2">
                      <Clock3 className="h-4 w-4 text-slate-800" />
                      التوقيت: من 17:00 إلى 00:00
                    </p>
                  </div>
                </div>
                <p className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-2 text-center text-sm font-bold text-amber-700">
                  220 مقعد متوفر
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

        <section className="border-b border-slate-200 bg-white px-4 py-8 md:px-8">
          <div className="mx-auto flex max-w-7xl justify-center">
            <button
              onClick={scrollToRegister}
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-amber-500 via-yellow-400 to-orange-400 px-10 py-4 text-base font-black text-slate-900 shadow-[0_12px_30px_rgba(245,158,11,0.30)] transition duration-300 hover:-translate-y-1 hover:from-amber-400 hover:via-yellow-300 hover:to-orange-300"
            >
              <Sparkles className="h-5 w-5" />
              احجز مقعدك الآن
            </button>
          </div>
        </section>

        <section className="border-b border-slate-200 bg-white px-4 py-14 md:px-8">
          <div className="mx-auto max-w-7xl">
            {renderSectionTitle("ماذا ستستفيد داخل البرنامج؟")}
            <div className="grid gap-6 md:grid-cols-2">
              <article className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
                <p className="mb-3 inline-flex rounded-full bg-slate-900 px-3 py-1 text-xs font-bold text-white">
                  جلسات عملية أونلاين
                </p>
                <h3 className="text-xl font-black">جلسات عملية أونلاين</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  ستفهم كيف تختار خط الإنتاج المناسب، تقيّم المصانع والموردين باحتراف، وتتخذ قرارات
                  استثمارية مدروسة تحمي رأس مالك قبل السفر.
                </p>
              </article>
              <article className="rounded-2xl border border-amber-300 bg-amber-50 p-6 shadow-sm">
                <p className="mb-3 inline-flex rounded-full bg-amber-500 px-3 py-1 text-xs font-bold text-slate-900">
                  لقاء تكويني تفاعلي + إفطار جماعي
                </p>
                <h3 className="text-xl font-black text-slate-900">لقاء تكويني تفاعلي + إفطار جماعي</h3>
                <p className="mt-3 text-sm font-semibold leading-7 text-slate-700">
                  ستبني شبكة علاقات قوية مع مستثمرين وصناعيين ومختصين، وتتبادل تجارب حقيقية قد تتحول إلى
                  شراكات وفرص أعمال فعلية.
                </p>
              </article>
            </div>

          </div>
        </section>

        <section className="border-b border-slate-200 bg-white px-4 py-14 md:px-8">
          <div className="mx-auto max-w-7xl">
            {renderSectionTitle("المحاضرون والمستشارون")}
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
                الأستاذ ناصر بن ديب • الشيخ عمار رقبة
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
          <div className="mx-auto max-w-5xl">
            <div className="relative overflow-hidden rounded-3xl border border-amber-300 bg-gradient-to-l from-orange-400 via-amber-400 to-yellow-300 p-7 text-slate-900 shadow-2xl md:p-10">
              <div className="absolute -left-16 -top-16 h-44 w-44 rounded-full bg-amber-500/25 blur-3xl" />
              <div className="absolute -bottom-16 -right-16 h-44 w-44 rounded-full bg-amber-500/25 blur-3xl" />

              <div className="relative text-center">
                <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-slate-900/20 bg-white/30 px-4 py-1 text-xs font-bold text-slate-900">
                  <Sparkles className="h-3.5 w-3.5" />
                  المقاعد محدودة
                </p>
                <h3 className="text-2xl font-black leading-tight md:text-3xl">
                  احجز مكانك الآن قبل اكتمال التسجيل
                </h3>
                <p className="mt-3 text-sm text-slate-800 md:text-base">
                  اضمن مقعدك في البرنامج واستفد من الجلسات العملية واللقاء التكويني التفاعلي.
                </p>

                <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={scrollToRegister}
                    className="rounded-xl bg-slate-900 px-6 py-3 text-sm font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-slate-800"
                  >
                    احجز مقعدك الآن
                  </button>
                  <a
                    href="https://wa.me/213563565936"
                    className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3 text-sm font-bold text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/20"
                  >
                    <MessageCircle className="h-4 w-4 text-emerald-300" />
                    تواصل عبر واتساب
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-slate-200 bg-white px-4 py-14 md:px-8">
          <div className="mx-auto max-w-7xl">
            {renderSectionTitle(
              "خيارات المشاركة",
              "اختر الصيغة الأنسب لك، مع أفضلية واضحة للعرض الكامل."
            )}
            <div className="grid gap-5 lg:grid-cols-2">
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
                  <p className="mt-1 text-sm font-semibold text-slate-500">السعر بدون احتساب الرسوم</p>
                  <p className="mt-2 text-base font-bold text-slate-700">{plan.subtitle}</p>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{plan.description}</p>
                  <button
                    onClick={scrollToRegister}
                    className={`mt-6 w-full rounded-xl px-4 py-3 text-sm font-extrabold transition ${
                      plan.featured
                        ? "bg-amber-500 text-slate-900 hover:bg-amber-400"
                        : "bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-900 hover:from-amber-400 hover:to-yellow-300"
                    }`}
                  >
                    احجز مقعدك الآن
                  </button>
                </article>
              ))}
            </div>
            <p className="mt-6 text-center text-lg font-extrabold text-rose-600">
              عدد المقاعد: 220 مقعد
            </p>
          </div>
        </section>

        <section
          id="register"
          className="border-b border-slate-200 bg-gradient-to-l from-orange-400 via-amber-400 to-yellow-300 px-4 py-14 text-slate-900 md:px-8"
        >
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-black leading-tight md:text-4xl">
                إذا كنت تريد دخول عالم إستيراد خطوط الإنتاج من الصين بوعي أكبر، أخطاء أقل، وعلاقات أقوى —
                فهذا البرنامج صُمم لك.
              </h2>
              <p className="mt-4 text-slate-800">
                التسجيل في هذا النموذج يضعك ضمن قائمة التأكيد المباشر مع فريق وابسكيل.
              </p>
              <div className="mt-6 space-y-3 text-sm font-semibold">
                <p className="flex items-center gap-2">
                  <Handshake className="h-4 w-4 text-slate-800" />
                  تركيز كامل على نتائج عملية وقابلة للتنفيذ
                </p>
                <p className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-slate-800" />
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
            <form onSubmit={handleSubmit} className="registration-form rounded-3xl bg-white p-6 text-slate-900 shadow-2xl">
              <h3 className="text-xl font-black">احجز مقعدك الآن</h3>
              <p className="mt-1 text-sm text-slate-600">املأ البيانات وسنتواصل معك بسرعة.</p>
              <div className="mt-5 space-y-4">
                <div>
                  <label htmlFor="companyName" className="mb-1 block text-sm font-bold">
                    اسم الشركة
                  </label>
                  <input
                    id="companyName"
                    required
                    value={formData.companyName}
                    onChange={(e) => setFormData((prev) => ({ ...prev, companyName: e.target.value }))}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-amber-400"
                    placeholder="أدخل اسم الشركة"
                  />
                  <p className="mt-1 text-xs text-slate-500">
                    في حالة عدم امتلاكك لشركة اكتب: ليس بعد
                  </p>
                </div>
                <div>
                  <label htmlFor="employeeCount" className="mb-1 block text-sm font-bold">
                    عدد الموظفين
                  </label>
                  <select
                    id="employeeCount"
                    required
                    value={formData.employeeCount}
                    onChange={(e) => setFormData((prev) => ({ ...prev, employeeCount: e.target.value }))}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-amber-400"
                  >
                    <option value="">اختر عدد الموظفين</option>
                    {employeeCountOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="legalForm" className="mb-1 block text-sm font-bold">
                    ما هو الشكل القانوني لشركتك؟
                  </label>
                  <select
                    id="legalForm"
                    required
                    value={formData.legalForm}
                    onChange={(e) => setFormData((prev) => ({ ...prev, legalForm: e.target.value }))}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-amber-400"
                  >
                    <option value="">اختر الشكل القانوني</option>
                    {legalFormOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                    <option value="أخرى">أخرى..</option>
                  </select>
                  {formData.legalForm === "أخرى" ? (
                    <input
                      className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-amber-400"
                      placeholder="أخرى.."
                      value={formData.legalFormCustom}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, legalFormCustom: e.target.value }))
                      }
                    />
                  ) : null}
                </div>
                <div>
                  <label htmlFor="businessSector" className="mb-1 block text-sm font-bold">
                    ما هو مجال نشاط شركتك؟
                  </label>
                  <select
                    id="businessSector"
                    required
                    value={formData.businessSector}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, businessSector: e.target.value }))
                    }
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-amber-400"
                  >
                    <option value="">اختر المجال</option>
                    {businessSectorOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                    <option value="أخرى">أخرى (يرجى التحديد)</option>
                  </select>
                  {formData.businessSector === "أخرى" ? (
                    <input
                      className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-amber-400"
                      placeholder="أخرى (يرجى التحديد)"
                      value={formData.businessSectorCustom}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, businessSectorCustom: e.target.value }))
                      }
                    />
                  ) : null}
                </div>
                <div>
                  <label htmlFor="companyEstablished" className="mb-1 block text-sm font-bold">
                    منذ متى تأسست شركتك؟
                  </label>
                  <select
                    id="companyEstablished"
                    required
                    value={formData.companyEstablished}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, companyEstablished: e.target.value }))
                    }
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-amber-400"
                  >
                    <option value="">اختر المدة</option>
                    {companyEstablishedOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="fullName" className="mb-1 block text-sm font-bold">
                    الاسم واللقب
                  </label>
                  <input
                    id="fullName"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData((prev) => ({ ...prev, fullName: e.target.value }))}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-amber-400"
                    placeholder="أدخل الاسم واللقب"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="mb-1 block text-sm font-bold">
                    رقم الواتس آب
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
                    الايميل
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
                  <label htmlFor="state" className="mb-1 block text-sm font-bold">
                    الولاية
                  </label>
                  <select
                    id="state"
                    value={formData.state}
                    onChange={(e) => setFormData((prev) => ({ ...prev, state: e.target.value }))}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-amber-400"
                  >
                    <option value="">اختر الولاية</option>
                    {stateOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <p className="mb-2 block text-sm font-bold">هل أنت عضو في Webscale؟</p>
                  <div className="flex gap-4">
                    {["نعم", "لا"].map((option) => (
                      <label key={option} className="inline-flex items-center gap-2 text-sm">
                        <input
                          type="radio"
                          name="isWebscaleMember"
                          value={option}
                          required
                          checked={formData.isWebscaleMember === option}
                          onChange={(e) =>
                            setFormData((prev) => ({ ...prev, isWebscaleMember: e.target.value }))
                          }
                        />
                        {option}
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label htmlFor="jobTitle" className="mb-1 block text-sm font-bold">
                    المنصب الوظيفي
                  </label>
                  <select
                    id="jobTitle"
                    required
                    value={formData.jobTitle}
                    onChange={(e) => setFormData((prev) => ({ ...prev, jobTitle: e.target.value }))}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-amber-400"
                  >
                    <option value="">اختر المنصب الوظيفي</option>
                    {jobTitleOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <p className="mb-2 block text-sm font-bold">هل سبق لك حضور دورة تدريبية في Webscale؟</p>
                  <div className="flex gap-4">
                    {["لا", "نعم"].map((option) => (
                      <label key={option} className="inline-flex items-center gap-2 text-sm">
                        <input
                          type="radio"
                          name="hasAttendedWebscaleTraining"
                          value={option}
                          required
                          checked={formData.hasAttendedWebscaleTraining === option}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              hasAttendedWebscaleTraining: e.target.value,
                            }))
                          }
                        />
                        {option}
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="mb-2 block text-sm font-bold">هل ستحضر معرض كانتون أفريل 2026؟</p>
                  <div className="flex gap-4">
                    {["نعم", "لا", "أخرى"].map((option) => (
                      <label key={option} className="inline-flex items-center gap-2 text-sm">
                        <input
                          type="radio"
                          name="attendingCantonApril"
                          value={option}
                          required
                          checked={formData.attendingCantonApril === option}
                          onChange={(e) =>
                            setFormData((prev) => ({ ...prev, attendingCantonApril: e.target.value }))
                          }
                        />
                        {option}
                      </label>
                    ))}
                  </div>
                  {formData.attendingCantonApril === "أخرى" ? (
                    <input
                      className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-amber-400"
                      placeholder="Please specify..."
                      value={formData.attendingCantonAprilCustom}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          attendingCantonAprilCustom: e.target.value,
                        }))
                      }
                    />
                  ) : null}
                </div>
                <div>
                  <label htmlFor="visitedCantonBefore" className="mb-1 block text-sm font-bold">
                    هل زرت معرض كانتون من قبل؟
                  </label>
                  <select
                    id="visitedCantonBefore"
                    required
                    value={formData.visitedCantonBefore}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, visitedCantonBefore: e.target.value }))
                    }
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-amber-400"
                  >
                    <option value="">اختر الإجابة</option>
                    <option value="لا">لا</option>
                    <option value="مرة واحدة">مرة واحدة</option>
                    <option value="مرتين">مرتين</option>
                    <option value="اكثر من 3 مرات">اكثر من 3 مرات</option>
                    <option value="أخرى">أخرى</option>
                  </select>
                  {formData.visitedCantonBefore === "أخرى" ? (
                    <input
                      className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-amber-400"
                      placeholder="Please specify..."
                      value={formData.visitedCantonBeforeCustom}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          visitedCantonBeforeCustom: e.target.value,
                        }))
                      }
                    />
                  ) : null}
                </div>
                <div>
                  <label htmlFor="visitReason" className="mb-1 block text-sm font-bold">
                    ماهو سبب زيارتك للمعرض؟
                  </label>
                  <select
                    id="visitReason"
                    required
                    value={formData.visitReason}
                    onChange={(e) => setFormData((prev) => ({ ...prev, visitReason: e.target.value }))}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-amber-400"
                  >
                    <option value="">اختر السبب</option>
                    {visitReasonOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                    <option value="أخرى">أخرى</option>
                  </select>
                  {formData.visitReason === "أخرى" ? (
                    <input
                      className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-amber-400"
                      placeholder="Please specify..."
                      value={formData.visitReasonCustom}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, visitReasonCustom: e.target.value }))
                      }
                    />
                  ) : null}
                </div>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-5 w-full rounded-xl bg-amber-500 px-5 py-3 text-sm font-extrabold text-slate-900 transition hover:bg-amber-400"
              >
                {isSubmitting ? "جاري الإرسال..." : "احجز مقعدك الآن"}
              </button>
              {formSubmitted ? (
                <p className="mt-3 rounded-xl bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700">
                  تم استلام طلبك بنجاح. سيقوم فريقنا بالتواصل معك قريبًا.
                </p>
              ) : null}
              {submitError ? (
                <p className="mt-3 rounded-xl bg-rose-50 px-3 py-2 text-sm font-semibold text-rose-700">
                  {submitError}
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

        <section className="border-b border-slate-200 bg-white px-4 py-10 md:px-8">
          <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-3">
            <button
              onClick={scrollToRegister}
              className="rounded-xl bg-amber-500 px-7 py-3 text-sm font-extrabold text-slate-900 transition hover:-translate-y-0.5 hover:bg-amber-400"
            >
              احجز مقعدك الآن
            </button>
            <a
              href="https://wa.me/213563565936"
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-7 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-emerald-500"
            >
              <MessageCircle className="h-4 w-4" />
              تواصل عبر واتساب
            </a>
          </div>
        </section>

        <section className="bg-gradient-to-l from-orange-400 via-amber-400 to-yellow-300 px-4 py-14 text-center text-slate-900 md:px-8">
          <div className="mx-auto max-w-4xl">
            <p className="inline-flex rounded-full bg-white/30 px-3 py-1 text-xs font-bold text-slate-900">
              المقاعد محدودة
            </p>
            <h2 className="mt-4 text-3xl font-black md:text-4xl">اتخذ قرارك الآن قبل اكتمال المقاعد</h2>
            <p className="mt-3 text-slate-800">
              برنامج مصمم لنتائج حقيقية، مع مستشارين لديهم خبرة عملية مباشرة في السوق الصيني.
            </p>
            <button
              onClick={scrollToRegister}
              className="mt-7 rounded-xl bg-amber-500 px-7 py-3 text-sm font-extrabold text-slate-900 transition hover:bg-amber-400"
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
          className="w-full rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 px-5 py-3 text-sm font-extrabold text-slate-900"
        >
          احجز مقعدك الآن
        </button>
      </div>
    </div>
  );
};

export default FormationPage;


