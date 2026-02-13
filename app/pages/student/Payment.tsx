import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { CreditCard, Lock, Shield, AlertCircle } from 'lucide-react';

export default function Payment() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);

  // Mock course data
  const course = {
    id: parseInt(id || '1'),
    title: 'شرح الجافاسكريبت للمبتدئين',
    teacher: 'محمد أحمد',
    price: 100,
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false);
      navigate(`/student/payment-success/${course.id}`);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Security Banner */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-center gap-3">
          <Shield className="w-6 h-6 text-green-600 flex-shrink-0" />
          <div className="text-sm text-green-900">
            <p className="font-semibold">الدفع آمن ومشفّر بالكامل</p>
            <p>ما بنخزنش بيانات الكارت | بوابة دفع معتمدة</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
            <h1 className="text-2xl font-bold mb-2">إتمام عملية الدفع</h1>
            <p className="text-blue-100">ادفع بأمان وابدأ رحلتك التعليمية</p>
          </div>

          {/* Course Summary */}
          <div className="p-6 bg-gray-50 border-b border-gray-200">
            <h2 className="font-bold text-gray-900 mb-4">ملخص الطلب</h2>
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="font-semibold text-gray-900">{course.title}</p>
                <p className="text-sm text-gray-600">المدرّس: {course.teacher}</p>
              </div>
              <p className="text-xl font-bold text-gray-900">{course.price} جنيه</p>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-300 flex items-center justify-between">
              <p className="font-bold text-gray-900">الإجمالي</p>
              <p className="text-2xl font-bold text-blue-600">{course.price} جنيه</p>
            </div>
          </div>

          {/* Payment Form */}
          <form onSubmit={handleSubmit} className="p-6">
            <h2 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              بيانات الدفع
            </h2>

            {/* Card Number */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">رقم الكارت</label>
              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                maxLength={19}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                disabled={processing}
              />
            </div>

            {/* Name on Card */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">الاسم على الكارت</label>
              <input
                type="text"
                placeholder="الاسم كما هو مكتوب على الكارت"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                disabled={processing}
              />
            </div>

            {/* Expiry & CVV */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-gray-700 mb-2">تاريخ الانتهاء</label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  maxLength={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  disabled={processing}
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">CVV</label>
                <input
                  type="text"
                  placeholder="123"
                  maxLength={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  disabled={processing}
                />
              </div>
            </div>

            {/* Security Notice */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex items-start gap-3">
              <Lock className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-900">
                <p className="font-semibold mb-1">معلوماتك في أمان</p>
                <p>
                  الدفع بيتم عبر بوابة معتمدة ومشفّرة. ما بنخزنش أي بيانات بنكية.
                  المنصة بتستلم تأكيد الدفع بس من غير تفاصيل الحساب.
                </p>
              </div>
            </div>

            {/* Important Info */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-yellow-900">
                <p className="font-semibold mb-1">مهم جداً</p>
                <p>
                  بعد إتمام الدفع هتستلم كود مشاهدة مربوط بجهازك الحالي بس.
                  الكود ماينفعش يتشارك أو يتستخدم على جهاز تاني.
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={processing}
              className="w-full py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold text-lg disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {processing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  جاري المعالجة...
                </>
              ) : (
                <>
                  <Lock className="w-5 h-5" />
                  ادفع {course.price} جنيه
                </>
              )}
            </button>
          </form>
        </div>

        {/* Trust Badges */}
        <div className="mt-6 text-center text-sm text-gray-600">
          <p>محمي بواسطة تشفير SSL 256-bit</p>
        </div>
      </div>
    </div>
  );
}
