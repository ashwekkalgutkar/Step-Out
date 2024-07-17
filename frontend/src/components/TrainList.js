import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Container, Typography, TextField, Button, Snackbar, Alert, Grid, Card, CardContent, CardActions, Box } from '@mui/material';
import { Autocomplete } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';

const TrainList = () => {
  const { token } = useAuth();
  const [trains, setTrains] = useState([]);
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [sourceOptions, setSourceOptions] = useState([]);
  const [destinationOptions, setDestinationOptions] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllTrains();
  }, []);

  const fetchAllTrains = async () => {
    try {
      const response = await axios.get('https://step-out-1.onrender.com/api/trains');
      setTrains(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching trains:', err);
      setLoading(false);
    }
  };

  const getUniqueValues = (data, key) => {
    const uniqueValues = new Set(data.map(item => item[key]));
    return [...uniqueValues];
  };

  useEffect(() => {
    const sourceOptions = getUniqueValues(trains, 'source');
    const destinationOptions = getUniqueValues(trains, 'destination');
    setSourceOptions(sourceOptions);
    setDestinationOptions(destinationOptions);
  }, [trains]);

  const filterTrains = () => {
    if (!source || !destination) {
      setSnackbarMessage('Please select both source and destination.');
      setSnackbarSeverity('info');
      setSnackbarOpen(true);
      return;
    }

    const filteredTrains = trains.filter(train =>
      train.source.toLowerCase() === source.toLowerCase() &&
      train.destination.toLowerCase() === destination.toLowerCase()
    );

    setTrains(filteredTrains);
    if (filteredTrains.length === 0) {
      setSnackbarMessage('No trains available for selected source and destination.');
      setSnackbarSeverity('info');
      setSnackbarOpen(true);
    }
  };

  const handleBookSeat = async (trainId) => {
    try {
      const response = await axios.put(`https://step-out-1.onrender.com/api/trains/book/${trainId}`, null, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.data.success) {
        setSnackbarMessage('Booking successful!');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
        fetchAllTrains();
      } else {
        setSnackbarMessage(response.data.message || 'Booking failed.');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error('Error booking train:', error);
      setSnackbarMessage('An error occurred while booking. Please try again.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Train List</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Autocomplete
            freeSolo
            options={sourceOptions}
            onInputChange={(event, value) => setSource(value)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Source"
                value={source}
                fullWidth
                variant="outlined"
                style={{ marginBottom: 16 }}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Autocomplete
            freeSolo
            options={destinationOptions}
            onInputChange={(event, value) => setDestination(value)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Destination"
                value={destination}
                fullWidth
                variant="outlined"
                style={{ marginBottom: 16 }}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} md={4} align="center">
          <Button
            variant="contained"
            color="primary"
            onClick={filterTrains}
            fullWidth
            style={{ height: '80%', marginBottom: 16 }}
          >
            Search Trains
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        {loading ? (
          <>
            {[...Array(6)].map((_, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Box sx={{ width: '100%', p: 2 }}>
                  <Skeleton variant="rectangular" height={200} animation="wave" />
                  <Skeleton variant="text" animation="wave" />
                  <Skeleton variant="text" animation="wave" />
                </Box>
              </Grid>
            ))}
          </>
        ) : (
          trains.map((train) => (
            <Grid item xs={12} sm={6} md={4} key={train._id}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>{train.name}</Typography>
                  <Typography>{train.source} to {train.destination}</Typography>
                  <Typography>Available Seats: {train.available_seats}</Typography>
                  <Typography>Seat Capacity: {train.seat_capacity}</Typography>
                </CardContent>
                <CardActions>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleBookSeat(train._id)}
                    disabled={train.available_seats === 0}
                    fullWidth
                  >
                    Book
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default TrainList;
