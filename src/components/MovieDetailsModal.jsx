import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { API_OPTIONS } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addToMyList, removeFromMyList } from '../utils/myListSlice';

// TMDB genre ID → readable name
const GENRE_MAP = {
  28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy',
  80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family',
  14: 'Fantasy', 36: 'History', 27: 'Horror', 10402: 'Music',
  9648: 'Mystery', 10749: 'Romance', 878: 'Sci-Fi', 10770: 'TV Movie',
  53: 'Thriller', 10752: 'War', 37: 'Western',
};

const MovieDetailsModal = ({ movie, onClose }) => {
  const [details, setDetails] = useState(null);   // full TMDB movie details
  const [cast, setCast] = useState([]);            // top 5 cast members
  const [isLiked, setIsLiked] = useState(false);
  const [fetching, setFetching] = useState(true);  // additional API data

  const dispatch = useDispatch();
  const myListMovies = useSelector((store) => store.myList.movies);
  const isInMyList = myListMovies.some((m) => m.id === movie.id);

  // Fetch full movie details + credits concurrently
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [detailsRes, creditsRes] = await Promise.all([
          fetch(`https://api.themoviedb.org/3/movie/${movie.id}?language=en-US`, API_OPTIONS),
          fetch(`https://api.themoviedb.org/3/movie/${movie.id}/credits?language=en-US`, API_OPTIONS),
        ]);
        const detailsJson = await detailsRes.json();
        const creditsJson = await creditsRes.json();
        setDetails(detailsJson);
        setCast(creditsJson.cast?.slice(0, 5) || []);
      } catch (err) {
        console.error('Modal: failed to fetch movie details:', err);
      } finally {
        setFetching(false);
      }
    };
    fetchData();

    // Lock page scroll while modal is open
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [movie.id]);

  // Escape key closes modal
  useEffect(() => {
    const onKeyDown = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  // ── Derived display values ────────────────────────────────────────────────
  const title    = movie.title || movie.name || '';
  const overview = movie.overview || '';

  const matchScore = movie.vote_average
    ? Math.min(99, Math.round(movie.vote_average * 10))
    : null;

  const releaseYear = (details?.release_date || movie.release_date)?.split('-')[0];

  const formatRuntime = (mins) => {
    if (!mins) return null;
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return h > 0 ? `${h}h ${m}m` : `${m}m`;
  };
  const runtime = formatRuntime(details?.runtime);

  // Use full genre names if fetched, fall back to GENRE_MAP
  const genres = details?.genres?.map((g) => g.name) ||
    (movie.genre_ids || []).map((id) => GENRE_MAP[id]).filter(Boolean);

  // Use the highest quality backdrop
  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : null;

  // ── Action handlers ───────────────────────────────────────────────────────
  const handlePlay = () =>
    window.open(
      `https://www.youtube.com/results?search_query=${encodeURIComponent(title + ' official trailer')}`,
      '_blank'
    );

  const handleToggleMyList = () => {
    if (isInMyList) dispatch(removeFromMyList(movie.id));
    else dispatch(addToMyList(movie));
  };

  // Click outside modal → close
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  // ── Portal content ─────────────────────────────────────────────────────────
  const content = (
    <div
      className="fixed inset-0 z-[100000] flex items-center justify-center p-4 md:p-8 bg-black/75 backdrop-blur-sm"
      onClick={handleOverlayClick}
    >
      {/* Modal card */}
      <div className="relative bg-zinc-900 rounded-md overflow-hidden w-full max-w-3xl max-h-[90vh] overflow-y-auto no-scrollbar shadow-2xl animate-modalIn">

        {/* ══ HERO / BACKDROP SECTION ══════════════════════════════════════════ */}
        <div className="relative w-full" style={{ paddingBottom: '46%' }}>

          {/* Backdrop image */}
          {backdropUrl ? (
            <img
              src={backdropUrl}
              alt={title}
              className="absolute inset-0 w-full h-full object-cover object-top"
            />
          ) : (
            <div className="absolute inset-0 bg-zinc-800 flex items-center justify-center">
              <span className="text-zinc-500 text-xl font-bold">{title}</span>
            </div>
          )}

          {/* Gradient: bottom fade into info panel */}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/30 to-transparent" />
          {/* Gradient: subtle left darkening for legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-900/60 via-transparent to-transparent" />

          {/* ✕ Close button — top right */}
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-zinc-900/90 border border-zinc-600 text-white flex items-center justify-center hover:bg-zinc-700 active:scale-95 transition-all z-10 shadow-xl"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            </svg>
          </button>

          {/* Title + action buttons pinned to bottom-left of backdrop */}
          <div className="absolute bottom-0 left-0 w-full px-6 md:px-8 pb-6">
            <h2 className="text-white text-2xl md:text-4xl font-black mb-4 drop-shadow-lg leading-tight">
              {title}
            </h2>

            <div className="flex items-center gap-3">
              {/* ▶ Play */}
              <button
                onClick={handlePlay}
                className="flex items-center gap-2 bg-white text-black font-bold px-5 md:px-6 py-2 md:py-2.5 rounded-md hover:bg-gray-200 active:bg-gray-300 transition-colors text-sm"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 ml-0.5 flex-shrink-0">
                  <path d="M5 2.7a1 1 0 0 1 1.48-.88l16.93 9.3a1 1 0 0 1 0 1.76l-16.93 9.3A1 1 0 0 1 5 21.31z" />
                </svg>
                Play
              </button>

              {/* ➕ / ✓ My List */}
              <button
                onClick={handleToggleMyList}
                title={isInMyList ? 'Remove from My List' : 'Add to My List'}
                className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-200 flex-shrink-0 ${
                  isInMyList
                    ? 'border-white bg-white/10 text-white'
                    : 'border-zinc-400 text-white hover:border-white'
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
                className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-200 flex-shrink-0 ${
                  isLiked
                    ? 'border-white bg-white/10 text-white'
                    : 'border-zinc-400 text-white hover:border-white'
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
            </div>
          </div>
        </div>

        {/* ══ INFO SECTION ═════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 px-6 md:px-8 py-6">

          {/* Left column — 2/3 width (overview, stats, rating) */}
          <div className="md:col-span-2 space-y-3">

            {/* Stats bar: match% | year | runtime | HD */}
            <div className="flex items-center flex-wrap gap-x-3 gap-y-1">
              {matchScore && (
                <span className="text-green-400 font-bold text-sm">{matchScore}% match</span>
              )}
              {releaseYear && (
                <span className="text-zinc-300 text-sm">{releaseYear}</span>
              )}
              {fetching ? (
                <span className="text-zinc-600 text-sm animate-pulse">Loading…</span>
              ) : runtime ? (
                <span className="text-zinc-300 text-sm">{runtime}</span>
              ) : null}
              <span className="border border-zinc-600 text-zinc-400 text-xs px-1.5 py-0.5 rounded select-none">
                HD
              </span>
            </div>

            {/* Content rating + tagline badge row */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="border border-zinc-500 text-zinc-400 text-xs px-1.5 py-0.5 rounded select-none">
                {movie.adult ? 'A' : 'U/A'}
              </span>
              {!fetching && details?.tagline && (
                <span className="text-zinc-400 text-xs italic">{details.tagline}</span>
              )}
            </div>

            {/* Full description / overview */}
            <p className="text-zinc-200 text-sm leading-relaxed">
              {overview || 'No description available.'}
            </p>
          </div>

          {/* Right column — 1/3 width (cast, genres, mood tags) */}
          <div className="md:col-span-1 space-y-3 text-xs">

            {/* Cast */}
            {fetching ? (
              <div className="space-y-2">
                <div className="h-2.5 bg-zinc-700/70 rounded animate-pulse w-full" />
                <div className="h-2.5 bg-zinc-700/70 rounded animate-pulse w-3/4" />
              </div>
            ) : cast.length > 0 ? (
              <p className="text-zinc-400 leading-relaxed">
                <span className="text-zinc-500">Cast: </span>
                <span className="text-zinc-300">
                  {cast.map((c) => c.name).join(', ')}
                  {cast.length >= 5 && ',...'}
                </span>
              </p>
            ) : null}

            {/* Genres */}
            {genres.length > 0 && (
              <p className="text-zinc-400 leading-relaxed">
                <span className="text-zinc-500">Genres: </span>
                <span className="text-zinc-300">{genres.join(', ')}</span>
              </p>
            )}

            {/* "This movie is" / tagline mood */}
            {!fetching && details?.tagline && (
              <p className="text-zinc-400 leading-relaxed">
                <span className="text-zinc-500">This Movie is: </span>
                <span className="text-zinc-300">{details.tagline}</span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(content, document.body);
};

export default MovieDetailsModal;
