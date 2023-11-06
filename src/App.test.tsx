import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { screen } from '@testing-library/react';
import App from './App';
import { render } from './test-utils';

describe('App', () => {
  window.scrollTo = jest.fn();

  test('should render the login page on mount', async () => {
    render(<App />);

    expect(await screen.findByText(/Spotfity search/i)).toBeInTheDocument();
    expect(await screen.findByText(/authorize/i)).toBeInTheDocument();
  });
});
