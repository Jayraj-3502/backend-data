import express from "express";
import dotenv from "dotenv";
import databaseConnection from "./config/db.js";
import userRoute from "./routes/user.route.js";

dotenv.config();

export const app = express();
app.use(express.json());
databaseConnection();

app.use("/", userRoute);
