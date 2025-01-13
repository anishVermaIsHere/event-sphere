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
  eventName: Joi.string().min(5).max(100).required().messages({
    "any.required": "Event name is required.",
    "string.empty": "Event name must not be empty.",
  }),
  description: Joi.string().min(2).max(200).message({
    "string.max": "Event description limit exceeded (max 200 characters).",
  }),
  location: Joi.string().min(5).max(100).required(),
  guests: Joi.array().items(Joi.string()).required(),
  startTime: Joi.date().iso().min("now").required(),
  endTime: Joi.date().iso().required(),
});
