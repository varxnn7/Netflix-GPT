import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { addTopRatedMovies } from "../utils/moviesSlice";

const useTopRatedMovies = () => {
  const dispatch = useDispatch();
  const topRatedMovies = useSelector((store) => store.movies.topRatedMovies);

  useEffect(() => {
    const getTopRatedMovies = async () => {
      const data = await fetch(
        "https://api.themoviedb.org/3/movie/top_rated?page=1&language=en-US",
        API_OPTIONS
      );
      const json = await data.json();
      dispatch(addTopRatedMovies(json.results));
    };

    !topRatedMovies && getTopRatedMovies();
  }, [topRatedMovies, dispatch]);
};

export default useTopRatedMovies;
