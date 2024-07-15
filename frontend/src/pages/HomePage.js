import React from 'react';
import { Container, Typography } from '@mui/material';

const HomePage = () => (
  <Container>
    <Typography variant="h4" gutterBottom>Welcome to the Railway Management System</Typography>
    <Typography variant="body1">
      Please register or login to book trains. Admins can add new trains.
    </Typography>
  </Container>
);

export default HomePage;
