import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from './Header';

/* ───────────────────────────────────────────────────────────
   Page content definitions
─────────────────────────────────────────────────────────── */
const PAGES = {
  terms: {
    title: 'Terms of Use',
    badge: 'Legal',
    lastUpdated: 'January 1, 2025',
    intro:
      'Welcome to Netflix GPT. By using our service, you agree to the following terms. Please read them carefully before creating an account or accessing any content.',
    sections: [
      {
        heading: '1. Acceptance of Terms',
        content:
          'By creating a Netflix GPT account or using the Service, you acknowledge that you have read, understood, and agree to these Terms of Use. These Terms constitute a legally binding agreement between you and Netflix GPT. If you do not agree, please discontinue use of the Service immediately.',
      },
      {
        heading: '2. The Netflix GPT Service',
        content:
          'Netflix GPT provides a personalized streaming experience enhanced with AI-powered movie discovery. Our service includes access to a vast library of movies and TV shows, GPT-powered natural-language search, and personalized recommendations based on your viewing history and preferences. Content availability may vary by region.',
      },
      {
        heading: '3. Account Access & Security',
        content:
          'The account holder must be 18 years of age or older. You are solely responsible for all activity that occurs through your account. Keep your password confidential and do not share your credentials. Netflix GPT will never ask for your password via email or customer support channels. Notify us immediately if you suspect unauthorized access.',
      },
      {
        heading: '4. AI-Powered Features',
        content:
          'Netflix GPT integrates OpenAI\'s GPT language models to power natural-language movie search. By using the GPT Search feature, you agree that your search queries may be processed by OpenAI\'s API in accordance with OpenAI\'s usage policies. We do not store raw query data beyond the current session.',
      },
      {
        heading: '5. Intellectual Property',
        content:
          'All content included in or made available through the Service — including text, graphics, logos, images, audio, and software — is the property of Netflix GPT or its licensors and is protected by applicable copyright and intellectual property laws. Unauthorized reproduction or distribution is strictly prohibited.',
      },
      {
        heading: '6. Disclaimers & Limitation of Liability',
        content:
          'The Service is provided on an "AS IS" and "AS AVAILABLE" basis without warranties of any kind. To the fullest extent permitted by law, Netflix GPT disclaims all warranties, express or implied, including merchantability, fitness for a particular purpose, and non-infringement. Our liability for any claim shall not exceed the amount paid by you in the past 12 months.',
      },
      {
        heading: '7. Governing Law & Changes',
        content:
          'These Terms are governed by the laws of the State of Delaware, United States. Netflix GPT reserves the right to modify these Terms at any time. Material changes will be communicated via email or a prominent in-app notice. Continued use of the Service after such changes constitutes your acceptance of the revised Terms.',
      },
    ],
  },

  privacy: {
    title: 'Privacy Policy',
    badge: 'Privacy',
    lastUpdated: 'January 1, 2025',
    intro:
      'Your privacy is important to us. This Privacy Policy explains what information we collect, why we collect it, and how you can manage it.',
    sections: [
      {
        heading: '1. Information We Collect',
        content:
          'We collect information you provide directly, including name, email address, and payment details (processed by secure third-party providers). We also automatically collect usage data such as viewing history, search queries, ratings, device type, IP address, and browser/app interactions to deliver and improve the Service.',
      },
      {
        heading: '2. How We Use Your Information',
        content:
          'Your information is used to: provide and personalize the Service; power AI-driven movie recommendations; process payments and send transactional emails; send promotional communications (opt-in); detect and prevent fraud; and analyze usage trends to improve performance and features.',
      },
      {
        heading: '3. AI & Personalization',
        content:
          'Netflix GPT uses machine learning models to analyze your viewing and search history to surface personalized recommendations. Your queries may be sent to OpenAI\'s API to generate search results. We anonymize and aggregate this data where possible and do not use it to build individual advertising profiles.',
      },
      {
        heading: '4. How We Share Your Information',
        content:
          'We do not sell your personal information. We may share data with: service providers operating on our behalf (e.g., cloud hosting, payment processing); TMDB and OpenAI for core functionality; law enforcement when legally required; and business partners with your explicit consent. All sharing complies with applicable privacy laws.',
      },
      {
        heading: '5. Your Rights & Choices',
        content:
          'You have the right to access, correct, or delete your personal data at any time. California residents may exercise rights under CCPA; EU/EEA residents may exercise rights under GDPR, including right to erasure and data portability. You may opt out of marketing emails via the unsubscribe link in any email. Manage cookie preferences on our Cookie Preferences page.',
      },
      {
        heading: '6. Data Security & Retention',
        content:
          'We implement industry-standard safeguards including TLS encryption, Firebase security rules, and regular security audits. We retain your personal data as long as your account is active or as needed to provide the Service. Upon account deletion, personal data is removed within 30 days, except where retention is required by law.',
      },
      {
        heading: '7. Contact & Updates',
        content:
          'If you have privacy questions or requests, please use our Contact Us page. We will respond within 30 business days. This policy may be updated periodically; material changes will be communicated via email or in-app notification.',
      },
    ],
  },

  legal: {
    title: 'Legal Notices',
    badge: 'Legal',
    lastUpdated: 'January 1, 2025',
    intro:
      'This page contains important legal notices regarding intellectual property, trademarks, third-party software, and disclaimers of affiliation.',
    sections: [
      {
        heading: 'Copyright Notice',
        content:
          '© 1997–2026 Netflix, Inc. All rights reserved. The Netflix GPT application, its design, codebase, and original content are protected by international copyright laws. Unauthorized reproduction, distribution, or modification without written permission is prohibited.',
      },
      {
        heading: 'Disclaimer of Affiliation',
        content:
          'Netflix GPT is an independent educational and portfolio project. It is not affiliated with, endorsed by, sponsored by, or officially connected to Netflix, Inc. in any way. All Netflix® trademarks, logos, branding, and content are the exclusive property of Netflix, Inc. and are used here solely for demonstration and educational purposes under nominative fair use.',
      },
      {
        heading: 'Trademark Information',
        content:
          'Netflix® is a registered trademark of Netflix, Inc. The Netflix name, logo, and related marks belong solely to Netflix, Inc. Other product and company names mentioned herein may be trademarks of their respective owners. Mention does not imply any affiliation or endorsement.',
      },
      {
        heading: 'Third-Party Licenses & APIs',
        content:
          'This application uses: React (MIT License) · Redux Toolkit (MIT License) · Firebase Authentication & Hosting (Google Terms of Service) · The Movie Database API – TMDB (TMDB API Terms) · OpenAI GPT API (OpenAI Terms of Use) · TailwindCSS (MIT License) · React Router (MIT License). Full license texts available upon request.',
      },
      {
        heading: 'DMCA & Intellectual Property Policy',
        content:
          'We respect intellectual property rights. If you believe content available through our Service infringes your copyright, please contact us via the Contact Us page with sufficient information to identify the claimed infringing material. We will respond to properly submitted DMCA notices promptly and, where applicable, remove or disable access to the infringing content.',
      },
      {
        heading: 'No Warranties',
        content:
          'All information on this platform is provided "as is" without warranties of any kind, either express or implied. Netflix GPT makes no representations or warranties regarding the accuracy, completeness, or reliability of any information provided through the Service.',
      },
    ],
  },

  corporate: {
    title: 'Corporate Information',
    badge: 'About',
    lastUpdated: 'January 1, 2025',
    intro:
      'Learn about Netflix GPT — an AI-powered movie discovery platform built to demonstrate the integration of modern web technologies with large language models.',
    sections: [
      {
        heading: 'About Netflix GPT',
        content:
          'Netflix GPT is a portfolio project that reimagines the Netflix streaming experience with the power of artificial intelligence. It combines React, Redux, Firebase, TMDB, and OpenAI\'s GPT API to deliver a fully functional, AI-enhanced streaming platform. Users can browse trending, popular, and upcoming movies, or use the GPT Search bar to find movies using natural language.',
      },
      {
        heading: 'Our Mission',
        content:
          'To demonstrate how cutting-edge AI can be integrated into consumer-facing applications to create more personalized and intuitive experiences. Netflix GPT serves as a proof-of-concept for AI-enhanced content discovery in streaming platforms, showcasing real-world applicability of GPT models in production-grade React applications.',
      },
      {
        heading: 'Technology Stack',
        content:
          'Netflix GPT is built with: React 18 (UI framework) · Redux Toolkit (state management) · Firebase Authentication + Hosting (auth & deployment) · OpenAI GPT API (AI-powered search) · TMDB API (movie database & images) · TailwindCSS (utility-first styling) · Vite (build tooling). The application follows modern best practices including custom hooks, Redux slices, and component-driven architecture.',
      },
      {
        heading: 'Data & Content Partners',
        content:
          'Movie data, posters, and metadata are powered by The Movie Database (TMDB) — a community-built movie and TV database trusted by millions of developers. AI search is powered by OpenAI\'s language models. User authentication and real-time data are handled through Google Firebase.',
      },
      {
        heading: 'Feedback & Contributions',
        content:
          'We welcome feedback, bug reports, and feature suggestions. If you experience any issues or have ideas for improvement, please reach out via our Contact Us page. Your input directly shapes the roadmap of Netflix GPT.',
      },
    ],
  },

  audio: {
    title: 'Audio Description',
    badge: 'Accessibility',
    lastUpdated: 'January 1, 2025',
    intro:
      'Netflix is committed to making entertainment accessible to everyone. Audio Description provides spoken narration of key visual elements so blind and visually impaired viewers can fully enjoy the story.',
    sections: [
      {
        heading: 'What is Audio Description?',
        content:
          'Audio Description (AD) is an accessibility feature that narrates key visual elements of a movie or TV show — including character actions, facial expressions, scene changes, and on-screen text — during natural pauses in dialogue. It allows viewers who are blind or have low vision to follow the full story without relying solely on the audio.',
      },
      {
        heading: 'How to Enable Audio Description',
        content:
          'To enable Audio Description: 1) Start playing a title that supports AD. 2) Tap or click the "Audio & Subtitles" icon (speech bubble). 3) Under the "Audio" section, select the language track marked "[Audio Description]". 4) Tap or click "Apply". The AD track will now play alongside regular dialogue and sound effects.',
      },
      {
        heading: 'Available Content',
        content:
          'Netflix offers Audio Description tracks for thousands of movies and TV shows across its catalog, including Netflix Originals. Titles with Audio Description are marked with an "AD" badge on the title detail page. Netflix continues to expand its AD library in partnership with content producers globally.',
      },
      {
        heading: 'Compatible Devices',
        content:
          'Audio Description is supported on most Netflix-compatible devices including: Smart TVs (Samsung, LG, Sony, etc.) · Streaming devices (Roku, Amazon Fire Stick, Apple TV, Chromecast) · Gaming consoles (PlayStation 4/5, Xbox One/Series X) · iOS and Android mobile devices · Web browsers (Chrome, Firefox, Safari, Edge). Availability may vary by region and device model.',
      },
      {
        heading: 'Additional Accessibility Features',
        content:
          'Beyond Audio Description, Netflix offers: Closed Captions (CC) · Subtitles for the Deaf and Hard of Hearing (SDH) · Adjustable caption text size, font, and color · Background color and opacity controls · Keyboard navigation support on web · High-contrast UI elements. Netflix is committed to continuously improving accessibility across the platform for all users.',
      },
    ],
  },

  cookies: {
    title: 'Cookie Preferences',
    badge: 'Privacy',
    type: 'cookies',
    lastUpdated: 'January 1, 2025',
    intro:
      'We use cookies and similar technologies to deliver, protect, and improve our services. Adjust your preferences below — your choices are saved locally on your device.',
    sections: [
      {
        heading: 'What Are Cookies?',
        content:
          'Cookies are small text files placed on your device when you visit our website. They help us recognize your device, remember your preferences, analyze how the Service is used, and personalize your experience. We use session cookies (expire when you close your browser) and persistent cookies (remain until deleted or expired).',
      },
      {
        heading: 'How to Manage Cookies',
        content:
          'In addition to the controls below, you can manage cookies through your browser settings. Note that disabling certain cookies may affect functionality and your personalized experience. Changes take effect immediately after saving your preferences.',
      },
    ],
    cookieCategories: [
      {
        name: 'Strictly Necessary',
        description:
          'Essential for the website to function. They enable core features like authentication, security, and session management. These cannot be disabled as the site would not work properly without them.',
        required: true,
        defaultEnabled: true,
      },
      {
        name: 'Performance & Analytics',
        description:
          'Help us understand how visitors interact with our site by collecting anonymous usage data — such as pages visited, time spent, and errors encountered. This helps us improve performance and user experience.',
        required: false,
        defaultEnabled: true,
      },
      {
        name: 'Functional',
        description:
          'Enable enhanced functionality and personalization, such as remembering your language preference, playback settings, and UI customizations. Disabling these may limit personalization features.',
        required: false,
        defaultEnabled: true,
      },
      {
        name: 'Targeting & Advertising',
        description:
          'May be used by advertising partners to build a profile of your interests and serve relevant ads on other sites. We currently do not use advertising cookies, but this toggle is provided for future transparency.',
        required: false,
        defaultEnabled: false,
      },
    ],
  },
};

