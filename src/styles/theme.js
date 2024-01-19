"use client"
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
      primary: {
        main: 'rgb(25, 118, 210)',
      },
      secondary: {
        main: '#607d8b',
      },
      success: {
        main: 'rgb(46, 125, 50)'
      }, 
      info: {
        main: 'rgb(2, 136, 209)'
      }
    },
  });

export default theme;
