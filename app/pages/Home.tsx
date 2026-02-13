import { Link } from 'react-router';
import { GraduationCap, Video, Users, CreditCard, Lock, CheckCircle } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">منصة التعليم</h1>
            </div>
            <Link
              to="/choose-role"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              ابدأ دلوقتي
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                درّس واتعلّم… في مكان واحد
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                المدرّس يرفع الفيديوهات، الطلبة يشتركوا ويدفعوا، وكل طالب بياخد كود مشاهدة مربوط بجهازه بس
              </p>
              <div className="flex gap-4 flex-wrap">
                <Link
                  to="/choose-role"
                  className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-lg font-semibold"
                >
                  أنا طالب
                </Link>
                <Link
                  to="/choose-role"
                  className="px-8 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-lg font-semibold"
                >
                  أنا مدرّس
                </Link>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1758612215020-842383aadb9e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbmxpbmUlMjBlZHVjYXRpb24lMjBzdHVkZW50JTIwbGFwdG9wfGVufDF8fHx8MTc3MDkxOTc0OXww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="تعلم أونلاين"
                className="rounded-2xl shadow-2xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Student Features */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">مميزات للطالب</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 border rounded-xl hover:shadow-lg transition">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Video className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">فيديوهات متنوعة</h3>
              <p className="text-gray-600">
                اختار من مجموعة كبيرة من الكورسات والدروس في مجالات مختلفة
              </p>
            </div>
            <div className="p-6 border rounded-xl hover:shadow-lg transition">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Lock className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">حماية الكود</h3>
              <p className="text-gray-600">
                كل كود مشاهدة مربوط بجهاز واحد بس عشان حماية محتوى المدرس
              </p>
            </div>
            <div className="p-6 border rounded-xl hover:shadow-lg transition">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <CreditCard className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">دفع آمن</h3>
              <p className="text-gray-600">
                نظام دفع مشفّر ومؤمّن بالكامل عشان راحتك وأمانك
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Teacher Features */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">مميزات للمدرّس</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://images.unsplash.com/photo-1588912914074-b93851ff14b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFjaGVyJTIwdGVhY2hpbmclMjBvbmxpbmV8ZW58MXx8fHwxNzcwOTQ0MzM0fDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="مدرس"
                className="rounded-2xl shadow-xl w-full"
              />
            </div>
            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">ارفع الفيديوهات بسهولة</h3>
                  <p className="text-gray-600">
                    رفّع الدروس والكورسات بتاعتك بكل سهولة ووصّلها لآلاف الطلبة
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">تابع عدد الطلبة</h3>
                  <p className="text-gray-600">
                    شوف كام طالب اشترك في الكورسات بتاعتك وكام واحد فعّل الكود
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CreditCard className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">اعرف أرباحك</h3>
                  <p className="text-gray-600">
                    تابع مكاسبك من كل فيديو وشوف الأرباح الشهرية من لوحة التحكم
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-4xl font-bold">جاهز تبدأ؟</h2>
          <p className="text-xl opacity-90">
            سواء كنت طالب بتدور على محتوى مميز أو مدرّس عايز توصل لأكبر عدد من الطلبة
          </p>
          <Link
            to="/choose-role"
            className="inline-block px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition text-lg font-semibold"
          >
            ابدأ دلوقتي
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400">© 2026 منصة التعليم - كل الحقوق محفوظة</p>
        </div>
      </footer>
    </div>
  );
}
