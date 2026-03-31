import { useSelector } from "react-redux";
import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackground";

const MainContainer = () => {
    
    
    const movies = useSelector((store) => store.movies?.nowPlayingMovies);
    if (!movies || movies.length === 0) return null;
    
    // Pick the first movie which usually has a trailer (e.g., Avatar)
    const mainMovie = movies[0];
    if (!mainMovie) return null;

    const { title, overview, id } = mainMovie;
  
  
    return (
    <div className="relative pt-[30%] bg-black md:pt-0">
        <VideoTitle title ={title} overview ={overview} />
        <VideoBackground movieId={id} />
    </div>
  );
};

export default MainContainer;