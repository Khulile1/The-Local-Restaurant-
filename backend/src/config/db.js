// Import mongoose so we can connect the backend to MongoDB
const mongoose = require("mongoose");

// Function responsible for connecting to the MongoDB database
const connectDB = async () => {
  // async is used because connecting to the database takes time
  try {
    // Get the MongoDB connection string from the .env file
    const mongoUri = process.env.MONGO_URI;

    // Check if the MONGO_URI exists
    // If it is missing, stop the connection process and show an error
    if (!mongoUri) {
      throw new Error("MONGO_URI is missing in .env file");
    }

    // Connect to MongoDB using the connection string
    await mongoose.connect(mongoUri);

    // This runs only if the connection is successful
    console.log("MongoDB connected");
  } catch (error) {
    // This catches any database connection error
    console.error("MongoDB connection failed:", error.message);

    // Stop the server if the database connection fails
    // 1 means the app exited because of an error
    process.exit(1);
  }
};

// Export connectDB so it can be used in server.js or app.js
module.exports = connectDB;