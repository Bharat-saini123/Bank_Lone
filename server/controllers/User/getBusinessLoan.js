import CommonLoan from "../../models/CommonLoan.js";
import createErrors from "../../Error/createErrors.js";

const getBusinessLoanData = async (req, res, next) => {
  try {
    const loanData = await CommonLoan.find({
      userType: req.body.userType,
      userId:req.user._id,
    });
    if (!loanData) return res.json(createErrors(400, "data not found", false));
    return res.status(200).json({
      success: true,
      loanData,
      message: "successfully get business loan",
    });
  } catch (err) {
    return next(err);
  }
};
export default getBusinessLoanData;
