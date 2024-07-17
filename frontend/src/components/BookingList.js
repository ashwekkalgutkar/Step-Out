import React, { useState, useEffect } from 'react';
import { Container, Typography, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const BookingList = () => {
  const [bookings, setBookings] = useState([]);
  const { token } = useAuth();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('https://step-out-1.onrender.com/api/bookings/details', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setBookings(response.data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, [token]);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Booking List</Typography>
      <List>
        {bookings.map((booking) => (
          <ListItem key={booking._id}>
            <ListItemText
              primary={`Train: ${booking.train.name} (${booking.train.source} to ${booking.train.destination})`}
              secondary={`Seats: ${booking.no_of_seats} | Seat Numbers: ${booking.seat_numbers.join(', ')}`}
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default BookingList;
