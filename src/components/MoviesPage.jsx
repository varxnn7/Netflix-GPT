import React from 'react';
import { useSelector } from 'react-redux';
import Header from './Header';
import MovieList from './MovieList';
import Footer from './Footer';
import Chatbot from './Chatbot';
import useNowPlayingMovies from '../hooks/useNowPlayingMovies';
import useActionMovies from '../hooks/useActionMovies';
import useComedyMovies from '../hooks/useComedyMovies';
import useThrillerMovies from '../hooks/useThrillerMovies';
import useSciFiMovies from '../hooks/useSciFiMovies';
import useHorrorMovies from '../hooks/useHorrorMovies';
import useRomanceMovies from '../hooks/useRomanceMovies';
import useCrimeMovies from '../hooks/useCrimeMovies';
import useDocumentaryMovies from '../hooks/useDocumentaryMovies';
import useAnimationMovies from '../hooks/useAnimationMovies';
import useAwardWinnersMovies from '../hooks/useAwardWinnersMovies';
import useTopRatedMovies from '../hooks/useTopRatedMovies';

const MoviesPage = () => {
  const movies = useSelector((store) => store.movies);

  // Fetch data if not already in store
  useNowPlayingMovies();
  useActionMovies();
  useComedyMovies();
  useThrillerMovies();
  useSciFiMovies();
  useHorrorMovies();
  useRomanceMovies();
  useCrimeMovies();
  useDocumentaryMovies();
  useAnimationMovies();
  useAwardWinnersMovies();
  useTopRatedMovies();

  return (
    <div className="bg-black min-h-screen">
      <Header />
      <div className="pt-28 px-4 md:px-12 pb-12 space-y-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Movies</h1>
        <MovieList title="Now Playing" movies={movies.nowPlayingMovies} />
        <MovieList title="Action & Adventure" movies={movies.actionMovies} />
        <MovieList title="Comedy" movies={movies.comedyMovies} />
        <MovieList title="Thriller" movies={movies.thrillerMovies} />
        <MovieList title="Sci-Fi" movies={movies.sciFiMovies} />
        <MovieList title="Horror" movies={movies.horrorMovies} />
        <MovieList title="Romance" movies={movies.romanceMovies} />
        <MovieList title="Crime" movies={movies.crimeMovies} />
        <MovieList title="Documentary" movies={movies.documentaryMovies} />
        <MovieList title="Animation" movies={movies.animationMovies} />
        <MovieList title="Award Winners" movies={movies.awardWinnersMovies} />
        <MovieList title="Top Rated" movies={movies.topRatedMovies} />
      </div>
      <Footer />
      <Chatbot />
    </div>
  );
};

export default MoviesPage;
