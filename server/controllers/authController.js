const User = require("../models/user");
const CustomError = require("../utils/customError");
const { signUpSchema, loginSchema } = require("../validations/authSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

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
      return next(new CustomError("Email is already registered.", 400));
    }
    const user = await User.create({
      name,
      email,
      password,
    });
    res.status(201).json({
      success: true,
      message: "Account created successfully.",
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

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
      message: "Logged in successfully.",
      data: userData,
      token,
    });
  } catch (err) {
    next(err);
  }
};

const getMe = async (req, res, next) => {
  try {
    const id = req.userId;
    const user = await User.findById(id).select("-password -__v");
    if (!user) {
      return next(new CustomError("User not found.", 404));
    }
    res.json({
      success: true,
      data: user,
    });
  } catch (err) {
    next(err);
  }
};
