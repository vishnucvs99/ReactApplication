import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PostManager.css';

const PostManager = () => {
  const [posts, setPosts] = useState([]); // State to store posts
  const [title, setTitle] = useState(''); // State for title input
  const [body, setBody] = useState(''); // State for body input
  const [userId,setuserId]=useState('');
  const [selectedPost, setSelectedPost] = useState(null); // State for selected post for editing
  // Assume you have a logged-in user with ID 1 (this can be dynamic if needed)
  const token = localStorage.getItem('token'); // Assuming token is stored in localStorage after login

  useEffect(() => {
    // Fetch all posts when the component mounts
    fetchPosts();
  }, []);

  // Function to fetch all posts
  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/posts'); // Public route for getting posts
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  // Function to create a new post
  const createPost = async () => {
    try {
      const response = await axios.post(
        'http://localhost:3000/api/posts',
        { userId, title, body }, // Include userId along with title and body
        { headers: { Authorization: `Bearer ${token}` } } // Add token to headers
      );
      alert(response.data.message);
      fetchPosts(); // Refresh the list of posts
      setTitle('');
      setBody('');
      setuserId('');
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  // Function to update an existing post
  const updatePost = async () => {
    if (!selectedPost) return;
    try {
      const response = await axios.put(
        `http://localhost:3000/api/posts/${selectedPost.id}`,
        { userId, title, body }, // Include userId in update request
        { headers: { Authorization: `Bearer ${token}` } } // Add token to headers
      );
      alert(response.data.message);
      fetchPosts(); // Refresh the list of posts
      setTitle('');
      setBody('');
      setuserId('');
      setSelectedPost(null);
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  // Function to delete a post
  const deletePost = async (postId) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/posts/${postId}`,
        { headers: { Authorization: `Bearer ${token}` } } // Add token to headers
      );
      alert(response.data.message);
      fetchPosts(); // Refresh the list of posts
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  // Handle selection of a post for editing
  const handleEdit = (post) => {
    setSelectedPost(post);
    setTitle(post.title);
    setBody(post.body);
  };

  return (
    <div>
      <h1>Post Manager</h1>

      {/* Create Post Form */}
      <div>
        <h2>Create Post</h2>
        <input
          type="text"
          placeholder="userId"
          value={userId}
          onChange={(e) => setuserId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <button onClick={createPost}>Create Post</button>
      </div>

      {/* Update Post Form */}
      {selectedPost && (
        <div>
          <h2>Edit Post</h2>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
          <button onClick={updatePost}>Update Post</button>
        </div>
      )}

      {/* Display All Posts */}
      <div>
        <h2>All Posts</h2>
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <h3>{post.title}</h3>
              <p>{post.body}</p>
              <button onClick={() => handleEdit(post)}>Edit</button>
              <button onClick={() => deletePost(post.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PostManager;
