import express from "express";
import {
  getAllProductDetails,
  createNewProduct,
  getProductById,
  deleteProductById,
  updateProductById,
} from "../controllers/product.controllers.js";
import productMiddleware from "../middleware/product.middleware.js";
import { productValidationSchema } from "../models/product.models.js";

const productRoutes = express.Router();

productRoutes
  .route("/")
  .get(getAllProductDetails)
  .post(productMiddleware(productValidationSchema), createNewProduct);

productRoutes
  .route("/:id")
  .get(getProductById)
  .delete(deleteProductById)
  .put(updateProductById);

export default productRoutes;
