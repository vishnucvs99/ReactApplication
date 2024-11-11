const express = require('express');
const {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost
} = require('../controllers/postController');
const authenticateToken = require('../middleware/authMiddleware'); // Authentication middleware

const router = express.Router();

// Public routes (can be accessed without authentication)
router.get('/posts', getAllPosts);           // Get all posts
router.get('/posts/:id', getPostById);       // Get a single post by ID

// Protected routes (require JWT token)
router.post('/posts', authenticateToken, createPost);  // Create a new post
router.put('/posts/:id', authenticateToken, updatePost); // Update a post by ID
router.delete('/posts/:id', authenticateToken, deletePost); // Delete a post by ID

module.exports = router;
