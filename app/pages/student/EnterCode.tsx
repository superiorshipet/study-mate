import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { Key, AlertCircle, CheckCircle } from 'lucide-react';

export default function EnterCode() {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [checking, setChecking] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setChecking(true);

    // Simulate code validation
    setTimeout(() => {
      setChecking(false);
      
      // Mock validation - accept codes that start with specific patterns
      if (code.startsWith('JS-') || code.startsWith('REACT-') || code.startsWith('DB-')) {
        // Extract video ID from code (mock logic)
        const videoId = code.includes('REACT') ? '2' : code.includes('DB') ? '3' : '1';
        navigate(`/student/watch/${videoId}`);
      } else {
        setError('الكود مش صحيح أو منتهي. تأكد من الكود وحاول تاني.');
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Key className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">معاك كود فيديو؟</h1>
            <p className="text-gray-600">اكتب الكود عشان تشوف الفيديو</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 mb-2 font-semibold">كود المشاهدة</label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                placeholder="JS-2026-XXXXXXX"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-center text-lg font-mono tracking-wider"
                required
                disabled={checking}
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-900">{error}</p>
              </div>
            )}

            {/* Info Box */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-900">
                <p className="font-semibold mb-1">تذكير</p>
                <p>الكود بتاعك مربوط بجهازك الحالي. لو كنت بتستخدم جهاز مختلف، الكود مش هيشتغل.</p>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={checking || !code}
              className="w-full py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold text-lg disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {checking ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  جاري التحقق...
                </>
              ) : (
                <>
                  <Key className="w-5 h-5" />
                  ادخل على الفيديو
                </>
              )}
            </button>
          </form>

          {/* Help Links */}
          <div className="mt-8 pt-6 border-t border-gray-200 space-y-3 text-center">
            <Link
              to="/student/catalog"
              className="block text-blue-600 hover:text-blue-700 transition"
            >
              ماعندكش كود؟ تصفح الكورسات المتاحة
            </Link>
            <Link
              to="/student/my-videos"
              className="block text-gray-600 hover:text-gray-900 transition"
            >
              شوف فيديوهاتك المحفوظة
            </Link>
          </div>
        </div>

        {/* Demo Codes */}
        <div className="mt-6 bg-gray-100 rounded-lg p-4">
          <p className="text-xs text-gray-600 text-center mb-2">
            <strong>للتجربة:</strong> استخدم الأكواد التالية
          </p>
          <div className="text-xs text-gray-700 text-center space-y-1">
            <code className="block">JS-2026-DEMO</code>
            <code className="block">REACT-2026-TEST</code>
            <code className="block">DB-2026-SAMPLE</code>
          </div>
        </div>
      </div>
    </div>
  );
}
