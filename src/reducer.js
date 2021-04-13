import * as types from './types';

export const reducer = (state, action) => {
  switch (action.type) {
    case types.RESET_SEARCH_LIST:
      return { ...state, searchResult: { list: [], page: 0, total_pages: 0 } };
    case types.SEARCH_MOVIE:
      const { results, page, total_pages, genres } = action.payload;
      return {
        ...state,
        genres,
        searchResult: {
          list: results,
          page,
          total_pages,
        },
      };
    case types.ADD_TO_WATCH_LIST:
      return {
        ...state,
        watched: action.payload.newWatched,
        watchList: action.payload.newWatchList,
        searchResult: {
          ...state.searchResult,
          list: state.searchResult.list.map((movie) => {
            if (movie.id === action.payload.id)
              return { ...movie, isInWatchList: true, isInWatched: false };
            else return movie;
          }),
        },
      };
    case types.ADD_TO_WATCHED:
      return {
        ...state,
        watched: action.payload.newWatched,
        watchList: action.payload.newWatchList,
        searchResult: {
          ...state.searchResult,
          list: state.searchResult.list.map((movie) => {
            if (movie.id === action.payload.id)
              return { ...movie, isInWatched: true, isInWatchList: false };
            else return movie;
          }),
        },
      };
    default:
      return state;
  }
};
