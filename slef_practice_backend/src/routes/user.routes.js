import express from "express";
import multer from "multer";
import {
  getAllUsersData,
  registerNewUser,
  getUserById,
  deleteUserById,
  updateUserData,
  loginUser,
  addToCart,
  verifyUserAndCreate,
  passwordForgotOtp,
  resetForgotPassword,
  verificationForgotPassword,
} from "../controllers/user.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const upload = multer({ dest: "./src/uploads" });
const userRoutes = express.Router();

userRoutes.route("/users").get(getAllUsersData);
userRoutes.route("/register").post(registerNewUser);
userRoutes.route("/otp").post(verifyUserAndCreate);
userRoutes.route("/login").post(loginUser);
userRoutes.route("/user/cart").put(authMiddleware, addToCart);
userRoutes.route("/forgotpassword").post(passwordForgotOtp);
userRoutes
  .route("/verificationforgotpassword")
  .post(verificationForgotPassword);

userRoutes.route("/resetPassword").post(resetForgotPassword);

userRoutes
  .route("/user/:id")
  .get(authMiddleware, getUserById)
  .delete(authMiddleware, deleteUserById)
  .put(authMiddleware, updateUserData);

export default userRoutes;
