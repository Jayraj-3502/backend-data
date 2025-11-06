import mongoose from "mongoose";
import Joi from "joi";

export const userRegistrationValidationSchema = Joi.object({
  username: Joi.string().min(6).max(24).trim().required().messages({
    "string.empty": "username is required",
    "string.min": "User Name must have at least 6 characters",
    "string.max": "User Name length must be below or equal to 24",
  }),

  email: Joi.string().trim().required().messages({
    "string.empty": "email is required",
    "string.email": "Please enter a valid email address",
  }),

  password: Joi.string().min(6).required().messages({
    "string.empty": "password is required",
    "string.min": "Password must contain at least 6 characters",
  }),
});

const userSchema = new mongoose.Schema(
  {
    username: {},
    email: {},
    password: {},
  },
  {
    timestamps: true,
  }
);

export const NewUser = mongoose.model("NewUser", userSchema);
