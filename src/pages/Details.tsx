import React, { useEffect } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useTracks } from '../hooks/useTracks';
import CardItem from '../components/Card/Card';
import { formatMstoMins, getCardData } from '../utils/utils';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import { useDetailsStyles } from '../components/styles';

const Details = () => {
  const { isLoggedIn } = useAuth();
  const classes = useDetailsStyles();
  const { id } = useParams<{ id: string }>();

  if (!isLoggedIn) {
    return <Redirect to="/" />;
  }

  const { setDetailsId, trackDetailsData } = useTracks();

  useEffect(() => {
    setDetailsId(id);
    return () => setDetailsId(undefined);
  }, [id]);

  return !trackDetailsData ? (
    <div>Something went wrong</div>
  ) : (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <CardItem track={getCardData(trackDetailsData)} />
        </Grid>
        <Grid item xs={8} style={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h2" gutterBottom className={classes.text}>
            <a href={`https://open.spotify.com/track/${trackDetailsData.id}`}>
              {getCardData(trackDetailsData).name}
            </a>
          </Typography>

          <Typography variant="h5" gutterBottom className={classes.subText}>
            Album : {getCardData(trackDetailsData).album_name}
          </Typography>

          <Typography variant="h5" gutterBottom className={classes.subText}>
            Duration : {formatMstoMins(getCardData(trackDetailsData).duration)}{' '}
            minutes
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Details;
