import React from 'react';
import {
  Card,
  Grid,
  CardContent,
  CardMedia,
  CardActions,
  makeStyles,
  Button,
  IconButton,
} from '@material-ui/core';
import { Typography } from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';
import VisibilityIcon from '@material-ui/icons/Visibility';
import DeleteIcon from '@material-ui/icons/Delete';

const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

const useStyles = makeStyles((theme) => ({
  card: {
    '& .media': {
      height: '350px',
    },
    '& .title': {
      letterSpacing: '1.5px',
    },
    '& .genre': {
      fontWeight: '500',
      letterSpacing: '1px',
      fontSize: '14px',
      color: '#617d98',
    },
    '& .action': {
      display: 'flex',
      justifyContent: 'center',
      '& .btn': {
        fontSize: '12px',
        padding: '5px 10px',
        marginBottom: '12px',
      },
    },
  },
}));

const Movie = ({ movie, addToWatched, addToWatchList }) => {
  const {
    poster_path,
    backdrop_path,
    title,
    vote_average,
    release_date,
    genre_ids,
    isInWatched,
    isInWatchList,
  } = movie;

  const numberStar = Math.ceil((vote_average / 10) * 5);
  const yearReleased = release_date && release_date.split('-')[0];
  const numbers = [1, 2, 3, 4, 5];

  const classes = useStyles();
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card className={classes.card}>
        {poster_path || backdrop_path ? (
          <CardMedia
            className='media'
            image={
              poster_path
                ? `${IMAGE_URL}${poster_path}`
                : `${IMAGE_URL}${backdrop_path}`
            }
          />
        ) : (
          <CardMedia className='media' />
        )}
        <CardContent>
          <Typography variant='h6' className='title'>
            {title}
            <span style={{ fontSize: '16px', marginLeft: '5px' }}>
              ({yearReleased})
            </span>
          </Typography>
          {numbers.map((number, index) => {
            if (number <= numberStar)
              return (
                <StarIcon
                  fontSize='small'
                  key={number}
                  style={{ color: '#f4ec09' }}
                />
              );
            else
              return (
                <StarIcon
                  fontSize='small'
                  style={{ color: 'grey' }}
                  key={number}
                />
              );
          })}
          <Typography className='genre'>{genre_ids.join(', ')}</Typography>
        </CardContent>
        <CardActions className='action'>
          <IconButton>
            <VisibilityIcon />
          </IconButton>
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default Movie;
