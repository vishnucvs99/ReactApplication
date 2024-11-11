const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authMiddleware'); // Import your authentication middleware
const {
  loginUser,
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} = require('../controllers/userController'); // Import controller functions

// Login route to authenticate and return JWT token
router.post('/login', loginUser);

// Get all users (protected by JWT token)
router.get('/users', authenticateToken, getAllUsers);

// Get a user by ID (protected by JWT token)
router.get('/users/:id', authenticateToken, getUserById);

// Create a new user (protected by JWT token)
router.post('/users', createUser);

// Update a user by ID (protected by JWT token)
router.put('/users/:id', authenticateToken, updateUser);

// Delete a user by ID (protected by JWT token)
router.delete('/users/:id', authenticateToken, deleteUser);

module.exports = router;
 