import React from 'react'

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-screen aspect-video pt-[15%] px-6 md:px-24 absolute text-white bg-gradient-to-r from-black ">
      <h1 className="text-xl md:text-6xl font-bold w-full md:w-1/2">{title}</h1>
      <p className="hidden md:block py-6 text-lg w-full md:w-1/2">
        {overview?.length > 150 ? overview.slice(0, 150) + "..." : overview}
      </p>
      <div className="flex mt-4 md:mt-2">
        <button className="bg-white text-black py-1 md:py-3 px-3 md:px-12 text-base md:text-xl rounded-lg hover:bg-opacity-80 transition duration-300 flex items-center justify-center">
          <svg
            viewBox="0 0 24 24"
            width="24"
            height="24"
            data-icon="PlayMedium"
            data-icon-id=":rg:"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            role="img"
          >
            <path
              fill="currentColor"
              d="M5 2.7a1 1 0 0 1 1.48-.88l16.93 9.3a1 1 0 0 1 0 1.76l-16.93 9.3A1 1 0 0 1 5 21.31z"
            ></path>
          </svg>
          <span className="ml-2 font-bold">Play</span>
        </button>
        <button className="hidden md:flex mx-2 bg-gray-500 text-white py-3 px-12 text-xl bg-opacity-50 rounded-lg hover:bg-opacity-80 transition duration-300 items-center font-bold">
          <svg
            className="mr-2"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            width="24"
            height="24"
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
  );
};

export default VideoTitle;