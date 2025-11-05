import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, "username is required"],
    trim: true,
    unique: true,
    minlength: [6, "User Name at least have 6 characters"],
    maxlength: [24, "User name length must be bellow or equal to 24"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, "password is required"],
    minlength: [6, "Password must contain at least 6 characters"],
  },
});

export const User = mongoose.model("User", userSchema);
