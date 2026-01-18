import { Menu, Moon, Sun, X, Users, Briefcase, GraduationCap, Target, TrendingUp, CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import FormationRegistrationForm from "../components/formation";

// This is a reusable FormationPage component that accepts formation configuration
const FormationPageDynamic = ({ formation }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [expandedSections, setExpandedSections] = useState({});
  const [isWebscaleMember, setIsWebscaleMember] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

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

  const navItems = [
    { id: "home", label: "الرئيسية" },
    { id: "problem", label: "المشكلة" },
    { id: "consultant", label: "المستشار" },
    { id: "benefits", label: "الفوائد" },
    { id: "program", label: "البرنامج" },
    { id: "pricing", label: "الأسعار" },
    { id: "faq", label: "الأسئلة الشائعة" },
    { id: "contact", label: "تواصل معنا" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-50/30 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900" dir="rtl">
      <Helmet>
        <title>{formation.meta.title}</title>
        <meta name="description" content={formation.meta.description} />
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
              {navItems.map((item) => (
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
              <Link
                to="/"
                className="hidden md:flex items-center gap-2 px-4 md:px-5 py-2 md:py-2.5 bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-200 font-semibold text-sm md:text-base rounded-xl hover:bg-neutral-300 dark:hover:bg-neutral-600 transition-all duration-300 hover:scale-105 hover:shadow-md"
              >
                <span>المجتمع</span>
                <svg className="w-4 h-4 transition-transform duration-300 hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </Link>
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
                {navItems.map((item, index) => (
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
                <Link
                  to="/"
                  className="mx-4 mt-2 px-6 py-3 bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-200 font-semibold rounded-xl hover:bg-neutral-300 dark:hover:bg-neutral-600 hover:scale-105 transition-all duration-300 hover:shadow-md flex items-center justify-center gap-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span>المجتمع</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                </Link>
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
            {/* Desktop: Image next to title and paragraph */}
            <div className="hidden md:flex md:flex-row md:items-start md:gap-8 mb-6">
              {/* Image on desktop */}
              <div className="flex-shrink-0">
                <div className="relative group">
                  <img
                    src={formation.consultant.image}
                    alt={formation.consultant.name}
                    className="w-full max-w-[400px] rounded-xl shadow-lg transition-transform duration-300 group-hover:scale-105 group-hover:shadow-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#FABC05]/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
              
              {/* Text content on desktop */}
              <div className="flex-1 text-right">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-neutral-800 dark:text-neutral-100 leading-tight animate-in fade-in slide-in-from-bottom duration-700">
                  {formation.title}
                </h1>
                <p className="text-xl md:text-2xl mb-4 text-neutral-700 dark:text-neutral-300 leading-relaxed animate-in fade-in slide-in-from-bottom duration-700 delay-100">
                  {formation.subtitle}
                </p>
                <p className="text-lg mb-4 text-neutral-700 dark:text-neutral-300 animate-in fade-in slide-in-from-bottom duration-700 delay-200">
                  {formation.description}
                </p>
              </div>
            </div>
            
            {/* Mobile: Title, phrase, image, then paragraph */}
            <div className="md:hidden mb-6">
              {/* Title */}
              <div className="text-center mb-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-neutral-800 dark:text-neutral-100 leading-tight animate-in fade-in slide-in-from-bottom duration-700">
                  {formation.title}
                </h1>
              </div>
              
              {/* Phrase */}
              <div className="text-center mb-4">
                <p className="text-xl md:text-2xl mb-4 text-neutral-700 dark:text-neutral-300 leading-relaxed animate-in fade-in slide-in-from-bottom duration-700 delay-100">
                  {formation.subtitle}
                </p>
                
                {/* Image - appears under phrase ONLY on mobile */}
                <div className="flex justify-center mb-4">
                  <div className="relative group">
                    <img
                      src={formation.consultant.image}
                      alt={formation.consultant.name}
                      className="w-full max-w-[300px] rounded-xl shadow-lg transition-transform duration-300 group-hover:scale-105 group-hover:shadow-2xl"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#FABC05]/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>
                
                <p className="text-lg mb-4 text-neutral-700 dark:text-neutral-300 animate-in fade-in slide-in-from-bottom duration-700 delay-200">
                  {formation.description}
                </p>
              </div>
            </div>
            
            <div className="text-center">
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
              {formation.problems.map((problem, idx) => (
                <div key={idx} className="bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-neutral-200/50 dark:border-neutral-700/50 hover:shadow-2xl hover:scale-105 hover:border-[#FABC05]/50 transition-all duration-300 group cursor-pointer">
                  <p className="text-neutral-700 dark:text-neutral-300 group-hover:text-[#FABC05] transition-colors duration-300 font-medium">{problem}</p>
                </div>
              ))}
            </div>
            <div className="bg-gradient-to-br from-[#FABC05]/10 via-[#FABC05]/5 to-transparent dark:from-[#FABC05]/20 dark:via-[#FABC05]/10 dark:to-transparent p-8 rounded-2xl mb-4 border border-[#FABC05]/20 dark:border-[#FABC05]/30 hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
              <h3 className="text-2xl font-bold mb-6 text-neutral-800 dark:text-neutral-100">
                هذا التكوين يعطيك الطريقة التي تعتمدها الشركات القوية لتفادي هذه الفوضى:
              </h3>
              <ul className="space-y-4 text-lg text-neutral-700 dark:text-neutral-300">
                {formation.solutions.map((solution, idx) => (
                  <li key={idx} className="flex items-start gap-3 group/item">
                    <span className="text-[#FABC05] font-bold text-xl group-hover/item:scale-125 transition-transform duration-300">✔</span>
                    <span className="group-hover/item:text-[#FABC05] transition-colors duration-300">{solution}</span>
                  </li>
                ))}
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
          <div className="max-w-6xl mx-auto">
            {/* Modern Consultant Card */}
            <div className="relative overflow-hidden bg-gradient-to-br from-white via-yellow-50/30 to-white dark:from-neutral-800 dark:via-neutral-900 dark:to-neutral-800 rounded-3xl shadow-2xl border border-neutral-200/50 dark:border-neutral-700/50">
              {/* Decorative Background Elements */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#FABC05]/10 to-transparent rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-[#FFD700]/10 to-transparent rounded-full blur-3xl"></div>
              
              <div className="relative p-8 md:p-12">
                <div className="grid md:grid-cols-[280px_1fr] gap-8 lg:gap-12 items-start">
                  {/* Left: Consultant Image & Info */}
                  <div className="flex flex-col items-center">
                    {/* Image with Modern Frame */}
                    <div className="relative mb-6 group">
                      <div className="absolute -inset-4 bg-gradient-to-r from-[#FABC05] via-[#FFD700] to-[#FABC05] rounded-2xl opacity-20 group-hover:opacity-30 blur-xl transition-opacity duration-300"></div>
                      <div className="relative">
                        <img
                          src={formation.consultant.image}
                          alt={formation.consultant.name}
                          className="w-full max-w-[280px] rounded-2xl shadow-2xl ring-4 ring-white dark:ring-neutral-800 transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                    </div>
                    
                    {/* Consultant Info Card */}
                    <div className="w-full bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-neutral-200/50 dark:border-neutral-700/50">
                      <h3 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100 mb-2 text-center">
                        {formation.consultant.name}
                      </h3>
                      <p className="text-base text-[#FABC05] font-semibold mb-4 text-center">
                        {formation.consultant.title}
                      </p>
                      <div className="flex items-center justify-center gap-2 text-neutral-600 dark:text-neutral-400 mb-4">
                        <svg className="w-5 h-5 text-[#FABC05]" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                        </svg>
                        <span className="text-sm font-medium">{formation.consultant.experience}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Content */}
                  <div className="space-y-6">
                    {/* Companies Logos */}
                    {formation.consultant.companies.length > 0 && (
                      <div>
                        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-6">
                          {formation.consultant.companies.map((company, idx) => (
                            <div 
                              key={idx} 
                              className="bg-white/80 dark:bg-neutral-700/80 backdrop-blur-sm p-3 rounded-xl shadow-md border border-neutral-200/50 dark:border-neutral-600/50 hover:shadow-xl hover:scale-110 hover:border-[#FABC05]/50 transition-all duration-300 flex items-center justify-center cursor-pointer group"
                            >
                              <img
                                src={company.logo}
                                alt={`Company Logo ${idx + 1}`}
                                className="w-full h-auto object-contain max-h-12 rounded transition-transform duration-300 group-hover:scale-110"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Documented Results */}
                    <div>
                      <h4 className="text-xl font-bold text-neutral-800 dark:text-neutral-100 mb-4 flex items-center gap-2">
                        <span className="w-1 h-6 bg-gradient-to-b from-[#FABC05] to-[#FFD700] rounded-full"></span>
                        نتائج موثقة
                      </h4>
                      <ul className="space-y-3">
                        {formation.consultant.results.map((result, idx) => (
                          <li key={idx} className="flex items-start gap-3 group/item">
                            <div className="flex-shrink-0 mt-1">
                              <div className="w-2 h-2 rounded-full bg-[#FABC05] group-hover/item:scale-150 transition-transform duration-300"></div>
                            </div>
                            <span className="text-neutral-700 dark:text-neutral-300 group-hover/item:text-[#FABC05] transition-colors duration-300 leading-relaxed">
                              {result}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Quote */}
                    <div className="relative bg-gradient-to-r from-[#FABC05]/10 via-[#FFD700]/10 to-[#FABC05]/10 dark:from-[#FABC05]/20 dark:via-[#FFD700]/20 dark:to-[#FABC05]/20 p-6 rounded-2xl border-l-4 border-[#FABC05]">
                      <div className="absolute top-4 right-4 text-6xl text-[#FABC05]/20 font-serif leading-none">"</div>
                      <p className="text-[#FABC05] dark:text-[#FFD700] font-semibold text-lg leading-relaxed relative z-10">
                        {formation.consultant.quote}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="text-center mt-8">
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

      {/* Benefits Section */}
      <section id="benefits" className="py-6 md:py-8 px-4 bg-gradient-to-b from-white/50 to-yellow-50/30 dark:from-neutral-800/50 dark:to-neutral-900/50">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-neutral-800 dark:text-neutral-100">
            ماذا ستستفيد مباشرة بعد التكوين؟
          </h2>
          <div className="max-w-4xl mx-auto">
            <ul className="space-y-4 text-lg text-neutral-700 dark:text-neutral-300">
              {formation.benefits.map((benefit, idx) => (
                <li key={idx} className="flex items-start gap-3 bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm p-5 rounded-xl shadow-md border border-neutral-200/50 dark:border-neutral-700/50 hover:shadow-xl hover:scale-105 hover:border-[#FABC05]/50 transition-all duration-300 group cursor-pointer">
                  <span className="text-[#FABC05] font-bold text-xl group-hover:scale-125 transition-transform duration-300">✔</span>
                  <span className="group-hover:text-[#FABC05] transition-colors duration-300">{benefit}</span>
                </li>
              ))}
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
      <section id="who" className="py-12 md:py-16 px-4 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#FABC05]/5 via-transparent to-[#FABC05]/5 dark:from-[#FABC05]/10 dark:via-transparent dark:to-[#FABC05]/10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FABC05]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#FABC05]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-neutral-900 dark:text-neutral-50 bg-gradient-to-r from-neutral-900 to-neutral-700 dark:from-neutral-50 dark:to-neutral-300 bg-clip-text text-transparent">
              لمن هذا التكوين؟
            </h2>
            <p className="text-xl md:text-2xl text-neutral-600 dark:text-neutral-400 font-medium">
              لك إن كنت تريد:
            </p>
          </div>
          
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {formation.targetAudience.map((audience, idx) => {
                // Icon mapping based on content
                const getIcon = (text) => {
                  if (text.includes("إطارات") || text.includes("شركات") || text.includes("مؤسسات")) return <Users className="w-6 h-6" />;
                  if (text.includes("مهنيون") || text.includes("أساسيات")) return <GraduationCap className="w-6 h-6" />;
                  if (text.includes("مديرين") || text.includes("المديرين") || text.includes("المسيرين")) return <Briefcase className="w-6 h-6" />;
                  if (text.includes("قرارات") || text.includes("مالية")) return <Target className="w-6 h-6" />;
                  if (text.includes("فهم") || text.includes("تحليل")) return <TrendingUp className="w-6 h-6" />;
                  return <CheckCircle2 className="w-6 h-6" />;
                };

                // Gradient colors for variety
                const gradients = [
                  "from-blue-500/10 to-indigo-500/10 dark:from-blue-500/20 dark:to-indigo-500/20",
                  "from-purple-500/10 to-pink-500/10 dark:from-purple-500/20 dark:to-pink-500/20",
                  "from-green-500/10 to-emerald-500/10 dark:from-green-500/20 dark:to-emerald-500/20",
                  "from-orange-500/10 to-amber-500/10 dark:from-orange-500/20 dark:to-amber-500/20",
                  "from-cyan-500/10 to-blue-500/10 dark:from-cyan-500/20 dark:to-blue-500/20",
                  "from-rose-500/10 to-pink-500/10 dark:from-rose-500/20 dark:to-pink-500/20",
                ];
                
                const gradient = gradients[idx % gradients.length];
                const isLastAndOdd = idx === formation.targetAudience.length - 1 && formation.targetAudience.length % 2 !== 0;

                return (
                  <div
                    key={idx}
                    className={`group relative bg-white/90 dark:bg-neutral-800/90 backdrop-blur-md p-6 md:p-8 rounded-2xl shadow-lg border border-neutral-200/60 dark:border-neutral-700/60 
                      hover:shadow-2xl hover:shadow-[#FABC05]/20 hover:-translate-y-2 hover:border-[#FABC05]/40 
                      transition-all duration-500 ease-out
                      ${isLastAndOdd ? 'md:col-span-2 lg:col-span-3' : ''}
                      overflow-hidden`}
                  >
                    {/* Gradient background overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                    
                    {/* Decorative corner accent */}
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#FABC05]/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Content */}
                    <div className="relative z-10 flex items-start gap-4">
                      {/* Icon */}
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-[#FABC05]/20 to-[#FABC05]/10 dark:from-[#FABC05]/30 dark:to-[#FABC05]/20 flex items-center justify-center text-[#FABC05] group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 shadow-md">
                        {getIcon(audience)}
                      </div>
                      
                      {/* Text */}
                      <div className="flex-1">
                        <p className={`text-base md:text-lg text-neutral-800 dark:text-neutral-200 group-hover:text-neutral-900 dark:group-hover:text-neutral-50 transition-colors duration-300 font-medium leading-relaxed ${isLastAndOdd ? 'text-center' : ''}`}>
                          {audience}
                        </p>
                      </div>
                    </div>
                    
                    {/* Hover effect line */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#FABC05] to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                  </div>
                );
              })}
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
            {formation.program.map((section) => (
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
                    {isWebscaleMember ? formation.pricing.webscaleMember : formation.pricing.regular}
                  </span>
                  <span className="text-2xl text-neutral-600 dark:text-neutral-400">{formation.pricing.currency}</span>
                  <span className="text-lg text-neutral-500 dark:text-neutral-500">{formation.pricing.taxNote}</span>
                </div>
              </div>
              <div className="mb-6">
                <label className={`relative flex items-center gap-4 cursor-pointer group/checkbox p-4 rounded-xl bg-gradient-to-r transition-all duration-300 ${
                  isWebscaleMember 
                    ? "from-[#FABC05]/10 via-[#FFD700]/10 to-[#FABC05]/10 border-2 border-[#FABC05]/50 shadow-lg shadow-[#FABC05]/20 scale-[1.02]" 
                    : "from-neutral-50 to-neutral-100/50 dark:from-neutral-700/30 dark:to-neutral-800/30 border-2 border-neutral-200 dark:border-neutral-600 hover:border-[#FABC05]/50 dark:hover:border-[#FABC05]/50 hover:shadow-lg hover:shadow-[#FABC05]/10 hover:scale-[1.02]"
                }`}>
                  <div className="relative flex-shrink-0">
                    <input
                      type="checkbox"
                      checked={isWebscaleMember}
                      onChange={(e) => setIsWebscaleMember(e.target.checked)}
                      className="sr-only"
                    />
                    <div className={`w-7 h-7 rounded-lg border-2 transition-all duration-300 flex items-center justify-center group-hover/checkbox:scale-110 relative overflow-hidden ${
                      isWebscaleMember
                        ? "bg-gradient-to-br from-[#FABC05] to-[#FFD700] border-[#FABC05] shadow-lg shadow-[#FABC05]/40"
                        : "border-[#FABC05]/50 dark:border-[#FABC05]/50 bg-white dark:bg-neutral-800 group-hover/checkbox:border-[#FABC05]"
                    }`}>
                      {!isWebscaleMember && (
                        <svg 
                          className="w-5 h-5 text-[#FABC05] dark:text-[#FFD700] absolute opacity-80" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="3" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      )}
                      {isWebscaleMember && (
                        <svg 
                          className="w-4 h-4 text-black font-bold animate-in zoom-in-95 duration-200 relative z-10" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="3.5" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    {isWebscaleMember && (
                      <div className="absolute inset-0 rounded-lg bg-[#FABC05]/20 animate-ping"></div>
                    )}
                  </div>
                  <span className={`text-base font-medium transition-colors duration-300 select-none flex-1 ${
                    isWebscaleMember
                      ? "text-[#FABC05] dark:text-[#FFD700] font-semibold"
                      : "text-neutral-700 dark:text-neutral-300 group-hover/checkbox:text-[#FABC05]"
                  }`}>
                    أنا عضو في Webscale
                  </span>
                </label>
              </div>
              <ul className="space-y-3 mb-6 text-neutral-700 dark:text-neutral-300">
                {isWebscaleMember ? (
                  <>
                    <li className="flex items-center gap-2 group/item hover:text-[#FABC05] transition-colors duration-300">✓ <span>نفس المميزات</span></li>
                    <li className="flex items-center gap-2 group/item hover:text-[#FABC05] transition-colors duration-300">✓ <span>خصم {formation.pricing.discount} {formation.pricing.currency}</span></li>
                    <li className="flex items-center gap-2 group/item hover:text-[#FABC05] transition-colors duration-300">✓ <span>دورة حضورية مكثفة {formation.duration}</span></li>
                    <li className="flex items-center gap-2 group/item hover:text-[#FABC05] transition-colors duration-300">✓ <span>محتوى عملي وتطبيقي</span></li>
                  </>
                ) : (
                  <>
                    <li className="flex items-center gap-2 group/item hover:text-[#FABC05] transition-colors duration-300">✓ <span>دورة حضورية مكثفة {formation.duration}</span></li>
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
              <strong className="text-[#FABC05]">الأماكن محدودة</strong> - {formation.maxParticipants} مشارك فقط
            </p>
            <FormationRegistrationForm 
              formId={formation.formId}
              cohorts={formation.cohorts}
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-6 md:py-8 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-neutral-800 dark:text-neutral-100">الأسئلة الشائعة</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {formation.faq.map((item, idx) => (
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
          <p className="text-neutral-400 hover:text-neutral-300 transition-colors duration-300">&copy; 2025 Webscale. جميع الحقوق محفوظة. | {formation.title}</p>
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
              <FormationRegistrationForm 
                onSuccess={() => setShowRegistrationModal(false)}
                formId={formation.formId}
                cohorts={formation.cohorts}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormationPageDynamic;

