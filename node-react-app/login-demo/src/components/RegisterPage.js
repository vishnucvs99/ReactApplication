// src/components/RegisterPage.js
import React, { useState } from 'react';
import { registerUser } from '../api';
import './RegisterPage.css';

const RegisterPage = () => {
  const [userData, setUserData] = useState({ username: '', email: '', password: '' });

  const handleRegister = async () => {
    try {
      await registerUser(userData);
      alert('Registration successful');
    } catch (error) {
      alert('Registration failed: ' + error.response.data.message);
    }
  };

  return (
    <div className="register-page">
      <h2>Register</h2>
      <input type="text" placeholder="Username" onChange={(e) => setUserData({ ...userData, username: e.target.value })} />
      <input type="email" placeholder="Email" onChange={(e) => setUserData({ ...userData, email: e.target.value })} />
      <input type="password" placeholder="Password" onChange={(e) => setUserData({ ...userData, password: e.target.value })} />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default RegisterPage;
