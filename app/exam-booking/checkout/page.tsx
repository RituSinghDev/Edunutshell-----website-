'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Razorpay types
interface RazorpayResponse {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

interface RazorpayError {
  description: string;
  code: string;
  reason: string;
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  theme: {
    color: string;
  };
  handler: (response: RazorpayResponse) => void;
  modal: {
    ondismiss: () => void;
  };
}

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => {
      open: () => void;
      on: (event: string, handler: (response: { error: RazorpayError }) => void) => void;
    };
  }
}

interface SlotData {
  _id: string;
  date: string;
  available: number;
}

interface ExamData {
  _id: string;
  title: string;
  price: number;
}

interface StudentDetails {
  _id?: string;
  name: string;
  email: string;
  phone: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const [slotData, setSlotData] = useState<SlotData | null>(null);
  const [examData, setExamData] = useState<ExamData | null>(null);
  const [studentDetails, setStudentDetails] = useState<StudentDetails | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const storedSlot = localStorage.getItem('selectedSlot');
    const storedExam = localStorage.getItem('selectedExam');
    const storedStudent = localStorage.getItem('studentData');
    
    if (!storedStudent) {
      // No student data - redirect to verification
      router.push('/exam-booking/verification');
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

    try {
      // Step 1: Create booking to get bookingId
      const bookingData = {
        studentId: studentDetails._id || studentDetails.email,
        examId: examData._id,
        slotId: slotData._id,
      };

      console.log('Creating booking:', bookingData);

      const bookingResponse = await fetch('https://edunutshell-lms.onrender.com/api/book/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      const bookingResult = await bookingResponse.json();
      console.log('Booking created:', bookingResult);

      if (!bookingResponse.ok) {
        throw new Error(bookingResult.message || bookingResult.error || 'Booking creation failed');
      }

      const bookingId = bookingResult.bookingId || bookingResult._id;

      if (!bookingId) {
        throw new Error('Booking ID not received from server');
      }

      // Step 2: Create Razorpay order
      const amount = (examData?.price || 500) + 50;
      const orderData = {
        amount: amount,
        bookingId: bookingId,
        currency: 'INR',
      };

      console.log('Creating Razorpay order:', orderData);

      const orderResponse = await fetch('https://edunutshell-lms.onrender.com/api/payment/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      const orderResult = await orderResponse.json();
      console.log('Razorpay order created:', orderResult);

      if (!orderResponse.ok) {
        throw new Error(orderResult.message || orderResult.error || 'Order creation failed');
      }

      const { orderId, key_id } = orderResult;

      if (!orderId || !key_id) {
        throw new Error('Order ID or Key ID not received from server');
      }

      // Step 3: Open Razorpay payment modal
      const options = {
        key: key_id,
        amount: amount * 100, // Razorpay expects amount in paise
        currency: 'INR',
        name: 'EduNutshell',
        description: `${examData.title} - Exam Booking`,
        order_id: orderId,
        prefill: {
          name: studentDetails.name,
          email: studentDetails.email,
          contact: studentDetails.phone,
        },
        theme: {
          color: '#2563eb',
        },
        handler: async function (response: RazorpayResponse) {
          console.log('Payment successful:', response);

          // Step 4: Verify payment on backend
          try {
            const verifyData = {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              bookingId: bookingId,
            };

            console.log('Verifying payment:', verifyData);

            const verifyResponse = await fetch('https://edunutshell-lms.onrender.com/api/book/verify', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(verifyData),
            });

            const verifyResult = await verifyResponse.json();
            console.log('Verification result:', verifyResult);

            if (!verifyResponse.ok) {
              throw new Error(verifyResult.message || verifyResult.error || 'Payment verification failed');
            }

            // Payment verified successfully
            setPaymentSuccess(true);
            setLoading(false);
          } catch (verifyError) {
            const errorMessage = verifyError instanceof Error ? verifyError.message : 'Payment verification failed';
            setError(errorMessage);
            console.error('Verification error:', verifyError);
            setLoading(false);
          }
        },
        modal: {
          ondismiss: function () {
            console.log('Payment modal closed');
            setLoading(false);
            setError('Payment cancelled. Please try again.');
          },
        },
      };

      // Check if Razorpay is loaded
      if (typeof window.Razorpay === 'undefined') {
        throw new Error('Razorpay SDK not loaded. Please refresh the page.');
      }

      const razorpay = new window.Razorpay(options);
      razorpay.open();

      razorpay.on('payment.failed', function (response: { error: RazorpayError }) {
        console.error('Payment failed:', response.error);
        setError(response.error.description || 'Payment failed. Please try again.');
        setLoading(false);
      });

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred. Please try again.';
      setError(errorMessage);
      console.error('Payment error:', err);
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="relative py-16 pt-28 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00em0wIDI0YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00ek0xMiAxNmMwLTIuMjEgMS43OS00IDQtNHM0IDEuNzkgNCA0LTEuNzkgNC00IDQtNC0xLjc5LTQtNHptMCAyNGMwLTIuMjEgMS43OS00IDQtNHM0IDEuNzkgNCA0LTEuNzkgNC00IDQtNC0xLjc5LTQtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {!paymentSuccess && (
            <Link href="/exam-booking/slots" className="inline-flex items-center text-blue-100 hover:text-white mb-6 transition-all hover:gap-3 gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="font-semibold">Back to Slots</span>
            </Link>
          )}
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-3">
            {paymentSuccess ? 'Booking Confirmed!' : 'Secure Checkout'}
          </h1>
          <p className="text-lg text-blue-100">
            {paymentSuccess ? 'Your exam slot has been successfully booked' : 'Review your details and complete payment'}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {paymentSuccess ? (
            <>
              {/* Success Message */}
              <div className="max-w-5xl mx-auto">
                <div className="bg-white rounded-3xl shadow-2xl border border-blue-100 p-8 sm:p-10 mb-8">
                  <div className="text-center mb-8">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                      <svg className="w-12 h-12 sm:w-14 sm:h-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">Payment Successful!</h2>
                    <p className="text-lg text-slate-600">Your exam booking has been confirmed</p>
                  </div>

                  {/* Booking Details - 3 Column Layout */}
                  <div className="grid sm:grid-cols-3 gap-6 mb-8">
                    <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border-2 border-blue-200 shadow-sm">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-md">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <p className="text-sm font-semibold text-blue-700">Exam Date</p>
                      </div>
                      <p className="text-base font-bold text-slate-900">{formatDate(slotData.date)}</p>
                    </div>

                    <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border-2 border-blue-200 shadow-sm">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-md">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                        <p className="text-sm font-semibold text-blue-700">Student Name</p>
                      </div>
                      <p className="text-base font-bold text-slate-900">{studentDetails.name || 'Student'}</p>
                    </div>

                    <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border-2 border-blue-200 shadow-sm">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-md">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <p className="text-sm font-semibold text-blue-700">Payment Status</p>
                      </div>
                      <p className="text-base font-bold text-blue-600">Paid - ₹{(examData?.price || 500) + 50}</p>
                    </div>
                  </div>

                  {/* 2 Column Layout for Email & Instructions */}
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Confirmation Email */}
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border-2 border-blue-200 p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 mb-2">Confirmation Email Sent</p>
                          <p className="text-sm text-slate-600">
                            A confirmation email with your exam details has been sent to <span className="font-semibold text-blue-700">{studentDetails.email || 'your email'}</span>
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Important Instructions */}
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border-2 border-blue-200 p-6">
                      <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                        Important Instructions
                      </h3>
                      <ul className="space-y-2 text-sm text-slate-700">
                        <li className="flex items-start gap-2">
                          <span className="text-blue-600 mt-0.5 font-bold">•</span>
                          <span>Bring valid government ID</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-600 mt-0.5 font-bold">•</span>
                          <span>Arrive 15 minutes early</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-600 mt-0.5 font-bold">•</span>
                          <span>Exam duration: 2 hours</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-600 mt-0.5 font-bold">•</span>
                          <span>No electronic devices allowed</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
                  <Link href="/exam-booking">
                    <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-5 rounded-2xl font-bold hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                      Book Another Slot
                    </button>
                  </Link>
                  <Link href="/">
                    <button className="w-full bg-white border-2 border-blue-300 text-blue-700 py-5 rounded-2xl font-bold hover:bg-blue-50 transition-all shadow-md hover:shadow-lg">
                      Go to Home
                    </button>
                  </Link>
                </div>
              </div>
            </>
          ) : (
            <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 items-start">
            {/* Left Column - Student Details */}
            <div className="lg:col-span-2">
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

            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 lg:sticky lg:top-24">
                <h2 className="text-xl font-bold text-slate-900 mb-3">Order Summary</h2>
                
                {/* Booking Details */}
                <div className="space-y-3 mb-2 pb-5 border-b border-slate-200">
                  <div className="p-3 bg-blue-50 rounded-xl border border-blue-200">
                    <div className="text-xs text-slate-600 mb-1 font-medium">Exam Date</div>
                    <div className="font-semibold text-slate-900 text-sm">{formatDate(slotData.date)}</div>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-xl border border-blue-200">
                    <div className="text-xs text-slate-600 mb-1 font-medium">Available Slots</div>
                    <div className="font-semibold text-slate-900">{slotData.available} remaining</div>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="space-y-2.5 mb-2">
                  {examData && (
                    <div className="flex justify-between items-center text-sm pb-2.5 border-b border-slate-200">
                      <span className="text-slate-600 font-medium">Exam</span>
                      <span className="font-semibold text-slate-900 text-right">{examData.title}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Exam Fee</span>
                    <span className="font-semibold text-slate-900">₹{examData?.price || 500}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Processing Fee</span>
                    <span className="font-semibold text-slate-900">₹50</span>
                  </div>
                  <div className="pt-3 border-t-2 border-slate-200">
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

                {/* <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center gap-2 text-sm text-green-800">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium">100% Secure Payment</span>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
          )}
        </div>
      </section>
    </div>
  );
}
