/* eslint-disable @typescript-eslint/no-explicit-any */
import { rest } from 'msw';
import { mockResponse } from './mocks';

export const baseUrl = `https://api.spotify.com/v1`;

export const handlers = [
  rest.get<any, any, SpotifyApi.TrackSearchResponse>(
    `${baseUrl}/tracks/0xxx`,
    async (req, res, ctx) => {
      return res(ctx.json(mockResponse));
    },
  ),
];
