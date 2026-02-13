import { Link, useParams } from 'react-router';
import { ArrowRight, AlertCircle, Smartphone, GraduationCap } from 'lucide-react';

export default function WatchVideo() {
  const { videoId } = useParams();

  // Mock video data
  const videos: Record<string, any> = {
    '1': {
      title: 'شرح الجافاسكريبت للمبتدئين',
      teacher: 'محمد أحمد',
      description: 'دورة كاملة لتعليم أساسيات الجافاسكريبت',
    },
    '2': {
      title: 'دورة React كاملة',
      teacher: 'سارة خالد',
      description: 'تعلم React من البداية حتى الاحتراف',
    },
    '3': {
      title: 'تصميم قواعد البيانات',
      teacher: 'أحمد علي',
      description: 'شرح عملي لتصميم قواعد البيانات SQL',
    },
  };

  const video = videos[videoId || '1'] || videos['1'];

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
              to="/student/my-videos"
              className="flex items-center gap-2 text-gray-300 hover:text-white transition"
            >
              <ArrowRight className="w-5 h-5" />
              <span>فيديوهاتي</span>
            </Link>
            <Link to="/" className="flex items-center gap-2 text-white">
              <GraduationCap className="w-6 h-6" />
              <span className="font-bold">منصة التعليم</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Video Player */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Video Container */}
          <div className="bg-black rounded-lg overflow-hidden shadow-2xl">
            <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
              {/* Mock Video Player */}
              <div className="text-center text-white p-8">
                <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg
                    className="w-12 h-12"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <p className="text-2xl font-bold mb-2">فيديو الكورس</p>
                <p className="text-gray-400">اضغط Play عشان تبدأ المشاهدة</p>
              </div>
            </div>
          </div>

          {/* Video Info */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h1 className="text-3xl font-bold text-white mb-2">{video.title}</h1>
            <div className="flex items-center gap-4 text-gray-300 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {video.teacher.charAt(0)}
                </div>
                <span>{video.teacher}</span>
              </div>
            </div>
            <p className="text-gray-400">{video.description}</p>
          </div>

          {/* Device Lock Notice */}
          <div className="bg-yellow-900/30 border border-yellow-600/50 rounded-lg p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-yellow-600 rounded-full flex items-center justify-center flex-shrink-0">
                <Smartphone className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-yellow-400 mb-2">
                  الكود مربوط بالجهاز ده
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  الكود بتاعك مربوط بالجهاز اللي انت بتستخدمه دلوقتي. ماينفعش تشوف الفيديو ده على جهاز تاني.
                  دي ميزة أمان عشان نحمي محتوى المدرس.
                </p>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex gap-4">
            <Link
              to="/student/my-videos"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
            >
              فيديوهاتي الأخرى
            </Link>
            <Link
              to="/student/catalog"
              className="px-6 py-3 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800 transition font-semibold"
            >
              تصفح كورسات تانية
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
