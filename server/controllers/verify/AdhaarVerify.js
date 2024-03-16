import dotenv from "dotenv";
dotenv.config({
  path: "../../.env",
});
import axios from "axios";
import crypto from "crypto";
import createErrors from "../../Error/createErrors.js";
import CommonLoan from "../../models/CommonLoan.js";

let uuid;
const adhaarVerify = async (req, res) => {
  const adhaarNumber = req.body.adhaarNumber;
  const inputString = process.env.INPUT_STRING_VALUE_ADHAAR;
  const sha256Hash = crypto
    .createHash("sha256")
    .update(inputString)
    .digest("hex");

  try {
    const response = await axios.post(
      "https://sandbox.veri5digital.com/okyc-new/api/v1.0/enterAadhaar",
      {
        headers: {
          client_code: process.env.CLIENT_CODE_ADHAAR,
        },
        request: {
          aadhaar: adhaarNumber,
          hash: sha256Hash,
        },
      }
    );
    const data = response.data;
    uuid = data.response_data.uuid;
    const status = data.response_status.status;
    const message = data.response_status.message;
    console.log(data);
    return res.status(200).json({
      data,
      status,
      message,
      uuid,
    });
  } catch (error) {
    return res.json(createErrors(error.message));
  }
};

const VerifyAdhaarOtp = async (req, res) => {
  const newUuid = `${uuid}`;
  const otp = req.body.otp;
  const statusId = req.body.statusId;
console.log(req.body);
  try {
    const response = await axios.post(
      "https://sandbox.veri5digital.com/okyc-new/api/v1.0/enterOtp",
      {
        headers: {
          client_code: process.env.CLIENT_CODE_ADHAAR,
          function_code: "DEFAULT",
          function_sub_code: "DEFAULT",
        },
        request: {
          uuid: newUuid,
          otp,
        },
      }
    );
    console.log(response.data);
    if (response.data) {
      const userUpdate = await CommonLoan.findByIdAndUpdate(
        statusId,
        {
          $set: {
            adhaarStatus: "verified",
          },
        },
        {
          new: true,
        }
      );
      return res.status(200).json({
        data: response.data,
        response: response.data.response_status,
        userUpdate,
      });
    }
  } catch (error) {
    return res.json(createErrors(error.message));
  }
};

export { adhaarVerify, VerifyAdhaarOtp };
