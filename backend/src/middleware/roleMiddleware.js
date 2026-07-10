// Middleware factory used to protect routes based on user roles
// ...allowedRoles collects all roles passed into the function
// Example: roleMiddleware("admin", "restaurant")
const roleMiddleware = (...allowedRoles) => {
  // Return the actual middleware function that Express will run
  return (req, res, next) => {
    // Check if req.user exists
    // req.user is usually created by authMiddleware after verifying the JWT token
    if (!req.user) {
      return res.status(401).json({
        // 401 means Unauthorized because the user is not logged in/authenticated
        message: "Authentication required.",
      });
    }

    // Check if the logged-in user's role is inside the allowedRoles array
    // Example: allowedRoles = ["admin"]
    // req.user.role must be "admin" to continue
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        // 403 means Forbidden because the user is logged in but does not have permission
        message: "You do not have permission to access this resource.",
      });
    }

    // If the user is authenticated and has the correct role, continue to the next function
    next();
  };
};

// Export the middleware so it can be used in route files
module.exports = roleMiddleware;