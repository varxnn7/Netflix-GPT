import React, { useRef, useEffect } from 'react'
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
        if (window.scrollY > window.innerHeight * 0.4) {
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
    <div className="w-screen">
      {trailorVideo ? (
        <iframe
          ref={iframeRef}
          className="w-screen aspect-video"
          src={
            "https://www.youtube.com/embed/" +
            trailorVideo?.key +
            "?autoplay=1&mute=1&loop=1&playlist=" +
            trailorVideo?.key +
            "&enablejsapi=1"
          }
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        ></iframe>
      ) : (
        <div className="w-screen aspect-video bg-black"></div>
      )}
    </div>
  );
};

export default VideoBackground;