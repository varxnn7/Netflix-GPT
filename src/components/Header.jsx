import React, { useState, useEffect, useRef } from 'react'
import { signOut } from "firebase/auth";
import { useNavigate, useLocation } from "react-router-dom";
import { auth } from "../utils/firebase";
import { useSelector, useDispatch } from 'react-redux';
import { LOGO, USER_AVATAR } from '../utils/constants';
import { onAuthStateChanged } from 'firebase/auth';
import { addUser, removeUser } from '../utils/userSlice';
import { toggleGptSearchView } from '../utils/gptSlice';
import { changeLanguage } from '../utils/configSlice';
import { clearActiveProfile } from '../utils/profilesSlice';

const NAV_ITEMS = [
  { label: 'Home', path: '/browse' },
  { label: 'Shows', path: '/shows' },
  { label: 'Movies', path: '/movies' },
  { label: 'Games', path: '/games' },
  { label: 'New & Popular', path: '/new-and-popular' },
  { label: 'My List', path: '/my-list' },
  { label: 'Browse by Languages', path: null, isLanguage: true },
];

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'हिन्दी (Hindi)' },
  { code: 'es', label: 'Español (Spanish)' },
  { code: 'fr', label: 'Français (French)' },
  { code: 'de', label: 'Deutsch (German)' },
  { code: 'ja', label: '日本語 (Japanese)' },
  { code: 'ko', label: '한국어 (Korean)' },
];

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector(store => store.user);
  const activeProfile = useSelector(store => store.profiles?.activeProfile);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

  const langRef = useRef(null);
  const dropdownRef = useRef(null);

  // Scroll effect for solid background
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) setIsLangOpen(false);
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setIsDropdownOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = () => {
    setIsDropdownOpen(false);
    dispatch(clearActiveProfile());
    signOut(auth).catch(() => navigate("/error"));
  };

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const handleAccount = () => {
    setIsDropdownOpen(false);
    window.open('https://www.netflix.com/YourAccount', '_blank');
  };

  const handleHelpCentre = () => {
    setIsDropdownOpen(false);
    window.open('https://help.netflix.com', '_blank');
  };

  const handleManageProfiles = () => {
    setIsDropdownOpen(false);
    navigate('/profiles');
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(addUser({ uid, email, displayName, photoURL }));
        // Redirect to profile selection (not directly to browse)
        if (location.pathname === '/') {
          navigate("/profiles");
        }
      } else {
        dispatch(removeUser());
        const publicRoutes = ['/', '/contact'];
        const isPublic = publicRoutes.includes(location.pathname) || location.pathname.startsWith('/info/');
        if (!isPublic) navigate("/");
      }
    });
    return () => unsubscribe();
  }, [dispatch, navigate, location.pathname]);

  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

  const handleGptSearchClick = () => dispatch(toggleGptSearchView());

  const handleLanguageChange = (code) => {
    dispatch(changeLanguage(code));
    setIsLangOpen(false);
    showToast(`🌐 Language changed`);
  };

  const handleLogoClick = () => {
    if (showGptSearch) dispatch(toggleGptSearchView());
    navigate(user ? '/browse' : '/');
  };

  const isActivePath = (path) => location.pathname === path;

  const currentNavLabel = NAV_ITEMS.find(item => item.path && isActivePath(item.path))?.label || '';

  return (
    <>
      {/* Main Header */}
      <div
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#141414]'
            : 'bg-gradient-to-b from-black/90 via-black/50 to-transparent'
        }`}
      >
        <div className="flex items-center justify-between px-4 md:px-12 h-16">
          {/* Left: Logo + Nav */}
          <div className="flex items-center gap-6 md:gap-7">
            {/* Logo */}
            <img
              className="w-24 md:w-28 cursor-pointer flex-shrink-0"
              src={LOGO}
              alt="Netflix"
              onClick={handleLogoClick}
            />

            {/* Desktop Nav */}
            {user && (
              <nav className="hidden md:flex items-center gap-1">
                {NAV_ITEMS.map((item) => {
                  if (item.isLanguage) {
                    return (
                      <div key="lang" className="relative" ref={langRef}>
                        <button
                          onClick={() => setIsLangOpen(!isLangOpen)}
                          className="flex items-center gap-1 text-white text-sm px-3 py-1.5 rounded hover:bg-white/10 transition-colors whitespace-nowrap"
                        >
                          Browse by Languages
                          <svg
                            className={`w-3.5 h-3.5 transition-transform duration-200 ${isLangOpen ? 'rotate-180' : ''}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </button>
                        {isLangOpen && (
                          <div className="absolute top-full left-0 mt-1 w-52 bg-black/95 border border-gray-700 rounded shadow-2xl overflow-hidden">
                            {LANGUAGES.map((lang) => (
                              <button
                                key={lang.code}
                                onClick={() => handleLanguageChange(lang.code)}
                                className="w-full text-left px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
                              >
                                {lang.label}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  }

                  const isActive = isActivePath(item.path);
                  return (
                    <button
                      key={item.path}
                      onClick={() => navigate(item.path)}
                      className={`text-sm px-3 py-1.5 rounded transition-colors whitespace-nowrap ${
                        isActive
                          ? 'text-white font-semibold bg-white/10'
                          : 'text-gray-300 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </nav>
            )}

            {/* Mobile: Show current page label */}
            {user && (
              <div className="md:hidden flex items-center gap-1.5" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                <span className="text-white font-semibold text-sm">{currentNavLabel || 'Browse'}</span>
                <svg
                  className={`w-3.5 h-3.5 text-white transition-transform duration-200 ${isMobileMenuOpen ? 'rotate-180' : ''}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </div>

          {/* Right: Icons + Avatar */}
          {user && (
            <div className="flex items-center gap-2 md:gap-3">
              {/* GPT Search Button */}
              <button
                onClick={handleGptSearchClick}
                className="bg-red-600 hover:bg-red-700 text-white text-xs md:text-sm px-2.5 md:px-4 py-1.5 rounded-md font-bold shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-95 whitespace-nowrap"
              >
                GPT Search
              </button>

              {/* Search Icon */}
              <button
                onClick={handleGptSearchClick}
                className="text-white hover:text-gray-300 transition-colors p-1"
                title="Search"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6" strokeWidth={2}>
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" strokeLinecap="round" />
                </svg>
              </button>

              {/* Bell Icon */}
              <button
                className="text-white hover:text-gray-300 transition-colors p-1 relative hidden md:block"
                title="Notifications"
                onClick={() => showToast('🔔 No new notifications')}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 md:w-6 md:h-6">
                  <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6V11c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
                </svg>
              </button>

              {/* Children Badge — Netflix-style with colourful kids icon + label */}
              <button
                onClick={() => navigate('/browse')}
                className="hidden md:flex items-center gap-1.5 group transition-opacity hover:opacity-80"
                title="Children"
              >
                {/* Colourful kids icon tile */}
                <div
                  className="w-7 h-7 rounded-md flex items-center justify-center text-[10px] font-black text-white leading-none overflow-hidden flex-shrink-0"
                  style={{
                    background: 'linear-gradient(135deg,#4285F4 0%,#EA4335 33%,#FBBC05 66%,#34A853 100%)',
                  }}
                >
                  kids
                </div>
                <span className="text-white text-sm font-medium">
                  Children
                </span>
              </button>

              {/* Profile Avatar Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <div
                  className="flex items-center gap-1.5 cursor-pointer"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  {/* Profile avatar tile */}
                  <div
                    className={`w-8 h-8 rounded-md flex-shrink-0 border-2 transition-colors overflow-hidden ${
                      isDropdownOpen ? 'border-white' : 'border-transparent hover:border-white'
                    }`}
                    style={{ background: activeProfile?.color || '#4169E1' }}
                  >
                    {user?.photoURL ? (
                      <img src={user.photoURL} alt="avatar" className="w-full h-full object-cover" onError={(e)=>{e.target.style.display='none'}} />
                    ) : (
                      /* Smiley face SVG */
                      <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
                        <circle cx="11" cy="13" r="2" fill="white" />
                        <circle cx="21" cy="13" r="2" fill="white" />
                        <path d="M10 20 Q16 25 22 20" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" />
                      </svg>
                    )}
                  </div>
                  <svg
                    className={`w-3.5 h-3.5 text-white transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>

                {/* Profile Dropdown */}
                {isDropdownOpen && (
                  <div className="absolute right-0 top-11 w-56 bg-black/95 border border-gray-700 rounded shadow-2xl z-50">
                    {/* Caret */}
                    <div className="absolute -top-2 right-4 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[8px] border-b-gray-700" />

                    <div className="py-2">
                      {/* Current Profile */}
                      <div className="flex items-center gap-3 px-4 py-2 border-b border-gray-700 mb-1">
                        <div
                          className="w-8 h-8 rounded-md flex-shrink-0 overflow-hidden"
                          style={{ background: activeProfile?.color || '#4169E1' }}
                        >
                          {user?.photoURL && (
                            <img src={user.photoURL} alt="avatar" className="w-full h-full object-cover" />
                          )}
                        </div>
                        <span className="text-white text-sm font-medium truncate">
                          {activeProfile?.name || user?.displayName || user?.email?.split('@')[0]}
                        </span>
                      </div>

                      {/* Actions */}
                      <div className="text-[13px] text-gray-300 font-medium">
                        <button
                          onClick={handleManageProfiles}
                          className="w-full flex items-center gap-3 px-4 py-2.5 hover:text-white hover:bg-white/5 transition-colors text-left"
                        >
                          <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5 text-gray-400">
                            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                          </svg>
                          Manage Profiles
                        </button>

                        <button
                          onClick={handleAccount}
                          className="w-full flex items-center gap-3 px-4 py-2.5 hover:text-white hover:bg-white/5 transition-colors text-left"
                        >
                          <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5 text-gray-400">
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                          </svg>
                          Account
                        </button>

                        <button
                          onClick={handleHelpCentre}
                          className="w-full flex items-center gap-3 px-4 py-2.5 hover:text-white hover:bg-white/5 transition-colors text-left"
                        >
                          <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5 text-gray-400">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/>
                          </svg>
                          Help Centre
                        </button>
                      </div>

                      <div className="border-t border-gray-700 mt-1 flex justify-center py-3">
                        <button
                          onClick={handleSignOut}
                          className="text-[13px] font-bold text-white hover:underline"
                        >
                          Sign out of Netflix
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Mobile Nav Dropdown */}
        {user && isMobileMenuOpen && (
          <div className="md:hidden bg-black/95 border-t border-gray-800 px-4 py-2">
            {NAV_ITEMS.map((item) => {
              if (item.isLanguage) return null;
              const isActive = isActivePath(item.path);
              return (
                <button
                  key={item.path}
                  onClick={() => { navigate(item.path); setIsMobileMenuOpen(false); }}
                  className={`w-full text-left py-2.5 text-sm transition-colors ${
                    isActive ? 'text-white font-bold' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
            {/* Language selector on mobile */}
            <div className="border-t border-gray-700 mt-2 pt-2">
              <p className="text-gray-500 text-xs mb-2 uppercase tracking-wider">Browse by Language</p>
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => { handleLanguageChange(lang.code); setIsMobileMenuOpen(false); }}
                  className="w-full text-left py-2 text-sm text-gray-400 hover:text-white transition-colors"
                >
                  {lang.label}
                </button>
              ))}
            </div>
            <div className="border-t border-gray-700 mt-2 pt-2">
              <button
                onClick={() => { handleSignOut(); setIsMobileMenuOpen(false); }}
                className="w-full text-left py-2.5 text-sm text-red-400 hover:text-red-300 transition-colors font-semibold"
              >
                Sign Out
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-[999999] bg-zinc-800 text-white text-sm font-medium px-5 py-3 rounded-lg shadow-2xl border border-zinc-600 animate-fadeInUp max-w-xs">
          {toast}
        </div>
      )}
    </>
  );
};

export default Header;