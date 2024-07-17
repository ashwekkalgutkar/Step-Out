import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Snackbar, Alert, CircularProgress, Box } from '@mui/material';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await axios.post('https://step-out-1.onrender.com/api/users/login', formData);
      login(response.data.token);
      setSnackbarOpen(true);
      setTimeout(() => {
        setLoading(false);
        navigate('/trains');
      }, 2000);
    } catch (error) {
      setError(error.response?.data?.message || 'An unexpected error occurred. Please try again.');
      setSnackbarOpen(true);
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Login</Typography>
      <form onSubmit={handleSubmit}>
        <TextField label="Username or Email" name="username" value={formData.username} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Password" name="password" type="password" value={formData.password} onChange={handleChange} fullWidth margin="normal" />
        <Box sx={{ m: 1, position: 'relative' }}>
          <Button type="submit" variant="contained" color="primary" disabled={loading} fullWidth>
            Login
          </Button>
          {loading && <CircularProgress size={24} sx={{ position: 'absolute', top: '50%', left: '50%', marginTop: '-12px', marginLeft: '-12px' }} />}
        </Box>
      </form>
      <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={error ? "error" : "success"}>
          {error ? error : "Login successful! Redirecting to trains..."}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Login;
