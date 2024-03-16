import imageType from "./ImageType.js";
const CheckPdfFile = (mimetype, size) => {
  const fileSizeInMb = SizeConvertToMb(size);
  if (mimetype !== "application/pdf") return "file type must be pdf";

  if (fileSizeInMb >= 5) return "file size must be less than 5 mb";
  return null;
};

export const CheckImageFile = (mimetype, size) => {
  const fileSizeInMb = SizeConvertToMb(size);
  if ( !imageType.includes(mimetype.toLowerCase()))
    return "file type must be png,gif,jpg,jpeg";

  if (fileSizeInMb >= 15) return "file size must be less than 15 mb";
  return null;
};

const SizeConvertToMb = (sizeInByte) => {
  return sizeInByte / (1024 * 1024);
};

export default CheckPdfFile;
