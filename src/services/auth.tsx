import { setToStorage } from '../utils/utils';
import _ from 'lodash';

/* eslint-disable @typescript-eslint/no-unused-vars */
const SPOTIFY_CLIENT_ID: string = `7770eaa6ade6430f8a0215012497a9a9`;
const redirectUri: string = 'http://localhost:3000/';
const accessTokenUri: string = 'https://accounts.spotify.com/api/token';

function generateRandomString(length: number): string {
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  const values = crypto.getRandomValues(new Uint8Array(length));
  return values.reduce((acc, x) => acc + possible[x % possible.length], '');
}

const base64encode = (input: Uint8Array): string => {
  return btoa(String.fromCharCode.apply(null, Array.from(input)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
};

const getCodeChallenge = async (plain: string): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  const digest = await window.crypto.subtle.digest('SHA-256', data);

  return base64encode(new Uint8Array(digest));
};

let urlParams = new URLSearchParams();

if (typeof window !== 'undefined') {
  urlParams = new URLSearchParams(window.location.search);
}

export const authorize = async () => {
  const codeVerifier: string = generateRandomString(128);

  getCodeChallenge(codeVerifier).then((codeChallenge) => {
    const state: string = generateRandomString(16);
    const scope: string =
      'user-read-private user-read-email streaming user-read-playback-state user-modify-playback-state';

    const authUrl = new URL('https://accounts.spotify.com/authorize');

    localStorage.setItem('code_verifier', codeVerifier);

    const params = {
      response_type: 'code',
      client_id: SPOTIFY_CLIENT_ID,
      scope,
      code_challenge_method: 'S256',
      code_challenge: codeChallenge,
      redirect_uri: redirectUri,
      state: state,
    };

    authUrl.search = new URLSearchParams(params).toString();
    window.location.href = authUrl.toString();
  });
};

export const getToken = async (code: string) => {
  const codeVerifier = localStorage.getItem('code_verifier');

  const body = new URLSearchParams({
    grant_type: 'authorization_code' || '',
    code: code || '',
    redirect_uri: redirectUri || '',
    client_id: SPOTIFY_CLIENT_ID || '',
    code_verifier: codeVerifier || '',
  });
  try {
    const response = await fetch(accessTokenUri, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body,
    });

    if (!response.ok) {
      throw new Error('HTTP status ' + response.status);
    }

    const data = await response.json();

    setToStorage('access_token', data);

    return data;
  } catch (error) {
    window.location.href = '/';
    return false;
  }
};

export const getRefreshToken = async (refresh_token: string) => {
  const body = new URLSearchParams({
    grant_type: 'refresh_token' || '',
    refresh_token: refresh_token,
    client_id: SPOTIFY_CLIENT_ID || '',
  });
  try {
    const response = await fetch(accessTokenUri, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: body,
    });

    const data = await response.json();

    setToStorage('access_token', data);

    return data;
  } catch (err) {
    console.log(err);
  }
};

export const getFormattedResponse = (
  tracks: SpotifyApi.TrackSearchResponse,
) => {
  return {
    tracks: tracks.tracks.items.map((track) => {
      const album = _.first(track?.album?.images);
      return {
        name: track.name,
        uri: track.uri,
        album_image: album?.url,
        album_name: track.album.name,
        id: track.id,
        duration: track.duration_ms,
      };
    }),
    total: tracks.tracks.total,
  };
};
