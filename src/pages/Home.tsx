/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';

import Player from '../components/WebPlayer/Player';
import { Box, Button } from '@material-ui/core';
import CardItem from '../components/Card/Card';
import { useAuth } from '../hooks/useAuth';
import Search from '../components/Search/Search';
import { useTracks } from '../hooks/useTracks';
import Pagination from '../components/Pagination/Pagination';
import Container from '@material-ui/core/Container';
import Dashboard from '../components/Dashboard/Dashboard';

export interface SearchResultsProps {
  name: string;
  uri: string;
  album_image: string | undefined;
  album_name: string;
  id: string;
  duration: number;
}

function Home() {
  const [isPlaying, setIsPlaying] = useState<boolean | null>(null);
  const [currentPlaying, setCurrentPlaying] = useState<string>('');

  const { searchInput, searchResults, clearSearch, fetchSearch, pagesCount } =
    useTracks();
  const { isLoggedIn, login } = useAuth();

  const handlePlayClick = (uri: string) => {
    setIsPlaying((prev) => true);
    setCurrentPlaying(uri);
  };

  const handlePauseClick = (uri?: string) => {
    setCurrentPlaying('');
    setIsPlaying(false);
  };

  return (
    <Container>
      {!isLoggedIn ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Button onClick={login}>Authorize</Button>
        </Box>
      ) : (
        <Dashboard
          searchInput={searchInput}
          fetchSearch={fetchSearch}
          clearSearch={clearSearch}
          searchResults={searchResults}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          currentPlaying={currentPlaying}
          handlePlayClick={handlePlayClick}
          handlePauseClick={handlePauseClick}
          pagesCount={pagesCount}
        />
      )}
    </Container>
  );
}

export default Home;
