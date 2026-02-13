import { User, Mail, Lock, Bell, CreditCard } from 'lucide-react';

export default function Settings() {
  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">إعدادات الحساب</h1>
        <p className="text-gray-600">إدارة معلوماتك الشخصية والإعدادات</p>
      </div>

      <div className="max-w-3xl space-y-6">
        {/* Personal Info */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <User className="w-6 h-6 text-green-600" />
            المعلومات الشخصية
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">الاسم</label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                defaultValue="محمد أحمد"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">البريد الإلكتروني</label>
              <input
                type="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                defaultValue="mohamed@example.com"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">نبذة مختصرة</label>
              <textarea
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                defaultValue="مدرس برمجة بخبرة 5 سنين في تعليم الويب وتطوير التطبيقات"
              />
            </div>
          </div>
          <button className="mt-4 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold">
            حفظ التغييرات
          </button>
        </div>

        {/* Password */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Lock className="w-6 h-6 text-green-600" />
            تغيير كلمة المرور
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">كلمة المرور الحالية</label>
              <input
                type="password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="••••••••"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">كلمة المرور الجديدة</label>
              <input
                type="password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="••••••••"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">تأكيد كلمة المرور الجديدة</label>
              <input
                type="password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="••••••••"
              />
            </div>
          </div>
          <button className="mt-4 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold">
            تحديث كلمة المرور
          </button>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Bell className="w-6 h-6 text-green-600" />
            الإشعارات
          </h2>
          <div className="space-y-4">
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-gray-700">إشعارات الاشتراكات الجديدة</span>
              <input type="checkbox" defaultChecked className="w-5 h-5 text-green-600 rounded" />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-gray-700">إشعارات تفعيل الأكواد</span>
              <input type="checkbox" defaultChecked className="w-5 h-5 text-green-600 rounded" />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-gray-700">التحديثات والعروض</span>
              <input type="checkbox" className="w-5 h-5 text-green-600 rounded" />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
