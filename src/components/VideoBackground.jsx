import React, { useRef, useEffect, useState, useCallback } from 'react';
import useMovieTrailor from '../hooks/useMovieTrailor';
import { useSelector } from 'react-redux';

const VideoBackground = ({ movieId, onMuteChange }) => {
  const trailorVideo = useSelector((store) => store.movies.trailorVideo);
  useMovieTrailor(movieId);
  const iframeRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  // Post message helper
  const postYT = useCallback((func, args = '') => {
    iframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: 'command', func, args }),
      '*'
    );
  }, []);

  // Pause/play on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 0.45) {
        postYT('pauseVideo');
      } else {
        postYT('playVideo');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [postYT]);

  // Expose mute toggle handler to parent (VideoTitle)
  useEffect(() => {
    if (onMuteChange) onMuteChange({ isMuted, toggle: handleToggleMute });
  }, [isMuted]); // eslint-disable-line

  const handleToggleMute = useCallback(() => {
    setIsMuted((prev) => {
      const next = !prev;
      if (next) {
        postYT('mute');
      } else {
        postYT('unMute');
        postYT('setVolume', [100]);
      }
      return next;
    });
  }, [postYT]);

  // Expose globally so VideoTitle can call it
  useEffect(() => {
    window.__videoToggleMute = handleToggleMute;
    window.__videoIsMuted = isMuted;
    return () => {
      delete window.__videoToggleMute;
      delete window.__videoIsMuted;
    };
  }, [handleToggleMute, isMuted]);

  return (
    <div className="w-full h-full absolute inset-0 overflow-hidden pointer-events-none">
      {trailorVideo ? (
        <iframe
          ref={iframeRef}
          className="w-full h-full min-w-[100%] min-h-[100%] scale-[1.3] sm:scale-[1.35] md:scale-[1.4] lg:scale-[1.45] transform-gpu object-cover origin-center"
          src={
            'https://www.youtube.com/embed/' +
            trailorVideo?.key +
            '?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&iv_load_policy=3&disablekb=1&modestbranding=1&playlist=' +
            trailorVideo?.key +
            '&enablejsapi=1'
          }
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        />
      ) : (
        <div className="w-full h-full bg-black" />
      )}
    </div>
  );
};

export default VideoBackground;