import mongoose from "mongoose";

const Schema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      trim:true
    },
    employeeType: {
      type: String,
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
    referenceName1: {
      type: String,
      required: true,
      trim:true
    },
    referenceMobileNumber1: {
      type: String,
      required: true,
      trim:true
    },
    referenceName2: {
      type: String,
      required: true,
      trim:true
    },
    referenceMobileNumber2: {
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

const SelfLoan = new mongoose.model("SelfLoan", Schema);
export default SelfLoan;
