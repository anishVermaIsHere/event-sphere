import Joi from "joi";

export const loginSchema = Joi.object({
  email: Joi.string().email({ tlds: false }).message({
    "any.required": "Email is required.",
    "string.empty": "Email must not be empty.",
  }),
  password: Joi.string()
    .min(8)
    .max(16)
    .required()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .messages({
      "string.base": "Password should be a string.",
      "string.empty": "Password is required.",
      "string.min": "Password should have at least 8 characters.",
      "string.max": "Password should not exceed 16 characters.",
      "any.required": "Password is required.",
      "string.pattern.base": "Password must contain only letters and numbers.",
    }),
});

export const eventSchema = Joi.object({
  name: Joi.string().min(5).max(100).required().messages({
    "any.required": "Event name is required.",
    "string.empty": "Event name must not be empty.",
  }),
  description: Joi.string().min(2).max(200).required().messages({
    "any.required": "Event description is required.",
    "string.empty": "Event description must not be empty.",
    "string.max": "Event description limit exceeded (max 200 characters are allowed).",
  }),
  location: Joi.string().required().messages({
    "any.required": "Location are required for the event.",
  }),
  category: Joi.string().required().messages({
    "any.required": "Category are required for the event.",
  }),
  guests: Joi.array().items(Joi.string()).min(1).max(20).required().messages({
    "any.required": "Guests are required for the event.",
    "array.min": "At least one guest must be selected.",
    "array.max": "Maximum of 20 guests allowed.",
  }),
  startTime: Joi.date().iso().required(),
  endTime: Joi.date().iso().min(Joi.ref('startTime')).required()
});
