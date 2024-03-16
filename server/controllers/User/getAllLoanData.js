import CommonLoan from "../../models/CommonLoan.js";
const getAllLoanData = async (req, res, next) => {
  try {
    const allLoans = await CommonLoan.find({
      userId:req.user._id,
    });
    return res.status(200).json({
      message: "get all loan data",
      success: true,
      allLoans
    });
  } catch (err) {
    return next(err);
  }
};
export default getAllLoanData;
