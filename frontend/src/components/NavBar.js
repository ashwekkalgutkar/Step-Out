import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const NavBar = () => {
  const { token, logout } = useAuth();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Railway Management System
        </Typography>
        <Button color="inherit" component={Link} to="/">Home</Button>
        {!token && <Button color="inherit" component={Link} to="/register">Register</Button>}
        {!token && <Button color="inherit" component={Link} to="/login">Login</Button>}
        {token && <Button color="inherit" component={Link} to="/trains">Trains</Button>}
        {token && <Button color="inherit" component={Link} to="/bookings">Bookings</Button>}
        {token && <Button color="inherit" component={Link} to="/admin">Admin</Button>}
        {token && <Button color="inherit" onClick={logout}>Logout</Button>}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
