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
        <>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              margin: '1rem 0',
            }}
          >
            <Search
              searchInput={searchInput}
              fetchSearch={fetchSearch}
              clearSearch={clearSearch}
            />
          </Box>

          <>
            {searchResults && searchResults.length > 0 && (
              <Box sx={{ marginLeft: '1rem' }} data-testid="results-found">
                Search Results for {searchInput}...
              </Box>
            )}
          </>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-around',
            }}
            data-testid="results-dashboard"
          >
            {searchResults && searchResults.length > 0 ? (
              searchResults.map((track, index) => (
                <CardItem
                  track={track}
                  key={index}
                  handlePlayClick={handlePlayClick}
                  handlePauseClick={handlePauseClick}
                  currentPlaying={currentPlaying}
                  isPlaying={isPlaying}
                />
              ))
            ) : searchInput !== '' ? (
              <Box>No songs found :( </Box>
            ) : (
              <Box>Search your songs </Box>
            )}
          </Box>

          {searchResults && searchResults.length > 0 ? (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '1rem',
              }}
            >
              <Pagination pagesCount={pagesCount} />
            </Box>
          ) : (
            <></>
          )}

          {isPlaying !== null && (
            <Player
              currentTrack={currentPlaying}
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
            />
          )}
        </>
      )}
    </Container>
  );
}

export default Home;
