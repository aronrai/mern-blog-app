const Joi = require("joi");

const emailRule = Joi.string().trim().email().lowercase().required().messages({
  "string.base": "Email must be a type of text",
  "string.empty": "Email cannot be empty",
  "string.email": "Please provide a valid email address",
  "any.required": "Email is a required field",
});

const passwordRule = Joi.string()
  .trim()
  .min(8)
  .pattern(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%&*])[a-zA-Z0-9@#$%&*]{8,}$/,
  )
  .required()
  .messages({
    "string.empty": "Password cannot be empty",
    "string.min": "Password must be at least {#limit} characters long",
    "string.pattern.base":
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (@, #, $, %, &, *)",
    "any.required": "Password is a required field",
  });

const signUpSchema = Joi.object({
  name: Joi.string().trim().min(3).max(30).required().messages({
    "string.empty": "Name cannot be empty",
    "string.min": "Name must be at least {#limit} characters long",
    "string.max": "Name cannot exceed {#limit} characters",
    "any.required": "Name is a required field",
  }),
  email: emailRule,
  password: passwordRule,
  confirmPassword: Joi.string()
    .trim()
    .valid(Joi.ref("password"))
    .required()
    .messages({
      "any.only": "Passwords do not match",
      "any.required": "Please confirm your password",
    }),
});

const loginSchema = Joi.object({
  email: emailRule,
  password: passwordRule,
});

module.exports = {
  signUpSchema,
  loginSchema,
};
