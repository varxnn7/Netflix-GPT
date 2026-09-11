import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { addAnimationMovies } from "../utils/moviesSlice";

const useAnimationMovies = () => {
  const dispatch = useDispatch();
  const animationMovies = useSelector((store) => store.movies.animationMovies);

  useEffect(() => {
    const getAnimationMovies = async () => {
      const data = await fetch(
        "https://api.themoviedb.org/3/discover/movie?with_genres=16&sort_by=popularity.desc&page=1",
        API_OPTIONS
      );
      const json = await data.json();
      dispatch(addAnimationMovies(json.results));
    };

    !animationMovies && getAnimationMovies();
  }, [animationMovies, dispatch]);
};

export default useAnimationMovies;
