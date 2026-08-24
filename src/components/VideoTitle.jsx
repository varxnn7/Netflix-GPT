import React, { useState } from 'react';
import MovieDetailsModal from './MovieDetailsModal';

const VideoTitle = ({ movie }) => {
  const [showModal, setShowModal] = useState(false);

  if (!movie) return null;

  const { title, overview } = movie;

  return (
    <>
      {/* Overlay Gradients + Title Content */}
      <div className="absolute inset-0 z-10 flex flex-col justify-center px-6 md:px-14 lg:px-20 text-white bg-gradient-to-r from-black/85 via-black/35 to-transparent">
        {/* Subtle top gradient for Header legibility */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/80 to-transparent pointer-events-none" />

        {/* Bottom fade gradient to blend seamlessly into SecondaryContainer */}
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none" />

        {/* Content Box */}
        <div className="relative z-20 max-w-2xl pt-14 md:pt-0">
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight drop-shadow-xl leading-tight mb-3 md:mb-4">
            {title}
          </h1>
          <p className="hidden sm:block line-clamp-3 md:line-clamp-4 text-xs sm:text-sm md:text-base lg:text-lg text-gray-200 drop-shadow max-w-xl mb-5 md:mb-6 leading-relaxed">
            {overview}
          </p>

          <div className="flex items-center gap-3">
            {/* ▶ Play button */}
            <button className="bg-white text-black py-2 md:py-3 px-5 md:px-8 text-sm md:text-lg rounded-md hover:bg-white/80 transition-all duration-300 flex items-center justify-center font-bold shadow-lg cursor-pointer active:scale-95">
              <svg
                viewBox="0 0 24 24"
                width="22"
                height="22"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                role="img"
              >
                <path
                  fill="currentColor"
                  d="M5 2.7a1 1 0 0 1 1.48-.88l16.93 9.3a1 1 0 0 1 0 1.76l-16.93 9.3A1 1 0 0 1 5 21.31z"
                />
              </svg>
              <span className="ml-2 font-bold">Play</span>
            </button>

            {/* ℹ More Info button */}
            <button
              onClick={() => setShowModal(true)}
              className="bg-zinc-600/70 hover:bg-zinc-600/90 text-white py-2 md:py-3 px-5 md:px-8 text-sm md:text-lg rounded-md transition-all duration-300 flex items-center font-bold backdrop-blur-sm shadow-lg cursor-pointer active:scale-95"
            >
              <svg
                className="mr-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                width="20"
                height="20"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.835a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                />
              </svg>
              More Info
            </button>
          </div>
        </div>
      </div>

      {/* Movie Details Modal */}
      {showModal && (
        <MovieDetailsModal
          movie={movie}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default VideoTitle;