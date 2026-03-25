import React from 'react'
import GptSearchBar from './GptSearchBar'
import GptMovieSuggestion from './GptMovieSuggestion'
import { BG_URL } from '../utils/constants';


const GptSearch = () => {
  return (
    <>
      <div className="fixed -z-10 h-screen w-screen">
        <img
          className="h-full w-full object-cover"
          src={BG_URL}
          alt="bg"
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
      <div className="pt-[35%] md:pt-[10%] min-h-screen">
        <GptSearchBar />
        <GptMovieSuggestion />
      </div>
    </>
  );
};

export default GptSearch;