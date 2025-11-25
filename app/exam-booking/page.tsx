import Link from 'next/link';

export default function ExamBookingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-16 pt-32 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-blue-400 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-indigo-500 rounded-full blur-3xl animate-pulse"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Book Your Exam Slot
          </h1>
          <p className="text-base sm:text-lg text-blue-100 max-w-2xl mx-auto">
            Choose your path to schedule your examination
          </p>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Two Main CTAs */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Already a Student */}
            <Link href="/exam-booking/login">
              <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8 hover:shadow-2xl transition-all cursor-pointer group hover:border-blue-500">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-3">
                    Already a Student?
                  </h2>
                  <p className="text-slate-600 mb-6">
                    Login to book your exam slot
                  </p>
                  <div className="inline-flex items-center text-blue-600 font-semibold group-hover:text-blue-700">
                    Login
                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>

            {/* New Student */}
            <Link href="/exam-booking/verification">
              <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8 hover:shadow-2xl transition-all cursor-pointer group hover:border-blue-500">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-3">
                    New Student?
                  </h2>
                  <p className="text-slate-600 mb-6">
                    Apply for verification to get access to exam booking
                  </p>
                  <div className="inline-flex items-center text-blue-600 font-semibold group-hover:text-blue-700">
                    Apply for Verification
                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Info Section */}
          <div className="mt-12 bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
            <h3 className="text-xl font-bold text-slate-900 mb-6">Important Information</h3>
            <ul className="space-y-4 text-slate-700">
              <li className="flex items-start">
                <svg className="w-6 h-6 text-blue-600 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Only 150 slots available per day</span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-blue-600 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Confirmation email will be sent after successful booking</span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-blue-600 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>New students must wait for verification approval</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
