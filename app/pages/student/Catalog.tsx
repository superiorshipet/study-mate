import { Link } from 'react-router';
import { GraduationCap, Search, Users, Star, LogOut, Video as VideoIcon } from 'lucide-react';

export default function Catalog() {
  // Mock courses data
  const courses = [
    {
      id: 1,
      title: 'شرح الجافاسكريبت للمبتدئين',
      teacher: 'محمد أحمد',
      description: 'دورة كاملة لتعليم أساسيات الجافاسكريبت من الصفر حتى الاحتراف',
      price: 100,
      students: 45,
      rating: 4.8,
      duration: '3 ساعات',
      thumbnail: 'https://images.unsplash.com/photo-1653387137517-fbc54d488ed8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXZhc2NyaXB0JTIwcHJvZ3JhbW1pbmclMjBjb2RlfGVufDF8fHx8MTc3MDk0NDE4Mnww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: 2,
      title: 'دورة React كاملة',
      teacher: 'سارة خالد',
      description: 'تعلم React من البداية حتى الاحتراف مع مشاريع عملية',
      price: 100,
      students: 89,
      rating: 4.9,
      duration: '5 ساعات',
      thumbnail: 'https://images.unsplash.com/photo-1653387319597-84bde7e5368e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFjdCUyMHByb2dyYW1taW5nfGVufDF8fHx8MTc3MDkwOTg5OHww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: 3,
      title: 'تصميم قواعد البيانات',
      teacher: 'أحمد علي',
      description: 'شرح عملي لتصميم قواعد البيانات SQL',
      price: 100,
      students: 34,
      rating: 4.7,
      duration: '2 ساعة',
      thumbnail: 'https://images.unsplash.com/photo-1597852074816-d933c7d2b988?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhYmFzZSUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzcwOTQ0NjA2fDA&ixlib=rb-4.1.0&q=80&w=1080',
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
                to="/student/my-videos"
                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
              >
                <VideoIcon className="w-5 h-5" />
                <span>فيديوهاتي</span>
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

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">اكتشف عالم المعرفة</h1>
          <p className="text-xl text-blue-100 mb-8">
            آلاف الكورسات من مدرسين محترفين في انتظارك
          </p>
          {/* Search */}
          <div className="max-w-2xl">
            <div className="relative">
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="ابحث عن كورس..."
                className="w-full pr-12 pl-4 py-4 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-white text-gray-900"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">كورسات مميزة</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <Link
                key={course.id}
                to={`/student/course/${course.id}`}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition group"
              >
                {/* Thumbnail */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {course.price} جنيه
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition">
                    {course.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{course.description}</p>

                  {/* Teacher */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {course.teacher.charAt(0)}
                    </div>
                    <span className="text-gray-700 font-semibold">{course.teacher}</span>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm text-gray-600 pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{course.students} طالب</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span>{course.rating}</span>
                    </div>
                    <span>{course.duration}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
