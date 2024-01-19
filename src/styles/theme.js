"use client"
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
      primary: {
        main: 'rgb(25, 118, 210)', // Cambia este color a tu color primario deseado
      },
      secondary: {
        main: '#607d8b', // Cambia este color a tu color secundario deseado
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
