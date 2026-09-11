import React from 'react';
import MovieCard from './MovieCard';

/* ── Skeleton placeholder for a single card ── */
const SkeletonCard = () => (
  <div className="w-36 md:w-48 pr-4 flex-shrink-0">
    {/* Poster skeleton */}
    <div className="skeleton-card w-full aspect-[2/3] rounded-lg" />
  </div>
);

/* ── Skeleton row (shown while movies are null/loading) ── */
const SkeletonRow = ({ title }) => (
  <div className="px-6">
    {/* Title skeleton */}
    <div className="skeleton-card h-7 w-44 rounded mb-4 mt-2" />
    <div className="flex overflow-x-hidden gap-0">
      {Array.from({ length: 8 }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  </div>
);

/* ── Real movie row ── */
const MovieList = ({ title, movies }) => {
  // Show skeleton while data is still loading
  if (!movies) return <SkeletonRow title={title} />;

  return (
    <div className="px-6">
      <h1 className="text-lg md:text-3xl py-4 text-white">{title}</h1>
      <div className="flex overflow-x-scroll no-scrollbar">
        <div className="flex">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;