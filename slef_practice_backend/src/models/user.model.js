import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
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
    phone: { type: String },
    role: {
      type: String,
      enum: ["admin", "user", "seller"],
      default: "user",
    },
    cart: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, default: 1 },
      },
    ],
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
