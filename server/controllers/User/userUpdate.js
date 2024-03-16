import createErrors from "../../Error/createErrors.js";
import User from "../../models/User.js";
import vine, { errors } from "@vinejs/vine";
import { UserUpdateSchema } from "../../Vine/VineSchema.js";
const userUpdate = async (req, res, next) => {
  try {
    const data = {
      ...req.body,
    };
    const validator = vine.compile(UserUpdateSchema);
    const output = await validator.validate(data);

    const updateUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        $set: {
          ...output,
        },
      },
      {
        new: true,
      }
    );
    console.group("yes");
    return res.status(200).json({
      success: true,
      updateUser,
      message: "data update successfully",
    });
  } catch (err) {
    return next(err);
  }
};
export default userUpdate;
