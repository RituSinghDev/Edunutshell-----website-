'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const router = useRouter();
  const [slotData, setSlotData] = useState<any>(null);
  const [program, setProgram] = useState('');
  const [studentDetails, setStudentDetails] = useState({
    name: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    const storedSlot = localStorage.getItem('selectedSlot');
    
    if (storedSlot) {
      setSlotData(JSON.parse(storedSlot));
    } else {
      router.push('/exam-booking/slots');
    }
  }, [router]);

  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handlePayment = () => {
    // Mock payment - show success on same page
    setPaymentSuccess(true);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  if (!slotData) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Compact Hero Section */}
      <section className="relative py-12 pt-28 bg-gradient-to-br from-blue-600 to-blue-700">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {!paymentSuccess && (
            <Link href="/exam-booking/slots" className="inline-flex items-center text-blue-100 hover:text-white mb-4 transition-colors">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="font-medium text-sm">Back to Slots</span>
            </Link>
          )}
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            {paymentSuccess ? 'Booking Confirmed!' : 'Checkout'}
          </h1>
          <p className="text-blue-100">
            {paymentSuccess ? 'Your exam slot has been successfully booked' : 'Complete your exam booking payment'}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {paymentSuccess ? (
            <>
              {/* Success Message */}
              <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 mb-6">
                  <div className="text-center mb-6">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h2 className="text-3xl font-bold text-slate-900 mb-2">Payment Successful!</h2>
                    <p className="text-slate-600">Your exam booking has been confirmed</p>
                  </div>

                  {/* Booking Details */}
                  <div className="grid md:grid-cols-3 gap-4 mb-6">
                    <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <p className="text-sm font-medium text-slate-600">Exam Date</p>
                      </div>
                      <p className="text-base font-bold text-slate-900">{formatDate(slotData.date)}</p>
                    </div>

                    <div className="p-4 bg-purple-50 rounded-xl border border-purple-200">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                        <p className="text-sm font-medium text-slate-600">Student</p>
                      </div>
                      <p className="text-base font-bold text-slate-900">{studentDetails.name || 'Student'}</p>
                    </div>

                    <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <p className="text-sm font-medium text-slate-600">Payment</p>
                      </div>
                      <p className="text-base font-bold text-green-600">Paid - ₹550</p>
                    </div>
                  </div>

                  {/* Confirmation Email */}
                  <div className="bg-blue-50 rounded-xl border border-blue-200 p-4 mb-6">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 mb-1">Confirmation Email Sent</p>
                        <p className="text-sm text-slate-600">
                          A confirmation email with your exam details has been sent to {studentDetails.email || 'your email'}.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Important Instructions */}
                  <div className="bg-white rounded-xl border border-slate-200 p-4">
                    <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                      <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      Important Instructions
                    </h3>
                    <ul className="space-y-2 text-sm text-slate-600">
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 mt-1">•</span>
                        <span>Bring a valid government-issued ID on exam day</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 mt-1">•</span>
                        <span>Arrive at least 15 minutes before your scheduled time</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 mt-1">•</span>
                        <span>Exam duration is 2 hours</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 mt-1">•</span>
                        <span>Electronic devices are not allowed in the exam hall</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <Link href="/exam-booking">
                    <button className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl">
                      Book Another Slot
                    </button>
                  </Link>
                  <Link href="/">
                    <button className="w-full bg-white border-2 border-slate-300 text-slate-700 py-4 rounded-xl font-semibold hover:bg-slate-50 transition-all">
                      Go to Home
                    </button>
                  </Link>
                </div>
              </div>
            </>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Student Details Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Student Details Card */}
              <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
                <h2 className="text-xl font-bold text-slate-900 mb-6">Student Details</h2>
                
                <form className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={studentDetails.name}
                      onChange={(e) => setStudentDetails({...studentDetails, name: e.target.value})}
                      className="w-full px-4 py-3 bg-white border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-slate-900"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={studentDetails.email}
                      onChange={(e) => setStudentDetails({...studentDetails, email: e.target.value})}
                      className="w-full px-4 py-3 bg-white border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-slate-900"
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={studentDetails.phone}
                      onChange={(e) => setStudentDetails({...studentDetails, phone: e.target.value})}
                      className="w-full px-4 py-3 bg-white border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-slate-900"
                      placeholder="+91 XXXXX XXXXX"
                      required
                    />
                  </div>
                </form>
              </div>

              {/* Payment Methods Card */}
              <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
                <h2 className="text-xl font-bold text-slate-900 mb-6">Payment Method</h2>
                
                <div className="space-y-3">
                  <label className="flex items-center p-4 border-2 border-slate-300 rounded-xl cursor-pointer hover:border-blue-500 transition-all">
                    <input type="radio" name="payment" className="w-4 h-4 text-blue-600" defaultChecked />
                    <div className="ml-3 flex items-center gap-3">
                      <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                      <span className="font-semibold text-slate-900">Credit/Debit Card</span>
                    </div>
                  </label>

                  <label className="flex items-center p-4 border-2 border-slate-300 rounded-xl cursor-pointer hover:border-blue-500 transition-all">
                    <input type="radio" name="payment" className="w-4 h-4 text-blue-600" />
                    <div className="ml-3 flex items-center gap-3">
                      <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="font-semibold text-slate-900">UPI</span>
                    </div>
                  </label>

                  <label className="flex items-center p-4 border-2 border-slate-300 rounded-xl cursor-pointer hover:border-blue-500 transition-all">
                    <input type="radio" name="payment" className="w-4 h-4 text-blue-600" />
                    <div className="ml-3 flex items-center gap-3">
                      <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <span className="font-semibold text-slate-900">Net Banking</span>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 sticky top-24">
                <h2 className="text-xl font-bold text-slate-900 mb-6">Order Summary</h2>
                
                {/* Booking Details */}
                <div className="space-y-4 mb-6 pb-6 border-b border-slate-200">
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="text-xs text-slate-600 mb-1">Exam Date</div>
                    <div className="font-semibold text-slate-900">{formatDate(slotData.date)}</div>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="text-xs text-slate-600 mb-1">Available Slots</div>
                    <div className="font-semibold text-slate-900">{slotData.available} remaining</div>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Exam Fee</span>
                    <span className="font-semibold text-slate-900">₹500</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Processing Fee</span>
                    <span className="font-semibold text-slate-900">₹50</span>
                  </div>
                  <div className="pt-3 border-t border-slate-200">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-slate-900">Total Amount</span>
                      <span className="text-2xl font-bold text-blue-600">₹550</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handlePayment}
                  className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Complete Payment
                </button>

                <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center gap-2 text-sm text-green-800">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium">100% Secure Payment</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          )}
        </div>
      </section>
    </div>
  );
}
