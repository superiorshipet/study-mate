import { useState } from 'react';
import { Upload, Video, FileText, Tag, DollarSign, CheckCircle } from 'lucide-react';

export default function UploadVideo() {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploading(false);
          setUploadSuccess(true);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  if (uploadSuccess) {
    return (
      <div className="p-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">تم رفع الفيديو بنجاح! 🎉</h2>
            <p className="text-gray-600 mb-8">
              الفيديو بتاعك اتنشر على المنصة وجاهز الطلبة يشوفوه ويشتركوا فيه
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => setUploadSuccess(false)}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold"
              >
                ارفع فيديو تاني
              </button>
              <a
                href="/teacher/my-videos"
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-semibold"
              >
                شوف فيديوهاتي
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">رفع فيديو جديد</h1>
        <p className="text-gray-600">شارك خبرتك مع الطلبة وابدأ الكسب</p>
      </div>

      <div className="max-w-3xl mx-auto">
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          {/* Video Title */}
          <div className="mb-6">
            <label className="flex items-center gap-2 text-gray-700 mb-2">
              <FileText className="w-5 h-5" />
              عنوان الفيديو
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="اكتب عنوان واضح ومميز للفيديو"
              required
              disabled={uploading}
            />
          </div>

          {/* Description */}
          <div className="mb-6">
            <label className="flex items-center gap-2 text-gray-700 mb-2">
              <FileText className="w-5 h-5" />
              الوصف
            </label>
            <textarea
              rows={5}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
              placeholder="اشرح محتوى الفيديو وإيه اللي هيتعلمه الطالب..."
              required
              disabled={uploading}
            />
          </div>

          {/* Subject/Category */}
          <div className="mb-6">
            <label className="flex items-center gap-2 text-gray-700 mb-2">
              <Tag className="w-5 h-5" />
              المادة / التصنيف
            </label>
            <select
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
              disabled={uploading}
            >
              <option value="">اختار المادة</option>
              <option value="programming">برمجة</option>
              <option value="design">تصميم</option>
              <option value="marketing">تسويق</option>
              <option value="business">أعمال</option>
              <option value="languages">لغات</option>
              <option value="other">أخرى</option>
            </select>
          </div>

          {/* Price */}
          <div className="mb-6">
            <label className="flex items-center gap-2 text-gray-700 mb-2">
              <DollarSign className="w-5 h-5" />
              السعر (بالجنيه المصري)
            </label>
            <input
              type="number"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="100"
              min="1"
              required
              disabled={uploading}
            />
          </div>

          {/* Video File */}
          <div className="mb-6">
            <label className="flex items-center gap-2 text-gray-700 mb-2">
              <Video className="w-5 h-5" />
              ملف الفيديو
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-green-500 transition">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Upload className="w-8 h-8 text-green-600" />
              </div>
              <p className="text-gray-700 font-semibold mb-2">اضغط لرفع الفيديو</p>
              <p className="text-sm text-gray-500 mb-4">أو اسحب الملف وحطه هنا</p>
              <input
                type="file"
                accept="video/*"
                className="hidden"
                id="video-upload"
                disabled={uploading}
              />
              <label
                htmlFor="video-upload"
                className="inline-block px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition cursor-pointer"
              >
                اختار ملف
              </label>
              <p className="text-xs text-gray-500 mt-4">
                الحد الأقصى لحجم الملف: 2 جيجا | الصيغ المدعومة: MP4, AVI, MOV
              </p>
            </div>
          </div>

          {/* Upload Progress */}
          {uploading && (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-700 font-semibold">جاري رفع الفيديو...</span>
                <span className="text-sm text-green-600 font-semibold">{uploadProgress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={uploading}
            className="w-full py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold text-lg disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {uploading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                جاري الرفع...
              </>
            ) : (
              <>
                <Upload className="w-5 h-5" />
                ارفع الفيديو
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
