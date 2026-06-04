import React, { useState, useRef, useEffect } from 'react';
import { IMG_CDN_URL } from '../utils/constants';
import MoviePreviewCard from './MoviePreviewCard';

const MovieCard = ({ movie }) => {
  const [showPreview, setShowPreview] = useState(false);
  const [cardRect, setCardRect] = useState(null);

  const cardRef = useRef(null);
  const enterTimer = useRef(null);
  const leaveTimer = useRef(null);

  // Close preview when user scrolls (mirroring Netflix behaviour)
  useEffect(() => {
    const onScroll = () => {
      clearTimeout(enterTimer.current);
      setShowPreview(false);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      clearTimeout(enterTimer.current);
      clearTimeout(leaveTimer.current);
    };
  }, []);

  if (!movie?.poster_path) return null;

  // ── Hover handlers ─────────────────────────────────────────────────────
  const handleMouseEnter = () => {
    clearTimeout(leaveTimer.current);
    enterTimer.current = setTimeout(() => {
      if (cardRef.current) {
        setCardRect(cardRef.current.getBoundingClientRect());
        setShowPreview(true);
      }
    }, 400); // Netflix-style 400ms delay
  };

  const handleMouseLeave = () => {
    clearTimeout(enterTimer.current);
    // Small delay so mouse can travel to the popup without closing it
    leaveTimer.current = setTimeout(() => setShowPreview(false), 150);
  };

  // Called when mouse enters the popup — cancel the leave timer
  const handlePopupEnter = () => {
    clearTimeout(leaveTimer.current);
  };

  // Called when mouse leaves the popup — start close timer
  const handlePopupLeave = () => {
    leaveTimer.current = setTimeout(() => setShowPreview(false), 150);
  };

  return (
    <div
      ref={cardRef}
      className="w-36 md:w-48 pr-4 flex-shrink-0 relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img
        className={`rounded-lg cursor-pointer w-full object-cover transition-all duration-300 ${
          showPreview ? 'brightness-75 scale-105' : 'hover:scale-105'
        }`}
        alt={movie.title || 'Movie Card'}
        src={IMG_CDN_URL + movie.poster_path}
      />

      {/* Render popup through a portal — bypasses overflow clipping */}
      {showPreview && cardRect && (
        <MoviePreviewCard
          movie={movie}
          cardRect={cardRect}
          onPopupEnter={handlePopupEnter}
          onPopupLeave={handlePopupLeave}
        />
      )}
    </div>
  );
};

export default MovieCard;