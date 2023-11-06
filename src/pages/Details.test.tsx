import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { screen, waitFor } from '@testing-library/react';
import { render } from '../test-utils';
import * as authHooks from '../hooks/useAuth';

import { TracksProvider } from '../hooks/useTracks';

import * as utils from '../utils/utils';

import { mockSingleTrack } from '../mocks/mocks';

import Details from './Details';
import { Route, MemoryRouter as Router } from 'react-router-dom';
import { act } from 'react-dom/test-utils';

describe('Details', () => {
  test('call fetch function on mount', async () => {
    jest.spyOn(authHooks, 'useAuth').mockImplementation(() => {
      return {
        isLoggedIn: true,
        login: jest.fn(),
        token: '',
        logout: jest.fn(),
      };
    });

    const mockGetTrackDetails = jest.spyOn(utils, 'getTrackDetails');

    await act(async () =>
      render(
        <Router initialEntries={[{ pathname: '/tracks/0xxx', search: '' }]}>
          <Route path="/tracks/:id">
            <TracksProvider>
              <Details />
            </TracksProvider>
          </Route>
        </Router>,
      ),
    );

    expect(mockGetTrackDetails).toHaveBeenCalled();
  });

  test('on successful fetch, display card item', async () => {
    jest.spyOn(authHooks, 'useAuth').mockImplementation(() => {
      return {
        isLoggedIn: true,
        login: jest.fn(),
        token: '',
        logout: jest.fn(),
      };
    });

    jest.spyOn(utils, 'getTrackDetails').mockResolvedValue(mockSingleTrack);

    // const { container } = render(
    //   <Router initialEntries={[{ pathname: '/tracks/0xxx', search: '' }]}>
    //     <Route path="/tracks/:id">
    //       <TracksProvider>
    //         <Details />
    //       </TracksProvider>
    //     </Route>
    //   </Router>,
    // );

    await act(async () =>
      render(
        <Router initialEntries={[{ pathname: '/tracks/0xxx', search: '' }]}>
          <Route path="/tracks/:id">
            <TracksProvider>
              <Details />
            </TracksProvider>
          </Route>
        </Router>,
      ),
    );

    expect(await screen.findByTestId('card-item')).toBeInTheDocument();

    const TextWithAlbumNameArr = await screen.findAllByText(/Panda/i);

    await waitFor(() => {
      expect(TextWithAlbumNameArr.length).toBeGreaterThan(0);
    });

    // expect(container.querySelector('a')).toHaveTextContent('Panda');
  });
});
