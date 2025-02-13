import Joi from "joi";

export const loginSchema = Joi.object({
  email: Joi.string().email({ tlds: false }).messages({
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
  isPrivate: Joi.boolean().required().messages({
    "any.required": "Event type are required.",
  }),
  location: Joi.string().required().messages({
    "any.required": "Location are required for the event.",
  }),
  category: Joi.string().required().messages({
    "any.required": "Category are required for the event.",
  }),
  priceInCents: Joi.number().required().default(0).messages({
    "any.required": "Price are required for the event.",
  }),
  capacity: Joi.number().min(100).max(10000).required().messages({
    "any.required": "Seating capacity are required for the event.",
    "number.min": "At least 100 seats must be selected.",
    "number.max": "Capacity exceeded - max 10000 seats available.",
  }),
  guests: Joi.array().items(Joi.string()).when('isPrivate', {
    is: true,
    then: Joi.array().items(Joi.string()).min(1).max(20).required().messages({
      "any.required": "Guests are required for the event.",
      "array.min": "At least one guest must be selected.",
      "array.max": "Maximum of 20 guests allowed.",
    }),
    otherwise: Joi.array().items(Joi.string()) // No validation when isPrivate is false
  }),
  speakers: Joi.array().items(Joi.string()).min(1).max(5).required().messages({
    "any.required": "Speakers are required for the event.",
    "array.min": "At least one speaker must be selected.",
    "array.max": "Maximum of 5 speakers allowed.",
  }),
  startTime: Joi.date().iso().required(),
  endTime: Joi.date().iso().min(Joi.ref('startTime')).required()
});

export const inviteeSchema = Joi.object({
  email: Joi.string().email({ tlds: false }).messages({
    "any.required": "Email is required.",
    "string.empty": "Email must not be empty.",
    "string.email": "Email must be a valid ",
    "string.pattern.base": "Email must be a valid email format.",
  }),
});


export const onboardSchema = Joi.object({
  firstName: Joi.string().required().messages({
    "any.required": "First name is required.",
    "string.empty": "First name must not be empty.",
  }),
  lastName: Joi.string().required().messages({
    "any.required": "Last name is required.",
    "string.empty": "Last name must not be empty.",
  }),
  email: Joi.string().email({ tlds: false }).messages({
    "any.required": "Email is required.",
    "string.empty": "Email must not be empty.",
    "string.email": "Email must be a valid ",
    "string.pattern.base": "Email must be a valid email format.",
  }),
  userName: Joi.string().min(3).max(20).required().messages({
    "any.required": "Username is required.",
    "string.empty": "Username must not be empty.",
    "string.min": "Username should have at least 3 characters",
    "string.max": "Username should not exceed 20 characters.",
  }),
  gender: Joi.string().required().messages({
    "any.required": "Gender is required.",
    "string.empty": "Gender must not be empty.",
  }),
  dob: Joi.date().required().messages({
    "any.required": "Date of birth is required.",
    "date.base": "Date of birth must be a valid date.",
    "date.format": "Date of birth must be in ISO date format (YYYY-MM-DD).",
    "date.max": "Date of birth cannot be in the future.",
  }),
  role: Joi.string().required().messages({
    "any.required": "Role is required.",
    "string.empty": "Role must not be empty.",
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
    repeatPassword: Joi.string()
    .valid(Joi.ref("password")) // Ensure it matches the 'password' field
    .required()
    .messages({
      "string.required": "Repeat password is required.",
      "string.empty": "Repeat password is required.",
      "any.only": "Repeat password must match the password field.",
    }),
});