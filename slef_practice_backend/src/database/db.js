import mongoose from "mongoose";

async function connectMongoDb() {
  return mongoose
    .connect(process.env.MONGO_URI)
    .then(console.log("Database is connected"))
    .catch((err) => {
      console.log("Getting Errors: ", err);
    });
}

export default connectMongoDb;
