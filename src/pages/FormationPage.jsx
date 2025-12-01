import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Moon, Sun, Menu, X } from "lucide-react";
import logo from "../assets/logo.png";
import FormationRegistrationForm from "../components/formation";

const FormationPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [expandedSections, setExpandedSections] = useState({});
  const [isWebscaleMember, setIsWebscaleMember] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem("theme");
    if (savedMode === "dark") {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.documentElement.classList.toggle("dark", newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
  };

  const toggleSection = (sectionId) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setMobileMenuOpen(false);
    }
  };

  const programSections = [
    {
      id: "opening",
      title: "كلمة الافتتاح — Mot d'ouverture",
      items: [],
    },
    {
      id: "introduction",
      title: "مقدمة حول الموضوع — Introduction à la thématique",
      items: [
        "فهم المؤسسة — Comprendre l'Entreprise",
        "ملف المدير / صاحب المؤسسة — Profil du Chef d'entreprise",
        "ما هو نظام إدارة الجودة (SMQ)؟ — Qu'est-ce qu'un Système de Management de la Qualité (SMQ) ?",
        "التعريف، الأهداف، وأمثلة — Définition, Objectifs et exemples",
        "المكوّنات الأساسية — Composantes Clés",
        "المبادئ السبعة في نظام إدارة الجودة — Les 7 principes dans le système Management qualité",
        "المزايا السبعة لنظام إدارة الجودة — Les 7 Avantages du système Management qualité",
        "التحديات الشائعة وكيفية التغلب عليها — Les Défis Courants et Comment les Surmonter",
        "من هم الفاعلون داخل SMQ؟ — Qui sont les acteurs du SMQ ?",
        "أدوات مراقبة نظام إدارة الجودة — Outils pour surveiller un SMQ ?",
      ],
    },
    {
      id: "processes",
      title: "التفكير والعمل بمنطق العمليات — Raisonnez et travaillez en processus",
      items: [
        "ما هي العملية (Processus)؟ — Qu'est ce qu'un processus",
        "ما الفرق بين: عملية، إجراء، وبروسيس؟ — Quelle différence entre processus ; procédure ; process ?",
        "ما هي نمذجة العمليات؟ — Qu'est-ce que la modélisation des processus ?",
        "المؤسسة مرسومة في شكل عمليات — L'entreprise Cartographié en processus",
        "مخطط التدفقات — diagramme des flux",
      ],
    },
    {
      id: "process-types",
      title: "أنواع العمليات في جميع المؤسسات…؟ — Les types de processus dans toutes entreprises…?",
      items: [],
    },
    {
      id: "mapping",
      title: "خريطة المؤسسة من خلال العمليات… — Cartographie de l'Entreprise en processus …",
      items: [],
    },
    {
      id: "exercises",
      title: "تطبيقات وتمارين — Exercices et pratiques",
      items: [],
    },
    {
      id: "discussion",
      title: "نقاش وتبادل الآراء في مجال تسيير المؤسسات — Discussion et échange d'opinions dans le domaine de la gestion d'entreprise",
      items: [],
    },
    {
      id: "closing",
      title: "كلمة الختام — Mot de Clôture",
      items: [],
    },
  ];

  const faqItems = [
    {
      question: "كيف يمكنني التسجيل في الدورة؟",
      answer:
        "يمكنك التسجيل بسهولة من خلال النقر على زر \"سجل الآن\" وملء النموذج. الأماكن محدودة (14 مشارك فقط)، لذا ننصح بالتسجيل المبكر.",
    },
    {
      question: "ما هو الفرق بين السعر العام وسعر أعضاء Webscale؟",
      answer:
        "السعر العام للدورة هو 45.000 دج HT، بينما يحصل أعضاء مجتمع Webscale على خصم خاص بقيمة 39.000 دج HT.",
    },
    {
      question: "ما الذي أحتاجه لحضور الدورة؟",
      answer:
        "الدورة حضورية في مقر Webscale بالجزائر. تحتاج فقط إلى الحضور في الوقت المحدد (من 09:00 إلى 16:00) لمدة 3 أيام متتالية. سيتم توفير جميع المواد التعليمية اللازمة.",
    },
    {
      question: "ما هي طرق الدفع المتاحة؟",
      answer:
        "نقبل الدفع عبر البطاقات الائتمانية، التحويل البنكي، والدفع الإلكتروني. يمكنك التواصل معنا لمعرفة التفاصيل.",
    },
    {
      question: "هل الدورة مناسبة للمبتدئين؟",
      answer:
        "نعم، الدورة موجهة للمديرين والمسيرين في مختلف المستويات. يبدأ البرنامج من الأساسيات ويتدرج إلى التطبيق العملي، مما يجعلها مناسبة للجميع.",
    },
  ];

  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-50/30 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900" dir="rtl">
      <Helmet>
        <title>قلّل الأخطاء، نظم مؤسستك - تكوين تطبيقي مع سليم بن عراب</title>
        <meta name="description" content="تكوين تطبيقي 100% للمسيرين الذين يريدون نتائج. مع مستشار قضى أكثر من 25 سنة يصنع النتائج داخل Henkel، Nestlé، Danone، NCA، Renault Trucks…" />
      </Helmet>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-xl shadow-md border-b border-neutral-200/60 dark:border-neutral-700/60 transition-all duration-500 supports-[backdrop-filter]:bg-white/80 supports-[backdrop-filter]:dark:bg-neutral-900/80">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between py-3 md:py-4">
            {/* Left: Logo */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center gap-2 group relative">
                <div className="relative">
                  <img src={logo} alt="Webscale Logo" className="h-9 md:h-10 w-auto transition-all duration-300 group-hover:scale-110 group-hover:rotate-3" />
                  <div className="absolute inset-0 bg-[#FABC05]/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <span className="text-lg md:text-xl font-bold text-neutral-800 dark:text-neutral-100 transition-all duration-300 group-hover:text-[#FABC05] group-hover:scale-105">Webscale</span>
              </Link>
            </div>

            {/* Center: Navigation */}
            <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center">
              {[
                { id: "home", label: "الرئيسية" },
                { id: "problem", label: "المشكلة" },
                { id: "consultant", label: "المستشار" },
                { id: "benefits", label: "الفوائد" },
                { id: "program", label: "البرنامج" },
                { id: "pricing", label: "الأسعار" },
                { id: "faq", label: "الأسئلة الشائعة" },
                { id: "contact", label: "تواصل معنا" },
              ].map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => { e.preventDefault(); scrollToSection(item.id); }}
                  className="relative px-4 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 transition-all duration-300 hover:text-[#FABC05] group"
                >
                  <span className="relative z-10">{item.label}</span>
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#FABC05] to-[#FFD700] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center rounded-full"></span>
                  <span className="absolute inset-0 bg-[#FABC05]/5 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 -z-0"></span>
                </a>
              ))}
            </nav>

            {/* Right: All Action Buttons */}
            <div className="flex items-center gap-2 md:gap-3">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl hover:bg-neutral-100/80 dark:hover:bg-neutral-800/80 transition-all duration-300 hover:scale-110 hover:shadow-md group"
                aria-label="Toggle mobile menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5 text-neutral-700 dark:text-neutral-300 group-hover:text-[#FABC05] transition-colors duration-300" />
                ) : (
                  <Menu className="w-5 h-5 text-neutral-700 dark:text-neutral-300 group-hover:text-[#FABC05] transition-colors duration-300" />
                )}
              </button>
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-xl hover:bg-neutral-100/80 dark:hover:bg-neutral-800/80 transition-all duration-300 hover:scale-110 hover:rotate-12 hover:shadow-md group"
                aria-label="Toggle dark mode"
              >
                {darkMode ? (
                  <Sun className="w-5 h-5 text-neutral-700 dark:text-neutral-300 group-hover:text-[#FABC05] transition-colors duration-300" />
                ) : (
                  <Moon className="w-5 h-5 text-neutral-700 dark:text-neutral-300 group-hover:text-[#FABC05] transition-colors duration-300" />
                )}
              </button>
              <button
                onClick={() => setShowRegistrationModal(true)}
                className="flex items-center gap-2 relative px-4 md:px-5 py-2 md:py-2.5 bg-gradient-to-r from-[#FABC05] via-[#FFD700] to-[#FABC05] bg-size-200 bg-pos-0 hover:bg-pos-100 text-black font-semibold text-sm md:text-base rounded-xl overflow-hidden group transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#FABC05]/40"
                style={{ backgroundSize: '200% 100%' }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <span className="hidden md:inline">احجز مقعدك الآن</span>
                  <span className="md:hidden">احجز</span>
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-[#FFD700] via-[#FABC05] to-[#FFD700] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden border-t border-neutral-200/60 dark:border-neutral-700/60 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-xl">
              <nav className="flex flex-col gap-1 py-3 animate-in slide-in-from-top duration-300">
                {[
                  { id: "home", label: "الرئيسية" },
                  { id: "problem", label: "المشكلة" },
                  { id: "consultant", label: "المستشار" },
                  { id: "benefits", label: "الفوائد" },
                  { id: "program", label: "البرنامج" },
                  { id: "pricing", label: "الأسعار" },
                  { id: "faq", label: "الأسئلة الشائعة" },
                  { id: "contact", label: "تواصل معنا" },
                ].map((item, index) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => { e.preventDefault(); scrollToSection(item.id); setMobileMenuOpen(false); }}
                    className="px-4 py-3 rounded-lg hover:bg-[#FABC05]/10 dark:hover:bg-[#FABC05]/20 hover:text-[#FABC05] transition-all duration-300 font-medium text-neutral-700 dark:text-neutral-300 hover:translate-x-[-4px] hover:shadow-sm"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {item.label}
                  </a>
                ))}
                <button
                  onClick={() => {
                    setShowRegistrationModal(true);
                    setMobileMenuOpen(false);
                  }}
                  className="mx-4 mt-2 px-6 py-3 bg-gradient-to-r from-[#FABC05] to-[#FFD700] text-black font-semibold rounded-xl hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-[#FABC05]/40"
                >
                  احجز مقعدك الآن
                </button>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="py-6 md:py-8 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-8 mb-6">
              <div className="flex-shrink-0">
                <div className="relative group">
                  <img
                    src="/formation/2aa8566f-cd36-4ab2-8a88-817cc5683ee4.jpeg"
                    alt="سليم بن عراب"
                    className="w-full max-w-[250px] md:max-w-[300px] rounded-xl shadow-lg transition-transform duration-300 group-hover:scale-105 group-hover:shadow-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#FABC05]/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
              <div className="flex-1 text-center md:text-right">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-neutral-800 dark:text-neutral-100 leading-tight animate-in fade-in slide-in-from-bottom duration-700">
                  قلّل الأخطاء، نظم مؤسستك، واصنع انضباطًا حقيقيًا
                </h1>
              </div>
            </div>
            <div className="text-center">
              <p className="text-xl md:text-2xl mb-4 text-neutral-700 dark:text-neutral-300 leading-relaxed animate-in fade-in slide-in-from-bottom duration-700 delay-100">
                مع مستشار قضى أكثر من 25 سنة يصنع النتائج داخل Henkel، Nestlé، Danone، NCA، Renault Trucks…
              </p>
              <p className="text-lg mb-4 text-neutral-700 dark:text-neutral-300 animate-in fade-in slide-in-from-bottom duration-700 delay-200">
                تكوين تطبيقي 100% للمسيرين الذين يريدون نتائج… وليس النظريات.
              </p>
              <div className="bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-neutral-200/50 dark:border-neutral-700/50 mb-4 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 group">
                <h2 className="text-2xl font-bold mb-4 text-neutral-800 dark:text-neutral-100 group-hover:text-[#FABC05] transition-colors duration-300">لماذا هذا التكوين مختلف؟</h2>
                <p className="text-lg text-neutral-700 dark:text-neutral-300">
                  لأنه مبني على تجربة مدير حقيقي أدار شركات جزائرية وعالمية، وعالج هذه المشاكل من الداخل— ليس من الكتب فقط.
                </p>
              </div>
              <button
                onClick={() => setShowRegistrationModal(true)}
                className="relative px-8 py-4 bg-gradient-to-r from-[#FABC05] to-[#FFD700] text-black font-bold rounded-xl text-lg overflow-hidden group transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-[#FABC05]/50"
              >
                <span className="relative z-10">احجز مقعدك الآن .. المقاعد جد محدودة</span>
                <span className="absolute inset-0 bg-gradient-to-r from-[#FFD700] to-[#FABC05] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section id="problem" className="py-6 md:py-8 px-4 bg-gradient-to-b from-white/50 to-yellow-50/30 dark:from-neutral-800/50 dark:to-neutral-900/50">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-neutral-800 dark:text-neutral-100">
              المشكلة الحقيقية داخل أغلب المؤسسات
            </h2>
            <p className="text-xl text-center mb-4 text-neutral-700 dark:text-neutral-300">
              ليست في الموظفين… وليست في نقص الجهد… بل المشكلة في غياب نظام عمل واضح:
            </p>
            <div className="grid md:grid-cols-2 gap-6 mb-4">
              <div className="bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-neutral-200/50 dark:border-neutral-700/50 hover:shadow-2xl hover:scale-105 hover:border-[#FABC05]/50 transition-all duration-300 group cursor-pointer">
                <p className="text-neutral-700 dark:text-neutral-300 group-hover:text-[#FABC05] transition-colors duration-300 font-medium">أخطاء متكررة وضياع وقت</p>
              </div>
              <div className="bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-neutral-200/50 dark:border-neutral-700/50 hover:shadow-2xl hover:scale-105 hover:border-[#FABC05]/50 transition-all duration-300 group cursor-pointer">
                <p className="text-neutral-700 dark:text-neutral-300 group-hover:text-[#FABC05] transition-colors duration-300 font-medium">نقص التنسيق بين الفرق</p>
              </div>
              <div className="bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-neutral-200/50 dark:border-neutral-700/50 hover:shadow-2xl hover:scale-105 hover:border-[#FABC05]/50 transition-all duration-300 group cursor-pointer">
                <p className="text-neutral-700 dark:text-neutral-300 group-hover:text-[#FABC05] transition-colors duration-300 font-medium">قرارات يومية بلا بيانات</p>
              </div>
              <div className="bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-neutral-200/50 dark:border-neutral-700/50 hover:shadow-2xl hover:scale-105 hover:border-[#FABC05]/50 transition-all duration-300 group cursor-pointer">
                <p className="text-neutral-700 dark:text-neutral-300 group-hover:text-[#FABC05] transition-colors duration-300 font-medium">ضغط دائم على المدير لمتابعة كل شيء</p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-[#FABC05]/10 via-[#FABC05]/5 to-transparent dark:from-[#FABC05]/20 dark:via-[#FABC05]/10 dark:to-transparent p-8 rounded-2xl mb-4 border border-[#FABC05]/20 dark:border-[#FABC05]/30 hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
              <h3 className="text-2xl font-bold mb-6 text-neutral-800 dark:text-neutral-100">
                هذا التكوين يعطيك الطريقة التي تعتمدها الشركات القوية لتفادي هذه الفوضى:
              </h3>
              <ul className="space-y-4 text-lg text-neutral-700 dark:text-neutral-300">
                <li className="flex items-start gap-3 group/item">
                  <span className="text-[#FABC05] font-bold text-xl group-hover/item:scale-125 transition-transform duration-300">✔</span>
                  <span className="group-hover/item:text-[#FABC05] transition-colors duration-300">تشخيص أصل المشاكل داخل مؤسستك</span>
                </li>
                <li className="flex items-start gap-3 group/item">
                  <span className="text-[#FABC05] font-bold text-xl group-hover/item:scale-125 transition-transform duration-300">✔</span>
                  <span className="group-hover/item:text-[#FABC05] transition-colors duration-300">تقليل الأخطاء التشغيلية وتحسين الانضباط</span>
                </li>
                <li className="flex items-start gap-3 group/item">
                  <span className="text-[#FABC05] font-bold text-xl group-hover/item:scale-125 transition-transform duration-300">✔</span>
                  <span className="group-hover/item:text-[#FABC05] transition-colors duration-300">بناء نظام جودة عملي وبسيط</span>
                </li>
                <li className="flex items-start gap-3 group/item">
                  <span className="text-[#FABC05] font-bold text-xl group-hover/item:scale-125 transition-transform duration-300">✔</span>
                  <span className="group-hover/item:text-[#FABC05] transition-colors duration-300">تنظيم العمل داخل الفرق</span>
                </li>
                <li className="flex items-start gap-3 group/item">
                  <span className="text-[#FABC05] font-bold text-xl group-hover/item:scale-125 transition-transform duration-300">✔</span>
                  <span className="group-hover/item:text-[#FABC05] transition-colors duration-300">استخدام أدوات فعلية للشركات الكبرى</span>
                </li>
                <li className="flex items-start gap-3 group/item">
                  <span className="text-[#FABC05] font-bold text-xl group-hover/item:scale-125 transition-transform duration-300">✔</span>
                  <span className="group-hover/item:text-[#FABC05] transition-colors duration-300">اتخاذ قرارات دقيقة اعتمادًا على البيانات</span>
                </li>
              </ul>
            </div>
            <div className="text-center">
              <button
                onClick={() => setShowRegistrationModal(true)}
                className="relative px-8 py-4 bg-gradient-to-r from-[#FABC05] to-[#FFD700] text-black font-bold rounded-xl text-lg overflow-hidden group transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-[#FABC05]/50"
              >
                <span className="relative z-10">احجز مقعدك الآن .. المقاعد جد محدودة</span>
                <span className="absolute inset-0 bg-gradient-to-r from-[#FFD700] to-[#FABC05] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Consultant Section */}
      <section id="consultant" className="py-6 md:py-8 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-neutral-800 dark:text-neutral-100">مؤطّر التكوين: سليم بن عراب</h2>
          <div className="max-w-5xl mx-auto bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm p-8 md:p-10 rounded-2xl shadow-xl border-2 border-neutral-200/50 dark:border-neutral-700/50 hover:shadow-2xl hover:border-[#FABC05]/30 transition-all duration-300">
            <div className="grid md:grid-cols-[300px_1fr] gap-8 mb-8">
              <div className="text-center">
                <div className="relative group mb-4">
                  <img
                    src="/formation/Generated Image October 11, 2025 - 2_00PM (2).png"
                    alt="سليم بن عراب"
                    className="w-full max-w-[300px] rounded-xl shadow-lg mx-auto transition-transform duration-300 group-hover:scale-105 group-hover:shadow-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#FABC05]/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="bg-gradient-to-br from-[#FABC05]/10 to-[#FABC05]/5 dark:from-[#FABC05]/20 dark:to-[#FABC05]/10 p-4 rounded-xl border border-[#FABC05]/20 dark:border-[#FABC05]/30 hover:shadow-lg transition-all duration-300">
                  <h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-100 mb-2">سليم بن عراب</h3>
                  <p className="text-sm text-neutral-700 dark:text-neutral-300 mb-3">مستشار في إدارة الجودة والعمليات</p>
                  <div className="flex items-center justify-center gap-2 text-[#FABC05]">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                    </svg>
                    <span className="text-sm font-semibold">25+ سنة خبرة</span>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-xl font-bold mb-4 text-neutral-800 dark:text-neutral-200">
                  25 سنة خبرة داخل شركات:
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div 
                      key={i} 
                      className="bg-white/80 dark:bg-neutral-700/80 backdrop-blur-sm p-4 rounded-lg shadow-md border border-neutral-200/50 dark:border-neutral-600/50 hover:shadow-xl hover:scale-110 hover:border-[#FABC05]/50 transition-all duration-300 flex items-center justify-center min-h-[100px] cursor-pointer group"
                    >
                      <img
                        src={`/formation/logos/photo_2025-11-30_15-${String(i === 1 ? "00-42" : i === 2 ? "01-00" : i === 3 ? "01-49" : i === 4 ? "01-55" : i === 5 ? "02-24" : "23-31")}.jpg`}
                        alt={`Company Logo ${i}`}
                        className="w-full h-auto object-contain max-h-16 rounded transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                  ))}
                </div>
                <p className="text-xl font-bold mb-4 text-neutral-800 dark:text-neutral-200">
                  نتائج موثقة:
                </p>
                <ul className="space-y-3 text-neutral-700 dark:text-neutral-300 mb-6">
                  <li className="flex items-start gap-3 group/item">
                    <span className="text-[#FABC05] font-bold text-lg group-hover/item:scale-125 transition-transform duration-300">•</span>
                    <span className="group-hover/item:text-[#FABC05] transition-colors duration-300">خفض الديون بـ 43%</span>
                  </li>
                  <li className="flex items-start gap-3 group/item">
                    <span className="text-[#FABC05] font-bold text-lg group-hover/item:scale-125 transition-transform duration-300">•</span>
                    <span className="group-hover/item:text-[#FABC05] transition-colors duration-300">رفع هامش الربح بـ +42%</span>
                  </li>
                  <li className="flex items-start gap-3 group/item">
                    <span className="text-[#FABC05] font-bold text-lg group-hover/item:scale-125 transition-transform duration-300">•</span>
                    <span className="group-hover/item:text-[#FABC05] transition-colors duration-300">قيادة فرق تصل إلى 580 موظف</span>
                  </li>
                  <li className="flex items-start gap-3 group/item">
                    <span className="text-[#FABC05] font-bold text-lg group-hover/item:scale-125 transition-transform duration-300">•</span>
                    <span className="group-hover/item:text-[#FABC05] transition-colors duration-300">إدارة مداخيل تفوق 78 مليون يورو</span>
                  </li>
                  <li className="flex items-start gap-3 group/item">
                    <span className="text-[#FABC05] font-bold text-lg group-hover/item:scale-125 transition-transform duration-300">•</span>
                    <span className="group-hover/item:text-[#FABC05] transition-colors duration-300">إعادة تشغيل وحدات إنتاج</span>
                  </li>
                  <li className="flex items-start gap-3 group/item">
                    <span className="text-[#FABC05] font-bold text-lg group-hover/item:scale-125 transition-transform duration-300">•</span>
                    <span className="group-hover/item:text-[#FABC05] transition-colors duration-300">تحسين مؤشرات التوزيع والعمليات على مستوى 23 ولاية</span>
                  </li>
                  <li className="flex items-start gap-3 group/item">
                    <span className="text-[#FABC05] font-bold text-lg group-hover/item:scale-125 transition-transform duration-300">•</span>
                    <span className="group-hover/item:text-[#FABC05] transition-colors duration-300">خبرة ISO (9001 / 18000 / 22000)</span>
                  </li>
                </ul>
                <p className="text-[#FABC05] font-semibold text-lg mt-6 leading-relaxed bg-[#FABC05]/10 dark:bg-[#FABC05]/20 p-4 rounded-lg border border-[#FABC05]/20">
                  كل ما ستتعلّمه في هذا التكوين خرج من تجارب ميدانية حقيقية.
                </p>
              </div>
            </div>
          </div>
          <div className="text-center mt-6">
            <button
              onClick={() => setShowRegistrationModal(true)}
              className="relative px-8 py-4 bg-gradient-to-r from-[#FABC05] to-[#FFD700] text-black font-bold rounded-xl text-lg overflow-hidden group transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-[#FABC05]/50"
            >
              <span className="relative z-10">احجز مقعدك الآن .. المقاعد جد محدودة</span>
              <span className="absolute inset-0 bg-gradient-to-r from-[#FFD700] to-[#FABC05] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-6 md:py-8 px-4 bg-gradient-to-b from-white/50 to-yellow-50/30 dark:from-neutral-800/50 dark:to-neutral-900/50">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-neutral-800 dark:text-neutral-100">
            ماذا ستستفيد مباشرة بعد التكوين؟
          </h2>
          <div className="max-w-4xl mx-auto">
            <ul className="space-y-4 text-lg text-neutral-700 dark:text-neutral-300">
              <li className="flex items-start gap-3 bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm p-5 rounded-xl shadow-md border border-neutral-200/50 dark:border-neutral-700/50 hover:shadow-xl hover:scale-105 hover:border-[#FABC05]/50 transition-all duration-300 group cursor-pointer">
                <span className="text-[#FABC05] font-bold text-xl group-hover:scale-125 transition-transform duration-300">✔</span>
                <span className="group-hover:text-[#FABC05] transition-colors duration-300">طريقة واضحة لقراءة مؤسستك وتشخيص أصل المشاكل</span>
              </li>
              <li className="flex items-start gap-3 bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm p-5 rounded-xl shadow-md border border-neutral-200/50 dark:border-neutral-700/50 hover:shadow-xl hover:scale-105 hover:border-[#FABC05]/50 transition-all duration-300 group cursor-pointer">
                <span className="text-[#FABC05] font-bold text-xl group-hover:scale-125 transition-transform duration-300">✔</span>
                <span className="group-hover:text-[#FABC05] transition-colors duration-300">تقليل الأخطاء التشغيلية وتحسين الانضباط</span>
              </li>
              <li className="flex items-start gap-3 bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm p-5 rounded-xl shadow-md border border-neutral-200/50 dark:border-neutral-700/50 hover:shadow-xl hover:scale-105 hover:border-[#FABC05]/50 transition-all duration-300 group cursor-pointer">
                <span className="text-[#FABC05] font-bold text-xl group-hover:scale-125 transition-transform duration-300">✔</span>
                <span className="group-hover:text-[#FABC05] transition-colors duration-300">بناء نظام جودة بسيط وعملي</span>
              </li>
              <li className="flex items-start gap-3 bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm p-5 rounded-xl shadow-md border border-neutral-200/50 dark:border-neutral-700/50 hover:shadow-xl hover:scale-105 hover:border-[#FABC05]/50 transition-all duration-300 group cursor-pointer">
                <span className="text-[#FABC05] font-bold text-xl group-hover:scale-125 transition-transform duration-300">✔</span>
                <span className="group-hover:text-[#FABC05] transition-colors duration-300">ضبط العمليات لتنظيم العمل داخل الفرق</span>
              </li>
              <li className="flex items-start gap-3 bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm p-5 rounded-xl shadow-md border border-neutral-200/50 dark:border-neutral-700/50 hover:shadow-xl hover:scale-105 hover:border-[#FABC05]/50 transition-all duration-300 group cursor-pointer">
                <span className="text-[#FABC05] font-bold text-xl group-hover:scale-125 transition-transform duration-300">✔</span>
                <span className="group-hover:text-[#FABC05] transition-colors duration-300">اعتماد أدوات تُستخدم فعليًا في المؤسسات الكبرى</span>
              </li>
              <li className="flex items-start gap-3 bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm p-5 rounded-xl shadow-md border border-neutral-200/50 dark:border-neutral-700/50 hover:shadow-xl hover:scale-105 hover:border-[#FABC05]/50 transition-all duration-300 group cursor-pointer">
                <span className="text-[#FABC05] font-bold text-xl group-hover:scale-125 transition-transform duration-300">✔</span>
                <span className="group-hover:text-[#FABC05] transition-colors duration-300">القدرة على اتخاذ قرارات دقيقة اعتمادًا على العمليات والبيانات</span>
              </li>
              <li className="flex items-start gap-3 bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm p-5 rounded-xl shadow-md border border-neutral-200/50 dark:border-neutral-700/50 hover:shadow-xl hover:scale-105 hover:border-[#FABC05]/50 transition-all duration-300 group cursor-pointer">
                <span className="text-[#FABC05] font-bold text-xl group-hover:scale-125 transition-transform duration-300">✔</span>
                <span className="group-hover:text-[#FABC05] transition-colors duration-300">إنهاء "إطفاء الحرائق اليومية"</span>
              </li>
            </ul>
          </div>
          <div className="text-center mt-6">
            <button
              onClick={() => setShowRegistrationModal(true)}
              className="relative px-8 py-4 bg-gradient-to-r from-[#FABC05] to-[#FFD700] text-black font-bold rounded-xl text-lg overflow-hidden group transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-[#FABC05]/50"
            >
              <span className="relative z-10">احجز مقعدك الآن .. المقاعد جد محدودة</span>
              <span className="absolute inset-0 bg-gradient-to-r from-[#FFD700] to-[#FABC05] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </button>
          </div>
        </div>
      </section>

      {/* Who is this for Section */}
      <section id="who" className="py-6 md:py-8 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-neutral-800 dark:text-neutral-100">
            لمن هذا التكوين؟
          </h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-xl text-center mb-4 text-neutral-700 dark:text-neutral-300">
              لك إن كنت تريد:
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-neutral-200/50 dark:border-neutral-700/50 hover:shadow-2xl hover:scale-105 hover:border-[#FABC05]/50 transition-all duration-300 group cursor-pointer">
                <p className="text-lg text-neutral-700 dark:text-neutral-300 group-hover:text-[#FABC05] transition-colors duration-300 font-medium">تقليل الأخطاء اليومية</p>
              </div>
              <div className="bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-neutral-200/50 dark:border-neutral-700/50 hover:shadow-2xl hover:scale-105 hover:border-[#FABC05]/50 transition-all duration-300 group cursor-pointer">
                <p className="text-lg text-neutral-700 dark:text-neutral-300 group-hover:text-[#FABC05] transition-colors duration-300 font-medium">تنظيم العمل داخل شركتك</p>
              </div>
              <div className="bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-neutral-200/50 dark:border-neutral-700/50 hover:shadow-2xl hover:scale-105 hover:border-[#FABC05]/50 transition-all duration-300 group cursor-pointer">
                <p className="text-lg text-neutral-700 dark:text-neutral-300 group-hover:text-[#FABC05] transition-colors duration-300 font-medium">فهم العمليات بدل الاعتماد على الحدس</p>
              </div>
              <div className="bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-neutral-200/50 dark:border-neutral-700/50 hover:shadow-2xl hover:scale-105 hover:border-[#FABC05]/50 transition-all duration-300 group cursor-pointer">
                <p className="text-lg text-neutral-700 dark:text-neutral-300 group-hover:text-[#FABC05] transition-colors duration-300 font-medium">بناء نظام يشتغل حتى لو تغيّر الموظفون</p>
              </div>
              <div className="bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-neutral-200/50 dark:border-neutral-700/50 hover:shadow-2xl hover:scale-105 hover:border-[#FABC05]/50 transition-all duration-300 group cursor-pointer md:col-span-2">
                <p className="text-lg text-neutral-700 dark:text-neutral-300 text-center group-hover:text-[#FABC05] transition-colors duration-300 font-medium">تحسين الأداء بدون رفع التكاليف</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Program Section */}
      <section id="program" className="py-6 md:py-8 px-4 bg-gradient-to-b from-white/50 to-yellow-50/30 dark:from-neutral-800/50 dark:to-neutral-900/50">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-neutral-800 dark:text-neutral-100">
            برنامج التكوين
          </h2>
          <div className="max-w-4xl mx-auto space-y-4">
            {programSections.map((section) => (
              <div key={section.id} className="bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm rounded-xl shadow-md border border-neutral-200/50 dark:border-neutral-700/50 overflow-hidden hover:shadow-xl hover:border-[#FABC05]/30 transition-all duration-300">
                {section.items.length > 0 ? (
                  <>
                    <button
                      onClick={() => toggleSection(section.id)}
                      className="w-full px-6 py-4 flex items-center justify-between text-right hover:bg-[#FABC05]/10 dark:hover:bg-[#FABC05]/20 transition-all duration-300 group"
                    >
                      <span className="font-semibold text-lg text-neutral-800 dark:text-neutral-100 group-hover:text-[#FABC05] transition-colors duration-300">{section.title}</span>
                      <span className="text-2xl text-neutral-600 dark:text-neutral-400 group-hover:text-[#FABC05] group-hover:scale-125 transition-all duration-300">
                        {expandedSections[section.id] ? "−" : "+"}
                      </span>
                    </button>
                    {expandedSections[section.id] && (
                      <div className="px-6 py-4 border-t border-neutral-200/50 dark:border-neutral-700/50 bg-gradient-to-b from-transparent to-[#FABC05]/5 dark:to-[#FABC05]/10 animate-in slide-in-from-top duration-300">
                        <ul className="space-y-3">
                          {section.items.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-neutral-700 dark:text-neutral-300 group/item hover:text-[#FABC05] transition-colors duration-300">
                              <span className="text-[#FABC05] font-bold group-hover/item:scale-125 transition-transform duration-300">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="px-6 py-4 hover:bg-[#FABC05]/10 dark:hover:bg-[#FABC05]/20 transition-colors duration-300">
                    <span className="font-semibold text-lg text-neutral-800 dark:text-neutral-100">{section.title}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Summary Section */}
      <section id="summary" className="py-6 md:py-8 px-4 bg-gradient-to-b from-white/50 to-yellow-50/30 dark:from-neutral-800/50 dark:to-neutral-900/50">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-neutral-800 dark:text-neutral-100">
              الخلاصة
            </h2>
            <p className="text-xl md:text-2xl mb-4 text-neutral-700 dark:text-neutral-300 leading-relaxed">
              إذا كنت تريد طريقة واضحة وواقعية لضبط مؤسستك—
              <br />
              فهذه الدورة تقدم لك منهجية ميدانية استُخدمت فعليًا لرفع أداء شركات كبيرة تعمل في الجزائر.
            </p>
            <button
              onClick={() => setShowRegistrationModal(true)}
              className="relative px-8 py-4 bg-gradient-to-r from-[#FABC05] to-[#FFD700] text-black font-bold rounded-xl text-lg overflow-hidden group transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-[#FABC05]/50"
            >
              <span className="relative z-10">احجز مكانك الآن وابدأ في إعادة ترتيب شركتك بطريقة احترافية وواضحة.</span>
              <span className="absolute inset-0 bg-gradient-to-r from-[#FFD700] to-[#FABC05] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </button>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-6 md:py-8 px-4 bg-gradient-to-b from-white/50 to-yellow-50/30 dark:from-neutral-800/50 dark:to-neutral-900/50">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-neutral-800 dark:text-neutral-100">الأثمان وطرق التسجيل</h2>
          <div className="max-w-2xl mx-auto mb-6">
            <div className={`bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border-2 ${isWebscaleMember ? "border-[#FABC05] shadow-[#FABC05]/20" : "border-neutral-200/50 dark:border-neutral-700/50"} transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]`}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100">
                  {isWebscaleMember ? "أعضاء Webscale" : "سعر الدورة"}
                </h3>
                {isWebscaleMember && (
                  <span className="px-3 py-1 bg-gradient-to-r from-[#FABC05] to-[#FFD700] text-black text-sm font-semibold rounded-full animate-pulse">عرض خاص</span>
                )}
              </div>
              <div className="text-center mb-6">
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-5xl font-bold text-neutral-800 dark:text-neutral-100">
                    {isWebscaleMember ? "39.000" : "45.000"}
                  </span>
                  <span className="text-2xl text-neutral-600 dark:text-neutral-400">د.ج</span>
                  <span className="text-lg text-neutral-500 dark:text-neutral-500">HT</span>
                </div>
              </div>
              <div className="mb-6">
                <label className="flex items-center gap-3 cursor-pointer group/checkbox p-3 rounded-lg hover:bg-[#FABC05]/10 dark:hover:bg-[#FABC05]/20 transition-colors duration-300">
                  <input
                    type="checkbox"
                    checked={isWebscaleMember}
                    onChange={(e) => setIsWebscaleMember(e.target.checked)}
                    className="w-5 h-5 rounded border-neutral-300 text-[#FABC05] focus:ring-[#FABC05] cursor-pointer transition-all duration-300 group-hover/checkbox:scale-110"
                  />
                  <span className="text-neutral-700 dark:text-neutral-300 group-hover/checkbox:text-[#FABC05] transition-colors duration-300">أنا عضو في Webscale</span>
                </label>
              </div>
              <ul className="space-y-3 mb-6 text-neutral-700 dark:text-neutral-300">
                {isWebscaleMember ? (
                  <>
                    <li className="flex items-center gap-2 group/item hover:text-[#FABC05] transition-colors duration-300">✓ <span>نفس المميزات</span></li>
                    <li className="flex items-center gap-2 group/item hover:text-[#FABC05] transition-colors duration-300">✓ <span>خصم 6.000 د.ج</span></li>
                    <li className="flex items-center gap-2 group/item hover:text-[#FABC05] transition-colors duration-300">✓ <span>دورة حضورية مكثفة 3 أيام</span></li>
                    <li className="flex items-center gap-2 group/item hover:text-[#FABC05] transition-colors duration-300">✓ <span>محتوى عملي وتطبيقي</span></li>
                  </>
                ) : (
                  <>
                    <li className="flex items-center gap-2 group/item hover:text-[#FABC05] transition-colors duration-300">✓ <span>دورة حضورية مكثفة 3 أيام</span></li>
                    <li className="flex items-center gap-2 group/item hover:text-[#FABC05] transition-colors duration-300">✓ <span>محتوى عملي وتطبيقي</span></li>
                    <li className="flex items-center gap-2 group/item hover:text-[#FABC05] transition-colors duration-300">✓ <span>شهادة إتمام</span></li>
                    <li className="flex items-center gap-2 group/item hover:text-[#FABC05] transition-colors duration-300">✓ <span>خطة تطبيق فردية</span></li>
                  </>
                )}
              </ul>
              <button
                onClick={() => setShowRegistrationModal(true)}
                className="relative w-full px-6 py-3 bg-gradient-to-r from-[#FABC05] to-[#FFD700] text-black font-semibold rounded-lg overflow-hidden group transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#FABC05]/50"
              >
                <span className="relative z-10">احجز مقعدك الآن</span>
                <span className="absolute inset-0 bg-gradient-to-r from-[#FFD700] to-[#FABC05] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </button>
            </div>
          </div>

          <div className="max-w-4xl mx-auto">
            <p className="text-center text-lg mb-4 text-neutral-700 dark:text-neutral-300">
              <strong className="text-[#FABC05]">الأماكن محدودة</strong> - 14 مشارك فقط
            </p>
            <FormationRegistrationForm />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-6 md:py-8 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-neutral-800 dark:text-neutral-100">الأسئلة الشائعة</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqItems.map((item, idx) => (
              <div key={idx} className="bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm rounded-xl shadow-md border border-neutral-200/50 dark:border-neutral-700/50 overflow-hidden hover:shadow-xl hover:border-[#FABC05]/30 transition-all duration-300">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full px-6 py-4 flex items-center justify-between text-right hover:bg-[#FABC05]/10 dark:hover:bg-[#FABC05]/20 transition-all duration-300 group"
                >
                  <span className="font-semibold text-neutral-800 dark:text-neutral-100 group-hover:text-[#FABC05] transition-colors duration-300">{item.question}</span>
                  <span className="text-2xl text-neutral-600 dark:text-neutral-400 group-hover:text-[#FABC05] group-hover:scale-125 transition-all duration-300">{openFaq === idx ? "−" : "+"}</span>
                </button>
                {openFaq === idx && (
                  <div className="px-6 py-4 border-t border-neutral-200/50 dark:border-neutral-700/50 bg-gradient-to-b from-transparent to-[#FABC05]/5 dark:to-[#FABC05]/10 animate-in slide-in-from-top duration-300">
                    <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-6 md:py-8 px-4 bg-gradient-to-b from-white/50 to-yellow-50/30 dark:from-neutral-800/50 dark:to-neutral-900/50">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-neutral-800 dark:text-neutral-100">تواصل معنا</h2>
          <div className="max-w-4xl mx-auto bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-neutral-200/50 dark:border-neutral-700/50 hover:shadow-2xl hover:scale-[1.01] transition-all duration-300">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-6 text-neutral-800 dark:text-neutral-100">معلومات التواصل</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4 group hover:bg-[#FABC05]/10 dark:hover:bg-[#FABC05]/20 p-3 rounded-lg transition-all duration-300">
                    <div className="p-3 bg-[#FABC05]/20 rounded-lg group-hover:scale-110 group-hover:bg-[#FABC05]/30 transition-all duration-300">
                      <svg className="w-6 h-6 text-[#FABC05]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400">البريد الإلكتروني</p>
                      <a href="mailto:contact@webscale.dz" className="text-[#FABC05] hover:underline font-medium group-hover:text-[#FFD700] transition-colors duration-300">
                        contact@webscale.dz
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 group hover:bg-[#FABC05]/10 dark:hover:bg-[#FABC05]/20 p-3 rounded-lg transition-all duration-300">
                    <div className="p-3 bg-[#FABC05]/20 rounded-lg group-hover:scale-110 group-hover:bg-[#FABC05]/30 transition-all duration-300">
                      <svg className="w-6 h-6 text-[#FABC05]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="2" y1="12" x2="22" y2="12" />
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400">الموقع الرسمي</p>
                      <a href="https://www.webscale.pro/" target="_blank" rel="noopener noreferrer" className="text-[#FABC05] hover:underline font-medium group-hover:text-[#FFD700] transition-colors duration-300">
                        www.webscale.pro
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-6 text-neutral-800 dark:text-neutral-100">تابعنا على وسائل التواصل</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { 
                      name: "LinkedIn", 
                      href: "https://www.linkedin.com/company/webscalepro/",
                      icon: (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                      )
                    },
                    { 
                      name: "Youtube", 
                      href: "https://youtube.com/@webscale-pro?si=KWRMamO8XO628NlY",
                      icon: (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                        </svg>
                      )
                    },
                    { 
                      name: "Facebook", 
                      href: "https://www.facebook.com/share/15utdJSobi/",
                      icon: (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                      )
                    },
                    { 
                      name: "Instagram", 
                      href: "https://www.instagram.com/webscale.pro?igsh=MXg0OXRjOXk5bGExag==",
                      icon: (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                      )
                    },
                  ].map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-3 p-4 bg-neutral-100/80 dark:bg-neutral-700/80 backdrop-blur-sm rounded-lg border border-neutral-200/50 dark:border-neutral-600/50 hover:bg-[#FABC05]/20 dark:hover:bg-[#FABC05]/20 hover:border-[#FABC05]/50 hover:scale-110 hover:shadow-lg transition-all duration-300 group"
                    >
                      <span className="text-neutral-700 dark:text-neutral-300 group-hover:text-[#FABC05] transition-colors duration-300 group-hover:scale-110">
                        {social.icon}
                      </span>
                      <span className="text-neutral-700 dark:text-neutral-300 font-medium group-hover:text-[#FABC05] transition-colors duration-300">{social.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-gradient-to-b from-neutral-900 to-black dark:from-black dark:to-neutral-900 text-neutral-300 border-t border-neutral-800">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4 group">
            <img src={logo} alt="Webscale Logo" className="h-10 w-auto transition-transform duration-300 group-hover:scale-110" />
            <span className="text-xl font-bold group-hover:text-[#FABC05] transition-colors duration-300">Webscale</span>
          </div>
          <p className="text-neutral-400 hover:text-neutral-300 transition-colors duration-300">&copy; 2024 Webscale. جميع الحقوق محفوظة. | دورة النظام الحقيقي لتسيير الجودة SMQ</p>
        </div>
      </footer>

      {/* Registration Modal */}
      {showRegistrationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white/95 dark:bg-neutral-800/95 backdrop-blur-lg rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-neutral-200/50 dark:border-neutral-700/50 animate-in zoom-in-95 duration-300">
            <div className="sticky top-0 bg-white/95 dark:bg-neutral-800/95 backdrop-blur-lg border-b border-neutral-200/50 dark:border-neutral-700/50 p-4 flex items-center justify-between rounded-t-2xl z-10">
              <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100">احجز مقعدك الآن</h2>
              <button
                onClick={() => setShowRegistrationModal(false)}
                className="p-2 hover:bg-[#FABC05]/20 dark:hover:bg-[#FABC05]/20 rounded-lg transition-all duration-300 hover:scale-110 hover:rotate-90"
              >
                <X className="w-6 h-6 text-neutral-700 dark:text-neutral-300 hover:text-[#FABC05] transition-colors duration-300" />
              </button>
            </div>
            <div className="p-6">
              <FormationRegistrationForm onSuccess={() => setShowRegistrationModal(false)} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormationPage;

