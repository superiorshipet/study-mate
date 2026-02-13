import { Link, useParams } from 'react-router';
import { ArrowRight, Users, Eye, DollarSign, Video, Calendar, CheckCircle, XCircle } from 'lucide-react';

export default function VideoDetails() {
  const { id } = useParams();

  // Mock data for this specific video
  const video = {
    id: parseInt(id || '1'),
    title: 'شرح الجافاسكريبت للمبتدئين',
    description: 'دورة كاملة لتعليم أساسيات الجافاسكريبت من الصفر حتى الاحتراف. تتضمن الدورة شرح المتغيرات، الدوال، الكائنات، والتعامل مع DOM.',
    uploadDate: '2026-01-15',
    duration: '3 ساعات و 45 دقيقة',
    price: 100,
    totalStudents: 45,
    activeCodes: 38,
    totalEarnings: 4500,
  };

  const students = [
    {
      id: 1,
      name: 'أحمد محمد',
      email: 'ahmed@example.com',
      subscriptionDate: '2026-01-16',
      codeStatus: 'active',
      deviceId: 'XXXX-XXXX-3a4b',
    },
    {
      id: 2,
      name: 'فاطمة علي',
      email: 'fatma@example.com',
      subscriptionDate: '2026-01-18',
      codeStatus: 'active',
      deviceId: 'XXXX-XXXX-7c8d',
    },
    {
      id: 3,
      name: 'محمود حسن',
      email: 'mahmoud@example.com',
      subscriptionDate: '2026-01-20',
      codeStatus: 'active',
      deviceId: 'XXXX-XXXX-9e0f',
    },
    {
      id: 4,
      name: 'سارة خالد',
      email: 'sara@example.com',
      subscriptionDate: '2026-01-22',
      codeStatus: 'expired',
      deviceId: '-',
    },
    {
      id: 5,
      name: 'عمر يوسف',
      email: 'omar@example.com',
      subscriptionDate: '2026-01-25',
      codeStatus: 'active',
      deviceId: 'XXXX-XXXX-1g2h',
    },
  ];

  return (
    <div className="p-8">
      {/* Back Button */}
      <Link
        to="/teacher/my-videos"
        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition"
      >
        <ArrowRight className="w-5 h-5" />
        <span>رجوع للفيديوهات</span>
      </Link>

      {/* Video Info */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
            <Video className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{video.title}</h1>
            <p className="text-gray-600 mb-4">{video.description}</p>
            <div className="flex flex-wrap gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {new Date(video.uploadDate).toLocaleDateString('ar-EG')}
              </span>
              <span>•</span>
              <span>{video.duration}</span>
              <span>•</span>
              <span className="font-semibold text-green-600">{video.price} جنيه</span>
            </div>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-purple-50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-1">
              <Users className="w-5 h-5 text-purple-600" />
              <p className="text-sm text-purple-600 font-semibold">الطلبة المشتركين</p>
            </div>
            <p className="text-3xl font-bold text-gray-900">{video.totalStudents}</p>
          </div>

          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-1">
              <Eye className="w-5 h-5 text-green-600" />
              <p className="text-sm text-green-600 font-semibold">الأكواد المستخدمة</p>
            </div>
            <p className="text-3xl font-bold text-gray-900">{video.activeCodes}</p>
            <p className="text-sm text-gray-500 mt-1">
              {Math.round((video.activeCodes / video.totalStudents) * 100)}% نسبة التفعيل
            </p>
          </div>

          <div className="bg-yellow-50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-1">
              <DollarSign className="w-5 h-5 text-yellow-600" />
              <p className="text-sm text-yellow-600 font-semibold">إجمالي الدخل</p>
            </div>
            <p className="text-3xl font-bold text-gray-900">{video.totalEarnings.toLocaleString()}</p>
            <p className="text-sm text-gray-500 mt-1">جنيه مصري</p>
          </div>
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">الطلبة المشتركين</h2>
          <p className="text-gray-600 mt-1">قائمة بكل الطلبة اللي اشتركوا في الفيديو ده</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-right font-semibold text-gray-700">اسم الطالب</th>
                <th className="px-6 py-4 text-right font-semibold text-gray-700">البريد</th>
                <th className="px-6 py-4 text-right font-semibold text-gray-700">تاريخ الاشتراك</th>
                <th className="px-6 py-4 text-right font-semibold text-gray-700">حالة الكود</th>
                <th className="px-6 py-4 text-right font-semibold text-gray-700">الجهاز المرتبط</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {students.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <p className="font-semibold text-gray-900">{student.name}</p>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{student.email}</td>
                  <td className="px-6 py-4 text-gray-600">
                    {new Date(student.subscriptionDate).toLocaleDateString('ar-EG')}
                  </td>
                  <td className="px-6 py-4">
                    {student.codeStatus === 'active' ? (
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                        <CheckCircle className="w-4 h-4" />
                        نشط
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-semibold">
                        <XCircle className="w-4 h-4" />
                        منتهي
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <code className="px-2 py-1 bg-gray-100 rounded text-sm text-gray-700">
                      {student.deviceId}
                    </code>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
