// src/components/UpdatePage.js
import React, { useState } from 'react';
import { updateUser } from '../api';
import './UpdatePage.css';

const UpdatePage = () => {
  const [userId, setUserId] = useState('');
  const [userData, setUserData] = useState({ username: '', email: '' });

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        alert('No token found. Please log in again.');
        return;
      }
  
      await updateUser(userId, userData, token);
      alert('User updated successfully');
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Unknown error';
      if (errorMessage === "Invalid or expired token") {
        alert('Your session has expired. Please log in again.');
        // Optionally redirect to login page
        window.location.href = '/login'; 
      } else {
        alert('Update failed: ' + errorMessage);
      }
    }
  };
  
  

  return (
    <div className="update-page">
      <h2>Update User</h2>
      <input type="text" placeholder="User ID" onChange={(e) => setUserId(e.target.value)} />
      <input type="text" placeholder="New Username" onChange={(e) => setUserData({ ...userData, username: e.target.value })} />
      <input type="email" placeholder="New Email" onChange={(e) => setUserData({ ...userData, email: e.target.value })} />
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
};

export default UpdatePage;
