import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  firstname: {
    type: String,
    required: [true, "First name is required"],
    trim: true,
    lowercase: true,
    min: [2, "Minimum 2 character long"],
  },
  lastname: {
    type: String,
    trim: true,
    lowercase: true,
    min: [2, "Minimum 2 character long"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    min: [6, "Minimum password length is 6"],
  },
  phone: {
    type: String,
  },
  // address: [addressSchema],
  //   cart: {},
  //   wishlist: {},
  //   orders: {},
});

// const addressSchema = new Schema({
//   firstname: { type: String, required: true },
//   phone: { type: String, required: true },
//   street: { type: String, required: true },
//   city: { type: String, required: true },
//   state: { type: String, required: true },
//   country: { type: String, required: true },
// });

export const User = mongoose.model("User", userSchema);
