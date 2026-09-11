import React from 'react';
import MovieList from './MovieList';
import { useSelector } from 'react-redux';

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);

  return (
    <div className="bg-black relative z-30">
      <div className="-mt-8 sm:-mt-12 md:-mt-16 lg:-mt-24 pl-4 md:pl-12 relative z-30 space-y-6 md:space-y-8 pb-12">
        {/* Original 5 rows */}
        <MovieList title="Now Playing" movies={movies.nowPlayingMovies} />
        <MovieList title="Trending Now" movies={movies.trendingMovies} />
        <MovieList title="Popular on Netflix" movies={movies.popularMovies} />
        <MovieList title="Upcoming Movies" movies={movies.upcomingMovies} />
        <MovieList title="Top Rated" movies={movies.topRatedMovies} />

        {/* 10 new rows */}
        <MovieList title="Action & Adventure" movies={movies.actionMovies} />
        <MovieList title="Comedy" movies={movies.comedyMovies} />
        <MovieList title="Horror" movies={movies.horrorMovies} />
        <MovieList title="Sci-Fi & Fantasy" movies={movies.sciFiMovies} />
        <MovieList title="Thriller" movies={movies.thrillerMovies} />
        <MovieList title="Crime" movies={movies.crimeMovies} />
        <MovieList title="Romance" movies={movies.romanceMovies} />
        <MovieList title="Animation" movies={movies.animationMovies} />
        <MovieList title="Documentaries" movies={movies.documentaryMovies} />
        <MovieList title="Award Winners" movies={movies.awardWinnersMovies} />
      </div>
    </div>
  );
};

export default SecondaryContainer;