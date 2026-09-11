import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { addThrillerMovies } from "../utils/moviesSlice";

const useThrillerMovies = () => {
  const dispatch = useDispatch();
  const thrillerMovies = useSelector((store) => store.movies.thrillerMovies);

  useEffect(() => {
    const getThrillerMovies = async () => {
      const data = await fetch(
        "https://api.themoviedb.org/3/discover/movie?with_genres=53&sort_by=popularity.desc&page=1",
        API_OPTIONS
      );
      const json = await data.json();
      dispatch(addThrillerMovies(json.results));
    };

    !thrillerMovies && getThrillerMovies();
  }, [thrillerMovies, dispatch]);
};

export default useThrillerMovies;
