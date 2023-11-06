import React, { useRef } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

function Pagination({ pagesCount }: { pagesCount: number }) {
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

  return (
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
  );
}

export default Pagination;
