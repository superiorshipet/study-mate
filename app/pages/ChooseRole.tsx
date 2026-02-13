import { Link } from 'react-router';
import { GraduationCap, User } from 'lucide-react';

export default function ChooseRole() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <GraduationCap className="w-12 h-12 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">منصة التعليم</h1>
          </div>
          <p className="text-xl text-gray-600">اختار أنت مين عشان نوصلك للمكان الصح</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Student Card */}
          <Link to="/student/login" className="group">
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all transform hover:-translate-y-1 border-2 border-transparent hover:border-blue-500">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-600 transition">
                <User className="w-8 h-8 text-blue-600 group-hover:text-white transition" />
              </div>
              <h2 className="text-2xl font-bold text-center mb-4">أنا طالب</h2>
              <p className="text-gray-600 text-center mb-6">
                عايز أتعلم وأشوف كورسات مميزة من مدرسين محترفين
              </p>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                  <span>تصفح الكورسات المتاحة</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                  <span>اشترك ودفع بأمان</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                  <span>استلم كود مشاهدة خاص بيك</span>
                </li>
              </ul>
            </div>
          </Link>

          {/* Teacher Card */}
          <Link to="/teacher/login" className="group">
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all transform hover:-translate-y-1 border-2 border-transparent hover:border-green-500">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-green-600 transition">
                <GraduationCap className="w-8 h-8 text-green-600 group-hover:text-white transition" />
              </div>
              <h2 className="text-2xl font-bold text-center mb-4">أنا مدرّس</h2>
              <p className="text-gray-600 text-center mb-6">
                عايز أشارك خبرتي وأوصل لأكبر عدد من الطلبة
              </p>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                  <span>ارفع الفيديوهات بسهولة</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                  <span>تابع عدد الطلبة والأكواد</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                  <span>شوف أرباحك بوضوح</span>
                </li>
              </ul>
            </div>
          </Link>
        </div>

        <div className="text-center mt-8">
          <Link to="/" className="text-gray-600 hover:text-gray-900 transition">
            رجوع للصفحة الرئيسية
          </Link>
        </div>
      </div>
    </div>
  );
}
