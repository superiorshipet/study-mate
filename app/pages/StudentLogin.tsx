import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { GraduationCap, Mail, Lock, User as UserIcon } from 'lucide-react';

export default function StudentLogin() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login - في التطبيق الحقيقي هيكون في authentication
    navigate('/student/catalog');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <UserIcon className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {isLogin ? 'دخول الطالب' : 'تسجيل حساب طالب'}
            </h1>
            <p className="text-gray-600">
              {isLogin ? 'اهلا بيك تاني!' : 'انضم لآلاف الطلبة'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-gray-700 mb-2">الاسم</label>
                <div className="relative">
                  <UserIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="اكتب اسمك"
                    required
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-gray-700 mb-2">البريد الإلكتروني</label>
              <div className="relative">
                <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="example@email.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">كلمة المرور</label>
              <div className="relative">
                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
            >
              {isLogin ? 'دخول' : 'تسجيل'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-600 hover:text-blue-700 transition"
            >
              {isLogin ? 'ماعندكش حساب؟ سجّل دلوقتي' : 'عندك حساب؟ ادخل'}
            </button>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200 text-center">
            <Link to="/choose-role" className="text-gray-600 hover:text-gray-900 transition">
              رجوع لاختيار الدور
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
