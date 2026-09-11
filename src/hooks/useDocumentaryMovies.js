import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { addDocumentaryMovies } from "../utils/moviesSlice";

const useDocumentaryMovies = () => {
  const dispatch = useDispatch();
  const documentaryMovies = useSelector((store) => store.movies.documentaryMovies);

  useEffect(() => {
    const getDocumentaryMovies = async () => {
      const data = await fetch(
        "https://api.themoviedb.org/3/discover/movie?with_genres=99&sort_by=popularity.desc&page=1",
        API_OPTIONS
      );
      const json = await data.json();
      dispatch(addDocumentaryMovies(json.results));
    };

    !documentaryMovies && getDocumentaryMovies();
  }, [documentaryMovies, dispatch]);
};

export default useDocumentaryMovies;
