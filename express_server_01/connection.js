import mongoose from "mongoose";

async function connectMongoDb() {
  return mongoose
    .connect(process.env.MONGO_URI)
    .then(console.log("Database is Connected"))
    .catch((err) => {
      console.log(err);
    });
}

export default connectMongoDb;
