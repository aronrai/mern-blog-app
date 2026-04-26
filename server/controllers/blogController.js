const Blog = require("../models/blog");
const blogSchema = require("../validations/blogSchema");
const cloudinary = require("../config/cloudinary");
const CustomError = require("../utils/customError");
const fs = require("fs");

// create
const createBlog = async (req, res, next) => {
  try {
    if (req.body.tags || typeof req.body.tags === "string") {
      req.body.tags = req.body.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0);
    }
    const { error, value } = blogSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });
    if (error) {
      const message = error.details.map((err) => err.message).join(", ");
      return next(new CustomError(message, 400));
    }
    if (!req.file) {
      return next(new CustomError("A cover image is required.", 400));
    }
    const cloudinaryResult = await cloudinary.uploader.upload(req.file.path, {
      folder: "blog_images",
    });
    const blog = await Blog.create({
      ...value,
      imageUrl: cloudinaryResult.secure_url,
      imageId: cloudinaryResult.public_id,
      authorId: req.userId,
    });
    return res.status(201).json({
      success: true,
      message: "Blog published successfully!",
      blog,
    });
  } catch (err) {
    next(err);
  } finally {
    if (req.file && req.file.path) {
      await fs.promises
        .unlink(req.file.path)
        .catch(() => console.error("Error deleting local temporary file"));
    }
  }
};

// read
const getAllBlogs = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const blogs = await Blog.find()
      .sort({ createdAt: -1 })
      .populate("authorId", "name email")
      .skip((page - 1) * 10)
      .limit(11);
    const hasMore = blogs.length > 10;
    if (hasMore) {
      blogs.pop();
    }
    res.status(200).json({
      success: true,
      blogCount: blogs.length,
      hasMore,
      data: blogs,
    });
  } catch (err) {
    next(err);
  }
};

const getMyBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find({ authorId: req.userId })
      .sort({ createdAt: -1 })
      .populate("authorId", "name email");
    res.status(200).json({
      success: true,
      blogCount: blogs.length,
      data: blogs,
    });
  } catch (err) {
    next(err);
  }
};

const getBlog = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const blog = await Blog.findOne({ slug }).populate(
      "authorId",
      "name email",
    );
    if (!blog) {
      return next(new CustomError("Blog not found", 404));
    }
    res.json({
      success: true,
      data: blog,
    });
  } catch (err) {
    next(err);
  }
};

// update
const updateBlog = async (req, res, next) => {
  try {
    const { id } = req.params;
    const oldBlog = await Blog.findById(id);
    if (!oldBlog) {
      return next(new CustomError("Failed to update, blog doesn't exist", 404));
    }
    if (oldBlog.authorId.toString() !== req.userId) {
      return next(
        new CustomError("You are not authorized to edit this blog.", 403),
      );
    }
    const { title, content, tags } = req.body;
    let parsedTags = oldBlog.tags;
    if (tags && typeof tags === "string") {
      parsedTags = tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0);
    }
    const { error, value } = blogSchema.validate(
      {
        title: title || oldBlog.title,
        content: content || oldBlog.content,
        tags: parsedTags,
      },
      { abortEarly: false, stripUnknown: true },
    );
    let newImageUrl = oldBlog.imageUrl;
    let newImageId = oldBlog.imageId;
    let cloudinaryResult = null;
    if (req.file) {
      cloudinaryResult = await cloudinary.uploader.upload(req.file.path, {
        folder: "blog_images",
      });
      newImageUrl = cloudinaryResult.secure_url;
      newImageId = cloudinaryResult.public_id;
    }
    if (error) {
      if (cloudinaryResult) {
        await cloudinary.uploader.destroy(cloudinaryResult.public_id);
      }
      const message = error.details.map((err) => err.message).join(", ");
      return next(new CustomError(message, 400));
    }
    if (cloudinaryResult && oldBlog.imageId) {
      await cloudinary.uploader.destroy(oldBlog.imageId);
    }
    oldBlog.title = value.title;
    oldBlog.content = value.content;
    oldBlog.tags = value.tags;
    oldBlog.imageUrl = newImageUrl;
    oldBlog.imageId = newImageId;

    await oldBlog.save();
    res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      data: oldBlog,
    });
  } catch (err) {
    next(err);
  } finally {
    if (req.file && req.file.path) {
      await fs.promises
        .unlink(req.file.path)
        .catch((err) =>
          console.error("Error deleting local file:", err.message),
        );
    }
  }
};

// delete
const deleteBlog = async (req, res, next) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);
    if (!blog) {
      return next(new CustomError("Failed to delete, blog doesn't exist", 404));
    }
    if (blog.authorId.toString() !== req.userId) {
      return next(
        new CustomError("You are not authorized to delete this blog.", 403),
      );
    }
    if (blog.imageId) {
      await cloudinary.uploader.destroy(blog.imageId);
    }
    await Blog.findByIdAndDelete(id);
    res.json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createBlog,
  getAllBlogs,
  getMyBlogs,
  getBlog,
  updateBlog,
  deleteBlog,
};
