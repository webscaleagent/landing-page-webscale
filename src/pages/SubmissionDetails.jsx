// src/pages/SubmissionDetails.jsx
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { communityLinks, registrationNav, registrationPlatformLinks, registrationResourcesLinks } from "@/constants";
import { Calendar, CheckCircle, Clock, User } from "lucide-react";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";

export default function SubmissionDetails() {
  const { submission_id } = useParams();
  const navigate = useNavigate();
  const [submission, setSubmission] = useState(null);
  const [loading, setLoading] = useState(true);
  const [confirming, setConfirming] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (submission_id) {
      fetchSubmissionDetails();
    }
  }, [submission_id]);

  const fetchSubmissionDetails = async () => {
    try {
      setLoading(true);
      const response = await fetch(`https://crmgo.abderrahime.com/api/v1/public/submissions/${submission_id}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch submission details');
      }
      
      const result = await response.json();
      setSubmission(result.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmAttendance = async () => {
    try {
      setConfirming(true);
      const response = await fetch(`https://crmgo.abderrahime.com/api/v1/public/submissions/${submission_id}/confirm`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to confirm attendance');
      }
      
      setConfirmed(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setConfirming(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'text-green-600 bg-green-100';
      case 'confirmed':
        return 'text-green-600 bg-green-100';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      case 'rejected':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'approved':
        return 'موافق عليه';
      case 'confirmed':
        return 'مؤكد';
      case 'pending':
        return 'في الانتظار';
      case 'rejected':
        return 'مرفوض';
      default:
        return status;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">جاري تحميل تفاصيل الطلب...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">خطأ في تحميل البيانات</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={() => navigate('/')} variant="outline">
            العودة للصفحة الرئيسية
          </Button>
        </div>
      </div>
    );
  }

  if (!submission) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">لم يتم العثور على الطلب</h2>
          <p className="text-gray-600 mb-4">الطلب المطلوب غير موجود أو تم حذفه</p>
          <Button onClick={() => navigate('/')} variant="outline">
            العودة للصفحة الرئيسية
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Helmet>
        <title>تفاصيل الطلب - WEBSCALE</title>
        <meta name="description" content="عرض تفاصيل طلب التسجيل في مجتمع WEBSCALE" />
      </Helmet>
      
      <Navbar navConfig={registrationNav} />
      
      <main className="flex-grow container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">تفاصيل طلب التسجيل</h1>
          <p className="text-gray-600">مراجعة تفاصيل طلبك وحالة الموافقة</p>
        </div>

        <div className="grid gap-6">
          {/* Status Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                حالة الطلب
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(submission.status)}`}>
                  {getStatusText(submission.status)}
                </span>
                <div className="text-sm text-gray-500">
                  <Calendar className="h-4 w-4 inline mr-1" />
                  آخر تحديث: {new Date(submission.updated_at).toLocaleDateString('ar-DZ')}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Name Display */}
          <Card>
            <CardContent className="text-center py-8">
              <User className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {submission.data["الاسم الكامل"]}
              </h2>
              <p className="text-gray-600 mb-4">مرحباً بك في مجتمع WEBSCALE</p>
              <div className="flex items-center justify-center gap-2 text-blue-600">
                <Calendar className="h-4 w-4" />
                <span className="font-medium">يبدأ الحدث في الساعة 9:00 صباحاً</span>
              </div>
            </CardContent>
          </Card>

          {/* Confirmation Section */}
          {submission.status === 'approved' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  تأكيد الحضور
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-4">
                  <p className="text-gray-600">
                    تم قبول طلبك! يرجى تأكيد حضورك للحدث
                  </p>
                  {confirmed ? (
                    <div className="space-y-4">
                      <div className="flex items-center justify-center gap-2 text-green-600">
                        <CheckCircle className="h-5 w-5" />
                        <span className="font-medium">تم تأكيد الحضور بنجاح!</span>
                      </div>
                      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                        <p className="text-orange-800 text-sm font-medium mb-2">
                          🍽️ تذكير: لا تنس طلب الطعام للحدث
                        </p>
                        <p className="text-orange-700 text-xs mb-3">
                          يمكنك طلب الطعام الآن من خلال الرابط أدناه
                        </p>
                        <Button 
                          onClick={() => window.open('https://webscale.slick-pay.com/', '_blank')}
                          size="sm"
                          className="bg-orange-600 hover:bg-orange-700"
                        >
                          طلب الطعام الآن
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <Button 
                      onClick={handleConfirmAttendance}
                      disabled={confirming}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      {confirming ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          جاري التأكيد...
                        </>
                      ) : (
                        'تأكيد الحضور'
                      )}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Food Ordering Section */}
          {(submission.status === 'approved' || submission.status === 'confirmed') && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">🍽️</span>
                  طلب الطعام
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-4">
                  <p className="text-gray-600">
                    هل ترغب في طلب الطعام للحدث؟
                  </p>
                  <p className="text-sm text-gray-500">
                    يمكنك اختيار من قائمة متنوعة من الأطباق
                  </p>
                  <Button 
                    onClick={() => window.open('https://webscale.slick-pay.com/', '_blank')}
                    className="bg-orange-600 hover:bg-orange-700"
                  >
                    طلب الطعام الآن
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {submission.status === 'pending' && (
            <Card>
              <CardContent className="text-center py-8">
                <Clock className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">طلبك قيد المراجعة</h3>
                <p className="text-gray-600">
                  سيتم إشعارك فور الانتهاء من مراجعة طلبك
                </p>
              </CardContent>
            </Card>
          )}

          {submission.status === 'rejected' && (
            <Card>
              <CardContent className="text-center py-8">
                <div className="text-red-500 text-4xl mb-4">❌</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">لم يتم قبول طلبك</h3>
                <p className="text-gray-600">
                  نأسف، لم يتم قبول طلبك في هذا الوقت
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      <Footer 
        resourcesLinks={registrationPlatformLinks} 
        platformLinks={registrationResourcesLinks} 
        communityLinks={communityLinks}
      />
    </div>
  );
}
