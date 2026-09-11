import React from 'react'
import Header from './Header'
import useNowPlayingMovies from '../hooks/useNowPlayingMovies';
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import usePopularMovies from '../hooks/usePopularMovies';
import useTrendingMovies from '../hooks/useTrendingMovies';
import useUpcomingMovies from '../hooks/useUpcomingMovies';
import useHorrorMovies from '../hooks/useHorrorMovies';
import useActionMovies from '../hooks/useActionMovies';
import useComedyMovies from '../hooks/useComedyMovies';
import useDocumentaryMovies from '../hooks/useDocumentaryMovies';
import useAnimationMovies from '../hooks/useAnimationMovies';
import useSciFiMovies from '../hooks/useSciFiMovies';
import useRomanceMovies from '../hooks/useRomanceMovies';
import useThrillerMovies from '../hooks/useThrillerMovies';
import useCrimeMovies from '../hooks/useCrimeMovies';
import useTopRatedMovies from '../hooks/useTopRatedMovies';
import useAwardWinnersMovies from '../hooks/useAwardWinnersMovies';
import GptSearch from './GptSearch';
import Footer from './Footer';
import { useSelector } from 'react-redux';

const Browse = () => {
  const showGptSearch = useSelector(store => store.gpt.showGptSearch);

  // Existing hooks
  useNowPlayingMovies();
  usePopularMovies();
  useTrendingMovies();
  useUpcomingMovies();
  useHorrorMovies();

  // New hooks
  useActionMovies();
  useComedyMovies();
  useDocumentaryMovies();
  useAnimationMovies();
  useSciFiMovies();
  useRomanceMovies();
  useThrillerMovies();
  useCrimeMovies();
  useTopRatedMovies();
  useAwardWinnersMovies();

  return (
    <div>
      <Header />
      {showGptSearch ? <GptSearch /> : (
        <>
          <MainContainer />
          <SecondaryContainer />
        </>
      )}
      <Footer />
    </div>
  )
}

export default Browse;