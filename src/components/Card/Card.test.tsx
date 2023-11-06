import React from 'react';
import CardItem from './Card';
import { render } from '../../test-utils';
import { getCardData } from '../../utils/utils';
import { mockSingleTrack } from '../../mocks/mocks';
import { screen, waitFor } from '@testing-library/react';
import { Route, MemoryRouter as Router } from 'react-router-dom';
import { TracksProvider } from '../../hooks/useTracks';

test('Card to display only Details related to Details Page', async () => {
  render(<CardItem track={getCardData(mockSingleTrack)} />);

  await waitFor(async () => {
    expect(screen.queryByTestId('media-card-section')).not.toBeInTheDocument();
  });
});

test('Card to display only Details related to Home Page', async () => {
  const mockHandlePlayClick = jest.fn();
  const mockHandlePauseClick = jest.fn();

  render(
    <Router initialEntries={[{ pathname: '/tracks/0xxx', search: '' }]}>
      <Route path="/tracks/:id">
        <TracksProvider>
          <CardItem
            track={getCardData(mockSingleTrack)}
            handlePauseClick={mockHandlePauseClick}
            handlePlayClick={mockHandlePlayClick}
          />
        </TracksProvider>
      </Route>
    </Router>,
  );
  // render(

  // );

  await waitFor(async () => {
    expect(screen.queryByTestId('media-card-section')).toBeInTheDocument();
  });
});
