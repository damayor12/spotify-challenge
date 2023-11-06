/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import _ from 'lodash';
import { SearchResultsProps } from '../pages/Home';
const BASEURL = `https://api.spotify.com/v1`;
import moment from 'moment';
import { getFormattedResponse } from '../services/auth';

const localStorage = (function () {
  if (typeof window !== 'undefined' && window.localStorage) {
    return window.localStorage;
  }
})();

export const getAuthToken = () => {
  if (!localStorage) {
    return null;
  }

  return getFromStorage('access_token') ? getFromStorage('access_token') : null;
};

export const getFromStorage = (key: string) => {
  if (!localStorage) {
    console.log('NO LOCAL STORAGE');
    return null;
  }

  const data = localStorage.getItem(key);

  if (!data) return null;

  const item = JSON.parse(data);

  return item;
};

export const setToStorage = (key: string, value: any) => {
  if (localStorage && typeof value !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export const getTracks = async (searchTerm: string, page: number = 0) => {
  const token = getAuthToken();
  const limit = 10;
  const offset = page * limit;
  try {
    const response = await fetch(
      `${BASEURL}/search?q=${searchTerm}&type=track&limit=${limit}&offset=${offset}`,
      {
        headers: {
          Authorization: 'Bearer ' + token.access_token,
        },
      },
    );

    const tracks: SpotifyApi.TrackSearchResponse = await response.json();

    return getFormattedResponse(tracks);
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

export const getTrackDetails = async (id: string) => {
  const token = getAuthToken();

  try {
    const response = await fetch(`${BASEURL}/tracks/${id}`, {
      headers: {
        Authorization: 'Bearer ' + token?.access_token,
      },
    });

    const track: SpotifyApi.SingleTrackResponse = await response.json();

    return track;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

export const getCardData = (
  data: SpotifyApi.SingleTrackResponse,
): SearchResultsProps => {
  return {
    name: data.name,
    uri: data.uri,
    album_image: data.album.images[0].url,
    album_name: data.album.name,
    id: data.id,
    duration: data.duration_ms,
  };
};

export const formatMstoMins = (num: number) => moment.utc(num).format('mm:ss');
