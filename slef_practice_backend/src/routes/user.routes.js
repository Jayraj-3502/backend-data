import express from "express";

const userRoutes = express.Router();

userRoutes.route("/").get().post();
userRoutes.route("/:id").get().delete().put().patch();
