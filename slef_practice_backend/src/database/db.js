import mongoose from "mongoose";

export async function connectMongoDb() {
  return mongoose
    .connect()
    .then(console.log("Database is connected"))
    .catch((err) => {
      console.log("Getting Errors: ", err);
    });
}
