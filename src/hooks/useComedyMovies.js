import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { addComedyMovies } from "../utils/moviesSlice";

const useComedyMovies = () => {
  const dispatch = useDispatch();
  const comedyMovies = useSelector((store) => store.movies.comedyMovies);

  useEffect(() => {
    const getComedyMovies = async () => {
      const data = await fetch(
        "https://api.themoviedb.org/3/discover/movie?with_genres=35&sort_by=popularity.desc&page=1",
        API_OPTIONS
      );
      const json = await data.json();
      dispatch(addComedyMovies(json.results));
    };

    !comedyMovies && getComedyMovies();
  }, [comedyMovies, dispatch]);
};

export default useComedyMovies;
