import dotenv from "dotenv";
dotenv.config({
  path: "../../.env",
});
import nodemailer from "nodemailer";
import User from "../../models/User.js";
import jwt from "jsonwebtoken";
import createErrors from "../../Error/createErrors.js";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

export const ForgotPassword = async (req, res, next) => {
  const clientUrl = req.headers.origin;
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_SERVER,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_LOGIN,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const user = await User.findOne({
      email: req.body.email,
    });
    const token = await jwt.sign(
      { _id: user._id },
      process.env.TOKEN_SECRET_KEY,
      { expiresIn: "1h" }
    );

    const info = await transporter.sendMail({
      from: process.env.SMTP_LOGIN,
      to: req.body.email,
      subject: "This is for testing",
      text: `click here to redirect change password ${clientUrl}/user/changePassword/${token}/${uuidv4()}`,
    });
    if (info.accepted)
      return res.status(200).json({
        success: true,
        message: "Email send successfully",
      });
    if (info.rejected)
      return res.json(createErrors(400, "request rejected", false));
  } catch (err) {
    return next(err);
  }
};

export const ChangePassword = async (req, res, next) => {
  try {
    let { newPassword, confirmPassword } = req.body;
    const token = req.headers.token.split(" ")[1];
    await jwt.verify(token, process.env.TOKEN_SECRET_KEY, async (err, user) => {
      if (err) {
        return res.json(createErrors(400, "token not valid", false));
      } else {
        if (newPassword !== confirmPassword)
          return res.json(
            createErrors(402, "password and confirm password different", false)
          );
        newPassword = await bcrypt.hash(newPassword, 10);
        const updateUser = await User.findByIdAndUpdate(
          user._id,
          {
            $set: {
              password: newPassword,
            },
          },
          {
            new: true,
          }
        );
        return res.status(200).json({
          message: "password update successfully",
          updateUser,
          success: true,
        });
      }
    });
  } catch (err) {
    return next(err);
  }
};
