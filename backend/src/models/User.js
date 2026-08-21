// Import mongoose so we can create a schema and model for MongoDB
const mongoose = require("mongoose");

// Create the User schema
const UserSchema = new mongoose.Schema(
  {
    // ==============================
    // NAME
    // ==============================
    name: {
      type: String,
      required: true,
      trim: true,
    },

    // ==============================
    // SURNAME
    // ==============================
    surname: {
      type: String,
      required: true,
      trim: true,
    },

    // ==============================
    // EMAIL
    // ==============================
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    // ==============================
    // PASSWORD
    // ==============================
    password: {
      // Password will be stored as a hashed string
      type: String,
      required: true,
    },

    // ==============================
    // ROLE
    // ==============================
    role: {
      type: String,

      // Allowed Local Bite roles
      enum: [
        "customer",
        "restaurant",
        "driver",
        "admin",
      ],

      default: "customer",
    },

    // ==============================
    // EMAIL VERIFICATION STATUS
    // ==============================
    isVerified: {
      // New users start as unverified
      type: Boolean,
      default: false,
    },

    // ==============================
    // VERIFICATION CODE
    // ==============================
    verificationCode: {
      // Example: "483921"
      type: String,
      default: null,
    },

    // ==============================
    // VERIFICATION CODE EXPIRY
    // ==============================
    verificationCodeExpires: {
      // Stores when the verification code expires
      type: Date,
      default: null,
    },
  },
  {
    // Automatically creates:
    // createdAt
    // updatedAt
    timestamps: true,
  }
);

// Create and export the User model
module.exports = mongoose.model(
  "User",
  UserSchema
);