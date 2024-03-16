import createErrors from "../../Error/createErrors.js";
import { v4 as uuidv4 } from "uuid";
import CheckPdfFile from "./FileCheck.js";
import BusinessLoan from "../../models/BusinessLone.js";

const BusinessFile = async (req, res, next) => {
  try {
    const {employeeType, referenceName1, referenceMobileNumber1,referenceName2, referenceMobileNumber2, accountNumber, ifscCode } =
      req.body;
    const {
      salarySlip,
      bankStatements,
      incomeTaxReturn,
      panUpload,
      adhaarFront,
      adhaarBack,
    } = req.files;
    if (
        !employeeType||
      !referenceName1 ||
      !referenceMobileNumber1 ||
      !referenceName2 ||
      !referenceMobileNumber2 ||
      !accountNumber ||
      !ifscCode ||
      !salarySlip ||
      !bankStatements ||
      !incomeTaxReturn ||
      !panUpload ||
      !adhaarFront ||
      !adhaarBack
    )
      return res.json(createErrors(400, "all fields are required", false));
    const MimeType1 = salarySlip.mimetype.split("/")[1];
    const MimeType2 = bankStatements.mimetype.split("/")[1];
    const MimeType3 = incomeTaxReturn.mimetype.split("/")[1];
    const MimeType4 = panUpload.mimetype.split("/")[1];
    const MimeType5 = adhaarFront.mimetype.split("/")[1];
    const MimeType6 = adhaarBack.mimetype.split("/")[1];

    const fileMessage1 = CheckPdfFile(salarySlip.mimetype, salarySlip.size);
    const fileName1 = uuidv4() + Date.now() + "." + MimeType1;
    const uploadPath1 = "./public/files/pdf/salarySlip/" + fileName1;

    const fileMessage2 = CheckPdfFile(
      bankStatements.mimetype,
      bankStatements.size
    );
    const fileName2 = uuidv4() + Date.now() + "." + MimeType2;
    const uploadPath2 = "./public/files/pdf/bankStatements/" + fileName2;

    const fileMessage3 = CheckPdfFile(
      incomeTaxReturn.mimetype,
      incomeTaxReturn.size
    );
    const fileName3 = uuidv4() + Date.now() + "." + MimeType3;
    const uploadPath3 = "./public/files/pdf/incomeTaxReturn/" + fileName3;

    const fileMessage4 = CheckPdfFile(panUpload.mimetype, panUpload.size);
    const fileName4 = uuidv4() + Date.now() + "." + MimeType4;
    const uploadPath4 = "./public/files/pdf/pan/" + fileName4;

    const fileMessage5 = CheckPdfFile(adhaarFront.mimetype, adhaarFront.size);
    const fileName5 = uuidv4() + Date.now() + "." + MimeType5;
    const uploadPath5 = "./public/files/pdf/adhaar/" + fileName5;

    const fileMessage6 = CheckPdfFile(adhaarBack.mimetype, adhaarBack.size);
    const fileName6 = uuidv4() + Date.now() + "." + MimeType6;
    const uploadPath6 = "./public/files/pdf/adhaar/" + fileName6;

    if (
      fileMessage1 === null &&
      fileMessage2 === null &&
      fileMessage3 === null &&
      fileMessage4 === null &&
      fileMessage5 === null &&
      fileMessage6 === null
    ) {
      const salarySlipResult1 = await salarySlip.mv(uploadPath1);
      const bankStatementsResult = await bankStatements.mv(uploadPath2);
      const incomeTaxReturnResult = await incomeTaxReturn.mv(uploadPath3);
      const panUploadResult = await panUpload.mv(uploadPath4);
      const adhaarFrontResult = await adhaarFront.mv(uploadPath5);
      const adhaarBackResult = await adhaarBack.mv(uploadPath6);
      const result = await new BusinessLoan({
        userId: req.user._id,
        employeeType,
        salarySlip: fileName1,
        bankStatements: fileName2,
        incomeTaxReturn: fileName3,
        referenceName1,
        referenceMobileNumber1,
        referenceName2,
        referenceMobileNumber2,
        accountNumber,
        ifscCode,
        panUpload: fileName4,
        adhaarFront: fileName5,
        adhaarBack: fileName6,
      });
      await result.save();
      return res.status(200).json({
        success: true,
        message: "data insert successfully",
        result,
      });
    } else {
      return res
        .status(404)
        .json(
          createErrors(
            404,
            fileMessage1 ||
              fileMessage2 ||
              fileMessage3 ||
              fileMessage4 ||
              fileMessage5 ||
              fileMessage6,
            false
          )
        );
    }
  } catch (err) {
    return next(err);
  }
};
export default BusinessFile;