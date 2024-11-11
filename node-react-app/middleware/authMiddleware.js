const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_jwt_secret'; // Make sure this matches your secret key

const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1]; // Get token from Authorization header
  
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token.' });
    }
    
    req.user = user; // Save the decoded user information to the request object
    next(); // Proceed to the next middleware or route handler
  });
};

module.exports = authenticateToken;
