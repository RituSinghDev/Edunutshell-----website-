import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function FAQ() {
  const faqs = [
    {
      category: "General",
      questions: [
        {
          q: "What is EduNutshell?",
          a: "EduNutshell is an educational platform offering industry-relevant courses and training programs designed to help students and professionals enhance their skills and advance their careers."
        },
        {
          q: "Who can enroll in your courses?",
          a: "Our courses are open to students, recent graduates, and working professionals looking to upskill or transition into new career paths. Specific prerequisites may vary by course."
        },
        {
          q: "Are the courses self-paced or scheduled?",
          a: "We offer both self-paced and instructor-led courses. Check individual course details for specific formats and schedules."
        }
      ]
    },
    {
      category: "Enrollment & Payment",
      questions: [
        {
          q: "How do I enroll in a course?",
          a: "Browse our course catalog, select your desired course, and click 'Enroll Now'. Follow the registration process and complete payment to gain immediate access."
        },
        {
          q: "What payment methods do you accept?",
          a: "We accept major credit cards, debit cards, UPI, net banking, and digital wallets. International payments are also supported."
        },
        {
          q: "Do you offer installment plans?",
          a: "Yes, we offer flexible payment plans for select courses. Contact our support team for more information about installment options."
        }
      ]
    },
    {
      category: "Courses & Certification",
      questions: [
        {
          q: "Will I receive a certificate upon completion?",
          a: "Yes, you'll receive a certificate of completion for each course you finish. Some courses also offer industry-recognized certifications."
        },
        {
          q: "How long do I have access to course materials?",
          a: "Most courses provide lifetime access to materials, allowing you to learn at your own pace and revisit content anytime."
        },
        {
          q: "Are there any prerequisites for courses?",
          a: "Prerequisites vary by course. Check the course description for specific requirements. Many beginner courses have no prerequisites."
        }
      ]
    },
    {
      category: "Support & Technical",
      questions: [
        {
          q: "What if I face technical issues?",
          a: "Our support team is available to help. Contact us via email or chat, and we'll resolve your technical issues promptly."
        },
        {
          q: "Can I get a refund if I'm not satisfied?",
          a: "Yes, we offer a 7-day refund policy for most courses. Please review our Refund Policy for complete details and eligibility criteria."
        },
        {
          q: "How can I contact support?",
          a: "You can reach us via email at support@edunutshell.com, through our contact form, or via the live chat feature on our website."
        }
      ]
    }
  ];

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#144ae9] rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#3d50d5] rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        </div>
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Find answers to common questions about EduNutshell
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {faqs.map((category, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center mb-6 pb-4 border-b-2 border-[#144ae9]">
                  <div className="w-1 h-8 bg-gradient-to-b from-[#144ae9] to-[#3d50d5] rounded-full mr-4"></div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {category.category}
                  </h2>
                </div>
                <div className="space-y-6">
                  {category.questions.map((faq, qIdx) => (
                    <div key={qIdx} className="space-y-3 group">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-[#144ae9] to-[#3d50d5] rounded-lg flex items-center justify-center mr-3 mt-0.5">
                          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[#144ae9] transition-colors">
                          {faq.q}
                        </h3>
                      </div>
                      <p className="text-gray-600 leading-relaxed pl-11">
                        {faq.a}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-16 bg-gradient-to-br from-[#144ae9] via-[#3d50d5] to-[#1a3481] rounded-2xl p-10 text-center shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.5))]"></div>
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">
                Still have questions?
              </h2>
              <p className="text-[#8ec5ff] mb-8 text-lg max-w-2xl mx-auto">
                Can't find the answer you're looking for? Our support team is here to help.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center bg-white text-[#144ae9] px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              >
                Contact Support
                <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
