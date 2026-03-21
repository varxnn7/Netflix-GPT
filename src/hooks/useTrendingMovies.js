import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { addTrendingMovies } from "../utils/moviesSlice";

const useTrendingMovies = () => {
  const dispatch = useDispatch();

  const trendingMovies = useSelector((store) => store.movies.trendingMovies);

  useEffect(() => {
    const getTrendingMovies = async () => {
      const data = await fetch(
        "https://api.themoviedb.org/3/trending/movie/day?page=1",
        API_OPTIONS
      );
      const json = await data.json();
      dispatch(addTrendingMovies(json.results));
    };

    !trendingMovies && getTrendingMovies();
  }, [trendingMovies, dispatch]);
};

export default useTrendingMovies;
