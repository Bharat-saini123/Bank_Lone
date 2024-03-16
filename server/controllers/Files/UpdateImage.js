import createErrors from "../../Error/createErrors.js";
import { v4 as uuidv4 } from "uuid";
import { CheckImageFile } from "./FileCheck.js";
import User from "../../models/User.js";
const UpdateImage = async (req, res, next) => {
  try {
    const uploadFile = req.files.upload_image;
    const MimeType = uploadFile.mimetype.split("/")[1];
    const fileMessage = CheckImageFile(MimeType, uploadFile.size);
    const fileName = uuidv4() + Date.now() + "." + MimeType;
    const uploadPath = "./public/files/images/" + fileName;

    if (fileMessage === null) {
      uploadFile.mv(uploadPath, async (err, result) => {
        if (err) {
          return res.json(createErrors(400, err, false));
        } else {
          const userImageUpdate = await User.findByIdAndUpdate(
            req.user._id,
            {
              imgUrl: fileName,
            },
            {
              new: true,
            }
          );
          return res.status(200).json({
            success: true,
            message: "file upload successfully",
            result,
            fileName,
            userImageUpdate,
          });
        }
      });
    } else {
      return res.status(404).json(createErrors(404, fileMessage, false));
    }
  } catch (err) {
    return next(err);
  }
};
export default UpdateImage;
