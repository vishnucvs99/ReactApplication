// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles.css';

function Navbar() {
  return (
    <div className="navbar">
      <div className="navbar-links">
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <Link to="/update">Update</Link>
        <Link to="/delete">Delete</Link>
      </div>
    </div>
  );
}

export default Navbar;
