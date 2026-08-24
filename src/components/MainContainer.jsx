import { useSelector } from "react-redux";
import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackground";

const MainContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);
  if (!movies || movies.length === 0) return null;

  const mainMovie = movies[0];
  if (!mainMovie) return null;

  const { id } = mainMovie;

  return (
    <div className="relative w-full h-[65vh] sm:h-[75vh] md:h-[85vh] lg:h-[95vh] overflow-hidden bg-black">
      <VideoBackground movieId={id} />
      <VideoTitle movie={mainMovie} />
    </div>
  );
};

export default MainContainer;