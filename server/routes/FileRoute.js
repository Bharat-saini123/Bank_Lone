import express from "express";
import UserFile from "../controllers/Files/UserFile.js";
import UpdateImage from "../controllers/Files/UpdateImage.js";
import Authentication from "../controllers/Auth/Authentication.js";
import BusinessFile from "../controllers/Files/BusinessFile.js";
import SelfFile from "../controllers/Files/SelfFile.js";

const router = express.Router();

router.post("/upload", Authentication, UserFile);

router.post("/uploadBusiness", Authentication, BusinessFile);
router.post("/uploadSelf", Authentication, SelfFile);
router.post("/imageUpdate", Authentication, UpdateImage);

export default router;
