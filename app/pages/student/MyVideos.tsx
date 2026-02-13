import { Link } from 'react-router';
import { GraduationCap, Play, Calendar, LogOut } from 'lucide-react';

export default function MyVideos() {
  // Mock purchased videos
  const myVideos = [
    {
      id: 1,
      title: 'شرح الجافاسكريبت للمبتدئين',
      teacher: 'محمد أحمد',
      purchaseDate: '2026-02-01',
      accessCode: 'JS-2026-A3B4C5D',
      thumbnail: 'https://images.unsplash.com/photo-1653387137517-fbc54d488ed8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXZhc2NyaXB0JTIwcHJvZ3JhbW1pbmclMjBjb2RlfGVufDF8fHx8MTc3MDk0NDE4Mnww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: 2,
      title: 'دورة React كاملة',
      teacher: 'سارة خالد',
      purchaseDate: '2026-02-08',
      accessCode: 'REACT-2026-X7Y8Z9',
      thumbnail: 'https://images.unsplash.com/photo-1653387319597-84bde7e5368e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFjdCUyMHByb2dyYW1taW5nfGVufDF8fHx8MTc3MDkwOTg5OHww&ixlib=rb-4.1.0&q=80&w=1080',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <GraduationCap className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">منصة التعليم</h1>
            </Link>
            <div className="flex items-center gap-4">
              <Link
                to="/student/catalog"
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
              >
                تصفح الكورسات
              </Link>
              <Link
                to="/student/enter-code"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                عندك كود؟
              </Link>
              <Link
                to="/"
                className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition"
              >
                <LogOut className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">فيديوهاتي</h1>
          <p className="text-gray-600">كل الكورسات اللي اشتركت فيها</p>
        </div>

        {/* Videos Grid */}
        {myVideos.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myVideos.map((video) => (
              <div
                key={video.id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition"
              >
                {/* Thumbnail */}
                <div className="relative h-48 overflow-hidden bg-gray-200">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition">
                    <Link
                      to={`/student/watch/${video.id}`}
                      className="w-16 h-16 bg-white rounded-full flex items-center justify-center hover:scale-110 transition"
                    >
                      <Play className="w-8 h-8 text-blue-600 mr-[-4px]" fill="currentColor" />
                    </Link>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{video.title}</h3>

                  {/* Teacher */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {video.teacher.charAt(0)}
                    </div>
                    <span className="text-gray-700">{video.teacher}</span>
                  </div>

                  {/* Purchase Date */}
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                    <Calendar className="w-4 h-4" />
                    <span>
                      اشتركت في {new Date(video.purchaseDate).toLocaleDateString('ar-EG')}
                    </span>
                  </div>

                  {/* Access Code */}
                  <div className="bg-gray-50 rounded-lg p-3 mb-4">
                    <p className="text-xs text-gray-600 mb-1">كود المشاهدة</p>
                    <code className="text-sm font-mono text-blue-600 font-semibold">
                      {video.accessCode}
                    </code>
                  </div>

                  {/* Watch Button */}
                  <Link
                    to={`/student/watch/${video.id}`}
                    className="block w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold text-center flex items-center justify-center gap-2"
                  >
                    <Play className="w-5 h-5" />
                    شاهد الآن
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Empty State
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <GraduationCap className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">لسه ماشتركتش في أي كورس</h2>
            <p className="text-gray-600 mb-8">تصفح الكورسات المتاحة وابدأ رحلة التعلم</p>
            <Link
              to="/student/catalog"
              className="inline-block px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
            >
              تصفح الكورسات
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
