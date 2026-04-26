const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Name is a required field"],
      minlength: [3, "Name must be at least 3 characters long"],
      maxlength: [30, "Name cannot exceed 30 characters"],
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      match: [
        /^[a-z0-9._-]+@[a-z._-]+\.[a-z]{2,}$/i,
        "Please provide a valid email address",
      ],
      required: [true, "Email is a required field"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is a required field"],
      minlength: [8, "Password must be at least 8 characters long"],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

// userSchema.index(
//   { createdAt: 1 },
//   { expireAfterSeconds: 120, partialFilterExpression: { isVerified: false } },
// );

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
