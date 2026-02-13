import { useState } from 'react';
import { Link, useParams } from 'react-router';
import { CheckCircle, Copy, Video, Smartphone, Shield } from 'lucide-react';

export default function PaymentSuccess() {
  const { id } = useParams();
  const [copied, setCopied] = useState(false);

  // Mock data
  const course = {
    id: parseInt(id || '1'),
    title: 'شرح الجافاسكريبت للمبتدئين',
    teacher: 'محمد أحمد',
  };

  // Generate a mock access code
  const accessCode = 'JS-2026-' + Math.random().toString(36).substr(2, 9).toUpperCase();

  const handleCopy = () => {
    navigator.clipboard.writeText(accessCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          {/* Success Header */}
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-8 text-center">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold mb-2">الدفع تم بنجاح! 🎉</h1>
            <p className="text-green-100 text-lg">
              مبروك! أنت دلوقتي جزء من عائلة المتعلمين
            </p>
          </div>

          {/* Course Info */}
          <div className="p-6 bg-gray-50 border-b border-gray-200">
            <p className="text-sm text-gray-600 mb-2">اشتركت في</p>
            <h2 className="text-xl font-bold text-gray-900">{course.title}</h2>
            <p className="text-gray-600">المدرّس: {course.teacher}</p>
          </div>

          {/* Access Code */}
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
              كود المشاهدة الخاص بيك
            </h2>
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-300 rounded-xl p-6 mb-6">
              <div className="text-center mb-4">
                <code className="text-3xl font-bold text-blue-600 tracking-wider block mb-4">
                  {accessCode}
                </code>
                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
                >
                  <Copy className="w-5 h-5" />
                  {copied ? 'تم النسخ ✓' : 'انسخ الكود'}
                </button>
              </div>
            </div>

            {/* Important Notice */}
            <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-6 mb-6">
              <div className="flex items-start gap-3">
                <Shield className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-yellow-900 mb-2">مهم جداً - احفظ الكود ده!</h3>
                  <ul className="space-y-2 text-sm text-yellow-900">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-yellow-600 rounded-full mt-1.5 flex-shrink-0"></span>
                      <span>الكود ده مربوط بجهازك الحالي بس</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-yellow-600 rounded-full mt-1.5 flex-shrink-0"></span>
                      <span>ماينفعش تشاركه مع حد تاني أو تستخدمه على جهاز مختلف</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-yellow-600 rounded-full mt-1.5 flex-shrink-0"></span>
                      <span>احفظ الكود في مكان آمن عشان تقدر تشوف الفيديو في أي وقت</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                <Smartphone className="w-6 h-6 text-blue-600 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900">مشاهدة مدى الحياة</p>
                  <p className="text-sm text-gray-600">شوف الفيديو أي وقت تحب</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg">
                <Video className="w-6 h-6 text-purple-600 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900">جودة عالية</p>
                  <p className="text-sm text-gray-600">محتوى مميز من مدرس محترف</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to={`/student/watch/${course.id}`}
                className="flex-1 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold text-center"
              >
                شاهد الفيديو دلوقتي
              </Link>
              <Link
                to="/student/my-videos"
                className="flex-1 py-4 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-semibold text-center"
              >
                فيديوهاتي
              </Link>
            </div>
          </div>
        </div>

        {/* Support */}
        <div className="mt-6 text-center text-sm text-gray-600">
          <p>لو عندك أي استفسار، تواصل مع الدعم الفني</p>
        </div>
      </div>
    </div>
  );
}
