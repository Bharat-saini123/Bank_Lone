import dotenv from "dotenv";
dotenv.config({
  path: "../../.env",
});
import createErrors from "../../Error/createErrors.js";
import logger from "../../Logger/Logger.js";
import User from "../../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const Login = async (req, res, next) => {
  try {
    if (!req.body.email || !req.body.password)
      return res
        .status(420)
        .json(createErrors(420, "all field are required", false));
    const user = await User.findOne({
      email: req.body.email,
    });
    if (!user)
      return res
        .status(404)
        .json(createErrors(404, "invalid credentials", false));

    const checkPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!checkPassword)
      return res
        .status(402)
        .json(createErrors(402, "invalid credentials", false));
    logger.info(`user login whose email is ${user.username} `);
    const token = await jwt.sign(
      { _id: user._id },
      process.env.TOKEN_SECRET_KEY
    );
    return res.status(200).json({
      success: true,
      message: "user login successfully",
      user,
      token,
    });
  } catch (err) {
    return next(err);
  }
};
export default Login;
