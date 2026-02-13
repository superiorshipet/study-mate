import { useState } from 'react';
import { DollarSign, TrendingUp, Calendar, Info } from 'lucide-react';

export default function Earnings() {
  const [viewMode, setViewMode] = useState<'all' | 'monthly'>('all');

  // Mock data
  const totalEarnings = 45600;

  const videoEarnings = [
    {
      id: 1,
      title: 'دورة React كاملة',
      students: 89,
      activeCodes: 76,
      pricePerStudent: 100,
      totalEarnings: 8900,
      growth: '+15%',
    },
    {
      id: 2,
      title: 'Node.js للمبتدئين',
      students: 67,
      activeCodes: 55,
      pricePerStudent: 100,
      totalEarnings: 6700,
      growth: '+8%',
    },
    {
      id: 3,
      title: 'CSS المتقدم والأنيميشن',
      students: 52,
      activeCodes: 44,
      pricePerStudent: 100,
      totalEarnings: 5200,
      growth: '+12%',
    },
    {
      id: 4,
      title: 'شرح الجافاسكريبت للمبتدئين',
      students: 45,
      activeCodes: 38,
      pricePerStudent: 100,
      totalEarnings: 4500,
      growth: '+5%',
    },
    {
      id: 5,
      title: 'تصميم قواعد البيانات',
      students: 34,
      activeCodes: 28,
      pricePerStudent: 100,
      totalEarnings: 3400,
      growth: '+3%',
    },
  ];

  const monthlyEarnings = [
    { month: 'فبراير 2026', earnings: 18500, videos: 12 },
    { month: 'يناير 2026', earnings: 15200, videos: 10 },
    { month: 'ديسمبر 2025', earnings: 11900, videos: 8 },
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">أرباحي</h1>
        <p className="text-gray-600">متابعة الدخل من كل الفيديوهات</p>
      </div>

      {/* Total Earnings Card */}
      <div className="bg-gradient-to-br from-green-500 to-blue-600 rounded-xl shadow-lg p-8 mb-8 text-white">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-green-100 mb-2">إجمالي الأرباح</p>
            <h2 className="text-5xl font-bold mb-4">{totalEarnings.toLocaleString()} جنيه</h2>
            <div className="flex items-center gap-2 text-green-100">
              <TrendingUp className="w-5 h-5" />
              <span>زيادة 23% عن الشهر اللي فات</span>
            </div>
          </div>
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
            <DollarSign className="w-8 h-8" />
          </div>
        </div>
      </div>

      {/* Info Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex items-start gap-3">
        <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-blue-900">
          <p className="font-semibold mb-1">ملاحظة هامة</p>
          <p>
            الأرقام دي خاصة بيك، الدفع الفعلي بيتم من خلال إدارة المنصة أو بوابة الدفع.
            الأرباح بتتحسب على أساس عدد الطلبة المشتركين في كل فيديو.
          </p>
        </div>
      </div>

      {/* View Mode Toggle */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setViewMode('all')}
          className={`px-6 py-3 rounded-lg font-semibold transition ${
            viewMode === 'all'
              ? 'bg-gray-900 text-white'
              : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
          }`}
        >
          حسب الفيديو
        </button>
        <button
          onClick={() => setViewMode('monthly')}
          className={`px-6 py-3 rounded-lg font-semibold transition ${
            viewMode === 'monthly'
              ? 'bg-gray-900 text-white'
              : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
          }`}
        >
          حسب الشهر
        </button>
      </div>

      {/* By Video */}
      {viewMode === 'all' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-900">الأرباح حسب الفيديو</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-right font-semibold text-gray-700">اسم الفيديو</th>
                  <th className="px-6 py-4 text-right font-semibold text-gray-700">عدد الطلبة</th>
                  <th className="px-6 py-4 text-right font-semibold text-gray-700">الأكواد المستخدمة</th>
                  <th className="px-6 py-4 text-right font-semibold text-gray-700">السعر للطالب</th>
                  <th className="px-6 py-4 text-right font-semibold text-gray-700">المبلغ الكلي</th>
                  <th className="px-6 py-4 text-right font-semibold text-gray-700">النمو</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {videoEarnings.map((video, index) => (
                  <tr key={video.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                          {index + 1}
                        </span>
                        <p className="font-semibold text-gray-900">{video.title}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-700">{video.students}</td>
                    <td className="px-6 py-4 text-gray-700">{video.activeCodes}</td>
                    <td className="px-6 py-4 text-gray-700">{video.pricePerStudent} جنيه</td>
                    <td className="px-6 py-4">
                      <span className="text-lg font-bold text-green-600">
                        {video.totalEarnings.toLocaleString()} جنيه
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1 text-green-600 font-semibold">
                        <TrendingUp className="w-4 h-4" />
                        {video.growth}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-gray-50 border-t-2 border-gray-200">
                <tr>
                  <td colSpan={4} className="px-6 py-4 text-right font-bold text-gray-900">
                    الإجمالي
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xl font-bold text-green-600">
                      {totalEarnings.toLocaleString()} جنيه
                    </span>
                  </td>
                  <td></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}

      {/* By Month */}
      {viewMode === 'monthly' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-900">الأرباح حسب الشهر</h2>
          </div>
          <div className="p-6 space-y-4">
            {monthlyEarnings.map((month, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-6 bg-gradient-to-l from-green-50 to-blue-50 rounded-xl border border-gray-100"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-lg">{month.month}</p>
                    <p className="text-gray-600 text-sm">{month.videos} فيديو نشط</p>
                  </div>
                </div>
                <div className="text-left">
                  <p className="text-3xl font-bold text-green-600">
                    {month.earnings.toLocaleString()}
                  </p>
                  <p className="text-gray-600">جنيه مصري</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
