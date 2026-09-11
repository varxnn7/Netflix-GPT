import React from 'react';
import { useSelector } from 'react-redux';
import Header from './Header';
import MovieList from './MovieList';
import Footer from './Footer';
import Chatbot from './Chatbot';
import useTrendingMovies from '../hooks/useTrendingMovies';
import usePopularMovies from '../hooks/usePopularMovies';
import useCrimeMovies from '../hooks/useCrimeMovies';
import useSciFiMovies from '../hooks/useSciFiMovies';
import useRomanceMovies from '../hooks/useRomanceMovies';
import useHorrorMovies from '../hooks/useHorrorMovies';
import useTopRatedMovies from '../hooks/useTopRatedMovies';
import useThrillerMovies from '../hooks/useThrillerMovies';

const ShowsPage = () => {
  const movies = useSelector((store) => store.movies);

  // Fetch data if not already in store
  useTrendingMovies();
  usePopularMovies();
  useCrimeMovies();
  useSciFiMovies();
  useRomanceMovies();
  useHorrorMovies();
  useTopRatedMovies();
  useThrillerMovies();

  return (
    <div className="bg-black min-h-screen">
      <Header />
      <div className="pt-28 px-4 md:px-12 pb-12 space-y-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">TV Shows</h1>
        <MovieList title="Trending Shows" movies={movies.trendingMovies} />
        <MovieList title="Popular on Netflix" movies={movies.popularMovies} />
        <MovieList title="Crime & Thrillers" movies={movies.crimeMovies} />
        <MovieList title="Sci-Fi Series" movies={movies.sciFiMovies} />
        <MovieList title="Drama" movies={movies.romanceMovies} />
        <MovieList title="Horror Shows" movies={movies.horrorMovies} />
        <MovieList title="Top Rated" movies={movies.topRatedMovies} />
        <MovieList title="Thriller" movies={movies.thrillerMovies} />
      </div>
      <Footer />
      <Chatbot />
    </div>
  );
};

export default ShowsPage;
