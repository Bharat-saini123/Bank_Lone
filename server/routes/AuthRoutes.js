import express from "express";
import SignUp from "../controllers/Auth/SignUp.js";
import Login from "../controllers/Auth/Login.js";
import Authentication from "../controllers/Auth/Authentication.js";
import { ChangePassword, ForgotPassword } from "../controllers/Auth/ForgotPassword.js";


const router = express.Router();

router.post("/signup", SignUp);
router.post("/login", Login);
router.post("/sendEmail",ForgotPassword);
router.post("/changePassword",ChangePassword);





export default router;
