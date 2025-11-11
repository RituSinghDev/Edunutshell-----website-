"use client";

import { useState } from "react";

export default function EnquiryForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
    college: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('https://sheetdb.io/api/v1/32r64i5cxdi2x', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer 5t3ohqc39zlaw7wnqolvywww6xzp610dvsgadmqv',
        },
        body: JSON.stringify([{
          full_name: formData.name,
          email: formData.email,
          phone: formData.phone,
          program: formData.course,
          college: formData.college,
          message: formData.message,
        }]),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      setSubmitStatus({ type: 'success', message: 'Thank you for your enquiry! We\'ll get back to you soon.' });
      setFormData({ name: "", email: "", phone: "", course: "", college: "", message: "" });
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus({ type: 'error', message: 'Failed to submit form. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section className="py-12 md:py-8 bg-white">
      <div className="max-w-3xl mx-auto px-6 sm:px-6 lg:px-8">
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-2xl border-2 border-gray-100 p-6 md:p-8 hover:shadow-3xl transition-shadow duration-300">
          <h2 className="text-2xl font-bold text-gray-900 mb-5 text-center">
            Student Enquiry Form
          </h2>

          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
                placeholder="Enter your full name"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
                  placeholder="Enter your phone number"
                />
              </div>
            </div>

            <div>
              <label htmlFor="course" className="block text-sm font-medium text-gray-700 mb-1.5">
                Program Interested In *
              </label>
              <select
                id="course"
                name="course"
                required
                value={formData.course}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
              >
                <option value="">Select a program</option>
                <option value="AWS Cloud Practitioner">AWS Cloud Practitioner</option>
                <option value="Azure Solutions Architect">Azure Solutions Architect</option>
                <option value="Google Cloud Platform">Google Cloud Platform</option>
                <option value="Machine Learning Fundamentals">Machine Learning Fundamentals</option>
                <option value="Deep Learning with TensorFlow">Deep Learning with TensorFlow</option>
                <option value="Natural Language Processing">Natural Language Processing</option>
                <option value="Computer Vision">Computer Vision</option>
                <option value="Cloud DevOps Engineering">Cloud DevOps Engineering</option>
                <option value="Full Stack Web Development">Full Stack Web Development</option>
                <option value="Data Science with Python">Data Science with Python</option>
                <option value="Cybersecurity Fundamentals">Cybersecurity Fundamentals</option>
                <option value="Blockchain Development">Blockchain Development</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="college" className="block text-sm font-medium text-gray-700 mb-1.5">
                College Name *
              </label>
              <input
                type="text"
                id="college"
                name="college"
                required
                value={formData.college}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
                placeholder="Enter your college name"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1.5">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={2}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent resize-none"
                placeholder="Tell us about your learning goals..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gray-800 text-white py-2 px-6 rounded-md font-medium hover:bg-gray-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Enquiry'}
            </button>

            {submitStatus && (
              <div className={`mt-4 p-3 rounded-md ${submitStatus.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {submitStatus.message}
              </div>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
