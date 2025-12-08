import Navbar from '@/components/Navbar';

export default function PrivacyPolicy() {
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent">
            Privacy Policy
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
                Introduction
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Welcome to EduNutshell. We respect your privacy and are committed to protecting your personal data. 
                This privacy policy will inform you about how we look after your personal data when you visit our 
                website and tell you about your privacy rights.
              </p>
            </section>

            <section className="border-l-4 border-[#3d50d5] pl-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="bg-gradient-to-r from-[#3d50d5] to-[#1a3481] text-white w-8 h-8 rounded-lg flex items-center justify-center mr-3 text-sm">2</span>
                Information We Collect
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We may collect, use, store and transfer different kinds of personal data about you:
              </p>
              <div className="space-y-3">
                <div className="flex items-start bg-gray-50 rounded-lg p-4">
                  <svg className="w-5 h-5 text-[#144ae9] mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <span className="font-semibold text-gray-900">Identity Data:</span>
                    <span className="text-gray-600"> name, username, or similar identifier</span>
                  </div>
                </div>
                <div className="flex items-start bg-gray-50 rounded-lg p-4">
                  <svg className="w-5 h-5 text-[#144ae9] mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <span className="font-semibold text-gray-900">Contact Data:</span>
                    <span className="text-gray-600"> email address, telephone numbers, and postal address</span>
                  </div>
                </div>
                <div className="flex items-start bg-gray-50 rounded-lg p-4">
                  <svg className="w-5 h-5 text-[#144ae9] mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <span className="font-semibold text-gray-900">Technical Data:</span>
                    <span className="text-gray-600"> IP address, browser type, device information</span>
                  </div>
                </div>
                <div className="flex items-start bg-gray-50 rounded-lg p-4">
                  <svg className="w-5 h-5 text-[#144ae9] mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <span className="font-semibold text-gray-900">Usage Data:</span>
                    <span className="text-gray-600"> information about how you use our website and services</span>
                  </div>
                </div>
                <div className="flex items-start bg-gray-50 rounded-lg p-4">
                  <svg className="w-5 h-5 text-[#144ae9] mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <span className="font-semibold text-gray-900">Marketing Data:</span>
                    <span className="text-gray-600"> your preferences in receiving marketing communications</span>
                  </div>
                </div>
              </div>
            </section>

            <section className="border-l-4 border-[#1a3481] pl-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="bg-gradient-to-r from-[#1a3481] to-[#144ae9] text-white w-8 h-8 rounded-lg flex items-center justify-center mr-3 text-sm">3</span>
                How We Use Your Information
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We use your personal data for the following purposes:
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[#144ae9] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  To provide and maintain our services
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[#144ae9] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  To notify you about changes to our services
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[#144ae9] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  To provide customer support
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[#144ae9] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  To gather analysis or valuable information to improve our services
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[#144ae9] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  To monitor the usage of our services
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[#144ae9] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  To detect, prevent and address technical issues
                </li>
              </ul>
            </section>

            <section className="border-l-4 border-[#3d50d5] pl-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="bg-gradient-to-r from-[#3d50d5] to-[#144ae9] text-white w-8 h-8 rounded-lg flex items-center justify-center mr-3 text-sm">4</span>
                Data Security
              </h2>
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-[#8ec5ff]">
                <p className="text-gray-700 leading-relaxed">
                  We have implemented appropriate security measures to prevent your personal data from being 
                  accidentally lost, used, or accessed in an unauthorized way. We limit access to your personal 
                  data to those employees, agents, contractors, and other third parties who have a business need to know.
                </p>
              </div>
            </section>

            <section className="border-l-4 border-[#8ec5ff] pl-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="bg-gradient-to-r from-[#144ae9] to-[#3d50d5] text-white w-8 h-8 rounded-lg flex items-center justify-center mr-3 text-sm">5</span>
                Your Legal Rights
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Under certain circumstances, you have rights under data protection laws in relation to your personal data:
              </p>
              <div className="grid md:grid-cols-2 gap-3">
                <div className="bg-blue-50 rounded-lg p-4 border border-[#8ec5ff]">
                  <p className="text-gray-700">Request access to your personal data</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4 border border-[#8ec5ff]">
                  <p className="text-gray-700">Request correction of your personal data</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4 border border-[#8ec5ff]">
                  <p className="text-gray-700">Request erasure of your personal data</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4 border border-[#8ec5ff]">
                  <p className="text-gray-700">Object to processing of your personal data</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4 border border-[#8ec5ff]">
                  <p className="text-gray-700">Request restriction of processing</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4 border border-[#8ec5ff]">
                  <p className="text-gray-700">Request transfer of your personal data</p>
                </div>
              </div>
            </section>

            <section className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-8 border-2 border-[#144ae9]">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <svg className="w-8 h-8 text-[#144ae9] mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Contact Us
              </h2>
              <p className="text-gray-700 leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us at{' '}
                <a href="mailto:privacy@edunutshell.com" className="text-[#144ae9] hover:text-[#3d50d5] font-semibold underline">
                  privacy@edunutshell.com
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
