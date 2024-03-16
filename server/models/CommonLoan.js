import mongoose from "mongoose";

const userEnum = ["salary", "business", "self"];
const Schema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
    },
    dob: {
      type: String,
      required: true,
      trim: true,
    },
    netMonthlyIncome: {
      type: String,
      required: true,
      trim: true,
    },
    communicationAddress: {
      type: String,
      required: true,
      trim: true,
    },
    loanAmount: {
      type: String,
      required: true,
      trim: true,
    },
    tensure: {
      type: String,
      required: true,
      trim: true,
    },
    userType: {
      type: String,
      enum: userEnum,
      required: true,
      trim: true,
    },
    panStatus: {
      type: String,
      default: "pending",
    },
    adhaarStatus: {
      type: String,
      default: "pending",
    },
    loanStatus: {
      type: String,
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const CommonLoan = new mongoose.model("CommonLoan", Schema);

export default CommonLoan;
