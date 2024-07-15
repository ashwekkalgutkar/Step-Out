import React from 'react';
import { CircularProgress, Container, Typography } from '@mui/material';

const LoadingPage = () => (
  <Container style={{ textAlign: 'center', marginTop: '20%' }}>
    <CircularProgress />
    <Typography variant="h6" style={{ marginTop: '20px' }}>Loading...</Typography>
  </Container>
);

export default LoadingPage;
