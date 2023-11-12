import { IconButton, TextField } from '@material-ui/core';
import React from 'react';
import ClearIcon from '@material-ui/icons/ClearOutlined';
import { Box } from '@material-ui/core';

interface SearchProps {
  searchInput: string;
  fetchSearch: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  clearSearch: () => void;
}

const Search = ({ searchInput, fetchSearch, clearSearch }: SearchProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '1rem 0',
      }}
    >
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
    </Box>
  );
};

export default Search;
