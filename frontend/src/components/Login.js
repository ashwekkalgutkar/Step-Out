// src/components/Login.js
import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Alert } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');  // Clear any previous errors
    try {
      const response = await axios.post('http://localhost:8000/api/users/login', formData);
      // Assuming your backend sends a token upon successful login
      localStorage.setItem('token', response.data.token); // Store token in localStorage or context
      navigate('/'); // Redirect to home page or dashboard
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Login</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <form onSubmit={handleSubmit}>
        <TextField label="Username or Email" name="username" value={formData.username} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Password" name="password" type="password" value={formData.password} onChange={handleChange} fullWidth margin="normal" />
        <Button type="submit" variant="contained" color="primary">Login</Button>
      </form>
    </Container>
  );
};

export default Login;