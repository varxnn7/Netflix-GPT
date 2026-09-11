import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { addAwardWinnersMovies } from "../utils/moviesSlice";

const useAwardWinnersMovies = () => {
  const dispatch = useDispatch();
  const awardWinnersMovies = useSelector((store) => store.movies.awardWinnersMovies);

  useEffect(() => {
    const getAwardWinnersMovies = async () => {
      const data = await fetch(
        "https://api.themoviedb.org/3/discover/movie?vote_average.gte=8&vote_count.gte=5000&sort_by=vote_average.desc&page=1",
        API_OPTIONS
      );
      const json = await data.json();
      dispatch(addAwardWinnersMovies(json.results));
    };

    !awardWinnersMovies && getAwardWinnersMovies();
  }, [awardWinnersMovies, dispatch]);
};

export default useAwardWinnersMovies;
