// src/pages/SubmissionsCarouselPage.jsx
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import logo from "../assets/logo.png";

// Mock data structure for submissions
const mockSubmissions = [
  {
    id: 1,
    name: "أحمد بن علي",
    company: "شركة التقنية المتقدمة",
    email: "ahmed@tech.com",
    phone: "0555123456",
    sector: "التكنولوجيا",
    wilaya: "الجزائر",
    submissionDate: "2024-01-15",
    status: "approved"
  },
  {
    id: 2,
    name: "فاطمة الزهراء",
    company: "مؤسسة الإبداع الرقمي",
    email: "fatima@digital.com",
    phone: "0555987654",
    sector: "التسويق الرقمي",
    wilaya: "وهران",
    submissionDate: "2024-01-14",
    status: "approved"
  },
  {
    id: 3,
    name: "محمد يوسف",
    company: "مجموعة الأعمال الذكية",
    email: "mohamed@smart.com",
    phone: "0555555555",
    sector: "الاستشارات",
    wilaya: "قسنطينة",
    submissionDate: "2024-01-13",
    status: "approved"
  },
  {
    id: 4,
    name: "سارة أحمد",
    company: "شركة الحلول المتكاملة",
    email: "sara@solutions.com",
    phone: "0555444333",
    sector: "التجارة الإلكترونية",
    wilaya: "البليدة",
    submissionDate: "2024-01-12",
    status: "approved"
  },
  {
    id: 5,
    name: "عبد الرحمن",
    company: "مؤسسة الابتكار",
    email: "abdelrahman@innovation.com",
    phone: "0555333222",
    sector: "الذكاء الاصطناعي",
    wilaya: "سطيف",
    submissionDate: "2024-01-11",
    status: "approved"
  }
];

export default function SubmissionsCarouselPage() {
  const { form_id } = useParams();
  const [submissions, setSubmissions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchSubmissions();
    
    // Auto-advance carousel every 5 seconds
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % submissions.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [submissions.length]);

  const fetchSubmissions = async () => {
    setIsLoading(true);
    try {
      // Fetch approved submissions from the API
      const response = await fetch(`https://crmgo.abderrahime.com/api/v1/public/forms/${form_id}/submissions?status=approved`);
      
      if (response.ok) {
        const apiResponse = await response.json();
        
        // Transform the API response to use the actual structure
        const transformedSubmissions = apiResponse.submissions.map((submission, index) => ({
          id: submission.id,
          form_id: submission.form_id,
          data: submission.data,
          status: submission.status,
          attendance: submission.attendance,
          created_at: submission.created_at,
          updated_at: submission.updated_at
        }));
        
        setSubmissions(transformedSubmissions);
      } else {
        // Fallback to mock data if API fails
        console.warn("API failed, using mock data");
        setSubmissions(mockSubmissions);
      }
    } catch (err) {
      console.error("Error fetching submissions:", err);
      // Fallback to mock data on error
      setSubmissions(mockSubmissions);
    } finally {
      setIsLoading(false);
    }
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % submissions.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + submissions.length) % submissions.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FABC05]/10 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#FABC05] mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">جاري تحميل البيانات...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FABC05]/10 to-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg">{error}</p>
        </div>
      </div>
    );
  }

  if (submissions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FABC05]/10 to-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 text-lg">لا توجد طلبات معتمدة</p>
        </div>
      </div>
    );
  }

  const currentSubmission = submissions[currentIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FABC05]/10 to-white p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <img 
            src={logo} 
            alt="Webscale Logo" 
            className="h-20 mx-auto mb-6"
          />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            الطلبات المعتمدة
          </h1>
          <p className="text-gray-600 text-lg">
            عرض الطلبات المعتمدة للنموذج: {form_id}
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative">
        {/* Main Card */}
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl shadow-2xl p-12 mx-4"
        >
          <div className="max-w-4xl mx-auto">
            {/* Submission Header */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                طلب معتمد #{currentIndex + 1}
              </h2>
              <p className="text-lg text-gray-600">
                معرف الطلب: {currentSubmission.id}
              </p>
            </div>

            {/* Dynamic Fields Display */}
            <div className={`grid gap-6 mb-8 ${
              Object.keys(currentSubmission.data).length === 1 
                ? 'grid-cols-1 max-w-2xl mx-auto' 
                : 'md:grid-cols-2 lg:grid-cols-3'
            }`}>
              {Object.entries(currentSubmission.data).map(([field, value], index) => (
                <motion.div
                  key={field}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-gradient-to-br from-[#FABC05]/5 to-white border border-[#FABC05]/20 rounded-2xl hover:shadow-lg transition-shadow ${
                    Object.keys(currentSubmission.data).length === 1 
                      ? 'p-12' 
                      : 'p-6'
                  }`}
                >
                  <h3 className={`font-bold text-[#FABC05] mb-3 text-center ${
                    Object.keys(currentSubmission.data).length === 1 
                      ? 'text-2xl' 
                      : 'text-lg'
                  }`}>
                    {field}
                  </h3>
                  <div className={`text-gray-800 text-center leading-relaxed flex items-center justify-center ${
                    Object.keys(currentSubmission.data).length === 1 
                      ? 'min-h-[120px] text-xl' 
                      : 'min-h-[60px]'
                  }`}>
                    {typeof value === 'string' ? (
                      <span className="break-words">{value}</span>
                    ) : (
                      <span>{JSON.stringify(value)}</span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Submission Metadata */}
            <div className="grid md:grid-cols-2 gap-6 pt-6 border-t border-gray-200">
              <div className="text-center">
                <div className="inline-flex items-center space-x-2 space-x-reverse bg-green-100 text-green-800 px-4 py-2 rounded-full">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="font-semibold">معتمد</span>
                </div>
              </div>
              
              <div className="text-center">
                <p className="text-sm text-gray-500">
                  آخر تحديث: {new Date(currentSubmission.updated_at).toLocaleDateString('ar-SA')}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg rounded-full p-4 transition-all duration-200 hover:scale-110"
          >
            <ChevronLeft className="h-8 w-8 text-gray-700" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg rounded-full p-4 transition-all duration-200 hover:scale-110"
          >
            <ChevronRight className="h-8 w-8 text-gray-700" />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-8 space-x-2">
          {submissions.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-4 h-4 rounded-full transition-all duration-200 ${
                index === currentIndex
                  ? "bg-[#FABC05] scale-125"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>

        {/* Counter */}
        <div className="text-center mt-6">
          <p className="text-gray-600 text-lg">
            {currentIndex + 1} من {submissions.length}
          </p>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-12 pb-8"
        >
          <p className="text-gray-500">
            © 2024 Webscale. جميع الحقوق محفوظة.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
