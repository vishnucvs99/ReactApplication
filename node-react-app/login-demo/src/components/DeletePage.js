// src/components/DeletePage.js
import React, { useState } from 'react';
import { deleteUser } from '../api';
import './DeletePage.css';

const DeletePage = () => {
  const [userId, setUserId] = useState('');

  const handleDelete = async () => {
    try {
      await deleteUser(userId);
      alert('User deleted successfully');
    } catch (error) {
      alert('Delete failed: ' + error.response.data.message);
    }
  };

  return (
    <div className="delete-page">
      <h2>Delete User</h2>
      <input type="text" placeholder="User ID" onChange={(e) => setUserId(e.target.value)} />
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default DeletePage;
