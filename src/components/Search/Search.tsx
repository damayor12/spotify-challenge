import { IconButton, TextField } from '@material-ui/core';
import React from 'react';
import ClearIcon from '@material-ui/icons/ClearOutlined';

interface SearchProps {
  searchInput: string;
  fetchSearch: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  clearSearch: () => void;
}

const Search = ({ searchInput, fetchSearch, clearSearch }: SearchProps) => {
  return (
    <TextField
      style={{ width: '400px' }}
      placeholder="Search favorite songs"
      value={searchInput}
      label="Search favorite songs"
      variant="filled"
      onChange={fetchSearch}
      InputProps={{
        endAdornment: (
          <IconButton onClick={clearSearch} edge="end">
            <ClearIcon />
          </IconButton>
        ),
      }}
    />
  );
};

export default Search;
