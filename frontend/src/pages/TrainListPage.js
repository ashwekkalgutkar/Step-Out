import React, { useState, useEffect } from 'react';
import { Container, Typography, List, ListItem, ListItemText, Button, Snackbar, Alert } from '@mui/material';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const TrainListPage = () => {
  const [trains, setTrains] = useState([]);
  const { token } = useAuth();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  useEffect(() => {
    const fetchTrains = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/trains', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setTrains(response.data);
      } catch (error) {
        console.error('Error fetching trains:', error);
      }
    };

    fetchTrains();
  }, [token]);

  const handleBooking = async (trainId) => {
    try {
      const response = await axios.post('http://localhost:8000/api/bookings/book', { train_id: trainId, no_of_seats: 1 }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log('Booking response:', response.data);
      setSnackbarMessage('Booking successful!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);

    } catch (error) {
      console.error('Error booking train:', error);
      setSnackbarMessage(error.response.data.message);
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Train List</Typography>
      <List>
        {trains.map((train) => (
          <ListItem key={train._id}>
            <ListItemText
              primary={`${train.name} (${train.source} to ${train.destination})`}
              secondary={`Seats Available: ${train.available_seats}`}
            />
            <Button variant="contained" color="primary" onClick={() => handleBooking(train._id)}>Book</Button>
          </ListItem>
        ))}
      </List>
      <Snackbar 
        open={snackbarOpen} 
        autoHideDuration={6000} 
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default TrainListPage;
