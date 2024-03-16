import User from "../../models/User.js";
const getAuthUserData = async (req, res, next) => {
  try {
    const user = await User.findOne({
      _id: req.user._id,
    });
    return res.status(200).json({
      user,
    });
  } catch (err) {
    return next(err);
  }
};
export default getAuthUserData;
