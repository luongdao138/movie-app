import * as types from './types';

export const resetSerachList = () => {
  return { type: types.RESET_SEARCH_LIST };
};

export const searchMovies = (movies) => {
  return { type: types.SEARCH_MOVIE, payload: movies };
};

export const addToWatchList = (newWatched, newWatchList) => {
  return {
    type: types.ADD_TO_WATCH_LIST,
    payload: { newWatched, newWatchList },
  };
};

export const addToWatched = (newWatched, newWatchList) => {
  return { type: types.ADD_TO_WATCHED, payload: { newWatched, newWatchList } };
};
