import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

/* ─────────────────────────────────────────────────────────────
   Modal data definitions for all 12 footer links
───────────────────────────────────────────────────────────── */
const FOOTER_ITEMS_DATA = {
  audio: {
    id: 'audio',
    category: 'ACCESSIBILITY',
    title: 'Audio Description',
    description:
      'Audio Description provides spoken narration of visual elements on screen — including physical actions, facial expressions, costumes, settings, and scene changes during dialogue pauses.',
    details:
      'This feature is available on thousands of Netflix titles across more than 30 languages. You can enable or disable Audio Description anytime from the audio & subtitles menu during video playback on all compatible devices.',
    action: { type: 'link', label: 'View Accessibility Page', to: '/info/audio' },
  },

  investor: {
    id: 'investor',
    category: 'INVESTOR RELATIONS',
    title: 'Investor Relations',
    description:
      'Netflix is the world\'s leading streaming entertainment service with over 260 million paid memberships in more than 190 countries enjoying TV series, films, and games across a wide variety of genres and languages.',
    details:
      'Access quarterly earnings releases, shareholder letters, SEC filings (Form 10-K, 10-Q), corporate governance guidelines, and investor presentations on the official portal.',
    action: { type: 'external', label: 'Visit Investor Portal', href: 'https://ir.netflix.net' },
  },

  help: {
    id: 'help',
    category: 'CUSTOMER CARE',
    title: 'Help Centre',
    description:
      'Need assistance with your Netflix GPT experience? Browse quick troubleshooting tips, manage streaming preferences, or contact our support team.',
    details:
      'Use natural language prompts in the GPT Search bar to discover curated movies, add favorites to My List with a single click, and stream trailers fetched dynamically via TMDB.',
    action: { type: 'link', label: 'Contact Support', to: '/contact' },
    secondaryAction: { type: 'external', label: 'Official Netflix Help', href: 'https://help.netflix.com' },
  },

  jobs: {
    id: 'jobs',
    category: 'CAREERS & CULTURE',
    title: 'Jobs & Careers',
    description:
      'At Netflix, we shape the future of entertainment by fostering a culture of freedom and responsibility, extraordinary talent, and continuous innovation.',
    details:
      'Explore opportunities across AI & Machine Learning, Distributed Streaming Infrastructure, Frontend Engineering, Mobile Platforms, and Creative Studio Technologies worldwide.',
    action: { type: 'external', label: 'Explore Open Roles', href: 'https://jobs.netflix.com' },
  },

  gift: {
    id: 'gift',
    category: 'MEMBERSHIP',
    title: 'Gift Cards',
    description:
      'Netflix Gift Cards can be applied to an existing membership or used to start a new subscription. Gift cards have no expiration dates or maintenance fees.',
    details:
      'Available at leading retail stores and online platforms including Amazon, Target, Walmart, and PayPal Digital Gifts. Redeemable directly on your billing account.',
    action: { type: 'external', label: 'Redeem Gift Card', href: 'https://www.netflix.com/redeem' },
  },

  terms: {
    id: 'terms',
    category: 'LEGAL',
    title: 'Terms of Use',
    description:
      'Welcome to Netflix GPT. This application is an educational and portfolio project built to showcase the integration of modern web technologies with artificial intelligence models.',
    details:
      'By using this service, you agree to our standard terms governing personal non-commercial use, AI-assisted movie search query processing via OpenAI API, and content usage licenses.',
    action: { type: 'link', label: 'Read Full Terms', to: '/info/terms' },
  },

  media: {
    id: 'media',
    category: 'PRESS & RELEASES',
    title: 'Media Centre',
    description:
      'The official destination for press releases, upcoming release schedules, high-resolution production assets, and studio news from around the world.',
    details:
      'Find downloadable artwork, premiere dates, trailers, executive leadership statements, and direct media relations contact channels for journalists and publishers.',
    action: { type: 'external', label: 'Visit Media Centre', href: 'https://media.netflix.com' },
  },

  privacy: {
    id: 'privacy',
    category: 'PRIVACY & SECURITY',
    title: 'Privacy Policy',
    description:
      'Your privacy is fundamental to our service. We are committed to transparency in how your personal data and AI search queries are handled and protected.',
    details:
      'We do not sell personal data to third parties. All user authentication and session security is managed via Google Firebase with end-to-end TLS encryption and CCPA/GDPR compliance.',
    action: { type: 'link', label: 'View Privacy Policy', to: '/info/privacy' },
  },

  legal: {
    id: 'legal',
    category: 'LEGAL NOTICES',
    title: 'Legal Notices',
    description:
      'Netflix® is a registered trademark of Netflix, Inc. Netflix GPT is an independent educational and demonstration project and is not affiliated with or endorsed by Netflix, Inc.',
    details:
      'Movie metadata, images, and trailers are powered by The Movie Database (TMDB) API. AI search is powered by OpenAI. Core open-source libraries include React, Redux Toolkit, and TailwindCSS.',
    action: { type: 'link', label: 'View Full Disclaimers', to: '/info/legal' },
  },

  cookies: {
    id: 'cookies',
    category: 'PREFERENCES',
    title: 'Cookie Preferences',
    description:
      'We use cookies and local storage to deliver, secure, and improve our services, remember your theme settings, and maintain your active session state.',
    details:
      'Strictly necessary cookies are always active to support authentication and account security. You can adjust your data and preference settings anytime on our dedicated cookies page.',
    action: { type: 'link', label: 'Manage Cookie Settings', to: '/info/cookies' },
  },

  corporate: {
    id: 'corporate',
    category: 'ABOUT PROJECT',
    title: 'Corporate Information',
    description:
      'Netflix GPT is an AI-powered movie discovery web application that combines React 18, Redux Toolkit, Firebase Authentication, and OpenAI GPT-4 with TMDB APIs.',
    details:
      'Engineered to demonstrate production-grade architecture, custom responsive layouts, multi-language support, interactive modals, and real-time state management.',
    action: { type: 'link', label: 'Corporate & Tech Info', to: '/info/corporate' },
  },

  contact: {
    id: 'contact',
    category: 'SUPPORT',
    title: 'Contact Us',
    description:
      'Have questions, feedback, or need technical support? We are always here to assist and improve your Netflix GPT streaming experience.',
    details:
      'Reach out through our direct contact page to send inquiries, report bugs, request features, or connect with the development team.',
    action: { type: 'link', label: 'Open Contact Form', to: '/contact' },
  },
};

