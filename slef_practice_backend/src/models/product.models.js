import Joi from "joi";
import mongoose from "mongoose";

export const productValidationSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  brand: Joi.string().required(),
  color: Joi.string(),
  price: Joi.number().min(0).required(),
  stock: Joi.number().min(0).default(0),
});

const productSchema = mongoose.Schema({
  name: {},
  description: {},
  brand: {},
  color: {},
  price: {},
  stock: {},
});

export const Product = mongoose.model("Product", productSchema);
