import { Link, useParams } from 'react-router';
import { ArrowRight, Users, Star, Clock, Shield, Smartphone, CheckCircle } from 'lucide-react';

export default function CourseDetails() {
  const { id } = useParams();

  // Mock course data
  const course = {
    id: parseInt(id || '1'),
    title: 'شرح الجافاسكريبت للمبتدئين',
    teacher: 'محمد أحمد',
    description: 'دورة كاملة لتعليم أساسيات الجافاسكريبت من الصفر حتى الاحتراف. هتتعلم كل حاجة من المتغيرات والدوال لحد التعامل مع DOM وبناء مشاريع حقيقية.',
    price: 100,
    students: 45,
    rating: 4.8,
    duration: '3 ساعات و 45 دقيقة',
    thumbnail: 'https://images.unsplash.com/photo-1653387137517-fbc54d488ed8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXZhc2NyaXB0JTIwcHJvZ3JhbW1pbmclMjBjb2RlfGVufDF8fHx8MTc3MDk0NDE4Mnww&ixlib=rb-4.1.0&q=80&w=1080',
    topics: [
      'أساسيات JavaScript',
      'المتغيرات والأنواع',
      'الدوال والكائنات',
      'التعامل مع DOM',
      'الأحداث Events',
      'مشروع عملي',
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <Link
            to="/student/catalog"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition"
          >
            <ArrowRight className="w-5 h-5" />
            <span>رجوع للكورسات</span>
          </Link>
        </div>
      </header>

      {/* Course Hero */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
              <p className="text-xl text-blue-100 mb-6">{course.description}</p>

              {/* Teacher */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {course.teacher.charAt(0)}
                </div>
                <div>
                  <p className="text-sm text-blue-100">المدرّس</p>
                  <p className="font-bold text-lg">{course.teacher}</p>
                </div>
              </div>

              {/* Stats */}
              <div className="flex gap-6 text-blue-100">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  <span>{course.students} طالب</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span>{course.rating}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>{course.duration}</span>
                </div>
              </div>
            </div>

            <div>
              <img
                src={course.thumbnail}
                alt={course.title}
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Course Info */}
            <div className="lg:col-span-2 space-y-8">
              {/* What You'll Learn */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">اللي هتتعلمه</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {course.topics.map((topic, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{topic}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">عن الكورس</h2>
                <p className="text-gray-700 leading-relaxed">{course.description}</p>
              </div>
            </div>

            {/* Right Column - Purchase Card */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 sticky top-4">
                <div className="text-center mb-6">
                  <p className="text-gray-600 mb-2">سعر الكورس</p>
                  <p className="text-4xl font-bold text-gray-900">{course.price} جنيه</p>
                </div>

                <Link
                  to={`/student/payment/${course.id}`}
                  className="block w-full py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold text-lg text-center mb-6"
                >
                  اشترك دلوقتي
                </Link>

                {/* Security Features */}
                <div className="space-y-4 pt-6 border-t border-gray-200">
                  <h3 className="font-bold text-gray-900 mb-4">اللي هتحصل عليه:</h3>
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900">كود مشاهدة خاص</p>
                      <p className="text-sm text-gray-600">مربوط بجهازك بس</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Smartphone className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900">مشاهدة مدى الحياة</p>
                      <p className="text-sm text-gray-600">شوف الفيديو أي وقت</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900">محتوى حصري</p>
                      <p className="text-sm text-gray-600">من مدرس محترف</p>
                    </div>
                  </div>
                </div>

                {/* Important Note */}
                <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-900">
                    <strong>مهم:</strong> بعد الدفع هتستلم كود مشاهدة مربوط بجهاز واحد بس.
                    الكود ماينفعش يتشارك مع حد تاني.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
