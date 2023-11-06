import 'spotify-api';
export {};

declare global {
  declare namespace SpotifyApi {
    interface SpotifyApiResponse extends SpotifyApi.TrackSearchResponse {}
  }
}
