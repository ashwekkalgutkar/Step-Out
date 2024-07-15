import React from 'react';
import AddTrain from '../components/AddTrain';

const AdminPage = () => (
  <div className="min-h-screen bg-gray-100 flex items-center justify-center">
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow-md">
      <AddTrain />
    </div>
  </div>
);

export default AdminPage;