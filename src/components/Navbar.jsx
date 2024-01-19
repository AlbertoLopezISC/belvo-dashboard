// src/components/Navbar.js
"use client"
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Belvo
        </Typography>
        <Button color="inherit" onClick={() => console.log('Dashboard clicked')}>
          Dashboard
        </Button>
        <Button color="inherit" onClick={() => console.log('Salir clicked')}>
          Salir
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