/* ─────────────────────────────────────────────────────────────
   Clean Minimalist Modal Component (Matching Reference UI)
───────────────────────────────────────────────────────────── */
const FooterDetailModal = ({ itemId, onClose }) => {
  const data = FOOTER_ITEMS_DATA[itemId];

  useEffect(() => {
    // Lock background scroll while modal is open
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  if (!data) return null;

  const modalContent = (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm transition-all duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Modal Card */}
      <div
        className="relative w-full max-w-md bg-[#121214] border border-zinc-800/80 rounded-2xl p-7 md:p-8 shadow-2xl animate-modalIn text-left"
        style={{
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8), 0 0 25px rgba(229, 9, 20, 0.08)',
        }}
      >
        {/* Close 'X' Button at top right */}
        <button
          id="footer-modal-close-btn"
          onClick={onClose}
          className="absolute top-6 right-6 text-zinc-400 hover:text-white transition-colors duration-200 cursor-pointer p-1 rounded-lg hover:bg-zinc-800/60"
          aria-label="Close"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Red Category Subheader */}
        <div className="text-red-500 font-bold text-xs tracking-widest uppercase mb-2">
          {data.category}
        </div>

        {/* Title */}
        <h2 className="text-2xl md:text-[28px] font-extrabold text-white tracking-tight mb-4 leading-tight">
          {data.title}
        </h2>

        {/* Description Body */}
        <div className="space-y-3 text-zinc-300 text-sm leading-relaxed mb-6 font-normal">
          <p>{data.description}</p>
          {data.details && <p className="text-zinc-400 text-[13.5px]">{data.details}</p>}
        </div>

        {/* Buttons / Actions */}
        <div className="space-y-2.5 pt-1">
          {/* Optional Primary Action Link/Button */}
          {data.action && (
            <div>
              {data.action.type === 'link' ? (
                <Link
                  to={data.action.to}
                  onClick={onClose}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 bg-red-600 hover:bg-red-700 text-white font-semibold text-sm rounded-full transition-all duration-200 active:scale-[0.98] shadow-md shadow-red-950/40"
                >
                  <span>{data.action.label}</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              ) : (
                <a
                  href={data.action.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 bg-red-600 hover:bg-red-700 text-white font-semibold text-sm rounded-full transition-all duration-200 active:scale-[0.98] shadow-md shadow-red-950/40"
                >
                  <span>{data.action.label}</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              )}
            </div>
          )}

          {/* Close / Dismiss Button */}
          <button
            onClick={onClose}
            className="w-full py-3 px-4 bg-[#1a1a1d] hover:bg-[#222226] text-white font-semibold text-sm rounded-full border border-zinc-700/80 transition-all duration-200 cursor-pointer active:scale-[0.98]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
};
export default FooterDetailModal;

