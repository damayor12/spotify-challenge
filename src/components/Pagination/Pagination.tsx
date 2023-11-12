import React, { useRef } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { Box } from '@material-ui/core';

function Pagination({
  pagesCount,
  searchResultsLen,
}: {
  pagesCount: number;
  searchResultsLen: number;
}) {
  const location = useLocation();
  const reference = useRef(0);
  const history = useHistory();

  const handlePagination = () => {
    history.push(
      `/search${location.search.split('&')[0]}&page=${reference.current}`,
    );
  };

  const goToPrevious = () => {
    reference.current = Math.max(0, reference.current - 1);
  };

  const goToNext = () => {
    reference.current = Math.min(pagesCount, reference.current + 1);
  };

  return searchResultsLen > 0 ? (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '1rem',
      }}
    >
      <div data-testid="pagination">
        <button
          disabled={reference.current === 0}
          onClick={() => {
            goToPrevious();
            handlePagination();
          }}
        >
          Previous
        </button>
        {/* {Removed numbered navigation} */}
        <button
          disabled={reference.current === pagesCount - 1}
          onClick={() => {
            goToNext();
            handlePagination();
          }}
        >
          Next
        </button>
      </div>
    </Box>
  ) : null;
}

export default Pagination;
