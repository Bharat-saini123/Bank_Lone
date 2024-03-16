import dotenv from "dotenv";
dotenv.config({
  path: "../../.env",
});
import jwt from "jsonwebtoken";
import createErrors from "../../Error/createErrors.js";
const Authentication = async (req, res, next) => {
  if (!req.headers.token)
    return res
      .status(402)
      .json(createErrors(402, "user not authenticate", false));
  const token = req.headers.token.split(" ")[1];
  await jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, user) => {
    if (err) {
      return res
        .status(401)
        .json(createErrors(401, "your token not valid", false));
    } else {
      req.user = user;
      next();
    }
  });
};
export default Authentication;
