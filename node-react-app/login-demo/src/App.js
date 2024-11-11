// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import UpdatePage from './components/UpdatePage';
import DeletePage from './components/DeletePage';
import PostManager from './components/PostManager';
import './styles.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/update" element={<UpdatePage />} />
        <Route path="/delete" element={<DeletePage />} />
        <Route path="/postmanager" element={<PostManager />} />
      </Routes>
    </Router>
  );
}

export default App;
