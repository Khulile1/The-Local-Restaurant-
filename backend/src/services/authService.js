// Import bcrypt to hash passwords and compare passwords safely
const bcrypt = require("bcrypt");

// Import jsonwebtoken to create JWT tokens for logged-in users
const jwt = require("jsonwebtoken");

// Number of salt rounds used when hashing passwords
// Higher rounds = stronger security, but slower hashing
const SALT_ROUNDS = 10;

// Hash the user's plain password before saving it to the database
const hashPassword = async (plainPassword) => {
  return bcrypt.hash(plainPassword, SALT_ROUNDS);
};

// Compare the plain password from login with the hashed password stored in the database
const comparePassword = async (plainPassword, hashedPassword) => {
  return bcrypt.compare(plainPassword, hashedPassword);
};

// Generate a JWT token for the logged-in user
const generateToken = (user) => {
  return jwt.sign(
    {
      // Data stored inside the token
      id: user.id,
      email: user.email,
      role: user.role,
    },
    // Secret key used to sign and verify the token
    process.env.JWT_SECRET,
    {
      // Token expiry time
      // If JWT_EXPIRES_IN is not set in .env, it will default to 7 days
      expiresIn: process.env.JWT_EXPIRES_IN || "2h",
    }
  );
};

// Export the auth service functions so controllers can use them
module.exports = {
  hashPassword,
  comparePassword,
  generateToken,
};