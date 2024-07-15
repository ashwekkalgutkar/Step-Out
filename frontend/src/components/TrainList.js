import React, { useState } from 'react';
import axios from 'axios';

const TrainList = () => {
  const [trains, setTrains] = useState([]);
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');

  const fetchTrains = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/trains', {
        params: { source, destination },
      });
      setTrains(response.data);
    } catch (err) {
      console.error('Error fetching trains:', err);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Train List</h2>
      <div className="mb-4">
        <label className="block text-gray-700">Source</label>
        <input
          type="text"
          value={source}
          onChange={(e) => setSource(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Destination</label>
        <input
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <button onClick={fetchTrains} className="w-full p-2 bg-blue-500 text-white rounded">
        Search Trains
      </button>
      <ul className="mt-4">
        {trains.map((train) => (
          <li key={train._id} className="border p-2 mb-2">
            <p>{train.name}</p>
            <p>{train.source} to {train.destination}</p>
            <p>{train.available_seats} seats available</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrainList;
