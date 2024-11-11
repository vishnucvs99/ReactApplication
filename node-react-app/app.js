// app.js
const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('../node-react-app/routes/userRoutes');
const postRoutes = require('../node-react-app/routes/postRoutes');
const cors = require('cors'); 
const User = require('./models/User'); 

const app = express();
app.use(cors());
const port = 3000;

// Call the createTable method to ensure the Users table exists
(async () => {
  try {
    await User.createTable(); // Ensure the Users table is created
    console.log('Users table ensured in database');
  } catch (error) {
    console.error('Error creating Users table:', error.message);
  }
})();

app.use(bodyParser.json());
app.use('/api', userRoutes);
app.use('/api', postRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
