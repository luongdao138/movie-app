import { Typography, Grid } from '@material-ui/core';
import React from 'react';
import { useGlobalContext } from '../../context';
import Loader from '../Loader';
import * as components from '../../components';

const MovieList = () => {
  const {
    searchResult: { list, page, total_pages },
    searchTerm,
    isLoading,
    addToWatched,
    addToWatchList,
    handleChangePage,
  } = useGlobalContext();

  if (isLoading) return <components.Loader />;

  if (searchTerm === '') {
    return <Typography variant='h4'>Search movies you like!</Typography>;
  }

  if (searchTerm !== '' && list.length === 0)
    return <Typography>No movies match your search!</Typography>;

  return (
    <section>
      <Grid container spacing={2}>
        {list.map((movie) => {
          return (
            <components.Movie
              key={movie.id}
              movie={movie}
              addToWatchList={addToWatchList}
              addToWatched={addToWatched}
            />
          );
        })}
      </Grid>
      <components.Pagination
        page={page}
        total_pages={total_pages}
        color='primary'
        handleChangePage={handleChangePage}
      />
    </section>
  );
};

export default MovieList;
