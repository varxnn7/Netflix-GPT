import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { addCrimeMovies } from "../utils/moviesSlice";

const useCrimeMovies = () => {
  const dispatch = useDispatch();
  const crimeMovies = useSelector((store) => store.movies.crimeMovies);

  useEffect(() => {
    const getCrimeMovies = async () => {
      const data = await fetch(
        "https://api.themoviedb.org/3/discover/movie?with_genres=80&sort_by=popularity.desc&page=1",
        API_OPTIONS
      );
      const json = await data.json();
      dispatch(addCrimeMovies(json.results));
    };

    !crimeMovies && getCrimeMovies();
  }, [crimeMovies, dispatch]);
};

export default useCrimeMovies;
