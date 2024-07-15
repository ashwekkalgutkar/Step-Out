import React, { useState } from 'react';
import { Container, Typography, TextField, Button } from '@mui/material';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const AddTrainPage = () => {
  const [formData, setFormData] = useState({ train_name: '', source: '', destination: '', available_seats: '' });
  const { token } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/trains/add', formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Add Train</Typography>
      <form onSubmit={handleSubmit}>
        <TextField label="Train Name" name="train_name" value={formData.train_name} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Source" name="source" value={formData.source} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Destination" name="destination" value={formData.destination} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Available Seats" name="available_seats" type="number" value={formData.available_seats} onChange={handleChange} fullWidth margin="normal" />
        <Button type="submit" variant="contained" color="primary">Add Train</Button>
      </form>
    </Container>
  );
};

export default AddTrainPage;