/* ───────────────────────────────────────────────────────────
   Toggle Switch Component
─────────────────────────────────────────────────────────── */
const Toggle = ({ enabled, onChange, disabled }) => (
  <button
    type="button"
    disabled={disabled}
    onClick={() => !disabled && onChange(!enabled)}
    aria-pressed={enabled}
    className={`relative inline-flex h-6 w-11 flex-shrink-0 rounded-full border-2 border-transparent
      transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-zinc-900
      ${enabled ? 'bg-red-600' : 'bg-zinc-600'}
      ${disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
  >
    <span
      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg
        transition-transform duration-200 ease-in-out
        ${enabled ? 'translate-x-5' : 'translate-x-0'}`}
    />
  </button>
);

/* ───────────────────────────────────────────────────────────
   Main Component
─────────────────────────────────────────────────────────── */
const InfoPage = () => {
  const { slug } = useParams();
  const page = PAGES[slug];

  // Cookie toggle state
  const initialCookiePrefs = page?.cookieCategories?.reduce((acc, c) => {
    const stored = (() => {
      try {
        const saved = JSON.parse(localStorage.getItem('cookiePrefs') || '{}');
        return c.name in saved ? saved[c.name] : c.defaultEnabled;
      } catch {
        return c.defaultEnabled;
      }
    })();
    acc[c.name] = stored;
    return acc;
  }, {}) || {};

  const [cookiePrefs, setCookiePrefs] = useState(initialCookiePrefs);
  const [saved, setSaved] = useState(false);

  const handleSaveCookies = () => {
    localStorage.setItem('cookiePrefs', JSON.stringify(cookiePrefs));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  /* 404 fallback */
  if (!page) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex flex-col">
        <Header />
        <div className="flex-1 flex flex-col items-center justify-center gap-6 px-4">
          <span className="text-7xl font-black text-red-600">404</span>
          <h1 className="text-3xl font-bold">Page Not Found</h1>
          <p className="text-gray-400">The page you're looking for doesn't exist.</p>
          <Link
            to="/browse"
            className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition duration-200"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const badgeColors = {
    Legal: 'bg-zinc-700 text-zinc-100',
    Privacy: 'bg-blue-900 text-blue-200',
    About: 'bg-red-800 text-red-100',
    Accessibility: 'bg-emerald-900 text-emerald-200',
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Header />

      {/* Page body */}
      <div className="max-w-4xl mx-auto px-6 md:px-12 pt-28 pb-24">

        {/* Back button */}
        <Link
          to="/browse"
          id="info-back-btn"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-200 mb-10 group text-sm"
        >
          <svg
            className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform duration-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Browsing
        </Link>

        {/* Page Header */}
        <div className="mb-12 pb-10 border-b border-zinc-800">
          <span
            className={`inline-block px-3 py-1 text-xs font-semibold rounded-full uppercase tracking-wider mb-4 ${
              badgeColors[page.badge] || 'bg-zinc-700 text-zinc-200'
            }`}
          >
            {page.badge}
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-3 leading-tight">
            {page.title}
          </h1>
          <p className="text-gray-500 text-xs mb-5 uppercase tracking-wide">
            Last updated: {page.lastUpdated}
          </p>
          <p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-3xl">
            {page.intro}
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-10">
          {page.sections.map((section, i) => (
            <div
              key={i}
              className="group pl-6 border-l-2 border-zinc-700 hover:border-red-600 transition-colors duration-300"
            >
              <h2 className="text-lg md:text-xl font-bold text-white mb-3 group-hover:text-red-400 transition-colors duration-200">
                {section.heading}
              </h2>
              <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                {section.content}
              </p>
            </div>
          ))}

          {/* ── Cookie Toggles (cookies page only) ── */}
          {page.type === 'cookies' && page.cookieCategories && (
            <div className="mt-4">
              <h2 className="text-xl font-bold text-white mb-2">Manage Cookie Categories</h2>
              <p className="text-gray-500 text-sm mb-6">
                Toggle individual categories on or off. Required cookies cannot be disabled.
              </p>

              <div className="space-y-3">
                {page.cookieCategories.map((cookie, i) => (
                  <div
                    key={i}
                    className="bg-zinc-900 border border-zinc-800 hover:border-zinc-600 rounded-xl p-5 transition-colors duration-200"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <h3 className="font-semibold text-white text-sm md:text-base">
                            {cookie.name}
                          </h3>
                          {cookie.required && (
                            <span className="text-xs bg-zinc-700 text-gray-300 px-2 py-0.5 rounded-full font-medium">
                              Always Active
                            </span>
                          )}
                          {!cookie.required && (
                            <span
                              className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                                (cookie.required ? true : cookiePrefs[cookie.name])
                                  ? 'bg-red-900/50 text-red-300'
                                  : 'bg-zinc-700 text-gray-400'
                              }`}
                            >
                              {(cookie.required ? true : cookiePrefs[cookie.name]) ? 'Enabled' : 'Disabled'}
                            </span>
                          )}
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed">{cookie.description}</p>
                      </div>
                      <div className="pt-1 flex-shrink-0">
                        <Toggle
                          enabled={cookie.required ? true : cookiePrefs[cookie.name]}
                          onChange={(val) =>
                            setCookiePrefs((prev) => ({ ...prev, [cookie.name]: val }))
                          }
                          disabled={cookie.required}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Save Button */}
              <div className="mt-6 flex items-center gap-4">
                <button
                  id="save-cookie-prefs-btn"
                  onClick={handleSaveCookies}
                  className={`px-8 py-3 font-bold rounded-lg transition-all duration-300 active:scale-95
                    ${
                      saved
                        ? 'bg-emerald-600 text-white cursor-default'
                        : 'bg-red-600 hover:bg-red-700 text-white cursor-pointer'
                    }`}
                >
                  {saved ? (
                    <span className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      Preferences Saved!
                    </span>
                  ) : (
                    'Save My Preferences'
                  )}
                </button>
                <p className="text-gray-500 text-xs">
                  Preferences are stored locally on your device.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 pt-8 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            Still have questions?{' '}
            <Link to="/contact" className="text-red-400 hover:text-red-300 hover:underline transition-colors">
              Contact Us
            </Link>
          </p>
          <div className="flex items-center gap-4 text-xs text-gray-600">
            <Link to="/info/privacy" className="hover:text-gray-400 transition-colors">Privacy</Link>
            <span>·</span>
            <Link to="/info/terms" className="hover:text-gray-400 transition-colors">Terms</Link>
            <span>·</span>
            <Link to="/info/cookies" className="hover:text-gray-400 transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoPage;
