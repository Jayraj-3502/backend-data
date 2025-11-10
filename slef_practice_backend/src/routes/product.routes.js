import express from "express";
import {
  getAllProductDetails,
  createNewProduct,
  getProductById,
  deleteProductById,
  updateProductById,
  getSellerProducts,
} from "../controllers/product.controller.js";
import productMiddleware from "../middleware/product.middleware.js";
import authMiddleware from "../middleware/auth.middleware.js";

const productRoutes = express.Router();

productRoutes
  .route("/")
  .get(getAllProductDetails)
  .post(authMiddleware, createNewProduct);
productRoutes.route("/myproducts").get(authMiddleware, getSellerProducts);
productRoutes
  .route("/:id")
  .get(getProductById)
  .delete(authMiddleware, deleteProductById)
  .put(authMiddleware, updateProductById);

export default productRoutes;
