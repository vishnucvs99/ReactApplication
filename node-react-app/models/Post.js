const sql = require('mssql');
const config = require('../config/dbConfig');

class Post {
  // Ensure the Posts table exists or create it
  static async createTable() {
    try {
      const pool = await sql.connect(config);
      await pool.request().query(`
        IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Posts')
        BEGIN
          CREATE TABLE Posts (
            id INT PRIMARY KEY IDENTITY(1,1), -- Auto-incrementing primary key
            userId INT NOT NULL,
            title VARCHAR(255) NOT NULL,
            body TEXT
          );
        END
      `);
      console.log("Posts table ensured in database.");
    } catch (error) {
      throw new Error('Error creating Posts table: ' + error.message);
    }
  }

  // Get all posts
  static async getAllPosts() {
    try {
      const pool = await sql.connect(config);
      const result = await pool.request().query('SELECT * FROM Posts');
      return result.recordset; // Return the posts as an array
    } catch (error) {
      throw new Error('Error fetching posts: ' + error.message);
    }
  }

  // Get a post by ID
  static async getPostById(id) {
    try {
      const pool = await sql.connect(config);
      const result = await pool.request()
        .input('id', sql.Int, id)
        .query('SELECT * FROM Posts WHERE id = @id');
      
      return result.recordset.length > 0 ? result.recordset[0] : null;
    } catch (error) {
      throw new Error('Error fetching post: ' + error.message);
    }
  }

  // Create a new post
  static async createPost(postData) {
    try {
      const pool = await sql.connect(config);
      const result = await pool.request()
        .input('userId', sql.Int, postData.userId)
        .input('title', sql.VarChar(255), postData.title)
        .input('body', sql.Text, postData.body)
        .query('INSERT INTO Posts (userId, title, body) VALUES (@userId, @title, @body); SELECT SCOPE_IDENTITY() AS id');
      
      return result.recordset[0].id; // Return the new post ID
    } catch (error) {
      throw new Error('Error creating post: ' + error.message);
    }
  }

  // Update an existing post
  static async updatePost(id, postData) {
    try {
      const pool = await sql.connect(config);
      await pool.request()
        .input('id', sql.Int, id)
        .input('title', sql.VarChar(255), postData.title)
        .input('body', sql.Text, postData.body)
        .query('UPDATE Posts SET title = @title, body = @body WHERE id = @id');
      
      return true;
    } catch (error) {
      throw new Error('Error updating post: ' + error.message);
    }
  }

  // Delete a post
  static async deletePost(id) {
    try {
      const pool = await sql.connect(config);
      await pool.request()
        .input('id', sql.Int, id)
        .query('DELETE FROM Posts WHERE id = @id');
      
      return true;
    } catch (error) {
      throw new Error('Error deleting post: ' + error.message);
    }
  }
}

// Initialize the table creation
(async () => {
  try {
    await Post.createTable(); // Ensure the Posts table is created when the module is loaded
  } catch (error) {
    console.error(error.message);
  }
})();

module.exports = Post;
