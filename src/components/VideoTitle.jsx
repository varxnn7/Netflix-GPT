import React, { useState, useEffect } from 'react';
import MovieDetailsModal from './MovieDetailsModal';
import { useSelector } from 'react-redux';

/* Muted icon */
const MutedIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M16.5 12A4.5 4.5 0 0 0 14 7.97v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51A8.796 8.796 0 0 0 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3 3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06A8.99 8.99 0 0 0 17.73 18l2 2L21 18.73 4.27 3zM12 4 9.91 6.09 12 8.18V4z"/>
  </svg>
);

/* Unmuted icon */
const UnmutedIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
  </svg>
);

const VideoTitle = ({ movie }) => {
  const [showModal, setShowModal] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const trailorVideo = useSelector((store) => store.movies.trailorVideo);

  // Sync mute state from VideoBackground via window global
  useEffect(() => {
    const interval = setInterval(() => {
      if (typeof window.__videoIsMuted !== 'undefined') {
        setIsMuted(window.__videoIsMuted);
      }
    }, 300);
    return () => clearInterval(interval);
  }, []);

  const handleToggleMute = () => {
    if (typeof window.__videoToggleMute === 'function') {
      window.__videoToggleMute();
    }
  };

  if (!movie) return null;
  const { title, overview } = movie;

  return (
    <>
      {/* Overlay Gradients + Title Content */}
      <div className="absolute inset-0 z-10 flex flex-col justify-center pb-24 sm:pb-32 md:pb-40 lg:pb-48 px-6 md:px-14 lg:px-20 text-white bg-gradient-to-r from-black/90 via-black/40 to-transparent">
        {/* Subtle top gradient for Header legibility */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/80 to-transparent pointer-events-none" />

        {/* Bottom fade gradient to blend seamlessly into SecondaryContainer */}
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none" />

        {/* Content Box */}
        <div className="relative z-20 max-w-2xl pt-20 md:pt-12">
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight drop-shadow-2xl leading-tight mb-2 sm:mb-3 md:mb-4">
            {title}
          </h1>
          <p className="hidden sm:block line-clamp-3 md:line-clamp-4 text-xs sm:text-sm md:text-base lg:text-lg text-gray-200 drop-shadow-md max-w-xl mb-4 md:mb-6 leading-relaxed">
            {overview}
          </p>

          <div className="flex items-center gap-3">
            {/* ▶ Play button */}
            <button className="bg-white hover:bg-white/85 text-black py-2 md:py-2.5 px-5 md:px-7 text-sm md:text-base rounded-md transition-all duration-300 flex items-center justify-center font-bold shadow-2xl cursor-pointer active:scale-95">
              <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none">
                <path fill="currentColor" d="M5 2.7a1 1 0 0 1 1.48-.88l16.93 9.3a1 1 0 0 1 0 1.76l-16.93 9.3A1 1 0 0 1 5 21.31z" />
              </svg>
              <span className="ml-2 font-bold">Play</span>
            </button>

            {/* ℹ More Info button */}
            <button
              onClick={() => setShowModal(true)}
              className="bg-zinc-600/70 hover:bg-zinc-600/90 text-white py-2 md:py-2.5 px-5 md:px-7 text-sm md:text-base rounded-md transition-all duration-300 flex items-center font-bold backdrop-blur-md shadow-2xl cursor-pointer active:scale-95"
            >
              <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.2} stroke="currentColor" width="18" height="18">
                <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.835a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
              </svg>
              More Info
            </button>
          </div>
        </div>

        {/* ── Mute / Unmute button (Netflix style — bottom-right of hero) ── */}
        {trailorVideo && (
          <button
            onClick={handleToggleMute}
            title={isMuted ? 'Unmute' : 'Mute'}
            className="absolute bottom-8 right-6 md:right-14 z-30 w-10 h-10 flex items-center justify-center rounded-full border-2 border-white/60 bg-black/40 hover:border-white hover:bg-black/60 text-white transition-all duration-200 active:scale-95 backdrop-blur-sm"
          >
            {isMuted ? <MutedIcon /> : <UnmutedIcon />}
          </button>
        )}
      </div>

      {/* Movie Details Modal */}
      {showModal && (
        <MovieDetailsModal
          movie={movie}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default VideoTitle;