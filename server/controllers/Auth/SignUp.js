import dotenv from "dotenv";
dotenv.config({
  path: "../../.env",
});
import createErrors from "../../Error/createErrors.js";
import vine, { errors } from "@vinejs/vine";
import VineSchema from "../../Vine/VineSchema.js";
import User from "../../models/User.js";
import logger from "../../Logger/Logger.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const SignUp = async (req, res, next) => {
  try {
    const checkUser = await User.findOne({
      email: req.body.email,
    });
    if (checkUser)
      return res
        .status(423)
        .json(createErrors(423, "user email already exist", false));
    const data = {
      ...req.body,
    };

    const validator = vine.compile(VineSchema);
    const output = await validator.validate(data);
    output.password = await bcrypt.hash(output.password, 10);
    const user = await new User({
      ...output,
    });
    logger.info(` ${req.body.username} user has been created`);
    await user.save();
    const token = await jwt.sign(
      { _id: user._id },
      process.env.TOKEN_SECRET_KEY
    );
    if (!token)
      return res.status(402).json(createErrors(402, "token error", false));
    return res.status(200).json({
      success: true,
      message: "user created successfully",
      user,token
    });
  } catch (err) {
    if (err instanceof errors.E_VALIDATION_ERROR)
      return res.json(createErrors(err.messages));
    return next(err);
  }
};
export default SignUp;
