import express from "express";
import {
  getAllUsersData,
  registerNewUser,
  getUserById,
  deleteUserById,
  updateUserData,
  loginUser,
  addToCart,
} from "../controllers/user.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const userRoutes = express.Router();

userRoutes.route("/users").get(authMiddleware, getAllUsersData);
userRoutes.route("/register").post(registerNewUser);
userRoutes.route("/login").post(loginUser);
userRoutes.route("/user/cart").put(authMiddleware, addToCart);
userRoutes
  .route("/user/:id")
  .get(authMiddleware, getUserById)
  .delete(authMiddleware, deleteUserById)
  .put(authMiddleware, updateUserData);

export default userRoutes;
