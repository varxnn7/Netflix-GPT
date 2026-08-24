import React, { useRef, useEffect } from 'react';
import useMovieTrailor from '../hooks/useMovieTrailor';
import { useSelector } from 'react-redux';

const VideoBackground = ({ movieId }) => {
  const trailorVideo = useSelector((store) => store.movies.trailorVideo);
  useMovieTrailor(movieId);
  const iframeRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (iframeRef.current && iframeRef.current.contentWindow) {
        // Pause if scrolled down significantly, otherwise play
        if (window.scrollY > window.innerHeight * 0.45) {
          iframeRef.current.contentWindow.postMessage(
            '{"event":"command","func":"pauseVideo","args":""}',
            '*'
          );
        } else {
          iframeRef.current.contentWindow.postMessage(
            '{"event":"command","func":"playVideo","args":""}',
            '*'
          );
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="w-full h-full absolute inset-0 overflow-hidden pointer-events-none">
      {trailorVideo ? (
        <iframe
          ref={iframeRef}
          className="w-full h-full min-w-[100%] min-h-[100%] scale-[1.3] sm:scale-[1.35] md:scale-[1.4] lg:scale-[1.45] transform-gpu object-cover origin-center"
          src={
            "https://www.youtube.com/embed/" +
            trailorVideo?.key +
            "?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&iv_load_policy=3&disablekb=1&modestbranding=1&playlist=" +
            trailorVideo?.key +
            "&enablejsapi=1"
          }
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        ></iframe>
      ) : (
        <div className="w-full h-full bg-black"></div>
      )}
    </div>
  );
};

export default VideoBackground;