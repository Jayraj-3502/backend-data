import express from "express";
import {
  handleGetAllUsers,
  getUserById,
  addNewUser,
  deleteUserById,
} from "../controllers/users.controller.js";

const userRouter = express.Router();

userRouter.route("/").get(handleGetAllUsers).post(addNewUser);

userRouter.route("/:id").get(getUserById).delete(deleteUserById);

export default userRouter;
