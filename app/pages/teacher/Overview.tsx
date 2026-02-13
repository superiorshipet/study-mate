import { Video, Users, Key, DollarSign, TrendingUp } from 'lucide-react';

export default function Overview() {
  // Mock data
  const stats = {
    totalVideos: 12,
    totalStudents: 387,
    activeCodes: 312,
    totalEarnings: 45600,
  };

  const recentVideos = [
    { id: 1, title: 'شرح الجافاسكريبت للمبتدئين', students: 45, views: 38, earnings: 4500 },
    { id: 2, title: 'دورة React كاملة', students: 89, views: 76, earnings: 8900 },
    { id: 3, title: 'تصميم قواعد البيانات', students: 34, views: 28, earnings: 3400 },
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">نظرة عامة</h1>
        <p className="text-gray-600">ملخص نشاطك على المنصة</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Videos */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Video className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-green-600 text-sm font-semibold flex items-center gap-1">
              <TrendingUp className="w-4 h-4" />
              +2
            </span>
          </div>
          <div>
            <p className="text-gray-600 mb-1">عدد الفيديوهات</p>
            <p className="text-3xl font-bold text-gray-900">{stats.totalVideos}</p>
          </div>
        </div>

        {/* Total Students */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-green-600 text-sm font-semibold flex items-center gap-1">
              <TrendingUp className="w-4 h-4" />
              +23
            </span>
          </div>
          <div>
            <p className="text-gray-600 mb-1">إجمالي الطلبة</p>
            <p className="text-3xl font-bold text-gray-900">{stats.totalStudents}</p>
          </div>
        </div>

        {/* Active Codes */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Key className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-green-600 text-sm font-semibold flex items-center gap-1">
              <TrendingUp className="w-4 h-4" />
              +18
            </span>
          </div>
          <div>
            <p className="text-gray-600 mb-1">الأكواد المستخدمة</p>
            <p className="text-3xl font-bold text-gray-900">{stats.activeCodes}</p>
          </div>
        </div>

        {/* Total Earnings */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 bg-gradient-to-br from-green-50 to-blue-50">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <span className="text-green-600 text-sm font-semibold flex items-center gap-1">
              <TrendingUp className="w-4 h-4" />
              +12%
            </span>
          </div>
          <div>
            <p className="text-gray-600 mb-1">إجمالي الأرباح</p>
            <p className="text-3xl font-bold text-gray-900">{stats.totalEarnings.toLocaleString()} جنيه</p>
          </div>
        </div>
      </div>

      {/* Recent Videos Performance */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">أداء الفيديوهات الأخيرة</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-right font-semibold text-gray-700">اسم الفيديو</th>
                <th className="px-6 py-4 text-right font-semibold text-gray-700">عدد الطلبة</th>
                <th className="px-6 py-4 text-right font-semibold text-gray-700">الأكواد المستخدمة</th>
                <th className="px-6 py-4 text-right font-semibold text-gray-700">الدخل</th>
                <th className="px-6 py-4 text-right font-semibold text-gray-700">الأداء</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recentVideos.map((video) => {
                const usageRate = Math.round((video.views / video.students) * 100);
                return (
                  <tr key={video.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <p className="font-semibold text-gray-900">{video.title}</p>
                    </td>
                    <td className="px-6 py-4 text-gray-700">{video.students}</td>
                    <td className="px-6 py-4 text-gray-700">{video.views}</td>
                    <td className="px-6 py-4">
                      <span className="font-semibold text-green-600">{video.earnings.toLocaleString()} جنيه</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-[100px]">
                          <div
                            className="bg-green-600 h-2 rounded-full"
                            style={{ width: `${usageRate}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600">{usageRate}%</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
