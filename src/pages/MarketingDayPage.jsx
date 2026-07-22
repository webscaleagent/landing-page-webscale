import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { getUTMParams } from "../utils/utm";

const LOGO_URL =
  "https://cdn.just.ad/chat-images/4064/bed4be0a-1f73-4689-9d1a-12341a2e9cd5.png";
const TRAINER_IMAGE =
  "https://cdn.just.ad/chat-images/4064/a0f20687-3abf-42be-bea0-5487750f165e.png";
const GALLERY_IMAGES = [
  "https://cdn.just.ad/chat-images/4064/0d2c9201-7eb4-48e5-8dc5-25091d0e5fc4.png",
  "https://cdn.just.ad/chat-images/4064/d8cd4bf3-0e53-4d85-a06c-eca0aa855d5b.png",
  "https://cdn.just.ad/chat-images/4064/693a50ab-0628-4058-810a-89da7c9e1267.png",
  "https://cdn.just.ad/chat-images/4064/bed0a147-a923-4a94-9332-f47953ab46c1.png",
];
const TESTIMONIAL_VIDEOS = ["L6gU28uSN8s", "-_o3-CzeRD4", "KcDRpQwVVj8"];
const FORM_ID = "a76a0a47-8fad-450a-95f5-aab6f27ae5e1";
const FORM_ENDPOINT = `https://crmgo.webscale.dz/api/v1/public/forms/${FORM_ID}/submit`;
const FB_PIXEL_ID = "3093506604166938";
const TIKTOK_PIXEL_ID = "D8S20NBC77U2T5L531U0";

const audienceItems = [
  { icon: "fa-building", label: "صاحب مؤسسة" },
  { icon: "fa-user-tie", label: "مسير مؤسسة" },
  { icon: "fa-bullseye", label: "مسؤول تسويق" },
  { icon: "fa-chart-line", label: "مسؤول مبيعات" },
  { icon: "fa-rocket", label: "صاحب مشروع جاد" },
];

const problems = [
  "تصرف على التسويق لكن النتائج غير واضحة.",
  "لا تعرف أي القنوات تحقق أفضل عائد.",
  "الوكالة تطلب زيادة الميزانية دون وجود أرقام واضحة.",
  "تنتج محتوى كثيراً لكن لا تعرف أثره الحقيقي على المبيعات.",
];

const agendaSessions = [
  {
    time: "08:30 – 10:30",
    label: "الجلسة الأولى",
    title: "أين نجد عملاء أكثر؟ وكم يجب أن نستثمر؟",
    topics:
      "تحديد العميل المستهدف، دراسة المنافسين، تحليل مصادر العملاء، حساب CAC، بناء الميزانية التسويقية.",
    outcomes: "Buyer Persona عملي، CAC محسوب، ميزانية تسويقية مبنية على الأرقام.",
  },
  {
    type: "break",
    time: "10:30 – 10:50",
    icon: "fa-coffee",
    text: "استراحة القهوة وتفقد رسائل العمل",
  },
  {
    time: "10:50 – 12:45",
    label: "الجلسة الثانية",
    title: "كيف تصنع محتوى تسويقياً يجذب العملاء؟",
    topics: "بناء العرض التسويقي، تحسين الرسائل، تحليل الإعلانات الناجحة، صناعة محتوى يخدم المبيعات.",
    outcomes: "عرض تسويقي أقوى، رسائل أوضح، خطة محتوى عملية.",
  },
  {
    type: "break",
    time: "12:45 – 13:30",
    icon: "fa-utensils",
    text: "استراحة الغذاء والصلاة",
  },
  {
    time: "13:30 – 14:30",
    label: "الجلسة الثالثة",
    title: "أطلق حملتك الإعلانية الأولى بالذكاء الاصطناعي",
    topics: "إعداد المحتوى، إنشاء الحملات، تسريع التنفيذ بالذكاء الاصطناعي.",
    outcomes: "حملة أولية جاهزة، خطة تنفيذ.",
  },
  {
    time: "14:30 – 15:15",
    label: "الجلسة الرابعة",
    title: "كيف تقرأ النتائج وتتخذ قرارات أفضل؟",
    topics: "تحليل النتائج، قراءة المؤشرات، اكتشاف الأخطاء.",
    outcomes: "القدرة على تحليل النتائج وفهم الـ KPIs.",
  },
  {
    time: "15:15 – 16:00",
    label: "الجلسة الختامية",
    title: "كيف تحوّل الاهتمام إلى مبيعات فعلية؟",
    topics: "تصميم مسار العميل، تقليل الضياع، تحسين التحويل.",
    outcomes: "Funnel عملي ومسار واضح للمبيعات.",
  },
];

