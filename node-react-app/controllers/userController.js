const jwt = require('jsonwebtoken');
const User = require('../models/User');
const JWT_SECRET = 'your_jwt_secret';

// Login function to authenticate user and return JWT token
const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username, password });
    if (user) {
      const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a user by ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new user
const createUser = async (req, res) => {
  try {
    const userId = await User.create(req.body);
    res.status(201).json({ id: userId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a user
const updateUser = async (req, res) => {
  try {
    await User.update(req.params.id, req.body);
    res.json({ message: 'User updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a user
const deleteUser = async (req, res) => {
  try {
    await User.delete(req.params.id);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  loginUser,
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
