import React, { useContext, useState, useReducer, useEffect } from 'react';
import { reducer } from './reducer';
import * as actions from './actions';

// create context
const MovieContext = React.createContext();

// api url
const SEARCH_URL =
  'https://api.themoviedb.org/3/search/movie?api_key=3e631f6baf3ffc8883931e4a563030b2';
const GENRE_URL =
  'https://api.themoviedb.org/3/genre/movie/list?api_key=3e631f6baf3ffc8883931e4a563030b2';

// init state of useReducer
const initState = {
  genres: [],
  watched: localStorage.getItem('watched')
    ? JSON.parse(localStorage.getItem('watched'))
    : [],
  watchList: localStorage.getItem('watchList')
    ? JSON.parse(localStorage.getItem('watchList'))
    : [],
  searchResult: {
    list: [],
    page: 0,
    total_pages: 0,
  },
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initState);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // search movie
  const searchMovie = async (value, page = 1) => {
    try {
      setIsLoading(true);

      //get genres
      let genres;
      if (state.genres.length === 0) {
        const genreRes = await fetch(`${GENRE_URL}`);
        const genresObj = await genreRes.json();
        genres = genresObj.genres;
      } else {
        genres = state.genres;
      }

      const res = await fetch(`${SEARCH_URL}&query=${value}&page=${page}`);
      const data = await res.json();

      data.results = data.results.map((movie) => {
        const isInWatched = state.watched.find((x) => x.id === movie.id)
          ? true
          : false;
        const isInWatchList = state.watchList.find((x) => x.id === movie.id)
          ? true
          : false;

        movie.genre_ids = movie.genre_ids.map((id) => {
          return genres.find((x) => x.id === id).name;
        });

        return { ...movie, isInWatchList, isInWatched };
      });
      data.genres = genres;

      dispatch(actions.searchMovies(data));
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (searchTerm === '') dispatch(actions.resetSerachList());
    else searchMovie(searchTerm);
  }, [searchTerm]);

  const addToWatchList = (movie) => {
    movie.isInWatched = false;
    movie.isInWatchList = true;
    const newWatchList = [...state.watchList, movie];
    const newWatched = state.watched.filter((x) => x.id !== movie.id);

    localStorage.setItem('watched', JSON.stringify(newWatched));
    localStorage.setItem('watchList', JSON.stringify(newWatchList));

    dispatch(actions.addToWatchList(newWatched, newWatchList));
  };

  const addToWatched = (movie) => {
    movie.isInWatched = true;
    movie.isInWatchList = false;
    const newWatched = [...state.watched, movie];
    const newWatchList = state.watchList.filter((x) => x.id !== movie.id);

    localStorage.setItem('watched', JSON.stringify(newWatched));
    localStorage.setItem('watchList', JSON.stringify(newWatchList));
    dispatch(actions.addToWatched(newWatched, newWatchList));
  };

  const handleChangePage = async (newPage) => {
    searchMovie(searchTerm, newPage);
  };

  return (
    <MovieContext.Provider
      value={{
        searchTerm,
        watched: state.watched,
        watchList: state.watchList,
        searchResult: state.searchResult,
        setSearchTerm,
        isLoading,
        addToWatched,
        addToWatchList,
        handleChangePage,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

// create global context
export const useGlobalContext = () => {
  return useContext(MovieContext);
};