const outcomes = [
  { icon: "fa-bullseye", label: "أهداف تسويقية واضحة" },
  { icon: "fa-user-check", label: "Buyer Persona عملي" },
  { icon: "fa-calculator", label: "ميزانية مبنية على الأرقام" },
  { icon: "fa-map-signs", label: "خطة تسويقية أوضح" },
  { icon: "fa-robot", label: "إطلاق حملات بالذكاء الاصطناعي" },
  { icon: "fa-chart-pie", label: "القدرة على تحليل النتائج" },
  { icon: "fa-filter", label: "Funnel عملي" },
  { icon: "fa-money-bill-wave", label: "مسار تحويل للمبيعات" },
];

const traditionalCons = [
  "نظريات كثيرة",
  "معلومات عامة",
  "التركيز على الأدوات فقط",
  "غياب لغة الأرقام",
  "صعوبة التطبيق الميداني",
];

const marketingDayPros = [
  "عملية وتطبيقية 100%",
  "مبنية على الأرقام والنتائج",
  "تساعد على حساب الميزانية بدقة",
  "بناء حملات فعلية أثناء الدورة",
  "تحليل النتائج واكتشاف الهدر",
  "قابلة للتطبيق مباشرة داخل المؤسسة",
];

const trainerHighlights = [
  { icon: "fa-briefcase", text: "الرئيس المدير العام لشركة WebScale." },
  { icon: "fa-building", text: "مؤسس Rahim Media Marketing." },
  { icon: "fa-chart-line", text: "يشرف على إدارة الحملات وتطوير المؤسسات." },
  { icon: "fa-users", text: "يمتلك قرابة مليون متابع عبر المنصات الرقمية." },
];

const jobTitles = [
  "رئيس الشركة",
  "مسير",
  "موظف",
  "مدير قسم التسويق",
  "مدير قسم المبيعات",
];

const employeeOptions = [
  "أقل من 5",
  "من 05 إلى 10 موظفين",
  "من 10 إلى 50 موظف",
  "من 50 موظف فما فوق",
];

const legalFormOptions = [
  "مؤسسة فردية",
  "شركة ذات مسؤولية محدودة (SARL)",
  "شركة مساهمة (SPA)",
  "شركة تضامن",
  "تعاونية",
  "شركة ناشئة (Startup)",
  "أخرى..",
];

const companyEstablishedOptions = [
  "أقل من سنة",
  "من 1 إلى 3 سنوات",
  "من 3 إلى 5 سنوات",
  "أكثر من 5 سنوات.",
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
  "أخرى (يرجى التحديد)",
];

