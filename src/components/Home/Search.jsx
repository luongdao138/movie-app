import { makeStyles, TextField } from '@material-ui/core';
import React, { useState, useCallback } from 'react';
import { useGlobalContext } from '../../context';
import { debounce } from 'lodash';

const useStyles = makeStyles((theme) => ({
  input: {
    width: '400px',
    margin: '24px 0',
    [theme.breakpoints.down('xs')]: { width: '100%' },
  },
}));

const Search = () => {
  const classes = useStyles();
  const { setSearchTerm } = useGlobalContext();
  const [value, setValue] = useState('');

  const debouncedSearch = useCallback(
    debounce((value) => {
      setSearchTerm(value);
    }, 1000),
    []
  );

  const handleChange = (e) => {
    setValue(e.target.value);
    debouncedSearch(e.target.value);
  };

  return (
    <TextField
      variant='standard'
      label='Search movies...'
      className={classes.input}
      value={value}
      autoFocus
      onChange={handleChange}
    />
  );
};

export default Search;
