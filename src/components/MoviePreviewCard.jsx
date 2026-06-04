import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { API_OPTIONS } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addToMyList, removeFromMyList } from '../utils/myListSlice';

// TMDB genre ID → name mapping
const GENRE_MAP = {
  28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy',
  80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family',
  14: 'Fantasy', 36: 'History', 27: 'Horror', 10402: 'Music',
  9648: 'Mystery', 10749: 'Romance', 878: 'Sci-Fi', 10770: 'TV Movie',
  53: 'Thriller', 10752: 'War', 37: 'Western',
};

const POPUP_WIDTH = 320;
const POPUP_HEIGHT_APPROX = 315;

const MoviePreviewCard = ({ movie, cardRect, onPopupEnter, onPopupLeave }) => {
  const [trailerKey, setTrailerKey] = useState(null);
  const [showIframe, setShowIframe] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const dispatch = useDispatch();
  const myListMovies = useSelector((store) => store.myList.movies);
  const isInMyList = myListMovies.some((m) => m.id === movie.id);

  // Fetch trailer key on mount, delay iframe so popup can animate in first
  useEffect(() => {
    const iframeTimer = setTimeout(() => setShowIframe(true), 700);

    const fetchTrailer = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${movie.id}/videos?language=en-US`,
          API_OPTIONS
        );
        const json = await res.json();
        const trailers = json.results?.filter((v) => v.type === 'Trailer');
        const trailer = trailers?.length ? trailers[0] : json.results?.[0];
        setTrailerKey(trailer?.key || null);
      } catch {
        setTrailerKey(null);
      }
    };

    fetchTrailer();
    return () => clearTimeout(iframeTimer);
  }, [movie.id]);

  // ── Position calculation (fixed, viewport-relative) ──────────────────────
  let left = cardRect.left + cardRect.width / 2 - POPUP_WIDTH / 2;
  let top = cardRect.top + cardRect.height / 2 - POPUP_HEIGHT_APPROX / 2;

  // Horizontal clamping — never bleed off screen
  left = Math.max(8, Math.min(left, window.innerWidth - POPUP_WIDTH - 8));
  // Vertical clamping — stay below header (≈70px) and above bottom
  top = Math.max(70, Math.min(top, window.innerHeight - POPUP_HEIGHT_APPROX - 8));

  // ── Derived display data ─────────────────────────────────────────────────
  const matchScore = movie.vote_average
    ? Math.min(99, Math.round(movie.vote_average * 10))
    : null;
  const genres = (movie.genre_ids || [])
    .slice(0, 3)
    .map((id) => GENRE_MAP[id])
    .filter(Boolean);
  const releaseYear = movie.release_date?.split('-')[0];
  const title = movie.title || movie.name || '';

  // ── Action handlers ──────────────────────────────────────────────────────
  const handlePlay = () => {
    window.open(
      `https://www.youtube.com/results?search_query=${encodeURIComponent(title + ' official trailer')}`,
      '_blank'
    );
  };

  const handleToggleMyList = () => {
    if (isInMyList) {
      dispatch(removeFromMyList(movie.id));
    } else {
      dispatch(addToMyList(movie));
    }
  };

  const handleMoreInfo = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ── Portal content ───────────────────────────────────────────────────────
  const content = (
    <div
      style={{
        position: 'fixed',
        top: `${top}px`,
        left: `${left}px`,
        width: `${POPUP_WIDTH}px`,
        zIndex: 99999,
      }}
      className="rounded-xl overflow-hidden shadow-2xl bg-zinc-900 border border-zinc-700/60 animate-scaleIn"
      onMouseEnter={onPopupEnter}
      onMouseLeave={onPopupLeave}
    >
      {/* ── Media section ── */}
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: '16/9' }}>
        {/* Backdrop image — always shown, fades away when trailer loads */}
        {movie.backdrop_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
            alt={title}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
              showIframe && trailerKey ? 'opacity-0' : 'opacity-100'
            }`}
          />
        ) : (
          <div className="absolute inset-0 bg-zinc-800 flex items-center justify-center">
            <svg className="w-12 h-12 text-zinc-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z"/>
            </svg>
          </div>
        )}

        {/* YouTube trailer iframe */}
        {showIframe && trailerKey && (
          <iframe
            className="absolute inset-0 w-full h-full"
            src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1&controls=0&loop=1&playlist=${trailerKey}&modestbranding=1&rel=0`}
            allow="autoplay; encrypted-media"
            title={`${title} trailer`}
          />
        )}

        {/* Bottom gradient fade into info panel */}
        <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-zinc-900 to-transparent" />
      </div>

      {/* ── Info section ── */}
      <div className="px-4 pt-3 pb-4 bg-zinc-900">
        {/* Action buttons row */}
        <div className="flex items-center gap-2 mb-3">
          {/* ▶ Play */}
          <button
            onClick={handlePlay}
            title="Play"
            className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center hover:bg-gray-200 transition-colors duration-150 flex-shrink-0"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px] ml-0.5">
              <path d="M5 2.7a1 1 0 0 1 1.48-.88l16.93 9.3a1 1 0 0 1 0 1.76l-16.93 9.3A1 1 0 0 1 5 21.31z" />
            </svg>
          </button>

          {/* ➕ / ✓ My List */}
          <button
            onClick={handleToggleMyList}
            title={isInMyList ? 'Remove from My List' : 'Add to My List'}
            className={`w-9 h-9 rounded-full border-2 flex items-center justify-center transition-colors duration-150 flex-shrink-0 ${
              isInMyList
                ? 'border-white text-white bg-white/10'
                : 'border-zinc-500 text-white hover:border-white'
            }`}
          >
            {isInMyList ? (
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
              </svg>
            )}
          </button>

          {/* 👍 Like */}
          <button
            onClick={() => setIsLiked(!isLiked)}
            title={isLiked ? 'Liked' : 'Like'}
            className={`w-9 h-9 rounded-full border-2 flex items-center justify-center transition-colors duration-150 flex-shrink-0 ${
              isLiked
                ? 'border-white text-white bg-white/10'
                : 'border-zinc-500 text-white hover:border-white'
            }`}
          >
            {isLiked ? (
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
              </svg>
            )}
          </button>

          {/* Spacer */}
          <div className="flex-1" />

          {/* ⌄ More Info */}
          <button
            onClick={handleMoreInfo}
            title="More Info"
            className="w-9 h-9 rounded-full border-2 border-zinc-500 text-white flex items-center justify-center hover:border-white transition-colors duration-150 flex-shrink-0"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {/* Match score & badges */}
        <div className="flex items-center gap-2 flex-wrap mb-2">
          {matchScore && (
            <span className="text-green-400 font-bold text-sm">{matchScore}% Match</span>
          )}
          {releaseYear && (
            <span className="text-zinc-400 text-xs border border-zinc-600 px-1 rounded">
              {releaseYear}
            </span>
          )}
          <span className="text-zinc-400 text-xs border border-zinc-600 px-1 rounded">HD</span>
        </div>

        {/* Title */}
        <h3 className="text-white font-bold text-sm leading-tight mb-2 line-clamp-1">{title}</h3>

        {/* Genre tags */}
        {genres.length > 0 && (
          <div className="flex items-center gap-1 flex-wrap">
            {genres.map((genre, i) => (
              <React.Fragment key={genre}>
                <span className="text-zinc-300 text-xs">{genre}</span>
                {i < genres.length - 1 && (
                  <span className="text-zinc-500 text-xs">•</span>
                )}
              </React.Fragment>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  return ReactDOM.createPortal(content, document.body);
};

export default MoviePreviewCard;
