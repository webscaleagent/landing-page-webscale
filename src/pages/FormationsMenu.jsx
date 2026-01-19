import { ArrowLeft, GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { formations } from "../constants/formations";

const FormationsMenu = () => {
  // Get the two formations
  const smqFormation = formations.smq;
  const comptabiliteFormation = formations.comptabilite;

  const formationCards = [
    {
      formation: smqFormation,
      gradient: "from-blue-600/90 to-indigo-800/90",
    },
    {
      formation: comptabiliteFormation,
      gradient: "from-purple-600/90 to-pink-800/90",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link
              to="/"
              className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-[#FABC05] transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>العودة للرئيسية</span>
            </Link>
            
            {/* Center: Logo and Title */}
            <Link to="/" className="flex items-center gap-2 group relative">
              <div className="relative">
                <img src={logo} alt="Webscale Logo" className="h-9 md:h-10 w-auto transition-all duration-300 group-hover:scale-110 group-hover:rotate-3" />
                <div className="absolute inset-0 bg-[#FABC05]/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <span className="text-lg md:text-xl font-bold text-neutral-800 dark:text-neutral-100 transition-all duration-300 group-hover:text-[#FABC05] group-hover:scale-105">webscale</span>
            </Link>

            <div className="flex items-center gap-2">
              <GraduationCap className="w-6 h-6 text-[#FABC05]" />
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                التكوينات المتاحة
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            اختر التكوين المناسب لك
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            تكوينات تطبيقية مع خبراء متمرسين
          </p>
        </div>

        {/* Formation Cards Grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {formationCards.map(({ formation, gradient }) => (
            <Link
              key={formation.id}
              to={formation.route}
              className="group relative block h-[600px] rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02]"
            >
              {/* Background Image with Overlay */}
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url(${formation.consultant.image})`,
                }}
              >
                {/* Gradient Overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${gradient} group-hover:opacity-95 transition-opacity duration-500`}
                />
                
                {/* Pattern Overlay for better text readability */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
              </div>

              {/* Content */}
              <div className="relative h-full flex flex-col justify-between p-8 lg:p-12 text-white">
                {/* Top Section - Consultant Info */}
                <div className="flex-1 flex flex-col justify-start">
                  <div className="mb-6">
                    <div className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold mb-4 border border-white/30">
                      {formation.consultant.title}
                    </div>
                    <h3 className="text-3xl lg:text-4xl font-bold mb-3 leading-tight">
                      {formation.title}
                    </h3>
                    <p className="text-lg lg:text-xl text-white/90 mb-4 line-clamp-2">
                      {formation.subtitle}
                    </p>
                  </div>

                  {/* Consultant Name */}
                  <div className="mt-auto">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-12 h-12 rounded-full border-2 border-white/50 overflow-hidden bg-white/20 backdrop-blur-sm">
                        <img
                          src={formation.consultant.image}
                          alt={formation.consultant.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-lg">
                          {formation.consultant.name}
                        </p>
                        <p className="text-sm text-white/80">
                          {formation.consultant.experience}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Section - Key Info */}
                <div className="mt-8 pt-6 border-t border-white/20">
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <p className="text-sm text-white/70 mb-1">المدة</p>
                      <p className="font-semibold">{formation.duration}</p>
                    </div>
                    <div>
                      <p className="text-sm text-white/70 mb-1">الموقع</p>
                      <p className="font-semibold text-sm">{formation.location}</p>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-white/80">
                      <span className="font-semibold text-white">
                        {formation.pricing.regular} {formation.pricing.currency}
                      </span>
                      <span className="mx-2">•</span>
                      <span>
                        أعضاء Webscale: {formation.pricing.webscaleMember} {formation.pricing.currency}
                      </span>
                    </div>
                    <div className="px-6 py-3 bg-[#FABC05] text-black font-bold rounded-lg group-hover:bg-[#FFD700] transition-colors duration-300 shadow-lg">
                      اكتشف المزيد →
                    </div>
                  </div>
                </div>
              </div>

              {/* Hover Effect Border */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#FABC05]/50 rounded-2xl transition-all duration-500" />
            </Link>
          ))}
        </div>

        {/* Additional Info Section */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            جميع التكوينات تتضمن:
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <span className="text-[#FABC05]">✓</span>
              <span>محتوى تطبيقي 100%</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <span className="text-[#FABC05]">✓</span>
              <span>شهادة إتمام</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <span className="text-[#FABC05]">✓</span>
              <span>خبراء متمرسين</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <span className="text-[#FABC05]">✓</span>
              <span>أماكن محدودة</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FormationsMenu;

