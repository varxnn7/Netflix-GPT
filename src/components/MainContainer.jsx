import { useSelector } from "react-redux";
import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackground";

const MainContainer = () => {
    
    
    const movies = useSelector((store) => store.movies?.nowPlayingMovies);
    if (!movies || movies.length === 0) return null;
    
    const mainMovie = movies[0];
    if (!mainMovie) return null;

    const { original_title, overview, id } = mainMovie;
  
  
    return (
    <div>
        <VideoTitle title ={original_title} overview ={overview} />
        <VideoBackground movieId={id} />


    </div>
  );
};

export default MainContainer;