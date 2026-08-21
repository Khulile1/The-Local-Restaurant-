// Import the User model
const User = require("../models/user");

// Import Nodemailer for sending verification emails
const nodemailer = require("nodemailer");

// Import helper functions from the auth service
const {
  hashPassword,
  comparePassword,
  generateToken,
} = require("../services/authService");


// ======================================
// EMAIL HELPER FUNCTIONS
// ======================================

// Generate a random 6-digit verification code
const generateVerificationCode = () => {
  return Math.floor(
    100000 + Math.random() * 900000
  ).toString();
};


// Send verification code to user's email
const sendVerificationEmail = async (
  email,
  verificationCode
) => {
  // Create email transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",

    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Send email
  await transporter.sendMail({
    from: process.env.EMAIL_USER,

    to: email,

    subject: "Local Bite - Verify Your Email",

    text: `
Welcome to Local Bite.

Your verification code is:

${verificationCode}

This code will expire in 10 minutes.
    `,
  });
};


// ======================================
// REGISTER CONTROLLER
// ======================================

const register = async (req, res) => {
  try {
    // Get registration details
    const {
      name,
      surname,
      email,
      password,
      role,
    } = req.body;

    // Check required fields
    if (
      !name ||
      !surname ||
      !email ||
      !password
    ) {
      return res.status(400).json({
        message:
          "Name, surname, email and password are required",
      });
    }

    // Make email lowercase
    const normalizedEmail =
      email.toLowerCase().trim();

    // Check if email already exists
    const existingUser = await User.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      return res.status(409).json({
        message:
          "An account with this email already exists",
      });
    }

    // Password requirements
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password must be at least 8 characters and contain an uppercase letter, lowercase letter, number, and special character.",
      });
    }

    // Hash password
    const hashedPassword =
      await hashPassword(password);

    // Generate email verification code
    const verificationCode =
      generateVerificationCode();

    // Code expires after 10 minutes
    const verificationCodeExpires =
      new Date(Date.now() + 10 * 60 * 1000);

    // Create user
    const user = await User.create({
      name,
      surname,
      email: normalizedEmail,
      password: hashedPassword,
      role,

      // User starts unverified
      isVerified: false,

      verificationCode,

      verificationCodeExpires,
    });

    // Send code to user's email
    await sendVerificationEmail(
      normalizedEmail,
      verificationCode
    );

    // Registration successful
    return res.status(201).json({
      message:
        "User registered successfully. Verification code sent to email.",

      user: {
        id: user._id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified,
      },
    });

  } catch (error) {
    console.error(
      "Registration error:",
      error
    );

    return res.status(500).json({
      message:
        "Server error during registration",

      error: error.message,
    });
  }
};


// ======================================
// VERIFY EMAIL CONTROLLER
// ======================================

const verifyEmail = async (req, res) => {
  try {
    const { email, code } = req.body;

    // Check required information
    if (!email || !code) {
      return res.status(400).json({
        message:
          "Email and verification code are required",
      });
    }

    // Find user
    const user = await User.findOne({
      email: email.toLowerCase().trim(),
    });

    if (!user) {
      return res.status(404).json({
        message:
          "No account found with this email",
      });
    }

    // User already verified
    if (user.isVerified) {
      return res.status(200).json({
        message:
          "Email is already verified",
      });
    }

    // Check verification code
    if (
      user.verificationCode !== code
    ) {
      return res.status(400).json({
        message:
          "Verification code is incorrect",
      });
    }

    // Check expiry
    if (
      !user.verificationCodeExpires ||
      user.verificationCodeExpires <
        new Date()
    ) {
      return res.status(400).json({
        message:
          "Verification code has expired",
      });
    }

    // Mark user as verified
    user.isVerified = true;

    // Remove verification information
    user.verificationCode = undefined;
    user.verificationCodeExpires =
      undefined;

    await user.save();

    return res.status(200).json({
      message:
        "Email verified successfully",
    });

  } catch (error) {
    console.error(
      "Verification error:",
      error
    );

    return res.status(500).json({
      message:
        "Server error during email verification",

      error: error.message,
    });
  }
};


// ======================================
// RESEND VERIFICATION CODE
// ======================================

const resendVerificationCode = async (
  req,
  res
) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "Email is required",
      });
    }

    // Find user
    const user = await User.findOne({
      email: email.toLowerCase().trim(),
    });

    if (!user) {
      return res.status(404).json({
        message:
          "No account found with this email",
      });
    }

    // Don't send another code if already verified
    if (user.isVerified) {
      return res.status(400).json({
        message:
          "This email is already verified",
      });
    }

    // Generate new code
    const verificationCode =
      generateVerificationCode();

    // New 10-minute expiry
    const verificationCodeExpires =
      new Date(Date.now() + 10 * 60 * 1000);

    // Save new code
    user.verificationCode =
      verificationCode;

    user.verificationCodeExpires =
      verificationCodeExpires;

    await user.save();

    // Send new email
    await sendVerificationEmail(
      user.email,
      verificationCode
    );

    return res.status(200).json({
      message:
        "A new verification code has been sent to your email",
    });

  } catch (error) {
    console.error(
      "Resend verification error:",
      error
    );

    return res.status(500).json({
      message:
        "Server error while resending verification code",

      error: error.message,
    });
  }
};


// ======================================
// LOGIN CONTROLLER
// ======================================

const login = async (req, res) => {
  try {
    const {
      email,
      password,
    } = req.body;

    // Check required fields
    if (!email || !password) {
      return res.status(400).json({
        message:
          "Email and password are required",
      });
    }

    // Find user
    const user = await User.findOne({
      email: email.toLowerCase().trim(),
    });

    // Wrong email
    if (!user) {
      return res.status(404).json({
        message:
          "No account found with this email",
      });
    }

    // Check password
    const isPasswordCorrect =
      await comparePassword(
        password,
        user.password
      );

    // Wrong password
    if (!isPasswordCorrect) {
      return res.status(401).json({
        message:
          "Password is incorrect",
      });
    }

    // Don't allow unverified account to login
    if (!user.isVerified) {
      return res.status(403).json({
        message:
          "Please verify your email before logging in",
      });
    }

    // Create JWT
    const token =
      generateToken(user);

    // Successful login
    return res.status(200).json({
      message: "Login successful",

      token,

      user: {
        id: user._id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified,
      },
    });

  } catch (error) {
    console.error(
      "Login error:",
      error
    );

    return res.status(500).json({
      message:
        "Server error during login",

      error: error.message,
    });
  }
};


// ======================================
// EXPORT CONTROLLERS
// ======================================

module.exports = {
  register,
  login,
  verifyEmail,
  resendVerificationCode,
};