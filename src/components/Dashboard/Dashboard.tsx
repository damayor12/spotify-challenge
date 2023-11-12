import React, { PropsWithChildren } from 'react';
import { SearchResultsProps } from '../../pages/Home';
import Player from '../WebPlayer/Player';
import { Box } from '@material-ui/core';
import CardItem from '../Card/Card';
import Pagination from '../Pagination/Pagination';
import Search from '../Search/Search';

interface DashboardProps {
  searchInput: string;
  fetchSearch: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  searchResults: SearchResultsProps[] | undefined;
  clearSearch: () => void;
  isPlaying: boolean | null;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean | null>>;
  currentPlaying: string;
  handlePlayClick: (uri: string) => void;
  handlePauseClick: (uri?: string) => void;
  pagesCount: number;
}

interface Props extends PropsWithChildren {
  searchResults: SearchResultsProps[] | undefined;
  searchInput: string;
}

const SearchResultsContainer = ({
  children,
  searchResults,
  searchInput,
}: Props) => (
  <>
    {searchResults && searchResults.length > 0 && (
      <Box sx={{ marginLeft: '1rem' }} data-testid="results-found">
        Search Results for {searchInput}...
      </Box>
    )}
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
      }}
      data-testid="results-dashboard"
    >
      {children}
    </Box>
  </>
);
const Dashboard = ({
  searchInput,
  fetchSearch,
  clearSearch,
  searchResults,
  isPlaying,
  setIsPlaying,
  currentPlaying,
  handlePauseClick,
  handlePlayClick,
  pagesCount,
}: DashboardProps) => {
  return (
    <>
      <Search
        searchInput={searchInput}
        fetchSearch={fetchSearch}
        clearSearch={clearSearch}
      />

      <SearchResultsContainer
        searchResults={searchResults}
        searchInput={searchInput}
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
      </SearchResultsContainer>

      <Pagination
        pagesCount={pagesCount}
        searchResultsLen={searchResults ? searchResults.length : 0}
      />

      {isPlaying !== null && (
        <Player
          currentTrack={currentPlaying}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
        />
      )}
    </>
  );
};

export default Dashboard;
