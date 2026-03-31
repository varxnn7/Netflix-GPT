import React, { useRef, useState } from 'react';
import languages from '../utils/languageConstants';
import openai from '../utils/openai';
import { API_OPTIONS } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addGptMovieResult } from '../utils/gptSlice';

const GptSearchBar = () => {
  const searchText = useRef(null);
  const dispatch = useDispatch();
  const langKey = useSelector((store) => store.config.lang);
  const [isLoading, setIsLoading] = useState(false);

  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      'https://api.themoviedb.org/3/search/movie?query=' +
        movie +
        '&include_adult=false&language=en-US&page=1',
      API_OPTIONS
    );
    const json = await data.json();
    return json.results;
  };

  const handleGptSearchClick = async () => {
    setIsLoading(true);
    try {
      const gptQuery =
        'Act as a Movie Recommendation system and suggest some movies for the query : ' +
        searchText.current.value +
        '. Only suggest movies that are currently available on Netflix. only give me names of 5 movies, comma separated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya';

      const gptResults = await openai.chat.completions.create({
        messages: [{ role: 'user', content: gptQuery }],
        model: 'gpt-3.5-turbo',
      });

      if (!gptResults.choices) {
        throw new Error('GPT Output failed');
      }

      const gptMovies = gptResults.choices[0]?.message?.content.split(',');

      const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie.trim()));
      const tmdbResults = await Promise.all(promiseArray);

      dispatch(
        addGptMovieResult({ movieNames: gptMovies, movieResults: tmdbResults })
      );
    } catch (error) {
      console.error("OpenAI Search failed:", error);
      // Fallback: search exactly what user typed in TMDB
      try {
        const query = searchText.current.value.trim();
        if (!query) return;
        const tmdbResults = await searchMovieTMDB(query);
        if (tmdbResults && tmdbResults.length > 0) {
          dispatch(
            addGptMovieResult({ movieNames: [query], movieResults: [tmdbResults] })
          );
        } else {
          alert(`No results found for "${query}".`);
        }
      } catch (fallbackError) {
        console.error("Fallback search failed:", fallbackError);
        alert("Failed to search. Both GPT and TMDB fallback failed.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='flex justify-center z-10 w-full px-4'>
      <form
        className='w-full md:w-3/4 lg:w-1/2 bg-black/80 backdrop-blur-md border border-white/20 rounded-xl grid grid-cols-12 p-2 shadow-2xl'
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          className='p-4 col-span-9 md:col-span-10 bg-transparent text-white text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 rounded-lg transition-all duration-300'
          placeholder={languages[langKey].gptSearchPlaceholder}
        />
        <button
          className={`col-span-3 md:col-span-2 m-2 py-2 px-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-[0_0_15px_rgba(220,38,38,0.5)] ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
          onClick={handleGptSearchClick}
          disabled={isLoading}
        >
          {isLoading ? 'Searching...' : languages[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;