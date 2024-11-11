// src/components/LoginPage.js
import React, { useState } from 'react';
import { loginUser } from '../api';
import { useNavigate } from 'react-router-dom'; // useNavigate hook for redirecting
import './LoginPage.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Create navigate function

  const handleLogin = async () => {
    try {
      const response = await loginUser(username, password);
      localStorage.setItem('token', response.data.token); // Store token
      alert('Login successful');
      
      // Redirect to PostManager after successful login
      navigate('/postmanager');
    } catch (error) {
      alert('Login failed: ' + error.response.data.message);
    }
  };

  return (
    <div className="login-page">
      <h2>Login</h2>
      <input 
        type="text" 
        placeholder="Username" 
        onChange={(e) => setUsername(e.target.value)} 
      />
      <input 
        type="password" 
        placeholder="Password" 
        onChange={(e) => setPassword(e.target.value)} 
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginPage;
