import { makeStyles } from '@material-ui/core/styles';

export const useCardStyles = makeStyles((theme) => {
  return {
    card: {
      display: 'flex',
      flexDirection: 'column',
      maxWidth: '200px',
      padding: 5,
      margin: '5px 0',
      backgroundColor: theme.palette.secondary.main,
      borderRadius: 10,
      position: 'relative',

      [theme.breakpoints.up(550)]: {
        width: '46%',
      },

      '&:hover': {
        color: theme.palette.common.black,
        backgroundColor: theme.palette.common.white,
      },
    },
    image: {
      borderRadius: 4,
      width: 180,
    },
    outline: {
      paddingTop: '1rem',
      cursor: 'pointer',
    },
    text: {
      '&:hover': {
        textDecoration: 'underline',
        cursor: 'pointer',
      },
    },
  };
});

export const useHeaderStyles = makeStyles(({ palette, breakpoints }) => {
  return {
    header: {
      width: '100%',
      cursor: 'pointer',
      borderBottom: '1px solid gray',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      textTransform: 'uppercase',
      backgroundColor: palette.primary.main,
      fontFamily: 'Montserrat, sans-serif',
      fontSize: '5vw',
      paddingBottom: '15px',
      boxShadow: `0px 1px 5px ${palette.common.black}`,
      color: 'white',
      zIndex: 100,

      [breakpoints.up(1000)]: {
        paddingTop: '15px',
        fontSize: '6.4vw',
      },
    },
  };
});

export const useDetailsStyles = makeStyles(({ palette }) => {
  return {
    text: {
      '&:hover': {
        textDecoration: 'underline',
        cursor: 'pointer',
      },
    },
    subText: {
      color: palette.common.black,
    },
  };
});
