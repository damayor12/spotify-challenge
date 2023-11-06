import React from 'react';

import Card from '@material-ui/core/Card';
import { SearchResultsProps } from '../../pages/Home';
import PlayCircleOutline from '@material-ui/icons/PlayCircleOutline';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';
import { useHistory } from 'react-router-dom';

import { Grid } from '@material-ui/core';
import { useCardStyles } from '../styles';

function CardItem({
  track,
  handlePlayClick,
  isPlaying,
  currentPlaying,
  handlePauseClick,
}: {
  track: SearchResultsProps;
  handlePlayClick?: (uri: string) => void;
  isPlaying?: boolean | null;
  currentPlaying?: string;
  handlePauseClick?: (uri: string) => void;
}) {
  const classes = useCardStyles();
  const history = useHistory();

  return (
    <Card className={classes.card} data-testid="card-item">
      <img className={classes.image} src={track.album_image} alt="ff" />

      <Grid container spacing={3}>
        <Grid item xs={9}>
          <b
            className={classes.text}
            onClick={() => history.push(`/tracks/${track.id}`)}
          >
            <a>{track.name} </a>
          </b>
        </Grid>

        {handlePauseClick && handlePlayClick && (
          <Grid item data-testid="media-card-section">
            {currentPlaying === track.uri ? (
              isPlaying ? (
                <PauseCircleFilledIcon
                  className={classes.outline}
                  onClick={() => handlePauseClick(track.uri)}
                />
              ) : (
                <PlayCircleOutline
                  className={classes.outline}
                  onClick={() => handlePlayClick(track.uri)}
                />
              )
            ) : (
              <PlayCircleOutline
                data-testid="play-button"
                className={classes.outline}
                onClick={() => handlePlayClick(track.uri)}
              />
            )}
          </Grid>
        )}
      </Grid>

      <span>{track.album_name}</span>
    </Card>
  );
}

export default CardItem;
