import express from "express";
import dotenv from "dotenv";
import userRouter from "./routes/user.routes.js";
import connectMongoDb from "./database/db.js";
import productRoutes from "./routes/product.routes.js";
import orderRoute from "./routes/order.routes.js";

dotenv.config();

const PORT = process.env.PORT || 4100;

const app = express();
app.use(express.json());

connectMongoDb();

app.use("/", userRouter);
app.use("/products", productRoutes);
app.use("/order", orderRoute);

app.listen(PORT, () => {
  console.log(`Server is rinning on PORT http://localhost:${PORT}`);
});
