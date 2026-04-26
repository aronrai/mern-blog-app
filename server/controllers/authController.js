const User = require("../models/user");
const CustomError = require("../utils/customError");
const { signUpSchema, loginSchema } = require("../validations/authSchema");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sendVerificationEmail } = require("../utils/sendEmail");
require("dotenv").config();

// Sign Up
const signUp = async (req, res, next) => {
  try {
    const { error, value } = signUpSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });
    if (error) {
      const message = error.details.map((err) => err.message).join(", ");
      return next(new CustomError(message, 400));
    }
    const { name, email, password } = value;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(new CustomError("Email is already registered", 400));
    }
    const verificationToken = crypto.randomBytes(32).toString("hex");
    console.log(verificationToken);
    await User.create({
      name,
      email,
      password,
      verificationToken,
    });
    try {
      await sendVerificationEmail(name, email, verificationToken);
    } catch (err) {
      return next(
        new CustomError(
          "Account created, but we couldn't send the verification email. Please try again in a few minutes.",
          500,
        ),
      );
    }
    res.status(201).json({
      success: true,
      message:
        "Account created successfully. Please check your email to verify your account.",
    });
  } catch (err) {
    next(err);
  }
};

// Login
const login = async (req, res, next) => {
  try {
    const { error, value } = loginSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: false,
    });
    if (error) {
      const message = error.details.map((e) => e.message).join(", ");
      return next(new CustomError(message, 400));
    }
    const { email, password } = value;
    const user = await User.findOne({ email });
    if (!user) {
      return next(new CustomError("Invalid email or password.", 401));
    }
    if (!user.isVerified) {
      return next(
        new CustomError("Please verify your email before logging in.", 403),
      );
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return next(new CustomError("Invalid email or password.", 401));
    }
    const userData = user.toObject();
    delete userData.password;
    delete userData.__v;
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.json({
      success: true,
      message: "Logged in successfully",
      data: userData,
      token,
    });
  } catch (err) {
    next(err);
  }
};

// Get me
const getMe = async (req, res, next) => {
  try {
    const id = req.userId;
    const user = await User.findById(id).select("-password -__v");
    if (!user) {
      return next(new CustomError("User not found", 404));
    }
    res.json({
      success: true,
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

// Verify user
const verifyUser = async (req, res, next) => {
  try {
    const { verificationToken } = req.params;
    const user = await User.findOne({ verificationToken });
    if (!user) {
      return next(
        new CustomError(
          "The provided token is invalid. Please ensure you haven't modified the URL.",
          400,
        ),
      );
    }
    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();
    res.json({
      success: true,
      message: "Account verified. Please Login.",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { signUp, login, getMe, verifyUser };
