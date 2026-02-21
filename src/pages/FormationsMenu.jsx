import { ArrowLeft, GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { formations } from "../constants/formations";

// Helper function to properly encode image URLs
const encodeImageUrl = (url) => {
  // Split the path and encode each segment (but keep slashes)
  const parts = url.split('/');
  return parts.map(part => part ? encodeURIComponent(part) : '').join('/');
};

const FormationsMenu = () => {
  // Get all formations
  const smqFormation = formations.smq;
  const comptabiliteFormation = formations.comptabilite;
  const promotionDaysFormation = formations.promotionDays;

  const formationCards = [
    {
      formation: smqFormation,
      gradient: "from-blue-600/90 to-indigo-800/90",
    },
    {
      formation: comptabiliteFormation,
      gradient: "from-purple-600/90 to-pink-800/90",
    },
    {
      formation: promotionDaysFormation,
      gradient: "from-orange-600/90 to-red-800/90",
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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3 md:mb-4">
            اختر التكوين المناسب لك
          </h2>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-300">
            تكوينات تطبيقية مع خبراء متمرسين
          </p>
        </div>

        {/* Formation Cards Grid */}
        <div className="flex flex-row md:grid md:grid-cols-2 gap-4 md:gap-8 lg:gap-12 overflow-x-auto md:overflow-x-visible pb-4 md:pb-0 snap-x snap-mandatory scrollbar-hide -mx-4 md:mx-0 px-4 md:px-0">
          {formationCards.map(({ formation, gradient }, index) => (
            <Link
              key={formation.id}
              to={formation.route}
              className="group relative block min-h-[550px] md:min-h-[600px] w-[340px] md:w-auto flex-shrink-0 md:flex-shrink rounded-3xl overflow-hidden shadow-xl md:shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.01] md:hover:scale-[1.02] snap-center"
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
              <div className="relative h-full flex flex-col justify-between p-6 md:p-8 lg:p-12 text-white">
                {/* Top Section - Consultant Info */}
                <div className="flex-1 flex flex-col justify-start">
                  <div className="mb-4 md:mb-6">
                    <div className="inline-block px-3 md:px-4 py-1.5 md:py-2 bg-white/20 backdrop-blur-sm rounded-full text-xs md:text-sm font-semibold mb-3 md:mb-4 border border-white/30">
                      {formation.consultant.title}
                    </div>
                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 md:mb-3 leading-tight">
                      {formation.title}
                    </h3>
                    <p className="text-base md:text-lg lg:text-xl text-white/90 mb-3 md:mb-4 line-clamp-2">
                      {formation.subtitle}
                    </p>
                  </div>

                  {/* Consultant Name */}
                  <div className="mt-auto">
                    <div className="flex items-center gap-4 md:gap-6 mb-4 md:mb-5">
                      <div className="w-28 h-28 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-2xl border-2 md:border-4 border-white/60 overflow-hidden bg-white/20 backdrop-blur-sm shadow-2xl flex-shrink-0">
                        <img
                          src={formation.consultant.image}
                          alt={formation.consultant.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-xl md:text-2xl lg:text-3xl xl:text-4xl mb-1 md:mb-2 truncate">
                          {formation.consultant.name}
                        </p>
                        <p className="text-sm md:text-base lg:text-lg text-white/90 font-medium">
                          {formation.consultant.experience}
                        </p>
                      </div>
                    </div>

                    {/* Company Logos */}
                    {formation.consultant.companies && formation.consultant.companies.length > 0 && (
                      <div className="mb-4 md:mb-5">
                        <div className="flex items-center gap-2 md:gap-3 flex-wrap">
                          {formation.consultant.companies.slice(0, 4).map((company, idx) => {
                            const encodedUrl = encodeImageUrl(company.logo);
                            return (
                              <div 
                                key={idx} 
                                className="group bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 hover:border-white/40 hover:bg-white/20 transition-all duration-300 flex items-center justify-center"
                                style={{ 
                                  width: '56px',
                                  height: '40px',
                                  padding: '8px',
                                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                                }}
                              >
                                <img
                                  src={encodedUrl}
                                  alt={`Company Logo ${idx + 1}`}
                                  className="object-contain transition-transform duration-300 group-hover:scale-110"
                                  style={{ 
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'contain'
                                  }}
                                  onError={(e) => {
                                    console.error('Failed to load logo:', company.logo, 'Encoded:', encodedUrl);
                                    e.target.style.display = 'none';
                                  }}
                                />
                              </div>
                            );
                          })}
                          {formation.consultant.companies.length > 4 && (
                            <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 flex items-center justify-center text-xs font-semibold text-white" style={{ width: '56px', height: '40px' }}>
                              +{formation.consultant.companies.length - 4}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Bottom Section - Key Info */}
                <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-white/20">
                  <div className="grid grid-cols-2 gap-3 md:gap-4 mb-4 md:mb-6">
                    <div>
                      <p className="text-xs md:text-sm text-white/70 mb-1">المدة</p>
                      <p className="font-semibold text-white text-sm md:text-base">{formation.duration}</p>
                    </div>
                    <div>
                      <p className="text-xs md:text-sm text-white/70 mb-1">الموقع</p>
                      <p className="font-semibold text-white text-xs md:text-sm">{formation.location}</p>
                    </div>
                  </div>

                  {/* Pricing Section */}
                  <div className="mb-4 md:mb-6 space-y-2.5 md:space-y-3">
                    {/* Public Price */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs md:text-sm text-white/80">السعر العام</span>
                      <span className="text-sm md:text-base text-white/90 font-medium">
                        {formation.pricing.regular} {formation.pricing.currency}
                      </span>
                    </div>
                    
                    {/* Discount Badge */}
                    <div className="flex items-center justify-center py-1.5 md:py-2">
                      <span className="px-3 md:px-4 py-1.5 md:py-2 bg-[#FABC05] rounded-full text-xs md:text-sm font-semibold text-black border border-[#FFD700]/50 shadow-lg">
                        خصم {formation.pricing.discount} {formation.pricing.currency} لأعضاء Webscale
                      </span>
                    </div>
                    
                    {/* Final Webscale Members Price */}
                    <div className="flex items-center justify-between pt-2 md:pt-3 border-t border-white/30">
                      <span className="text-sm md:text-base lg:text-lg font-bold text-white">السعر لأعضاء Webscale</span>
                      <span className="text-lg md:text-xl lg:text-2xl font-bold text-[#FABC05]">
                        {formation.pricing.webscaleMember} {formation.pricing.currency}
                      </span>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className="flex items-center justify-center">
                    <div className="w-full md:w-auto px-5 md:px-6 py-2.5 md:py-3 bg-[#FABC05] text-black font-bold rounded-lg group-hover:bg-[#FFD700] transition-colors duration-300 shadow-lg text-sm md:text-base text-center">
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

