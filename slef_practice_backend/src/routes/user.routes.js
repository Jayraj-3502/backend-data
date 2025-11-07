import express from "express";
import {
  getAllUsersData,
  registerNewUser,
  getUserById,
  deleteUserById,
  updateUserData,
  loginUser,
} from "../controllers/user.controllers.js";

// import { userRegistrationValidationSchema } from "../models/user.models.js";
// import { registerMiddleware } from "../middleware/register.middleware.js";

const userRoutes = express.Router();

userRoutes.route("/users").get(getAllUsersData);
userRoutes.route("/register").post(registerNewUser);
userRoutes.route("/login").post(loginUser);
userRoutes
  .route("/user/:id")
  .get(getUserById)
  .delete(deleteUserById)
  .put(updateUserData);

export default userRoutes;
