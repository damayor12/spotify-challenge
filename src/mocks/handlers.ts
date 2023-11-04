import { rest } from 'msw';

// src/mocks/handlers.ts
export const baseUrl = '/user';

export const handlers = [
  rest.get('/user', async (req, res, ctx) => {
    return res(ctx.json({ firstName: 'John' }));
  }),
];

// export const handlers = [mockResponse];
