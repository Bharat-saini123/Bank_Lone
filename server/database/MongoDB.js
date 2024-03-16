import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});
import mongoose from "mongoose";
const Mongo = async () => {
  await mongoose
    .connect(process.env.MONGO_DB_DATABASE)
    .then(() => {
      console.log("database successfully connected");
    })
    .catch(() => {
      console.log("database not connected");
    });
};

export default Mongo;