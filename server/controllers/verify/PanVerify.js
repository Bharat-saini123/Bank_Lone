import dotenv from "dotenv";
dotenv.config({
  path: "../../.env",
});
import axios from "axios";
import createErrors from "../../Error/createErrors.js";
import CommonLoan from "../../models/CommonLoan.js";
import bcrypt from "bcrypt";
const PanVerify = async (req, res, next) => {
  console.log(req.body);
  try {
    let {
      username,
      panNumber,
      adhaarNumber,
      dob,
      netMonthlyIncome,
      communicationAddress,
      loanAmount,
      tensure,
      userType,
    } = req.body;

    if (
      !username ||
      !panNumber ||
      !adhaarNumber ||
      !dob ||
      !netMonthlyIncome ||
      !communicationAddress ||
      !loanAmount ||
      !tensure
    )
      return res.json(createErrors(404, "all fields are required", false));
    const client_id = process.env.PAN_CLIENT_ID;
    const requestData = {
      headers: {
        client_code: client_id,
        sub_client_code: client_id,
        channel_code: process.env.CHANNEL_CODE,
        channel_version: "",
        stan: "55",
        client_ip: "",
        transmission_datetime: process.env.TRANSMISSION_DATE_TIME,
        operation_mode: "SELF",
        run_mode: "DEFAULT",
        actor_type: "DEFAULT",
        user_handle_type: "EMAIL",
        user_handle_value: process.env.PAN_USER_HANDLE_VALUE,
        location: "NA",
        function_code: "VERIFY_PAN",
        function_sub_code: "NUMBER",
      },
      request: {
        pan_details: {
          pan_number: panNumber,
          name: "",
          dob: "",
          pan_type: "",
          document: "",
        },
        consent: "YES",
        consent_message: "Success",
      },
    };

    const response = await axios.post(
      "https://sandbox.veri5digital.com/verification-service/api/2.0/verifyUserIdDoc",
      requestData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = response.data;
    console.log(data);
    const VerificationStatus = data.verification_status;
    const responseStatus = data.response_status;
    const fullName = data.full_name;
    const verifyData = data.verified_data;
    const verificationMethod = data.verification_method;
    if (fullName.toLowerCase() !== username.toLowerCase())
      return res.json({
        success: false,
        message: "invalid credentials",
      });
    const loanUser = await new CommonLoan({
      userId: req.user._id,
      username,
      dob,
      netMonthlyIncome,
      communicationAddress,
      loanAmount,
      tensure,
      userType,
    });
    await loanUser.save();
    return res.status(200).json({
      success: true,
      VerificationStatus,
      responseStatus,
      fullName,
      verifyData,
      verificationMethod,
    });
  } catch (err) {
    console.log(err);
    return res.json(createErrors(err));
  }
};
export default PanVerify;
