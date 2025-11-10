import express from "express";
import { getAllUser, registerUser } from "../controller/user.controller.js";

const userRouter = express.Router();

userRouter.route("/users").get(getAllUser);
userRouter.route("/register").post(registerUser);

export default userRouter;
