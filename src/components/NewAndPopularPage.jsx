import React from 'react';
import { useSelector } from 'react-redux';
import Header from './Header';
import MovieList from './MovieList';
import Footer from './Footer';
import Chatbot from './Chatbot';
import useUpcomingMovies from '../hooks/useUpcomingMovies';
import useNowPlayingMovies from '../hooks/useNowPlayingMovies';
import useTrendingMovies from '../hooks/useTrendingMovies';
import useTopRatedMovies from '../hooks/useTopRatedMovies';
import useAwardWinnersMovies from '../hooks/useAwardWinnersMovies';
import usePopularMovies from '../hooks/usePopularMovies';

const NewAndPopularPage = () => {
  const movies = useSelector((store) => store.movies);

  // Fetch data if not already in store
  useUpcomingMovies();
  useNowPlayingMovies();
  useTrendingMovies();
  useTopRatedMovies();
  useAwardWinnersMovies();
  usePopularMovies();

  return (
    <div className="bg-black min-h-screen">
      <Header />
      <div className="pt-28 px-4 md:px-12 pb-12 space-y-8">
        <div className="mb-4">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">New & Popular</h1>
          <p className="text-gray-400 text-base">
            The latest releases and what everyone's talking about right now.
          </p>
        </div>
        <MovieList title="🔥 Coming Soon" movies={movies.upcomingMovies} />
        <MovieList title="🆕 Now Playing in Theatres" movies={movies.nowPlayingMovies} />
        <MovieList title="📈 Trending This Week" movies={movies.trendingMovies} />
        <MovieList title="⭐ Top Rated of All Time" movies={movies.topRatedMovies} />
        <MovieList title="🏆 Award Winners" movies={movies.awardWinnersMovies} />
        <MovieList title="🎬 Popular Right Now" movies={movies.popularMovies} />
      </div>
      <Footer />
      <Chatbot />
    </div>
  );
};

export default NewAndPopularPage;
