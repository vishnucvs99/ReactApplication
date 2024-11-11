const sql = require('mssql');
const config = require('../config/dbConfig');

class User {
  // Ensure the Users table exists or create it
  static async createTable() {
    try {
      const pool = await sql.connect(config);
      await pool.request().query(`
        IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Users')
        BEGIN
          CREATE TABLE Users (
            id INT PRIMARY KEY IDENTITY(1,1),
            username VARCHAR(50) NOT NULL UNIQUE,
            email VARCHAR(100) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL
          );
        END
      `);
      console.log("Users table ensured in database.");
    } catch (error) {
      throw new Error('Error creating Users table: ' + error.message);
    }
  }

  // Find a user by some field (e.g., username or email)
  static async findOne(filter) {
    const pool = await sql.connect(config);
    const whereClause = Object.keys(filter)
      .map(key => `${key} = @${key}`)
      .join(' AND ');

    const request = pool.request();
    for (const [key, value] of Object.entries(filter)) {
      request.input(key, sql.VarChar, value);
    }

    const result = await request.query(`SELECT * FROM Users WHERE ${whereClause}`);
    return result.recordset[0] || null;
  }

  // Find all users
  static async findAll() {
    const pool = await sql.connect(config);
    const result = await pool.request().query('SELECT * FROM Users');
    return result.recordset;
  }

  // Find a user by ID
  static async findById(id) {
    const pool = await sql.connect(config);
    const result = await pool.request().input('id', sql.Int, id).query('SELECT * FROM Users WHERE id = @id');
    return result.recordset[0] || null;
  }

  // Create a new user
  static async create(userData) {
    const pool = await sql.connect(config);
    const result = await pool.request()
      .input('username', sql.VarChar, userData.username)
      .input('email', sql.VarChar, userData.email)
      .input('password', sql.VarChar, userData.password)
      .query(`
        INSERT INTO Users (username, email, password) 
        VALUES (@username, @email, @password); 
        SELECT SCOPE_IDENTITY() AS id
      `);
    return result.recordset[0].id;
  }

  // Update user by ID
  static async update(id, userData) {
    const pool = await sql.connect(config);
    await pool.request()
      .input('id', sql.Int, id)
      .input('username', sql.VarChar, userData.username)
      .input('email', sql.VarChar, userData.email)
      .input('password', sql.VarChar, userData.password)
      .query('UPDATE Users SET username = @username, email = @email, password = @password WHERE id = @id');
  }

  // Delete user by ID
  static async delete(id) {
    const pool = await sql.connect(config);
    await pool.request().input('id', sql.Int, id).query('DELETE FROM Users WHERE id = @id');
  }
}

module.exports = User;
