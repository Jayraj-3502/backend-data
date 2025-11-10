import mongoose from "mongoose";
import { app } from "../app.js";

const databaseConnection = async () => {
  const PORT = process.env.PORT || 8000;
  try {
    mongoose
      .connect(process.env.MONGO_URI)
      .then(
        app.listen(PORT, () => {
          console.log("Database is connected");
          console.log(`Server is running on PORT: http://localhost:${PORT}`);
        })
      )
      .catch((err) => {
        console.log("Database connection error: ", err);
      });
  } catch (err) {
    console.log("MONGODB Connection Error: ", err);
  }
};

export default databaseConnection;
