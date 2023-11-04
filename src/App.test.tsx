import React from 'react';

import { render, screen } from '@testing-library/react';
import App from './App';
// import { server } from './mocks/server';

describe('Home', () => {
  // beforeAll(() => server.listen({ onUnhandledRequest: 'warn' }));
  // afterEach(() => server.resetHandlers());
  // afterAll(() => server.close());

  test('renders learn react lin', async () => {
    render(<App />);
    const linkElement = screen.getByText(/learn react/i);

    // await screen.findByText(/john/i);
    screen.debug();
    expect(linkElement).toBeInTheDocument();

    expect(await screen.findByText(/john/i)).toBeInTheDocument();

    // await waitFor(() => {
    //   expect(await screen.findByText(/john/)).toBeInTheDocument();
    // });
  });
});
