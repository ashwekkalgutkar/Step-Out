import React, { useState } from 'react';
import { Container, Typography, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';

const AdminPage = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://step-out-1.onrender.com/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Admin Dashboard</Typography>
      <button onClick={fetchUsers}>Fetch Users</button>
      <List>
        {users.map((user) => (
          <ListItem key={user._id}>
            <ListItemText primary={`Username: ${user.username}`} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default AdminPage;
