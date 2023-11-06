import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import Home from './Home';
import { render } from '../test-utils';
import * as authHooks from '../hooks/useAuth';
import { TracksProvider } from '../hooks/useTracks';
import userEvent from '@testing-library/user-event';
import * as utils from '../utils/utils';

import { mockResponse } from '../mocks/mocks';
import { getFormattedResponse } from '../services/auth';

jest.mock('../utils/utils', () => ({
  __esModule: true,
  getTracks: jest.fn(),
}));

describe('Home', () => {
  window.scrollTo = jest.fn();

  test('should render the home with a search bar', async () => {
    jest.spyOn(authHooks, 'useAuth').mockImplementation(() => {
      return {
        isLoggedIn: true,
        login: jest.fn(),
        token: '',
        logout: jest.fn(),
      };
    });
    const { container } = render(
      <TracksProvider>
        <Home />
      </TracksProvider>,
    );

    expect(await screen.findByTestId('results-dashboard')).toBeInTheDocument();

    expect(container.querySelector('input')).toBeInTheDocument();
  });

  test('expect fetch function to be fired during type', async () => {
    jest.spyOn(authHooks, 'useAuth').mockImplementation(() => {
      return {
        isLoggedIn: true,
        login: jest.fn(),
        token: '',
        logout: jest.fn(),
      };
    });

    const geTracks = jest.spyOn(utils, 'getTracks');

    const { container } = render(
      <TracksProvider>
        <Home />
      </TracksProvider>,
    );

    expect(await screen.findByTestId('results-dashboard')).toBeInTheDocument();

    const inputElement = container.querySelector('input')!;

    userEvent.type(inputElement, 'al');

    await waitFor(() => {
      expect(geTracks).toHaveBeenCalled();
    });
  });

  test('display search results after successful fetch', async () => {
    jest.spyOn(authHooks, 'useAuth').mockImplementation(() => {
      return {
        isLoggedIn: true,
        login: jest.fn(),
        token: '',
        logout: jest.fn(),
      };
    });

    jest
      .spyOn(utils, 'getTracks')
      .mockResolvedValue(getFormattedResponse(mockResponse));

    const { container } = render(
      <TracksProvider>
        <Home />
      </TracksProvider>,
    );

    expect(await screen.findByTestId('results-dashboard')).toBeInTheDocument();

    const inputElement = container.querySelector('input')!;

    userEvent.type(inputElement, 'al');

    await waitFor(async () => {
      expect(await screen.findByTestId('card-item')).toBeInTheDocument();
    });

    expect((await screen.findAllByTestId('card-item')).length).toBe(1);
  });

  test('player is rendered on card play button click', async () => {
    jest.resetAllMocks();
    jest.clearAllMocks();
    jest.spyOn(authHooks, 'useAuth').mockImplementation(() => {
      return {
        isLoggedIn: true,
        login: jest.fn(),
        token: '',
        logout: jest.fn(),
      };
    });

    jest
      .spyOn(utils, 'getTracks')
      .mockResolvedValue(getFormattedResponse(mockResponse));

    const { container } = render(
      <TracksProvider>
        <Home />
      </TracksProvider>,
    );

    expect(await screen.findByTestId('results-dashboard')).toBeInTheDocument();

    const inputElement = container.querySelector('input')!;

    userEvent.type(inputElement, 'al');

    expect(await screen.findByTestId('card-item')).toBeInTheDocument();

    fireEvent.click(await screen.findByTestId('play-button'));

    expect(await screen.findByTestId('spotify-player')).toBeInTheDocument();
  });
});
