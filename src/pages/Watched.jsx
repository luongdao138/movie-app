import { Typography, Grid, Container } from '@material-ui/core';
import React from 'react';
import { useGlobalContext } from '../context';
import Loader from '../components/Loader';
import * as components from '../components';

const Watched = () => {
  const {
    isLoading,
    addToWatched,
    addToWatchList,
    watched,
  } = useGlobalContext();

  if (isLoading) return <components.Loader />;

  // if (searchTerm === '') {
  //   return <Typography variant='h4'>Search movies you like!</Typography>;
  // }

  // if (searchTerm !== '' && list.length === 0)
  //   return <Typography>No movies match your search!</Typography>;

  return (
    <Container>
      <Grid style={{ margin: '24px 0' }} container spacing={2}>
        {watched.map((movie) => {
          return (
            <components.MovieWatch
              key={movie.id}
              movie={movie}
              addToWatchList={addToWatchList}
              addToWatched={addToWatched}
            />
          );
        })}
      </Grid>
      {/* <components.Pagination
        page={page}
        total_pages={total_pages}
        color='primary'
        handleChangePage={handleChangePage}
      /> */}
    </Container>
  );
};

export default Watched;
