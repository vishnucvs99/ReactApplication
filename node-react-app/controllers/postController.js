const Post = require('../models/Post'); // Import Post model

// Get all posts
async function getAllPosts(req, res) {
  try {
    const posts = await Post.getAllPosts(); // Call the model method
    res.json(posts); // Return the posts as JSON
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message }); // Handle errors
  }
}

// Get a single post by ID
async function getPostById(req, res) {
  try {
    const post = await Post.getPostById(req.params.id); // Get post by ID from the model
    if (post) {
      res.json(post); // Return the post if found
    } else {
      res.status(404).json({ message: 'Post not found' }); // Handle post not found
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}

// Create a new post
async function createPost(req, res) {
  try {
    const postData = req.body; // Get post data from request body
    const postId = await Post.createPost(postData); // Call model method to create the post
    res.status(201).json({ message: 'Post created successfully', id: postId }); // Return success message with the new post ID
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}

// Update an existing post
async function updatePost(req, res) {
  try {
    const postData = req.body; // Get post data from request body
    const isUpdated = await Post.updatePost(req.params.id, postData); // Update the post by ID
    if (isUpdated) {
      res.json({ message: 'Post updated successfully' }); // Return success message
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}

// Delete a post
async function deletePost(req, res) {
  try {
    const isDeleted = await Post.deletePost(req.params.id); // Delete post by ID
    if (isDeleted) {
      res.json({ message: 'Post deleted successfully' }); // Return success message
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost
};
