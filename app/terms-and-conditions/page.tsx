import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function TermsAndConditions() {
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent">
            Terms and Conditions
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
                  Agreement to Terms
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  By accessing and using EduNutshell's website and services, you accept and agree to be bound by 
                  the terms and provision of this agreement. If you do not agree to abide by the above, please do 
                  not use this service.
                </p>
              </section>

              <section className="border-l-4 border-[#3d50d5] pl-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="bg-gradient-to-r from-[#3d50d5] to-[#1a3481] text-white w-8 h-8 rounded-lg flex items-center justify-center mr-3 text-sm">2</span>
                  Use License
                </h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Permission is granted to temporarily access the materials on EduNutshell's website for personal, 
                  non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, 
                  and under this license you may not:
                </p>
                <div className="space-y-2">
                  <div className="flex items-start bg-blue-50 rounded-lg p-3 border border-[#8ec5ff]">
                    <svg className="w-5 h-5 text-[#1a3481] mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <p className="text-gray-700">Modify or copy the materials</p>
                  </div>
                  <div className="flex items-start bg-blue-50 rounded-lg p-3 border border-[#8ec5ff]">
                    <svg className="w-5 h-5 text-[#1a3481] mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <p className="text-gray-700">Use the materials for any commercial purpose or public display</p>
                  </div>
                  <div className="flex items-start bg-blue-50 rounded-lg p-3 border border-[#8ec5ff]">
                    <svg className="w-5 h-5 text-[#1a3481] mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <p className="text-gray-700">Attempt to reverse engineer any software contained on the website</p>
                  </div>
                  <div className="flex items-start bg-blue-50 rounded-lg p-3 border border-[#8ec5ff]">
                    <svg className="w-5 h-5 text-[#1a3481] mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <p className="text-gray-700">Remove any copyright or proprietary notations from the materials</p>
                  </div>
                  <div className="flex items-start bg-blue-50 rounded-lg p-3 border border-[#8ec5ff]">
                    <svg className="w-5 h-5 text-[#1a3481] mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <p className="text-gray-700">Transfer the materials to another person or "mirror" the materials on any other server</p>
                  </div>
                </div>
              </section>

              <section className="border-l-4 border-[#1a3481] pl-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="bg-gradient-to-r from-[#1a3481] to-[#144ae9] text-white w-8 h-8 rounded-lg flex items-center justify-center mr-3 text-sm">3</span>
                  Services
                </h2>
                <div className="bg-blue-50 rounded-xl p-6 border border-[#8ec5ff]">
                  <p className="text-gray-700 leading-relaxed">
                    EduNutshell provides educational services and training programs. All course content, materials, 
                    and certifications are subject to our academic policies. We reserve the right to modify, suspend, 
                    or discontinue any service at any time without notice.
                  </p>
                </div>
              </section>

              <section className="border-l-4 border-[#3d50d5] pl-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="bg-gradient-to-r from-[#3d50d5] to-[#144ae9] text-white w-8 h-8 rounded-lg flex items-center justify-center mr-3 text-sm">4</span>
                  User Accounts
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  When you create an account with us, you must provide accurate, complete, and current information. 
                  Failure to do so constitutes a breach of the Terms. You are responsible for safeguarding the 
                  password and for all activities that occur under your account.
                </p>
              </section>

              <section className="border-l-4 border-[#8ec5ff] pl-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="bg-gradient-to-r from-[#144ae9] to-[#3d50d5] text-white w-8 h-8 rounded-lg flex items-center justify-center mr-3 text-sm">5</span>
                  Intellectual Property
                </h2>
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-[#8ec5ff]">
                  <p className="text-gray-700 leading-relaxed">
                    The service and its original content, features, and functionality are and will remain the exclusive 
                    property of EduNutshell. The service is protected by copyright, trademark, and other laws. Our 
                    trademarks may not be used in connection with any product or service without prior written consent.
                  </p>
                </div>
              </section>

              <section className="border-l-4 border-[#144ae9] pl-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="bg-gradient-to-r from-[#144ae9] to-[#1a3481] text-white w-8 h-8 rounded-lg flex items-center justify-center mr-3 text-sm">6</span>
                  Payment Terms
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  All fees are quoted in the applicable currency and are non-refundable unless otherwise stated. 
                  We reserve the right to change our fees at any time. Any price changes will be communicated to 
                  you in advance.
                </p>
              </section>

              <section className="border-l-4 border-[#1a3481] pl-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="bg-gradient-to-r from-[#1a3481] to-[#3d50d5] text-white w-8 h-8 rounded-lg flex items-center justify-center mr-3 text-sm">7</span>
                  Limitation of Liability
                </h2>
                <div className="bg-blue-50 rounded-xl p-6 border border-[#8ec5ff]">
                  <p className="text-gray-700 leading-relaxed">
                    In no event shall EduNutshell, nor its directors, employees, partners, agents, suppliers, or 
                    affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, 
                    including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
                  </p>
                </div>
              </section>

              <section className="border-l-4 border-[#3d50d5] pl-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="bg-gradient-to-r from-[#3d50d5] to-[#144ae9] text-white w-8 h-8 rounded-lg flex items-center justify-center mr-3 text-sm">8</span>
                  Governing Law
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  These Terms shall be governed and construed in accordance with applicable laws, without regard 
                  to its conflict of law provisions.
                </p>
              </section>

              <section className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-8 border-2 border-[#144ae9]">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <svg className="w-8 h-8 text-[#144ae9] mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Contact Information
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  If you have any questions about these Terms, please contact us at{' '}
                  <a href="mailto:legal@edunutshell.com" className="text-[#144ae9] hover:text-[#3d50d5] font-semibold underline">
                    legal@edunutshell.com
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