const wilayaOptions = [
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

const callTimeOptions = [
  "9:00 - 11:00",
  "11:00 - 13:00",
  "13:00 - 16:00",
  "16:00 - 20:00",
  "20:00 - 22:00",
];

const initialFormState = {
  companyName: "",
  legalForm: "",
  otherLegalForm: "",
  companyEstablished: "",
  employeeCount: "",
  businessSector: "",
  otherBusinessSector: "",
  fullName: "",
  phone: "",
  email: "",
  state: "",
  isWebscaleMember: "",
  jobTitle: "",
  hasAttendedWebscaleTraining: "",
  discoverySource: "",
  whyImportant: "",
  callTime: "",
};

const inputClass =
  "w-full bg-bgPrimary border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-goldPrimary focus:ring-1 focus:ring-goldPrimary transition";

const trackCTA = () => {
  if (typeof window.fbq === "function") {
    window.fbq("trackSingleCustom", FB_PIXEL_ID, "CTAView");
  }
  if (typeof window.ttq !== "undefined") window.ttq.track("ClickButton");
};

const trackChat = () => {
  if (typeof window.fbq === "function") {
    window.fbq("trackSingleCustom", FB_PIXEL_ID, "ChatOpen");
  }
  if (typeof window.ttq !== "undefined") window.ttq.track("Contact");
};

const MarketingDayPage = () => {
  const [regType, setRegType] = useState("مقعد فردي");
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formMsg, setFormMsg] = useState({ text: "", type: "" });
  const [form, setForm] = useState(initialFormState);

  useEffect(() => {
    // Marketing Day Meta Pixel — ID distinct from the site-wide pixel in index.html
    const ensureFbq = () => {
      if (typeof window.fbq === "function") return;
      !(function (f, b, e, v, n, t, s) {
        if (f.fbq) return;
        n = f.fbq = function () {
          n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
        };
        if (!f._fbq) f._fbq = n;
        n.push = n;
        n.loaded = !0;
        n.version = "2.0";
        n.queue = [];
        t = b.createElement(e);
        t.async = !0;
        t.src = v;
        s = b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t, s);
      })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
    };

    ensureFbq();

    if (!window.__mdPixelInited) {
      // init + trackSingle so this ID is registered even when the global pixel already loaded
      window.fbq("init", FB_PIXEL_ID);
      window.fbq("trackSingle", FB_PIXEL_ID, "PageView");
      window.__mdPixelInited = true;
    }

    // TikTok Pixel
    !(function (w, d, t) {
      w.TiktokAnalyticsObject = t;
      var ttq = (w[t] = w[t] || []);
      ttq.methods = [
        "page",
        "track",
        "identify",
        "instances",
        "debug",
        "on",
        "off",
        "once",
        "ready",
        "alias",
        "group",
        "enableCookie",
        "disableCookie",
      ];
      ttq.setAndDefer = function (obj, method) {
        obj[method] = function () {
          obj.push([method].concat(Array.prototype.slice.call(arguments, 0)));
        };
      };
      for (var i = 0; i < ttq.methods.length; i++) ttq.setAndDefer(ttq, ttq.methods[i]);
      ttq.instance = function (id) {
        var inst = (ttq._i[id] || []);
        for (var n = 0; n < ttq.methods.length; n++) ttq.setAndDefer(inst, ttq.methods[n]);
        return inst;
      };
      ttq.load = function (e, n) {
        var i = "https://analytics.tiktok.com/i18n/pixel/events.js";
        ttq._i = ttq._i || {};
        ttq._i[e] = [];
        ttq._i[e]._u = i;
        ttq._t = ttq._t || {};
        ttq._t[e] = +new Date();
        ttq._o = ttq._o || {};
        ttq._o[e] = n || {};
        n = document.createElement("script");
        n.type = "text/javascript";
        n.async = !0;
        n.src = i + "?sdkid=" + e + "&lib=" + t;
        e = document.getElementsByTagName("script")[0];
        e.parentNode.insertBefore(n, e);
      };
      if (!ttq._i || !ttq._i[TIKTOK_PIXEL_ID]) {
        ttq.load(TIKTOK_PIXEL_ID);
        ttq.page();
      }
    })(window, document, "ttq");
  }, []);

  const updateField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const selectPlanAndScroll = (planValue) => {
    setRegType(planValue);
    const formSection = document.getElementById("form-section");
    if (formSection) formSection.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setFormMsg({ text: "", type: "" });

    const legalFormValue =
      form.legalForm === "أخرى.." ? form.otherLegalForm.trim() : form.legalForm;
    const businessSectorValue =
      form.businessSector === "أخرى (يرجى التحديد)"
        ? form.otherBusinessSector.trim()
        : form.businessSector;

    if (form.legalForm === "أخرى.." && !legalFormValue) {
      setFormMsg({ text: "يرجى تحديد الشكل القانوني.", type: "error" });
      setSubmitting(false);
      return;
    }

    if (form.businessSector === "أخرى (يرجى التحديد)" && !businessSectorValue) {
      setFormMsg({ text: "يرجى تحديد مجال نشاط الشركة.", type: "error" });
      setSubmitting(false);
      return;
    }

    const utmParams = getUTMParams();
    const payload = {
      user_id: "public-user",
      ...utmParams,
      data: {
        "اسم الشركة": form.companyName.trim(),
        "ما هو الشكل القانوني لشركتك؟": legalFormValue,
        "منذ متى تأسست شركتك؟": form.companyEstablished,
        "عدد الموظفين": form.employeeCount,
        "ما هو مجال نشاط شركتك؟": businessSectorValue,
        "المنصب الوظيفي": form.jobTitle,
        "الاسم واللقب": form.fullName.trim(),
        "رقم الواتس آب": form.phone.trim(),
        "الايميل": form.email.trim(),
        "هل أنت عضو في Webscale؟": form.isWebscaleMember,
        "هل سبق لك حضور دورة تدريبية في Webscale؟": form.hasAttendedWebscaleTraining,
        "ما هو التوقيت المناسب لك للاتصال بك؟": form.callTime,
      },
    };

    if (form.state) payload.data["الولاية"] = form.state;
    if (form.discoverySource.trim()) {
      payload.data["عبر أي منصة أو شخص اكتشفت Marketing Day؟"] = form.discoverySource.trim();
    }
    if (form.whyImportant.trim()) {
      payload.data["لماذا ترى أن حضور Marketing Day مهم بالنسبة لك؟"] =
        form.whyImportant.trim();
    }

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const responseData = await response.json().catch(() => ({}));

      if (!response.ok) {
        const msg =
          responseData?.error ||
          responseData?.message ||
          "حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى.";
        throw new Error(msg);
      }

      const value = regType === "عرض المؤسسة" ? 30000 : 17500;
      if (typeof window.fbq === "function") {
        window.fbq("trackSingle", FB_PIXEL_ID, "Lead", { currency: "DZD", value });
      }
      if (typeof window.ttq !== "undefined") {
        window.ttq.track("SubmitForm", { value, currency: "DZD" });
      }

      setSubmitSuccess(true);
      setFormMsg({
        text: "تم استلام طلبك بنجاح! سيتواصل معك فريقنا قريباً.",
        type: "success",
      });
      setForm(initialFormState);
      setRegType("مقعد فردي");
    } catch (error) {
      setFormMsg({
        text:
          error?.message ||
          "حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى أو التواصل معنا عبر الواتساب.",
        type: "error",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="marketing-day-page antialiased selection:bg-goldPrimary selection:text-bgPrimary font-cairo bg-bgPrimary text-white min-h-screen"
      dir="rtl"
    >
      <Helmet>
        <title>Marketing DAY - Executive Edition | د. عبد الرحيم عبد اللاوي</title>
        <meta
          name="description"
          content="برنامج عملي يساعد أصحاب المؤسسات والمسيرين على اتخاذ قرارات تسويقية مبنية على الأرقام وليس التخمين."
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
        <style>{`
          .marketing-day-page { scroll-behavior: smooth; }
          .marketing-day-page .glass-card {
            background: rgba(17, 24, 39, 0.7);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(201, 162, 78, 0.1);
          }
          .marketing-day-page .gold-gradient-text {
            background: linear-gradient(to right, #D4AF37, #C9A24E);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
          .marketing-day-page .gold-button {
            background: linear-gradient(135deg, #C9A24E 0%, #D4AF37 100%);
            color: #050816;
            transition: all 0.3s ease;
          }
          .marketing-day-page .gold-button:hover {
            box-shadow: 0 0 20px rgba(201, 162, 78, 0.4);
            transform: translateY(-2px);
          }
          .marketing-day-page .outline-button {
            border: 2px solid #C9A24E;
            color: #C9A24E;
            transition: all 0.3s ease;
          }
          .marketing-day-page .outline-button:hover {
            background: rgba(201, 162, 78, 0.1);
          }
          .marketing-day-page ::-webkit-scrollbar { width: 8px; }
          .marketing-day-page ::-webkit-scrollbar-track { background: #050816; }
          .marketing-day-page ::-webkit-scrollbar-thumb { background: #C9A24E; border-radius: 4px; }
        `}</style>
        <noscript>{`
          <img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1" />
        `}</noscript>
      </Helmet>

      {/* Header */}
      <header className="fixed w-full top-0 z-50 glass-card border-b border-goldPrimary/20">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src={LOGO_URL} alt="WebScale Logo" className="h-10 object-contain" />
            <div className="hidden md:block border-r border-gray-600 h-8 mx-3" />
            <div className="hidden md:flex flex-col justify-center">
              <span className="text-sm font-bold tracking-widest uppercase text-textSecondary">
                Executive Edition
              </span>
              <span className="text-xs text-goldPrimary font-semibold">
                لنمو صحي، بتقنيات أذكى
              </span>
            </div>
          </div>
          <a
            href="#form-section"
            className="gold-button px-6 py-2 rounded-md font-bold text-sm"
            onClick={trackCTA}
          >
            احجز مقعدك
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-24 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-goldPrimary/5 rounded-full blur-[120px] -z-10" />
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 text-center lg:text-right z-10">
              <div className="inline-block border border-goldPrimary/30 bg-goldPrimary/10 text-goldPrimary px-4 py-1.5 rounded-full text-sm font-bold mb-6">
                برنامج تنفيذي مكثف ليوم واحد
              </div>
              <h1 className="text-5xl lg:text-7xl font-black leading-tight mb-6">
                MARKETING <span className="gold-gradient-text">DAY</span>
              </h1>
              <p className="text-xl lg:text-2xl font-bold text-textPrimary mb-4 leading-relaxed">
                برنامج عملي يساعد أصحاب المؤسسات والمسيرين على اتخاذ قرارات تسويقية مبنية على
                الأرقام وليس التخمين.
              </p>
              <p className="text-lg text-textSecondary mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                تعلم خلال يوم واحد فقط كيف تحدد عملاءك، وتحسب ميزانيتك التسويقية، وتطلق حملات أكثر
                فعالية تحقق نتائج حقيقية.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a
                  href="#form-section"
                  className="gold-button px-8 py-4 rounded-md font-bold text-lg text-center"
                  onClick={trackCTA}
                >
                  احجز مقعدك الآن <i className="fas fa-arrow-left mr-2" />
                </a>
                <a
                  href="#agenda"
                  className="outline-button px-8 py-4 rounded-md font-bold text-lg text-center"
                >
                  اطلع على البرنامج
                </a>
              </div>
            </div>

            <div className="order-1 lg:order-2 relative z-10 w-full max-w-2xl mx-auto">
              <div className="relative rounded-2xl overflow-hidden shadow-gold-glow border border-goldPrimary/30 bg-cardBg p-2">
                <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-gray-800 bg-black">
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src="https://www.youtube.com/embed/xy_cyCAiWq0?rel=0&modestbranding=1"
                    title="Marketing Day VSL"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Target Audience */}
      <section className="py-20 bg-bgSecondary border-y border-gray-800">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-extrabold mb-4">لمن صُممت هذه الدورة؟</h2>
            <p className="text-textSecondary text-lg max-w-2xl mx-auto">
              هذا البرنامج ليس للمبتدئين، بل صُمم خصيصاً لصناع القرار الذين يبحثون عن العائد الحقيقي
              على الاستثمار.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            {audienceItems.map((item) => (
              <div
                key={item.label}
                className="glass-card px-8 py-6 rounded-xl shadow-lg border border-goldPrimary/20 flex items-center gap-4 w-full md:w-auto"
              >
                <i className={`fas ${item.icon} text-goldPrimary text-2xl`} />
                <span className="text-xl font-bold">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section className="py-20 bg-bgPrimary relative">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto glass-card p-8 md:p-12 rounded-2xl border-l-4 border-l-goldPrimary">
            <h3 className="text-2xl md:text-3xl font-bold mb-8 text-white">
              قبل أن تصرف ديناراً واحداً على التسويق، هل تواجه هذه التحديات؟
            </h3>
            <ul className="space-y-4 text-lg text-textSecondary">
              {problems.map((problem) => (
                <li key={problem} className="flex items-start gap-3">
                  <i className="fas fa-times-circle text-red-500 mt-1" />
                  <span>{problem}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 p-6 bg-goldPrimary/10 rounded-lg border border-goldPrimary/30">
              <p className="text-xl font-bold text-goldPrimary">يجب أن تعرف أولاً:</p>
              <div className="mt-4 grid md:grid-cols-3 gap-4 text-white font-semibold">
                <div className="flex items-center gap-2">
                  <i className="fas fa-check text-goldPrimary" /> من هو عميلك؟
                </div>
                <div className="flex items-center gap-2">
                  <i className="fas fa-check text-goldPrimary" /> كم تدفع للحصول عليه؟
                </div>
                <div className="flex items-center gap-2">
                  <i className="fas fa-check text-goldPrimary" /> ما هي أفضل المبادرات؟
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Agenda */}
      <section id="agenda" className="py-20 bg-bgTertiary">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-extrabold mb-4">البرنامج التدريبي (Agenda)</h2>
            <p className="text-textSecondary text-lg">
              يوم تنفيذي مكثف من 08:30 صباحاً إلى 16:00 مساءً
            </p>
          </div>
          <div className="max-w-4xl mx-auto space-y-6">
            {agendaSessions.map((session) =>
              session.type === "break" ? (
                <div
                  key={session.time}
                  className="bg-cardBg/50 p-4 rounded-xl border border-gray-800 flex items-center gap-4 text-gray-400"
                >
                  <i className={`fas ${session.icon} text-xl`} />
                  <div>
                    <span className="font-bold mr-2">{session.time}</span>
                    <span className="text-sm">{session.text}</span>
                  </div>
                </div>
              ) : (
                <div
                  key={session.time}
                  className="glass-card p-6 md:p-8 rounded-2xl border-l-4 border-l-goldPrimary flex flex-col md:flex-row gap-6 items-start md:items-center"
                >
                  <div className="md:w-1/4 shrink-0">
                    <div className="text-goldPrimary font-bold text-xl mb-1">{session.time}</div>
                    <div className="text-sm text-gray-400 font-semibold uppercase tracking-wider">
                      {session.label}
                    </div>
                  </div>
                  <div className="md:w-3/4">
                    <h3 className="text-2xl font-bold mb-4">{session.title}</h3>
                    <div className="space-y-2">
                      <p className="text-sm text-textMuted">
                        <strong className="text-white">المواضيع:</strong> {session.topics}
                      </p>
                      <p className="text-sm text-goldPrimary">
                        <strong className="text-white">المخرجات:</strong> {session.outcomes}
                      </p>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* Outcomes */}
      <section className="py-20 bg-bgPrimary">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-extrabold mb-4">
              ما هي النتائج العملية التي ستغادر بها؟
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {outcomes.map((item) => (
              <div
                key={item.label}
                className="glass-card p-6 rounded-xl border-t-2 border-t-goldPrimary"
              >
                <i className={`fas ${item.icon} text-goldPrimary text-2xl mb-4`} />
                <h4 className="font-bold text-lg">{item.label}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="py-20 bg-bgSecondary">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-extrabold mb-4">لماذا Marketing DAY مختلفة؟</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="glass-card p-8 rounded-2xl border border-red-900/30">
              <h3 className="text-2xl font-bold mb-6 text-gray-400">الدورات التقليدية</h3>
              <ul className="space-y-4">
                {traditionalCons.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-gray-400">
                    <i className="fas fa-times text-red-500" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="glass-card p-8 rounded-2xl border-2 border-goldPrimary shadow-gold-glow relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-goldPrimary text-bgPrimary text-xs font-bold px-3 py-1 rounded-bl-lg">
                الخيار الذكي
              </div>
              <h3 className="text-2xl font-bold mb-6 gold-gradient-text">Marketing DAY</h3>
              <ul className="space-y-4">
                {marketingDayPros.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-white">
                    <i className="fas fa-check-circle text-goldPrimary" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* About Trainer */}
      <section className="py-20 bg-bgTertiary border-y border-gray-800">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <img
                src={TRAINER_IMAGE}
                alt="د. عبد الرحيم عبد اللاوي"
                className="rounded-2xl shadow-gold-glow w-full object-cover border border-goldPrimary/30"
              />
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-sm text-goldPrimary font-bold tracking-wider mb-2">عن المدرب</h2>
              <h3 className="text-3xl lg:text-4xl font-extrabold mb-6">د. عبد الرحيم عبد اللاوي</h3>
              <p className="text-lg text-textSecondary mb-6 leading-relaxed">
                مستشار ومدرب في التسويق الرقمي ونمو الأعمال عبر الإنترنت. متخصص في مساعدة المؤسسات
                والمسيرين على بناء أنظمة تسويقية عملية قائمة على النتائج والأرقام بدل التخمين.
              </p>
              <ul className="space-y-3 text-textPrimary font-semibold">
                {trainerHighlights.map((item) => (
                  <li key={item.text} className="flex items-center gap-3">
                    <i className={`fas ${item.icon} text-goldPrimary`} /> {item.text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20 bg-bgPrimary">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-extrabold mb-4">أجواء الدورات السابقة</h2>
            <p className="text-textSecondary text-lg">بيئة أعمال جادة واحترافية تجمع صناع القرار</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {GALLERY_IMAGES.map((src) => (
              <img
                key={src}
                src={src}
                alt="Event"
                className="rounded-xl w-full h-64 object-cover hover:scale-105 transition duration-300 border border-gray-800"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-bgSecondary">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-extrabold mb-4">آراء وتجارب المشاركين</h2>
            <p className="text-textSecondary text-lg">نتائج حقيقية من مدراء ومسيرين حضروا البرنامج</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {TESTIMONIAL_VIDEOS.map((id, index) => (
              <div
                key={id}
                className="aspect-[9/16] rounded-2xl overflow-hidden border border-goldPrimary/30 shadow-lg"
              >
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${id}`}
                  title={`Testimonial ${index + 1}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing & Registration */}
      <section id="register" className="py-20 bg-bgPrimary relative">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-extrabold mb-4">خيارات المشاركة والتسجيل</h2>
            <p className="text-textSecondary text-lg">
              اختر الباقة المناسبة لمؤسستك واحجز مقعدك الآن
            </p>
          </div>
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4 space-y-6">
              <div className="glass-card p-6 rounded-2xl border border-gray-700 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold mb-2">المقعد الفردي</h3>
                  <div className="text-3xl font-black text-white mb-1">
                    17,500 <span className="text-lg text-gray-400 font-normal">دج</span>
                  </div>
                  <p className="text-xs text-gray-500 mb-6">(بدون احتساب الرسوم)</p>
                  <ul className="space-y-3 text-sm mb-6">
                    <li className="flex items-center gap-2">
                      <i className="fas fa-check text-goldPrimary" /> حضور الدورة كاملة
                    </li>
                    <li className="flex items-center gap-2">
                      <i className="fas fa-check text-goldPrimary" /> جميع الأنشطة التطبيقية
                    </li>
                    <li className="flex items-center gap-2">
                      <i className="fas fa-check text-goldPrimary" /> الملفات والأدوات المستخدمة
                    </li>
                  </ul>
                </div>
                <button
                  type="button"
                  onClick={() => selectPlanAndScroll("مقعد فردي")}
                  className="w-full gold-button py-3 rounded-md font-bold text-sm mt-auto"
                >
                  اختيار هذه الباقة
                </button>
              </div>

              <div className="glass-card p-6 rounded-2xl border-2 border-goldPrimary shadow-gold-glow relative flex flex-col justify-between">
                <div className="absolute -top-3 right-6 bg-goldPrimary text-bgPrimary text-xs font-bold px-3 py-1 rounded-full">
                  الخيار الموصى به
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 gold-gradient-text">عرض المؤسسة</h3>
                  <div className="text-3xl font-black text-white mb-1">
                    30,000 <span className="text-lg text-gray-400 font-normal">دج</span>
                  </div>
                  <p className="text-xs text-gray-400 mb-4">للثنائي (المسير + مسؤول التسويق)</p>
                  <p className="text-xs text-goldPrimary/80 mb-6 leading-relaxed">
                    مخصص للمؤسسات التي ترغب في تحويل المعرفة إلى تنفيذ فعلي.
                  </p>
                  <ul className="space-y-3 text-sm mb-6">
                    <li className="flex items-center gap-2">
                      <i className="fas fa-check text-goldPrimary" /> حضور شخصين للدورة
                    </li>
                    <li className="flex items-center gap-2">
                      <i className="fas fa-check text-goldPrimary" /> جميع الأنشطة التطبيقية
                    </li>
                    <li className="flex items-center gap-2">
                      <i className="fas fa-check text-goldPrimary" /> الملفات والأدوات المستخدمة
                    </li>
                  </ul>
                </div>
                <button
                  type="button"
                  onClick={() => selectPlanAndScroll("عرض المؤسسة")}
                  className="w-full gold-button py-3 rounded-md font-bold text-sm mt-auto"
                >
                  اختيار هذه الباقة
                </button>
              </div>
            </div>

            <div
              id="form-section"
              className="lg:col-span-8 glass-card p-8 md:p-10 rounded-2xl border border-goldPrimary/20"
            >
              <h3 className="text-2xl font-bold mb-8 border-b border-gray-800 pb-4">
                استمارة طلب الانضمام
              </h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-300 mb-2">
                      اسم الشركة *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.companyName}
                      onChange={(e) => updateField("companyName", e.target.value)}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-300 mb-2">
                      الاسم واللقب *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.fullName}
                      onChange={(e) => updateField("fullName", e.target.value)}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-300 mb-2">الايميل *</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-300 mb-2">
                      رقم الواتس آب *
                    </label>
                    <input
                      type="tel"
                      required
                      dir="ltr"
                      placeholder="+213..."
                      value={form.phone}
                      onChange={(e) => updateField("phone", e.target.value)}
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 pt-4 border-t border-gray-800">
                  <div>
                    <label className="block text-sm font-bold text-gray-300 mb-2">
                      ما هو الشكل القانوني لشركتك؟ *
                    </label>
                    <select
                      required
                      value={form.legalForm}
                      onChange={(e) => updateField("legalForm", e.target.value)}
                      className={`${inputClass} appearance-none`}
                    >
                      <option value="" disabled>
                        اختر...
                      </option>
                      {legalFormOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                    {form.legalForm === "أخرى.." && (
                      <input
                        type="text"
                        required
                        placeholder="حدد الشكل القانوني..."
                        value={form.otherLegalForm}
                        onChange={(e) => updateField("otherLegalForm", e.target.value)}
                        className={`${inputClass} mt-3`}
                      />
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-300 mb-2">
                      منذ متى تأسست شركتك؟ *
                    </label>
                    <select
                      required
                      value={form.companyEstablished}
                      onChange={(e) => updateField("companyEstablished", e.target.value)}
                      className={`${inputClass} appearance-none`}
                    >
                      <option value="" disabled>
                        اختر...
                      </option>
                      {companyEstablishedOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-300 mb-2">
                      عدد الموظفين *
                    </label>
                    <select
                      required
                      value={form.employeeCount}
                      onChange={(e) => updateField("employeeCount", e.target.value)}
                      className={`${inputClass} appearance-none`}
                    >
                      <option value="" disabled>
                        اختر...
                      </option>
                      {employeeOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-300 mb-2">
                      ما هو مجال نشاط شركتك؟ *
                    </label>
                    <select
                      required
                      value={form.businessSector}
                      onChange={(e) => updateField("businessSector", e.target.value)}
                      className={`${inputClass} appearance-none`}
                    >
                      <option value="" disabled>
                        اختر...
                      </option>
                      {businessSectorOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                    {form.businessSector === "أخرى (يرجى التحديد)" && (
                      <input
                        type="text"
                        required
                        placeholder="حدد مجال النشاط..."
                        value={form.otherBusinessSector}
                        onChange={(e) => updateField("otherBusinessSector", e.target.value)}
                        className={`${inputClass} mt-3`}
                      />
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-300 mb-2">المنصب الوظيفي *</label>
                    <select
                      required
                      value={form.jobTitle}
                      onChange={(e) => updateField("jobTitle", e.target.value)}
                      className={`${inputClass} appearance-none`}
                    >
                      <option value="" disabled>
                        اختر...
                      </option>
                      {jobTitles.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-300 mb-2">الولاية</label>
                    <select
                      value={form.state}
                      onChange={(e) => updateField("state", e.target.value)}
                      className={`${inputClass} appearance-none`}
                    >
                      <option value="">اختر الولاية (اختياري)</option>
                      {wilayaOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 pt-4 border-t border-gray-800">
                  <div>
                    <label className="block text-sm font-bold text-gray-300 mb-3">
                      هل أنت عضو في Webscale؟ *
                    </label>
                    <div className="flex gap-6">
                      {["نعم", "لا"].map((opt) => (
                        <label key={opt} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="isWebscaleMember"
                            value={opt}
                            required
                            checked={form.isWebscaleMember === opt}
                            onChange={() => updateField("isWebscaleMember", opt)}
                            className="text-goldPrimary focus:ring-goldPrimary bg-bgPrimary border-gray-700 w-4 h-4"
                          />
                          <span className="font-bold">{opt}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-300 mb-3">
                      هل سبق لك حضور دورة تدريبية في Webscale؟ *
                    </label>
                    <div className="flex gap-6">
                      {["لا", "نعم"].map((opt) => (
                        <label key={opt} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="hasAttendedWebscaleTraining"
                            value={opt}
                            required
                            checked={form.hasAttendedWebscaleTraining === opt}
                            onChange={() => updateField("hasAttendedWebscaleTraining", opt)}
                            className="text-goldPrimary focus:ring-goldPrimary bg-bgPrimary border-gray-700 w-4 h-4"
                          />
                          <span className="font-bold">{opt}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-gray-800">
                  <div>
                    <label className="block text-sm font-bold text-gray-300 mb-2">
                      لماذا ترى أن حضور Marketing Day مهم بالنسبة لك؟
                    </label>
                    <textarea
                      rows={2}
                      value={form.whyImportant}
                      onChange={(e) => updateField("whyImportant", e.target.value)}
                      className="w-full bg-bgPrimary border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-goldPrimary transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-300 mb-2">
                      عبر أي منصة أو شخص اكتشفت Marketing Day؟
                    </label>
                    <input
                      type="text"
                      value={form.discoverySource}
                      onChange={(e) => updateField("discoverySource", e.target.value)}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-300 mb-3">
                      ما هو التوقيت المناسب لك للاتصال بك؟ *
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {callTimeOptions.map((opt) => (
                        <label
                          key={opt}
                          className={`flex items-center gap-3 cursor-pointer rounded-lg border px-4 py-3 transition ${
                            form.callTime === opt
                              ? "border-goldPrimary bg-goldPrimary/10"
                              : "border-gray-700 hover:border-goldPrimary/40"
                          }`}
                        >
                          <input
                            type="radio"
                            name="callTime"
                            value={opt}
                            required
                            checked={form.callTime === opt}
                            onChange={() => updateField("callTime", opt)}
                            className="text-goldPrimary focus:ring-goldPrimary bg-bgPrimary border-gray-700 w-4 h-4"
                          />
                          <span className="font-bold" dir="ltr">
                            {opt}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-8">
                  <button
                    type="submit"
                    disabled={submitting || submitSuccess}
                    className="w-full gold-button py-4 rounded-lg font-black text-xl flex justify-center items-center gap-2 disabled:opacity-80"
                  >
                    {submitting ? (
                      <>
                        <i className="fas fa-spinner fa-spin" /> جاري الإرسال...
                      </>
                    ) : submitSuccess ? (
                      <>
                        تم التسجيل <i className="fas fa-check" />
                      </>
                    ) : formMsg.type === "error" ? (
                      <>
                        إعادة المحاولة <i className="fas fa-redo" />
                      </>
                    ) : (
                      <>
                        <span>تأكيد طلب التسجيل</span>
                        <i className="fas fa-paper-plane" />
                      </>
                    )}
                  </button>
                  {formMsg.text && (
                    <p
                      className={`text-center mt-4 text-sm font-bold ${
                        formMsg.type === "success" ? "text-green-400" : "text-red-400"
                      }`}
                    >
                      {formMsg.text}
                    </p>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-20 bg-bgTertiary border-t border-gray-800">
        <div className="container mx-auto px-6 max-w-5xl text-center">
          <h2 className="text-3xl font-extrabold mb-8">مكان انعقاد الدورة</h2>
          <div className="glass-card p-8 rounded-2xl inline-block border border-goldPrimary/30 shadow-gold-glow">
            <i className="fas fa-map-marker-alt text-4xl text-goldPrimary mb-4" />
            <h3 className="text-2xl font-bold mb-2">مقر شركة WebScale</h3>
            <p className="text-textSecondary text-lg">المحمدية – الجزائر العاصمة</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-bgPrimary py-12 border-t border-goldPrimary/20">
        <div className="container mx-auto px-6 text-center">
          <img
            src={LOGO_URL}
            alt="WebScale Logo"
            className="h-12 object-contain mx-auto mb-6 opacity-80"
          />
          <h2 className="text-2xl md:text-3xl font-bold mb-4">قل وداعا للقرارات العشوائية ...</h2>
          <h2 className="text-2xl md:text-3xl font-bold gold-gradient-text mb-8">
            وقل مرحبا للقرارات التسويقية الأفضل والأكثر حكمة.
          </h2>
          <p className="text-sm text-gray-500">
            © 2026 Marketing DAY - Executive Edition by WebScale. جميع الحقوق محفوظة.
          </p>
        </div>
      </footer>

      {/* Floating WhatsApp */}
      <a
        href="https://wa.me/213799923248?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%D8%8C%20%D8%A3%D9%86%D8%A7%20%D9%85%D9%87%D8%AA%D9%85%20%D8%A8%D8%AD%D8%B6%D9%88%D8%B1%20%D8%A8%D8%B1%D9%86%D8%A7%D9%85%D8%AC%20Marketing%20Day%20-%20Executive%20Edition%20%D9%88%D8%A3%D8%B1%D9%8A%D8%AF%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86..."
        target="_blank"
        rel="noopener noreferrer"
        onClick={trackChat}
        className="fixed bottom-6 left-6 bg-[#25D366] text-white w-14 h-14 rounded-full flex items-center justify-center text-3xl shadow-lg hover:scale-110 transition-transform z-50"
      >
        <i className="fab fa-whatsapp" />
      </a>
    </div>
  );
};

export default MarketingDayPage;
