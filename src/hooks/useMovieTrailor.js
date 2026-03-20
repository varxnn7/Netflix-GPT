import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { useEffect } from "react";
import { addTrailorVideo } from "../utils/moviesSlice";

const useMovieTrailor = (movieId) => {
      const dispatch = useDispatch();
    
        // fetch trailor video && updating the store with trailor video data
        const getMovieVideos = async () => {
            const data = await fetch('https://api.themoviedb.org/3/movie/'+movieId+'/videos', API_OPTIONS)
    
            const json = await data.json();
            
    
            const filterData = json.results.filter((video) => video.type === 'Trailer');
            const trailor = filterData.length?filterData[0] : json.results[0];
        
            dispatch(addTrailorVideo(trailor));
            
        };
        useEffect(() => {
            getMovieVideos();
        }, []);
    
}


export default useMovieTrailor;