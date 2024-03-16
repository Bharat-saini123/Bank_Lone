import express from "express";
import { adhaarVerify,VerifyAdhaarOtp } from "../controllers/verify/AdhaarVerify.js";
import PanVerify from "../controllers/verify/PanVerify.js";
import Authentication from "../controllers/Auth/Authentication.js";
import PanInfoVerify from "../controllers/verify/PanInfoVerify.js";
import PanInfoVerifyName from "../controllers/verify/PanVerifyName.js";

const router=express.Router();


router.post("/adhaar",Authentication,adhaarVerify);
router.post("/verifyAdhaar",Authentication,VerifyAdhaarOtp);
router.post("/panVerify",Authentication,PanVerify);
router.post("/panInfoVerify",Authentication,PanInfoVerify);
router.post("/panInfoVerifyName",Authentication,PanInfoVerifyName);
export default router;