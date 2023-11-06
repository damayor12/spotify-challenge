import { server } from './src/mocks/server';

import 'whatwg-fetch';
import '@testing-library/jest-dom/extend-expect';

beforeEach(() => {
  jest.clearAllMocks();
  jest.resetAllMocks();
});

beforeAll(() => {
  // Enable the mocking in tests.
  server.listen();
});

afterEach(() => {
  // Reset any runtime handlers tests may use.
  server.resetHandlers();
  jest.clearAllMocks();
});

afterAll(() => {
  // Clean up once the tests are done.
  server.close();
});
