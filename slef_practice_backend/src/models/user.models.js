import mongoose from "mongoose";
import Joi from "joi";

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    min: [6, "Minimum username length is 6 characters"],
    max: [24, "Max username length is 24 characters"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    min: [6, "Password minimum length is 6 characters"],
  },
});

export const User = mongoose.model("User", userSchema);
