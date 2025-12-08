import Navbar from '@/components/Navbar';

export default function CookiePolicy() {
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent">
            Cookie Policy
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
                  What Are Cookies
                </h2>
                <div className="bg-blue-50 rounded-xl p-6 border border-[#8ec5ff]">
                  <p className="text-gray-700 leading-relaxed">
                    Cookies are small text files that are placed on your computer or mobile device when you visit a 
                    website. They are widely used to make websites work more efficiently and provide information to 
                    the owners of the site.
                  </p>
                </div>
              </section>

              <section className="border-l-4 border-[#3d50d5] pl-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="bg-gradient-to-r from-[#3d50d5] to-[#1a3481] text-white w-8 h-8 rounded-lg flex items-center justify-center mr-3 text-sm">2</span>
                  How We Use Cookies
                </h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  EduNutshell uses cookies for the following purposes:
                </p>
                <div className="space-y-3">
                  <div className="flex items-start bg-blue-50 rounded-lg p-4 border border-[#8ec5ff]">
                    <svg className="w-6 h-6 text-[#144ae9] mr-3 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Essential cookies</p>
                      <p className="text-gray-600 text-sm">Required for the website to function properly</p>
                    </div>
                  </div>
                  <div className="flex items-start bg-blue-50 rounded-lg p-4 border border-[#8ec5ff]">
                    <svg className="w-6 h-6 text-[#144ae9] mr-3 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Performance cookies</p>
                      <p className="text-gray-600 text-sm">Help us understand how visitors interact with our website</p>
                    </div>
                  </div>
                  <div className="flex items-start bg-blue-50 rounded-lg p-4 border border-[#8ec5ff]">
                    <svg className="w-6 h-6 text-[#144ae9] mr-3 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Functionality cookies</p>
                      <p className="text-gray-600 text-sm">Remember your preferences and settings</p>
                    </div>
                  </div>
                  <div className="flex items-start bg-blue-50 rounded-lg p-4 border border-[#8ec5ff]">
                    <svg className="w-6 h-6 text-[#144ae9] mr-3 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Analytics cookies</p>
                      <p className="text-gray-600 text-sm">Collect information about how you use our website</p>
                    </div>
                  </div>
                  <div className="flex items-start bg-blue-50 rounded-lg p-4 border border-[#8ec5ff]">
                    <svg className="w-6 h-6 text-[#144ae9] mr-3 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                    </svg>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Marketing cookies</p>
                      <p className="text-gray-600 text-sm">Track your activity to deliver relevant advertisements</p>
                    </div>
                  </div>
                </div>
              </section>

              <section className="border-l-4 border-[#1a3481] pl-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="bg-gradient-to-r from-[#1a3481] to-[#144ae9] text-white w-8 h-8 rounded-lg flex items-center justify-center mr-3 text-sm">3</span>
                  Types of Cookies We Use
                </h2>
                
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border-l-4 border-[#144ae9]">
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 bg-[#144ae9] rounded-lg flex items-center justify-center mr-3">
                        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900">Essential Cookies</h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      These cookies are necessary for the website to function and cannot be switched off. They are 
                      usually only set in response to actions made by you such as setting your privacy preferences, 
                      logging in, or filling in forms.
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border-l-4 border-[#3d50d5]">
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 bg-[#3d50d5] rounded-lg flex items-center justify-center mr-3">
                        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900">Analytics Cookies</h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      These cookies allow us to count visits and traffic sources so we can measure and improve the 
                      performance of our site. They help us know which pages are the most and least popular.
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border-l-4 border-[#1a3481]">
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 bg-[#1a3481] rounded-lg flex items-center justify-center mr-3">
                        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900">Functional Cookies</h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      These cookies enable enhanced functionality and personalization, such as remembering your 
                      language preference or region.
                    </p>
                  </div>
                </div>
              </section>

              <section className="border-l-4 border-[#8ec5ff] pl-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="bg-gradient-to-r from-[#144ae9] to-[#3d50d5] text-white w-8 h-8 rounded-lg flex items-center justify-center mr-3 text-sm">4</span>
                  Third-Party Cookies
                </h2>
                <div className="bg-blue-50 rounded-xl p-6 border border-[#8ec5ff]">
                  <p className="text-gray-700 leading-relaxed">
                    We may use third-party services such as Google Analytics, which may set their own cookies. These 
                    third parties have their own privacy policies, and we have no control over their cookies.
                  </p>
                </div>
              </section>

              <section className="border-l-4 border-[#3d50d5] pl-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="bg-gradient-to-r from-[#3d50d5] to-[#1a3481] text-white w-8 h-8 rounded-lg flex items-center justify-center mr-3 text-sm">5</span>
                  Managing Cookies
                </h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  You can control and manage cookies in various ways:
                </p>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-[#144ae9] rounded-full flex items-center justify-center font-bold mr-3 text-sm">1</div>
                    <div className="pt-1">
                      <p className="font-semibold text-gray-900">Browser settings</p>
                      <p className="text-gray-600">Most browsers allow you to refuse or accept cookies</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-[#144ae9] rounded-full flex items-center justify-center font-bold mr-3 text-sm">2</div>
                    <div className="pt-1">
                      <p className="font-semibold text-gray-900">Cookie preference center</p>
                      <p className="text-gray-600">Use our cookie settings to manage your preferences</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-[#144ae9] rounded-full flex items-center justify-center font-bold mr-3 text-sm">3</div>
                    <div className="pt-1">
                      <p className="font-semibold text-gray-900">Third-party opt-out</p>
                      <p className="text-gray-600">Visit third-party websites to opt out of their cookies</p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 bg-blue-50 rounded-lg p-4 border border-[#8ec5ff]">
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-[#144ae9] mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <p className="text-gray-700 text-sm">
                      Please note that blocking some types of cookies may impact your experience on our website.
                    </p>
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
                  If you have questions about our use of cookies, please contact us at{' '}
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
