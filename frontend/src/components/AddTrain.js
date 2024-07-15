import React, { useState } from 'react';
import axios from 'axios';

const AddTrain = () => {
  const [formData, setFormData] = useState({
    train_number: '',
    name: '',
    source: '',
    destination: '',
    departure_time: '', 
    seat_capacity: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/trains/addTrain', formData);
      alert('Train successfully added');
    } catch (error) {
      console.error(error);
      alert('Error adding train');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="train_number"
        placeholder="Train Number"
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="name"
        placeholder="Train Name"
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="source"
        placeholder="Source"
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="destination"
        placeholder="Destination"
        onChange={handleChange}
        required
      />
      <input
        type="datetime-local"
        name="departure_time" 
        placeholder="Departure Time"
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="seat_capacity"
        placeholder="Seat Capacity"
        onChange={handleChange}
        required
      />
      <button type="submit">Add Train</button>
    </form>
  );
};

export default AddTrain;
