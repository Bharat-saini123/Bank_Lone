import express from "express";
import Authentication from "../controllers/Auth/Authentication.js";
import getAuthUserData from "../controllers/User/getAuthUserData.js";
import userUpdate from "../controllers/User/userUpdate.js";
import getAllLoanData from "../controllers/User/getAllLoanData.js";
import getSalaryLoanData from "../controllers/User/getSalaryLoanData.js";
import getBusinessLoanData from "../controllers/User/getBusinessLoan.js";
import getSelfLoanData from "../controllers/User/getSelfLoanData.js";

const router = express.Router();

router.get("/getAuthUser", Authentication, getAuthUserData);
router.put("/userUpdate", Authentication, userUpdate);
router.get("/getAllLoanData", Authentication, getAllLoanData);
router.post("/getSalaryLoanData", Authentication, getSalaryLoanData);
router.post("/getBusinessLoanData", Authentication, getBusinessLoanData);
router.post("/getSelfLoanData", Authentication, getSelfLoanData);

export default router;
