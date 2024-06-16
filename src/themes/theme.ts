import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  typography: {
    fontSize: 10,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    display4: {
      fontSize: '1rem',
      fontWeight: 300,
      letterSpacing: '-.04em',
      lineHeight: '1.14286em',
      marginLeft: '-.04em',
      color: 'rgba(0, 0, 0, 0.54)',
    },
    display3: {
      fontSize: '1rem',
      fontWeight: 400,
      letterSpacing: '-.02em',
      lineHeight: '1.30357em',
      marginLeft: '-.02em',
      color: 'rgba(0, 0, 0, 0.54)',
    },
    display2: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: '1.06667em',
      marginLeft: '-.02em',
      color: 'rgba(0, 0, 0, 0.54)',
    },
    display1: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: '1.20588em',
      color: 'rgba(0, 0, 0, 0.54)',
    },
    headline: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: '1.35417em',
      color: 'rgba(0, 0, 0, 0.87)',
    },
    title: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: '1.16667em',
      color: 'rgba(0, 0, 0, 0.87)',
    },
    subheading: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: '1.5em',
      color: 'rgba(0, 0, 0, 0.87)',
    },
    body2: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: '1.71429em',
      color: 'rgba(0, 0, 0, 0.87)',
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: '1.46429em',
      color: 'rgba(0, 0, 0, 0.87)',
    },
    caption: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: '1.375em',
      color: 'rgba(0, 0, 0, 0.54)',
    },
    button: {
      fontSize: '1rem',
      textTransform: 'uppercase',
      fontWeight: 500,
      color: 'rgba(0, 0, 0, 0.87)',
    },
  },
});

export default theme;
