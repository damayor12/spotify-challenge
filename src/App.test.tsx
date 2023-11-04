import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { screen } from '@testing-library/react';
import App from './App';
import { render } from './test-utils';
// import { server } from './mocks/server';

describe('Home', () => {
  // beforeAll(() => server.listen({ onUnhandledRequest: 'warn' }));
  // afterEach(() => server.resetHandlers());
  // afterAll(() => server.close());

  test('renders learn react lin', async () => {
    render(<App />);

    // await screen.findByText(/john/i);

    expect(await screen.findByText(/john/i)).toBeInTheDocument();
    screen.debug();

    // await waitFor(() => {
    //   expect(await screen.findByText(/john/)).toBeInTheDocument();
    // });
  });
});
