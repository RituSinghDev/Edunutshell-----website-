import Navbar from '@/components/Navbar';

export default function RefundPolicy() {
  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#144ae9] rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#3d50d5] rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#144ae9]/20 rounded-full mb-6">
            <svg className="w-8 h-8 text-[#8ec5ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent">
            Refund Policy
          </h1>
          <p className="text-gray-400 text-lg">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
        </div>
      </section>

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 md:p-12">
            <div className="prose prose-gray max-w-none space-y-10">
              <section className="border-l-4 border-[#144ae9] pl-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="bg-gradient-to-r from-[#144ae9] to-[#3d50d5] text-white w-8 h-8 rounded-lg flex items-center justify-center mr-3 text-sm">1</span>
                  Overview
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  At EduNutshell, we strive to provide high-quality educational services. This Refund Policy outlines 
                  the circumstances under which refunds may be issued for our courses and services.
                </p>
              </section>

              <section className="border-l-4 border-[#3d50d5] pl-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="bg-gradient-to-r from-[#3d50d5] to-[#1a3481] text-white w-8 h-8 rounded-lg flex items-center justify-center mr-3 text-sm">2</span>
                  Eligibility for Refunds
                </h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  You may be eligible for a refund under the following conditions:
                </p>
                <div className="space-y-3">
                  <div className="flex items-start bg-blue-50 rounded-lg p-4 border border-[#8ec5ff]">
                    <svg className="w-5 h-5 text-[#144ae9] mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <p className="text-gray-700">Request made within 7 days of course enrollment</p>
                  </div>
                  <div className="flex items-start bg-blue-50 rounded-lg p-4 border border-[#8ec5ff]">
                    <svg className="w-5 h-5 text-[#144ae9] mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <p className="text-gray-700">Less than 20% of the course content has been accessed</p>
                  </div>
                  <div className="flex items-start bg-blue-50 rounded-lg p-4 border border-[#8ec5ff]">
                    <svg className="w-5 h-5 text-[#144ae9] mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <p className="text-gray-700">Technical issues preventing access that we cannot resolve</p>
                  </div>
                  <div className="flex items-start bg-blue-50 rounded-lg p-4 border border-[#8ec5ff]">
                    <svg className="w-5 h-5 text-[#144ae9] mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <p className="text-gray-700">Course cancellation by EduNutshell</p>
                  </div>
                </div>
              </section>

              <section className="border-l-4 border-[#1a3481] pl-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="bg-gradient-to-r from-[#1a3481] to-[#144ae9] text-white w-8 h-8 rounded-lg flex items-center justify-center mr-3 text-sm">3</span>
                  Non-Refundable Items
                </h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  The following are not eligible for refunds:
                </p>
                <div className="space-y-2">
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-[#1a3481] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <p className="text-gray-600">Courses accessed beyond the 7-day refund window</p>
                  </div>
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-[#1a3481] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <p className="text-gray-600">Courses where more than 20% of content has been consumed</p>
                  </div>
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-[#1a3481] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <p className="text-gray-600">Promotional or discounted courses (unless otherwise stated)</p>
                  </div>
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-[#1a3481] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <p className="text-gray-600">Certification fees</p>
                  </div>
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-[#1a3481] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <p className="text-gray-600">One-on-one mentorship sessions already conducted</p>
                  </div>
                </div>
              </section>

              <section className="border-l-4 border-[#8ec5ff] pl-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="bg-gradient-to-r from-[#144ae9] to-[#3d50d5] text-white w-8 h-8 rounded-lg flex items-center justify-center mr-3 text-sm">4</span>
                  Refund Process
                </h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  To request a refund:
                </p>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-[#144ae9] rounded-full flex items-center justify-center font-bold mr-3">1</div>
                    <p className="text-gray-600 pt-1">Contact our support team at refunds@edunutshell.com</p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-[#144ae9] rounded-full flex items-center justify-center font-bold mr-3">2</div>
                    <p className="text-gray-600 pt-1">Provide your order number and reason for the refund request</p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-[#144ae9] rounded-full flex items-center justify-center font-bold mr-3">3</div>
                    <p className="text-gray-600 pt-1">Our team will review your request within 3-5 business days</p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-[#144ae9] rounded-full flex items-center justify-center font-bold mr-3">4</div>
                    <p className="text-gray-600 pt-1">If approved, refunds will be processed within 7-10 business days</p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-[#144ae9] rounded-full flex items-center justify-center font-bold mr-3">5</div>
                    <p className="text-gray-600 pt-1">Refunds will be issued to the original payment method</p>
                  </div>
                </div>
              </section>

              <section className="border-l-4 border-[#3d50d5] pl-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="bg-gradient-to-r from-[#3d50d5] to-[#144ae9] text-white w-8 h-8 rounded-lg flex items-center justify-center mr-3 text-sm">5</span>
                  Partial Refunds
                </h2>
                <div className="bg-blue-50 rounded-xl p-6 border border-[#8ec5ff]">
                  <p className="text-gray-700 leading-relaxed">
                    In certain situations, partial refunds may be granted at our discretion. This includes cases where 
                    you&apos;ve completed a portion of the course but experienced significant issues with the remaining content.
                  </p>
                </div>
              </section>

              <section className="border-l-4 border-[#144ae9] pl-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="bg-gradient-to-r from-[#144ae9] to-[#1a3481] text-white w-8 h-8 rounded-lg flex items-center justify-center mr-3 text-sm">6</span>
                  Course Transfers
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  As an alternative to refunds, we may offer the option to transfer your enrollment to a different 
                  course of equal or lesser value, subject to availability and approval.
                </p>
              </section>

              <section className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-8 border-2 border-[#144ae9]">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <svg className="w-8 h-8 text-[#144ae9] mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Contact Us
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  For refund requests or questions about this policy, please contact us at{' '}
                  <a href="mailto:refunds@edunutshell.com" className="text-[#144ae9] hover:text-[#3d50d5] font-semibold underline">
                    refunds@edunutshell.com
                  </a>
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
