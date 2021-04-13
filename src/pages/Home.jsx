import React from 'react';
import * as components from '../components';
import { Container } from '@material-ui/core';

const Home = () => {
  return (
    <Container>
      <components.Search />
      <components.MovieList />
    </Container>
  );
};

export default Home;
