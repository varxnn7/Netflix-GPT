import React, { useState } from 'react';
import Header from './Header';
import { BG_URL } from '../utils/constants';

const ContactUs = () => {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const form = e.target;
    const data = new FormData(form);

    try {
      const response = await fetch('https://formspree.io/f/xaqzkona', {
        method: 'POST',
        body: data,
        headers: {
          Accept: 'application/json',
        },
      });

      if (response.ok) {
        setSubmitted(true);
        form.reset();
      }
    } catch (err) {
      // Silently fail — form was submitted
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <Header />

      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <img
          className="h-full w-full object-cover"
          src={BG_URL}
          alt="Netflix background"
        />
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Contact Form Card */}
      <div className="flex items-center justify-center min-h-screen px-4 py-24">
        <div className="w-full max-w-md bg-black/80 backdrop-blur-sm text-white rounded-lg shadow-2xl p-8 md:p-12 animate-fadeInUp">

          {/* Header */}
          <div className="mb-8">
            <h1 className="font-bold text-3xl mb-2 text-white">Contact Us</h1>
            <p className="text-gray-400 text-sm leading-relaxed">
              Having trouble? We're here to help. Fill out the form below and we'll get back to you as soon as possible.
            </p>
          </div>

          {/* Success Message */}
          {submitted ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center mb-4 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Message Sent!</h2>
              <p className="text-gray-400 text-sm mb-6">
                Thanks for reaching out. We'll get back to you shortly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-3 bg-red-700 hover:bg-red-800 text-white font-bold rounded-lg transition duration-300 cursor-pointer"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">

              {/* Name Field */}
              <div className="flex flex-col gap-1">
                <label htmlFor="contact-name" className="text-gray-300 text-sm font-medium">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  required
                  className="p-4 bg-gray-700 rounded-lg text-white placeholder-gray-400 border border-transparent focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500 transition duration-200 text-sm"
                />
              </div>

              {/* Phone Number Field */}
              <div className="flex flex-col gap-1">
                <label htmlFor="contact-phone" className="text-gray-300 text-sm font-medium">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  id="contact-phone"
                  type="tel"
                  name="phone"
                  placeholder="Enter your phone number"
                  required
                  pattern="[0-9+\-\s()]+"
                  className="p-4 bg-gray-700 rounded-lg text-white placeholder-gray-400 border border-transparent focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500 transition duration-200 text-sm"
                />
              </div>

              {/* Description Field */}
              <div className="flex flex-col gap-1">
                <label htmlFor="contact-description" className="text-gray-300 text-sm font-medium">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="contact-description"
                  name="description"
                  placeholder="Describe your issue or inquiry..."
                  required
                  rows={5}
                  className="p-4 bg-gray-700 rounded-lg text-white placeholder-gray-400 border border-transparent focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500 transition duration-200 text-sm resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                id="contact-submit-btn"
                type="submit"
                disabled={submitting}
                className={`p-4 mt-2 bg-red-700 w-full rounded-lg font-bold text-white text-base transition duration-300 cursor-pointer
                  ${submitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-red-800 active:scale-95'}`}
              >
                {submitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    Sending...
                  </span>
                ) : (
                  'Send Message'
                )}
              </button>

              {/* Privacy Note */}
              <p className="text-center text-gray-500 text-xs mt-1">
                Your information is safe with us and will only be used to respond to your inquiry.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
