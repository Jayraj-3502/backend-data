import express from "express";
import userRouter from "./routes/user.routes.js";
import connectMongoDb from "./connection.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 4100;

const app = express();
app.use(express.json());

// Connection with mongoose
connectMongoDb();

app.use("/", userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
