import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#39445a',
    },
    secondary: {
      main: '#8b9099',
    },
    common: {
      white: 'white',
    },
  },
});

theme.props = {
  MuiButton: {
    disableElevation: true,
  },
  MuiInputLabel: {
    shrink: true,
  },
  MuiInput: {
    disableUnderline: true,
  },
  MuiTooltip: {
    arrow: true,
  },
};

theme.overrides = {
  MuiButton: {
    root: {
      borderRadius: 0,
      textTransform: 'none',
      cursor: 'pointer',
      backgroundColor: 'white',
      '&:hover': {
        backgroundColor: 'gray',
        color: 'white',
      },
    },
  },
  MuiInputBase: {
    root: {
      outline: `2px solid gray`,
      color: theme.palette.common.white,
      '&::placeholder': {
        color: 'gray',
      },
      '&$focused': {
        border: `1px solid ${theme.palette.primary.main}`,
        outline: `1px solid gray`,
      },
    },
  },
  MuiInputLabel: {
    root: {
      '&$focused': {
        color: theme.palette.secondary.main,
      },
    },
  },
};

export default theme;
