import mongoose from "mongoose";
const Schema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      trim:true
    },
    salarySlip: {
      type: String,
      required: true,
      trim:true
    },
    bankStatements: {
      type: String,
      required: true,
      trim:true
    },
    incomeTaxReturn: {
      type: String,
      required: true,
      trim:true
    },
    referenceName: {
      type: String,
      required: true,
      trim:true
    },
    referenceMobileNumber: {
      type: String,
      required: true,
      trim:true
    },
    accountNumber: {
      type: String,
      required: true,
      trim:true
    },
    ifscCode: {
      type: String,
      required: true,
      trim:true
    },
    panUpload: {
      type: String,
      required: true,
      trim:true
    },
    adhaarFront: {
      type: String,
      required: true,
      trim:true
    },
    adhaarBack: {
      type: String,
      required: true,
      trim:true
    },
  },
  {
    timestamps: true,
  }
);

const SalaryLoan = new mongoose.model("SalaryLoan", Schema);
export default SalaryLoan;
