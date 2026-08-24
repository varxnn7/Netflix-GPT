import React, { useState } from 'react';
import FooterDetailModal from './FooterDetailModal';

const Footer = () => {
  const [activeModalId, setActiveModalId] = useState(null);

  const openModal = (id, e) => {
    if (e) e.preventDefault();
    setActiveModalId(id);
  };

  const closeModal = () => {
    setActiveModalId(null);
  };

  const footerLinks = [
    { id: 'audio', label: 'Audio Description', elementId: 'footer-audio-desc' },
    { id: 'investor', label: 'Investor Relations', elementId: 'footer-investor' },
    { id: 'help', label: 'Help Centre', elementId: 'footer-help' },
    { id: 'jobs', label: 'Jobs', elementId: 'footer-jobs' },
    { id: 'gift', label: 'Gift Cards', elementId: 'footer-gift' },
    { id: 'terms', label: 'Terms of Use', elementId: 'footer-terms' },
    { id: 'media', label: 'Media Centre', elementId: 'footer-media' },
    { id: 'privacy', label: 'Privacy', elementId: 'footer-privacy' },
    { id: 'legal', label: 'Legal Notices', elementId: 'footer-legal' },
    { id: 'cookies', label: 'Cookie Preferences', elementId: 'footer-cookies' },
    { id: 'corporate', label: 'Corporate Information', elementId: 'footer-corporate' },
    { id: 'contact', label: 'Contact Us', elementId: 'footer-contact' },
  ];

  return (
    <>
      <footer className="bg-black text-gray-400 py-10 px-4 md:px-24 border-t border-zinc-900">
        <div className="max-w-5xl mx-auto flex flex-col items-start">

          {/* ── Social Icons ── */}
          <div className="flex space-x-5 mb-8">
            {/* Facebook */}
            <a
              id="footer-facebook"
              href="https://www.facebook.com/netflix"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Netflix on Facebook"
              className="text-gray-400 hover:text-white transition-colors duration-300 transform hover:scale-110"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>

            {/* Instagram */}
            <a
              id="footer-instagram"
              href="https://www.instagram.com/netflix"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Netflix on Instagram"
              className="text-gray-400 hover:text-pink-400 transition-colors duration-300 transform hover:scale-110"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>

            {/* X (Twitter) */}
            <a
              id="footer-twitter"
              href="https://x.com/netflix"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Netflix on X (Twitter)"
              className="text-gray-400 hover:text-sky-400 transition-colors duration-300 transform hover:scale-110"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>

            {/* YouTube */}
            <a
              id="footer-youtube"
              href="https://www.youtube.com/netflix"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Netflix on YouTube"
              className="text-gray-400 hover:text-red-500 transition-colors duration-300 transform hover:scale-110"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
          </div>

          {/* ── Links Grid ── */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-y-3.5 gap-x-8 md:gap-x-16 text-xs md:text-sm w-full mb-8">
            {footerLinks.map((item) => (
              <button
                key={item.id}
                id={item.elementId}
                type="button"
                onClick={(e) => openModal(item.id, e)}
                className="text-left text-gray-400 hover:text-white hover:underline transition-colors duration-200 cursor-pointer focus:outline-none focus:text-red-400"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* ── Service Code / Language Indicator ── */}
          <div className="mb-6">
            <button
              onClick={() => openModal('corporate')}
              className="border border-zinc-700 hover:border-zinc-500 text-gray-400 hover:text-white px-3 py-1.5 text-xs rounded transition-colors duration-200 cursor-pointer"
            >
              Netflix GPT Project Details
            </button>
          </div>

          {/* ── Copyright ── */}
          <div className="text-xs text-gray-500">
            <p>&copy; 1997-2026 Netflix, Inc. · Built for AI-enhanced entertainment</p>
          </div>
        </div>
      </footer>

      {/* ── Details Card Modal ── */}
      {activeModalId && (
        <FooterDetailModal
          itemId={activeModalId}
          onClose={closeModal}
        />
      )}
    </>
  );
};

export default Footer;
