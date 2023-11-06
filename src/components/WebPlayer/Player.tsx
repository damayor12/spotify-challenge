import React, { Dispatch, SetStateAction } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';
import { Box } from '@material-ui/core';
import { useAuth } from '../../hooks/useAuth';

interface SpotifyPlayerType {
  currentTrack: string;
  isPlaying: boolean;
  setIsPlaying: Dispatch<SetStateAction<boolean | null>>;
}

export default function Player({
  currentTrack,
  isPlaying,
  setIsPlaying,
}: SpotifyPlayerType) {
  const { token } = useAuth();

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        width: '85vw',
      }}
      data-testid="spotify-player"
    >
      <SpotifyPlayer
        token={token}
        play={isPlaying}
        styles={{
          bgColor: 'rgb(19, 18, 18)',
          color: '#ffffff',
          sliderColor: '#1cb954',
          sliderHandleColor: 'whitesmoke',
          trackArtistColor: '#ffffff',
          trackNameColor: '#fff',
        }}
        uris={[currentTrack]}
        callback={(state) => {
          if (state.isActive) {
            setIsPlaying(state.isPlaying);
          }
        }}
      />
    </Box>
  );
}
