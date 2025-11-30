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
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-white dark:from-neutral-900 dark:to-neutral-800" dir="rtl">
      <Helmet>
        <title>النظام الحقيقي لتسيير الجودة SMQ - دورة تدريبية مكثفة</title>
        <meta name="description" content="دورة حضورية مكثفة تمتد لـ 3 أيام، موجّهة للمديرين، المسيرين، وأصحاب المصانع الذين يريدون بناء نظام جودة عملي، واضح، ومربوط بواقع المؤسسة الجزائرية." />
      </Helmet>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white dark:bg-neutral-900 shadow-md transition-colors">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center gap-2">
                <img src={logo} alt="Webscale Logo" className="h-10 w-auto" />
                <span className="text-xl font-bold text-neutral-800 dark:text-neutral-100">Webscale</span>
              </Link>
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                aria-label="Toggle dark mode"
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                aria-label="Toggle mobile menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

            <nav className={`hidden lg:flex items-center gap-6`}>
              <a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection("home"); }} className="hover:text-[#FABC05] transition-colors">
                الرئيسية
              </a>
              <a href="#program" onClick={(e) => { e.preventDefault(); scrollToSection("program"); }} className="hover:text-[#FABC05] transition-colors">
                البرنامج
              </a>
              <a href="#consultant" onClick={(e) => { e.preventDefault(); scrollToSection("consultant"); }} className="hover:text-[#FABC05] transition-colors">
                المستشار
              </a>
              <a href="#pricing" onClick={(e) => { e.preventDefault(); scrollToSection("pricing"); }} className="hover:text-[#FABC05] transition-colors">
                الأسعار
              </a>
              <a href="#faq" onClick={(e) => { e.preventDefault(); scrollToSection("faq"); }} className="hover:text-[#FABC05] transition-colors">
                الأسئلة الشائعة
              </a>
              <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection("contact"); }} className="hover:text-[#FABC05] transition-colors">
                تواصل معنا
              </a>
            </nav>

            <button
              onClick={() => setShowRegistrationModal(true)}
              className="hidden lg:block px-6 py-2 bg-[#FABC05] text-black font-semibold rounded-lg hover:bg-[#FFD700] transition-colors"
            >
              سجل الآن
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden pb-4 border-t border-neutral-200 dark:border-neutral-700 mt-4 pt-4">
              <nav className="flex flex-col gap-4">
                <a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection("home"); }} className="hover:text-[#FABC05] transition-colors">
                  الرئيسية
                </a>
                <a href="#program" onClick={(e) => { e.preventDefault(); scrollToSection("program"); }} className="hover:text-[#FABC05] transition-colors">
                  البرنامج
                </a>
                <a href="#consultant" onClick={(e) => { e.preventDefault(); scrollToSection("consultant"); }} className="hover:text-[#FABC05] transition-colors">
                  المستشار
                </a>
                <a href="#pricing" onClick={(e) => { e.preventDefault(); scrollToSection("pricing"); }} className="hover:text-[#FABC05] transition-colors">
                  الأسعار
                </a>
                <a href="#faq" onClick={(e) => { e.preventDefault(); scrollToSection("faq"); }} className="hover:text-[#FABC05] transition-colors">
                  الأسئلة الشائعة
                </a>
                <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection("contact"); }} className="hover:text-[#FABC05] transition-colors">
                  تواصل معنا
                </a>
                <button
                  onClick={() => {
                    setShowRegistrationModal(true);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full px-6 py-2 bg-[#FABC05] text-black font-semibold rounded-lg hover:bg-[#FFD700] transition-colors mt-2"
                >
                  سجل الآن
                </button>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="flex justify-center">
              <img src={logo} alt="Webscale Logo" className="w-full max-w-md" />
            </div>
            <div>
              <span className="inline-block px-4 py-2 bg-[#FABC05] text-black font-semibold rounded-full mb-4">
                دورة حضورية مكثفة - 3 أيام
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-neutral-800 dark:text-neutral-100">
                هل مؤسستك تحتاج طريقة جديدة لتسييرها… قبل فوات الأوان؟
              </h1>
              <p className="text-lg mb-4 text-neutral-700 dark:text-neutral-300">
                الرؤية الحديثة لـ <strong>Système de Management de la Qualité (SMQ)</strong> لم تعد شهادة تُعلّق على الجدار. إنها منهج عملي لرفع الأداء، تخفيض المخاطر، وتقوية السيطرة الداخلية على كل عمليات المؤسسة.
              </p>
              <p className="text-lg font-semibold mb-6 text-neutral-800 dark:text-neutral-200">
                هل منظمتك اليوم مبنية بطريقة تمكنها من الأداء، التوقع، والرضا المستمر للزبون؟
              </p>
              <button
                onClick={() => setShowRegistrationModal(true)}
                className="px-8 py-4 bg-[#FABC05] text-black font-bold rounded-lg hover:bg-[#FFD700] transition-colors text-lg"
              >
                سجل الآن - الأماكن محدودة (14 مشارك فقط)
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Course Details Section */}
      <section id="courses" className="py-20 px-4 bg-white/50 dark:bg-neutral-800/50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-neutral-800 dark:text-neutral-100">عنوان الدورة</h2>
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold mb-6 text-neutral-800 dark:text-neutral-100">
              La véritable facette du SMQ<br />
              الوجه الحقيقي لنظام تسيير الجودة
            </h3>
            <p className="text-lg text-neutral-700 dark:text-neutral-300 mb-8">
              دورة حضورية مكثفة تمتد لـ 3 أيام، موجّهة للمديرين، المسيرين، وأصحاب المصانع الذين يريدون بناء نظام جودة عملي، واضح، ومربوط بواقع المؤسسة الجزائرية.
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-lg text-center">
              <div className="text-4xl mb-4">📍</div>
              <h3 className="font-bold mb-2 text-neutral-800 dark:text-neutral-100">المكان</h3>
              <p className="text-neutral-600 dark:text-neutral-400">مقر Webscale – الجزائر</p>
            </div>
            <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-lg text-center">
              <div className="text-4xl mb-4">📅</div>
              <h3 className="font-bold mb-2 text-neutral-800 dark:text-neutral-100">المدة</h3>
              <p className="text-neutral-600 dark:text-neutral-400">المدة 3 ايام</p>
            </div>
            <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-lg text-center">
              <div className="text-4xl mb-4">⏱</div>
              <h3 className="font-bold mb-2 text-neutral-800 dark:text-neutral-100">الوقت</h3>
              <p className="text-neutral-600 dark:text-neutral-400">من 09:00 إلى 16:00</p>
            </div>
            <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-lg text-center">
              <div className="text-4xl mb-4">👥</div>
              <h3 className="font-bold mb-2 text-neutral-800 dark:text-neutral-100">عدد المشاركين</h3>
              <p className="text-neutral-600 dark:text-neutral-400">14 مشارك فقط (الأماكن محدودة)</p>
            </div>
          </div>
          <div className="text-center">
            <button
              onClick={() => setShowRegistrationModal(true)}
              className="px-8 py-4 bg-[#FABC05] text-black font-bold rounded-lg hover:bg-[#FFD700] transition-colors text-lg"
            >
              سجل الآن - الأماكن محدودة (14 مشارك فقط)
            </button>
          </div>
        </div>
      </section>

      {/* Consultant Section */}
      <section id="consultant" className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-neutral-800 dark:text-neutral-100">المستشار: سليم بن عراب</h2>
          <div className="max-w-5xl mx-auto bg-white dark:bg-neutral-800 p-8 rounded-2xl shadow-xl border-2 border-neutral-200 dark:border-neutral-700">
            <div className="grid md:grid-cols-[300px_1fr] gap-8">
              <div className="text-center">
                <img
                  src="/formation/Generated Image October 11, 2025 - 2_00PM.png"
                  alt="سليم بن عراب"
                  className="w-full max-w-[300px] rounded-xl shadow-lg mx-auto"
                />
              </div>
              <div>
                <p className="text-neutral-600 dark:text-neutral-400 mb-4 leading-relaxed">
                  مقتبس من السيرة الذاتية الرسمية
                </p>
                <p className="text-neutral-800 dark:text-neutral-200 mb-4 leading-relaxed">
                  مدير عام سابق، خبير في التسيير العملي، التحويل الاستراتيجي، وقيادة المؤسسات في السياقات الصعبة (Relance, Restructuration, Croissance).
                </p>
                <p className="text-neutral-800 dark:text-neutral-200 font-semibold mb-4 leading-relaxed">
                  خبرة 25+ سنة في مؤسسات كبرى:
                </p>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mb-6">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="bg-neutral-100 dark:bg-neutral-700 p-2 rounded-lg">
                      <img
                        src={`/formation/logos/photo_2025-11-30_15-${String(i === 1 ? "00-42" : i === 2 ? "01-00" : i === 3 ? "01-49" : i === 4 ? "01-55" : i === 5 ? "02-24" : "23-31")}.jpg`}
                        alt={`Company Logo ${i}`}
                        className="w-full h-auto rounded"
                      />
                    </div>
                  ))}
                </div>
                <p className="text-neutral-800 dark:text-neutral-200 mb-4 leading-relaxed">
                  أدار فرقاً من 10 إلى 580 موظف، وحقق أرقام معاملات وصلت إلى 78 مليون يورو.
                </p>
                <p className="text-neutral-800 dark:text-neutral-200 mb-4 leading-relaxed">
                  مختص في النمذجة، رسم العمليات، التسيير عبر العمليات، التفكير الاستراتيجي، والـ psychométrie.
                </p>
                <p className="text-[#FABC05] font-semibold text-lg mt-6 leading-relaxed">
                  المستشار سليم يقدّم دورة لا تركز على النظري… بل على كيف تُسيّر مؤسسة حقيقية، بالعمليات الحقيقية، وبالمشاكل الحقيقية.
                </p>
              </div>
            </div>
          </div>
          <div className="text-center mt-12">
            <button
              onClick={() => setShowRegistrationModal(true)}
              className="px-8 py-4 bg-[#FABC05] text-black font-bold rounded-lg hover:bg-[#FFD700] transition-colors text-lg"
            >
              سجل الآن - الأماكن محدودة (14 مشارك فقط)
            </button>
          </div>
        </div>
      </section>

      {/* Program Section */}
      <section id="program" className="py-20 px-4 bg-white/50 dark:bg-neutral-800/50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-neutral-800 dark:text-neutral-100">ماذا ستتعلم خلال الدورة؟</h2>
          <div className="max-w-4xl mx-auto">
            {programSections.map((section) => (
              <div key={section.id} className="mb-6 bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-md">
                <h3
                  className={`text-xl font-bold mb-4 cursor-pointer flex items-center justify-between ${
                    section.items.length > 0 ? "hover:text-[#FABC05] transition-colors" : ""
                  }`}
                  onClick={() => section.items.length > 0 && toggleSection(section.id)}
                >
                  <span>{section.title}</span>
                  {section.items.length > 0 && (
                    <span className="text-2xl">{expandedSections[section.id] ? "−" : "+"}</span>
                  )}
                </h3>
                {section.items.length > 0 && expandedSections[section.id] && (
                  <ul className="list-disc list-inside space-y-2 text-neutral-700 dark:text-neutral-300 pr-4">
                    {section.items.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <button
              onClick={() => setShowRegistrationModal(true)}
              className="px-8 py-4 bg-[#FABC05] text-black font-bold rounded-lg hover:bg-[#FFD700] transition-colors text-lg"
            >
              سجل الآن - الأماكن محدودة (14 مشارك فقط)
            </button>
          </div>
        </div>
      </section>

      {/* Why Attend Section */}
      <section id="why" className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-neutral-800 dark:text-neutral-100">لماذا يجب أن تحضر هذه الدورة؟</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: "🌍", title: "فهم المؤسسات العالمية", desc: "فهم كيف تُدار المؤسسات العالمية من الداخل" },
              { icon: "📊", title: "مهارة رسم العمليات", desc: "اكتساب مهارة رسم وتحسين العمليات" },
              { icon: "📈", title: "بناء SMQ فعال", desc: "بناء SMQ يقلل الأخطاء، يرفع الإنتاجية، ويقوي الثقة" },
              { icon: "🇩🇿", title: "أمثلة واقعية", desc: "التعرف على أمثلة واقعية من شركات جزائرية كبرى" },
              { icon: "👨‍💼", title: "خبرة مستشار محترف", desc: "الاستفادة من خبرة مستشار قاد مؤسسات ضخمة نحو التحسن" },
              { icon: "💡", title: "عقلية المؤسسة الحقيقية", desc: "تبني عقلية المؤسسة الحقيقية وليس الورقية" },
            ].map((item, idx) => (
              <div key={idx} className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-lg text-center">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-bold mb-2 text-neutral-800 dark:text-neutral-100">{item.title}</h3>
                <p className="text-neutral-600 dark:text-neutral-400">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <button
              onClick={() => setShowRegistrationModal(true)}
              className="px-8 py-4 bg-[#FABC05] text-black font-bold rounded-lg hover:bg-[#FFD700] transition-colors text-lg"
            >
              سجل الآن - الأماكن محدودة (14 مشارك فقط)
            </button>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 bg-white/50 dark:bg-neutral-800/50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-neutral-800 dark:text-neutral-100">الأثمان وطرق التسجيل</h2>
          <div className="max-w-2xl mx-auto mb-12">
            <div className={`bg-white dark:bg-neutral-800 p-8 rounded-2xl shadow-xl border-2 ${isWebscaleMember ? "border-[#FABC05]" : "border-neutral-200 dark:border-neutral-700"} transition-all`}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100">
                  {isWebscaleMember ? "أعضاء Webscale" : "سعر الدورة"}
                </h3>
                {isWebscaleMember && (
                  <span className="px-3 py-1 bg-[#FABC05] text-black text-sm font-semibold rounded-full">عرض خاص</span>
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
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isWebscaleMember}
                    onChange={(e) => setIsWebscaleMember(e.target.checked)}
                    className="w-5 h-5 rounded border-neutral-300 text-[#FABC05] focus:ring-[#FABC05]"
                  />
                  <span className="text-neutral-700 dark:text-neutral-300">أنا عضو في Webscale</span>
                </label>
              </div>
              <ul className="space-y-3 mb-6 text-neutral-700 dark:text-neutral-300">
                {isWebscaleMember ? (
                  <>
                    <li>✓ نفس المميزات</li>
                    <li>✓ خصم 6.000 د.ج</li>
                    <li>✓ دورة حضورية مكثفة 3 أيام</li>
                    <li>✓ محتوى عملي وتطبيقي</li>
                  </>
                ) : (
                  <>
                    <li>✓ دورة حضورية مكثفة 3 أيام</li>
                    <li>✓ محتوى عملي وتطبيقي</li>
                    <li>✓ شهادة إتمام</li>
                    <li>✓ خطة تطبيق فردية</li>
                  </>
                )}
              </ul>
              <button
                onClick={() => setShowRegistrationModal(true)}
                className="w-full px-6 py-3 bg-[#FABC05] text-black font-semibold rounded-lg hover:bg-[#FFD700] transition-colors"
              >
                سجل الآن
              </button>
            </div>
          </div>

          <div className="max-w-4xl mx-auto">
            <p className="text-center text-lg mb-8 text-neutral-700 dark:text-neutral-300">
              <strong className="text-[#FABC05]">الأماكن محدودة</strong> - 14 مشارك فقط
            </p>
            <FormationRegistrationForm />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-neutral-800 dark:text-neutral-100">الأسئلة الشائعة</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqItems.map((item, idx) => (
              <div key={idx} className="bg-white dark:bg-neutral-800 rounded-xl shadow-md overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full px-6 py-4 flex items-center justify-between text-right hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors"
                >
                  <span className="font-semibold text-neutral-800 dark:text-neutral-100">{item.question}</span>
                  <span className="text-2xl text-neutral-600 dark:text-neutral-400">{openFaq === idx ? "−" : "+"}</span>
                </button>
                {openFaq === idx && (
                  <div className="px-6 py-4 border-t border-neutral-200 dark:border-neutral-700">
                    <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <button
              onClick={() => setShowRegistrationModal(true)}
              className="px-8 py-4 bg-[#FABC05] text-black font-bold rounded-lg hover:bg-[#FFD700] transition-colors text-lg"
            >
              سجل الآن - الأماكن محدودة (14 مشارك فقط)
            </button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-white/50 dark:bg-neutral-800/50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-neutral-800 dark:text-neutral-100">تواصل معنا</h2>
          <div className="max-w-4xl mx-auto bg-white dark:bg-neutral-800 p-8 rounded-2xl shadow-xl">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-6 text-neutral-800 dark:text-neutral-100">معلومات التواصل</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-[#FABC05]/20 rounded-lg">
                      <svg className="w-6 h-6 text-[#FABC05]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400">البريد الإلكتروني</p>
                      <a href="mailto:contact@webscale.dz" className="text-[#FABC05] hover:underline">
                        contact@webscale.dz
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-[#FABC05]/20 rounded-lg">
                      <svg className="w-6 h-6 text-[#FABC05]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="2" y1="12" x2="22" y2="12" />
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400">الموقع الرسمي</p>
                      <a href="https://www.webscale.pro/" target="_blank" rel="noopener noreferrer" className="text-[#FABC05] hover:underline">
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
                    { name: "LinkedIn", href: "https://www.linkedin.com/company/webscalepro/" },
                    { name: "Youtube", href: "https://youtube.com/@webscale-pro?si=KWRMamO8XO628NlY" },
                    { name: "Facebook", href: "https://www.facebook.com/share/15utdJSobi/" },
                    { name: "Instagram", href: "https://www.instagram.com/webscale.pro?igsh=MXg0OXRjOXk5bGExag==" },
                  ].map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-3 bg-neutral-100 dark:bg-neutral-700 rounded-lg hover:bg-[#FABC05]/20 transition-colors"
                    >
                      <span className="text-neutral-700 dark:text-neutral-300 font-medium">{social.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-12">
            <button
              onClick={() => setShowRegistrationModal(true)}
              className="px-8 py-4 bg-[#FABC05] text-black font-bold rounded-lg hover:bg-[#FFD700] transition-colors text-lg"
            >
              سجل الآن - الأماكن محدودة (14 مشارك فقط)
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-neutral-900 dark:bg-black text-neutral-300">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <img src={logo} alt="Webscale Logo" className="h-10 w-auto" />
            <span className="text-xl font-bold">Webscale</span>
          </div>
          <p>&copy; 2024 Webscale. جميع الحقوق محفوظة. | دورة النظام الحقيقي لتسيير الجودة SMQ</p>
        </div>
      </footer>

      {/* Registration Modal */}
      {showRegistrationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700 p-4 flex items-center justify-between rounded-t-2xl">
              <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100">سجل الآن</h2>
              <button
                onClick={() => setShowRegistrationModal(false)}
                className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
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

