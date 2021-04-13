import React from 'react';
import {
  AppBar,
  makeStyles,
  Toolbar,
  Typography,
  Button,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  appbar: {
    padding: theme.spacing(2),
  },
  grow: {
    flexGrow: 1,
  },
  btn_wrapper: {
    '& .MuiButton-root': {
      color: '#fff',
      marginLeft: theme.spacing(1),
      textTransform: 'none',
    },
  },
}));

const Appbar = () => {
  const classes = useStyles();
  return (
    <AppBar position='static' className={classes.appbar}>
      <Toolbar>
        <Typography variant='h4'>WatchList React</Typography>
        <div className={classes.grow}></div>
        <div className={classes.btn_wrapper}>
          <Link to='/watchlist'>
            <Button variant='text'>Watch List</Button>
          </Link>
          <Link to='/watched'>
            <Button variant='text'>Watched</Button>
          </Link>
          <Link to='/'>
            <Button variant='contained' color='secondary'>
              <AddIcon fontSize='small' style={{ marginRight: '4px' }} />
              Add
            </Button>
          </Link>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Appbar;
