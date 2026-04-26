const mongoose = require("mongoose");
const createSlug = require("../utils/createSlug");
const generateReadingTime = require("../utils/generateReadingTime");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, "Title is a required field"],
      minlength: [3, "Title must be at least 3 characters long"],
      maxlength: [150, "Title cannot exceed 150 characters"],
    },
    content: {
      type: String,
      trim: true,
      required: [true, "Content is a required field"],
      minlength: [10, "Content must be at least 10 characters long"],
      maxlength: [50000, "Content cannot exceed 50000 characters"],
    },
    tags: {
      type: [
        {
          type: String,
          trim: true,
          lowercase: true,
          minlength: [2, "Each tag must be at least 2 characters long"],
          maxlength: [30, "Each tag cannot exceed 30 characters"],
        },
      ],
      default: ["general"],
    },
    read: {
      type: Number,
      min: [0, "Reading time cannot be negative"],
    },
    imageUrl: {
      type: String,
      required: [true, "A cover image is required"],
    },
    imageId: {
      type: String,
      required: [true, "Image ID is required"],
    },
    slug: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
    },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Author ID is required"],
    },
  },
  {
    timestamps: true,
  },
);

blogSchema.pre("save", function () {
  if (this.isModified("title")) {
    this.slug = createSlug(this.title);
  }
  if (this.isModified("content")) {
    this.read = generateReadingTime(this.content);
  }
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
