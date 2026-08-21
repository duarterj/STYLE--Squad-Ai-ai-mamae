import { Request } from "express";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (request: Request, file: any, callBack: any) {
    const destinationFolder = path.join(__dirname, "..", "..", "uploads", "photos");
    callBack(null, destinationFolder);
  },
  filename: function (request: Request, file, callBack) {
    callBack(null, Date.now() + "_" + file.originalname);
  },
});

const photoUpload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 50,
    files: 9,
  },
  fileFilter: function (request: Request, file, callBack) {
    const allowedFileTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (!allowedFileTypes.includes(file.mimetype)) {
      const message = "Only the Jpeg, PNG and JPG types are supported";
      return callBack(new Error(message));
    }
    callBack(null, true);
  },
});

export { photoUpload };