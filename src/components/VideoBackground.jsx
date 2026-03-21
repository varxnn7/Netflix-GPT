import React from 'react'
import useMovieTrailor from '../hooks/useMovieTrailor';
import { useSelector } from 'react-redux';

const VideoBackground = ({ movieId }) => {
  const trailorVideo = useSelector((store) => store.movies.trailorVideo);
  useMovieTrailor(movieId);

  if (!trailorVideo) return null;

  return (
    <div className="w-screen">
      <iframe
        className="w-screen aspect-video"
        src={
          "https://www.youtube.com/embed/" +
          trailorVideo?.key +
          "?&autoplay=1&mute=1&loop=1&playlist=" +
          trailorVideo?.key
        }
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      ></iframe>
    </div>
  );
};

export default VideoBackground;