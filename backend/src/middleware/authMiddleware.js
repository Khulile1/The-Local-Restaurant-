// Import jsonwebtoken so we can verify JWT tokens
const jwt = require("jsonwebtoken");

// Middleware to protect routes that require a logged-in user
const authMiddleware = (req, res, next) => {
  // Get the Authorization header from the request
  // Example: Authorization: Bearer eyJhbGciOiJIUzI1...
  const authHeader = req.headers.authorization;

  // Check if the Authorization header exists and starts with "Bearer "
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      // 401 means Unauthorized because no valid token was provided
      message: "Access denied. No token provided.",
    });
  }

  // Extract the token from the Authorization header
  // split(" ") changes "Bearer tokenHere" into ["Bearer", "tokenHere"]
  // [1] gets the actual token
  const token = authHeader.split(" ")[1];

  try {
    // Verify the token using the same secret used when creating it
    // If the token is valid, decoded will contain the user data from the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Store the logged-in user's details on req.user
    // This allows the next controller or middleware to know who made the request
    req.user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
    };

    // Move to the next middleware or controller
    next();
  } catch (error) {
    // If the token is invalid, expired, or changed, reject the request
    return res.status(401).json({
      // 401 means Unauthorized
      message: "Invalid or expired token.",
    });
  }
};

// Export the middleware so it can be used to protect routes
module.exports = authMiddleware;