import dotenv from "dotenv";
dotenv.config({
  path: "../../.env",
});
import CommonLoan from "../../models/CommonLoan.js";
import createErrors from "../../Error/createErrors.js";
const PanInfoVerifyName = async (req, res, next) => {
  try {
    const { username, statusId } = req.body;
    if (!username||!statusId)
      return res.json(createErrors(404, "all fields are required", false));
    const user = await CommonLoan.findOne({
      userId: req.user._id,
    });
    if (user.username === username.toLowerCase().trim()) {
      const userUpdate = await CommonLoan.findByIdAndUpdate(
        statusId,
        {
          $set: {
            panStatus: "verified",
          },
        },
        {
          new: true,
        }
      );
      return res.status(200).json({
        success: true,
        message: "pan verify successfully",
        userUpdate,
      });
    } else {
      return res.json({
        success: false,
        message: "data invalid",
      });
    }
  } catch (err) {
    console.log(err);
    return res.json(createErrors(err));
  }
};
export default PanInfoVerifyName;
