// Function that has access to the
// request and response cycle + objects

// Every time we hit an endpoint
// Check to see if there's token in header

const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    // Pull out the payload on the token
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    // Set user in payload to req.user so we'll have access inside route
    req.user = decoded.user;
    next();
  } catch (err) {
    // 401 error is unauth
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
