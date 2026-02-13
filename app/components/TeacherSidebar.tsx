import { Link, useLocation } from 'react-router';
import { LayoutDashboard, Video, Upload, DollarSign, Settings, LogOut, GraduationCap } from 'lucide-react';

export function TeacherSidebar() {
  const location = useLocation();

  const menuItems = [
    { path: '/teacher/overview', icon: LayoutDashboard, label: 'نظرة عامة' },
    { path: '/teacher/my-videos', icon: Video, label: 'فيديوهاتي' },
    { path: '/teacher/upload', icon: Upload, label: 'رفع فيديو جديد' },
    { path: '/teacher/earnings', icon: DollarSign, label: 'أرباحي' },
    { path: '/teacher/settings', icon: Settings, label: 'إعدادات الحساب' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="w-64 bg-white border-l border-gray-200 min-h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <Link to="/" className="flex items-center gap-2">
          <GraduationCap className="w-8 h-8 text-green-600" />
          <div>
            <h1 className="text-xl font-bold text-gray-900">منصة التعليم</h1>
            <p className="text-sm text-gray-500">لوحة المدرّس</p>
          </div>
        </Link>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                isActive(item.path)
                  ? 'bg-green-50 text-green-700 font-semibold'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-200">
        <Link
          to="/"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition"
        >
          <LogOut className="w-5 h-5" />
          <span>تسجيل الخروج</span>
        </Link>
      </div>
    </div>
  );
}
