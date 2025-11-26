'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const router = useRouter();
  const [slotData, setSlotData] = useState<any>(null);
  const [examData, setExamData] = useState<any>(null);
  const [studentDetails, setStudentDetails] = useState<any>(null);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const storedSlot = localStorage.getItem('selectedSlot');
    const storedExam = localStorage.getItem('selectedExam');
    const storedStudent = localStorage.getItem('studentData');
    
    if (!storedStudent) {
      // No student data - redirect to verify details
      router.push('/exam-booking/verify-details');
      return;
    }

    if (storedSlot && storedExam) {
      setSlotData(JSON.parse(storedSlot));
      setExamData(JSON.parse(storedExam));
      setStudentDetails(JSON.parse(storedStudent));
    } else {
      router.push('/exam-booking/slots');
    }
  }, [router]);

  const handlePayment = async () => {
    if (!studentDetails) {
      setError('Student details not found. Please verify your details first.');
      router.push('/exam-booking/verify-details');
      return;
    }

    if (!slotData || !examData) {
      setError('Booking information is missing');
      return;
    }

    setLoading(true);
    setError('');

    const bookingData = {
      studentId: studentDetails._id || studentDetails.email,
      slotId: slotData._id,
      examId: examData._id,
      studentName: studentDetails.name,
      studentEmail: studentDetails.email,
      studentPhone: studentDetails.phone,
      paymentMethod: paymentMethod,
      amount: (examData?.price || 500) + 50,
    };

    console.log('Sending booking data:', bookingData);

    try {
      const response = await fetch('https://edunutshell-lms.onrender.com/api/book/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      console.log('Response status:', response.status);
      
      const data = await response.json();
      console.log('Response data:', data);

      if (!response.ok) {
        throw new Error(data.message || data.error || `Booking failed with status ${response.status}`);
      }

      console.log('Booking successful:', data);
      setPaymentSuccess(true);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred. Please try again.';
      setError(errorMessage);
      console.error('Booking error:', err);
      console.error('Error details:', errorMessage);
    } finally {
      setLoading(false);
    }
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

  if (!slotData || !studentDetails) {
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
                <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 sm:p-8 mb-6">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 sm:w-10 sm:h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">Payment Successful!</h2>
                    <p className="text-sm sm:text-base text-slate-600">Your exam booking has been confirmed</p>
                  </div>

                  {/* Booking Details */}
                  <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
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
                      <p className="text-base font-bold text-green-600">Paid - ₹{(examData?.price || 500) + 50}</p>
                      <p className="text-xs text-slate-600 mt-1 capitalize">via {paymentMethod === 'card' ? 'Card' : paymentMethod === 'upi' ? 'UPI' : 'Net Banking'}</p>
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
            <div className="grid lg:grid-cols-3 gap-8 mb-8">
            {/* Left Column - Student Details & Payment */}
            <div className="lg:col-span-2 space-y-6">
              {/* Verified Student Details Card */}
              <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-4 sm:p-6">
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900">Student Details</h2>
                  <div className="flex items-center gap-2 text-green-600">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm font-semibold">Verified</span>
                  </div>
                </div>
                
                {error && (
                  <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 mb-4">
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      <p className="text-sm text-red-800 font-medium">{error}</p>
                    </div>
                  </div>
                )}

                <div className="space-y-4">
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <div className="text-xs text-slate-500 mb-1">Full Name</div>
                    <div className="font-semibold text-slate-900">{studentDetails.name}</div>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <div className="text-xs text-slate-500 mb-1">Email Address</div>
                    <div className="font-semibold text-slate-900">{studentDetails.email}</div>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <div className="text-xs text-slate-500 mb-1">Phone Number</div>
                    <div className="font-semibold text-slate-900">{studentDetails.phone}</div>
                  </div>
                </div>
              </div>

              {/* Payment Methods Card */}
              <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-4 sm:mb-6">Payment Method</h2>
                
                <div className="space-y-3">
                  <label className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all ${
                    paymentMethod === 'card' 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-slate-300 hover:border-blue-300'
                  }`}>
                    <input 
                      type="radio" 
                      name="payment" 
                      value="card"
                      checked={paymentMethod === 'card'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-4 h-4 text-blue-600" 
                    />
                    <div className="ml-3 flex items-center gap-3">
                      <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                      <span className="font-semibold text-slate-900">Credit/Debit Card</span>
                    </div>
                  </label>

                  <label className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all ${
                    paymentMethod === 'upi' 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-slate-300 hover:border-blue-300'
                  }`}>
                    <input 
                      type="radio" 
                      name="payment" 
                      value="upi"
                      checked={paymentMethod === 'upi'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-4 h-4 text-blue-600" 
                    />
                    <div className="ml-3 flex items-center gap-3">
                      <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="font-semibold text-slate-900">UPI</span>
                    </div>
                  </label>

                  <label className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all ${
                    paymentMethod === 'netbanking' 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-slate-300 hover:border-blue-300'
                  }`}>
                    <input 
                      type="radio" 
                      name="payment" 
                      value="netbanking"
                      checked={paymentMethod === 'netbanking'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-4 h-4 text-blue-600" 
                    />
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
              <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-4 sm:p-6 lg:sticky lg:top-24">
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-4 sm:mb-6">Order Summary</h2>
                
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
                  {examData && (
                    <div className="flex justify-between text-sm mb-2 pb-2 border-b border-slate-200">
                      <span className="text-slate-600 font-medium">Exam</span>
                      <span className="font-semibold text-slate-900">{examData.title}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Exam Fee</span>
                    <span className="font-semibold text-slate-900">₹{examData?.price || 500}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Processing Fee</span>
                    <span className="font-semibold text-slate-900">₹50</span>
                  </div>
                  <div className="pt-3 border-t border-slate-200">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-slate-900">Total Amount</span>
                      <span className="text-2xl font-bold text-blue-600">₹{(examData?.price || 500) + 50}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handlePayment}
                  disabled={loading}
                  className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 disabled:bg-blue-400 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Complete Payment
                    </>
                  )}
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
