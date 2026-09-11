import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { addActionMovies } from "../utils/moviesSlice";

const useActionMovies = () => {
  const dispatch = useDispatch();
  const actionMovies = useSelector((store) => store.movies.actionMovies);

  useEffect(() => {
    const getActionMovies = async () => {
      const data = await fetch(
        "https://api.themoviedb.org/3/discover/movie?with_genres=28&sort_by=popularity.desc&page=1",
        API_OPTIONS
      );
      const json = await data.json();
      dispatch(addActionMovies(json.results));
    };

    !actionMovies && getActionMovies();
  }, [actionMovies, dispatch]);
};

export default useActionMovies;
