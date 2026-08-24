import React from 'react';
import MovieList from './MovieList';
import { useSelector } from 'react-redux';

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);

  return (
    <div className="bg-black relative z-30">
      <div className="-mt-16 sm:-mt-24 md:-mt-36 lg:-mt-48 pl-4 md:pl-12 relative z-30 space-y-6 md:space-y-8 pb-12">
        <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies} />
        <MovieList title={"Trending"} movies={movies.trendingMovies} />
        <MovieList title={"Popular"} movies={movies.popularMovies} />
        <MovieList
          title={"Upcoming Movies"}
          movies={movies.upcomingMovies}
        />
        <MovieList title={"Horror"} movies={movies.horrorMovies} />
      </div>
    </div>
  );
};

export default SecondaryContainer;