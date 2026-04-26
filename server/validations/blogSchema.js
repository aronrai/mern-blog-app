const Joi = require("joi");

const blogSchema = Joi.object({
  title: Joi.string().trim().min(3).max(150).required().messages({
    "string.base": "Title must be text",
    "string.empty": "Title cannot be empty",
    "string.min": "Title must be at least {#limit} characters long",
    "string.max": "Title cannot exceed {#limit} characters",
    "any.required": "Title is a required field",
  }),

  content: Joi.string().trim().min(10).max(50000).required().messages({
    "string.base": "Content must be text",
    "string.empty": "Content cannot be empty",
    "string.min": "Content must be at least {#limit} characters long",
    "string.max": "Content cannot exceed {#limit} characters",
    "any.required": "Content is a required field",
  }),

  tags: Joi.array()
    .items(
      Joi.string().trim().min(2).max(30).lowercase().messages({
        "string.base": "Each tag must be text",
        "string.empty": "Tags cannot be empty",
        "string.min": "Each tag must be at least {#limit} characters long",
        "string.max": "Each tag cannot exceed {#limit} characters",
      }),
    )
    .max(2)
    .default(["general"])
    .messages({
      "array.base": "Tags must be formatted as a list",
      "array.max": "You cannot add more than {#limit} tags",
    }),
});

module.exports = blogSchema;
