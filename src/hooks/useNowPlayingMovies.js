import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { addNowPlayingMovies } from "../utils/moviesSlice";

const useNowPlayingMovies = () => {
     // Fetch Data from TMDB API and update store
  
    const dispatch = useDispatch();
  useEffect(() => {
    const getNowPlayingMovies = async () => {
      const data = await fetch('https://api.themoviedb.org/3/movie/now_playing', API_OPTIONS);
      const json = await data.json();

      dispatch(addNowPlayingMovies(json.results));
    };
    getNowPlayingMovies();
  }, [dispatch]);
}

export default useNowPlayingMovies;