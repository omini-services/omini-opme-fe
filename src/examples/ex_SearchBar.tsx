import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import Input from '@mui/joy/Input';
import React from 'react';

const SearchBar = () => (
  <Input
    size="sm"
    startDecorator={<SearchRoundedIcon />}
    placeholder="Search"
  />
);

export default SearchBar;
