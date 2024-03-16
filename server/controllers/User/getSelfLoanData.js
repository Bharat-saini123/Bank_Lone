import CommonLoan from "../../models/CommonLoan.js";
import createErrors from "../../Error/createErrors.js";

const getSelfLoanData = async (req, res, next) => {
  try {
    const loanData = await CommonLoan.find({
      userType: req.body.userType,
      userId:req.user._id,
    });
    if (!loanData) return res.json(createErrors(400, "data not found", false));
    return res.status(200).json({
      success: true,
      loanData,
      message: "successfully get self loan",
    });
  } catch (err) {
    return next(err);
  }
};
export default getSelfLoanData;
