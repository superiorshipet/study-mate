import { Link } from 'react-router';
import { Video, Eye, Users, DollarSign, ArrowLeft } from 'lucide-react';

export default function MyVideos() {
  // Mock data
  const videos = [
    {
      id: 1,
      title: 'شرح الجافاسكريبت للمبتدئين',
      description: 'دورة كاملة لتعليم أساسيات الجافاسكريبت من الصفر',
      students: 45,
      activeCodes: 38,
      earnings: 4500,
      uploadDate: '2026-01-15',
    },
    {
      id: 2,
      title: 'دورة React كاملة',
      description: 'تعلم React من البداية حتى الاحتراف',
      students: 89,
      activeCodes: 76,
      earnings: 8900,
      uploadDate: '2026-01-20',
    },
    {
      id: 3,
      title: 'تصميم قواعد البيانات',
      description: 'شرح عملي لتصميم قواعد البيانات SQL',
      students: 34,
      activeCodes: 28,
      earnings: 3400,
      uploadDate: '2026-02-01',
    },
    {
      id: 4,
      title: 'Node.js للمبتدئين',
      description: 'بناء تطبيقات Backend بـ Node.js',
      students: 67,
      activeCodes: 55,
      earnings: 6700,
      uploadDate: '2026-02-05',
    },
    {
      id: 5,
      title: 'CSS المتقدم والأنيميشن',
      description: 'تقنيات متقدمة في CSS وحركات مميزة',
      students: 52,
      activeCodes: 44,
      earnings: 5200,
      uploadDate: '2026-02-10',
    },
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">فيديوهاتي</h1>
          <p className="text-gray-600">كل الفيديوهات اللي رفعتها على المنصة</p>
        </div>
        <Link
          to="/teacher/upload"
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold flex items-center gap-2"
        >
          <Video className="w-5 h-5" />
          ارفع فيديو جديد
        </Link>
      </div>

      {/* Videos Grid */}
      <div className="grid gap-6">
        {videos.map((video) => {
          const usageRate = Math.round((video.activeCodes / video.students) * 100);
          return (
            <div
              key={video.id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{video.title}</h3>
                    <p className="text-gray-600 mb-4">{video.description}</p>
                    <p className="text-sm text-gray-500">
                      تم الرفع: {new Date(video.uploadDate).toLocaleDateString('ar-EG')}
                    </p>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="bg-purple-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <Users className="w-4 h-4 text-purple-600" />
                      <p className="text-sm text-purple-600 font-semibold">الطلبة المشتركين</p>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{video.students}</p>
                  </div>

                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <Eye className="w-4 h-4 text-green-600" />
                      <p className="text-sm text-green-600 font-semibold">الأكواد المستخدمة</p>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{video.activeCodes}</p>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm text-blue-600 font-semibold">نسبة الاستخدام</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{usageRate}%</p>
                  </div>

                  <div className="bg-yellow-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <DollarSign className="w-4 h-4 text-yellow-600" />
                      <p className="text-sm text-yellow-600 font-semibold">الدخل</p>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{video.earnings.toLocaleString()}</p>
                  </div>
                </div>

                {/* Action Button */}
                <Link
                  to={`/teacher/video/${video.id}`}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition font-semibold"
                >
                  <span>شوف التفاصيل</span>
                  <ArrowLeft className="w-4 h-4" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
