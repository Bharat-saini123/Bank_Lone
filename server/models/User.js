import mongoose from "mongoose";
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim:true
    },
    email: {
      type: String,
      unique: true,
      trim:true
    },
    phone: {
      type: String,
      unique: true,
      trim:true
    },
    password: {
      type: String,
      trim:true
    },
    imgUrl: {
      type: String,
      trim:true
    },
  },
  {
    timestamps: true,
  }
);

const User = new mongoose.model("User", UserSchema);
export default User;
