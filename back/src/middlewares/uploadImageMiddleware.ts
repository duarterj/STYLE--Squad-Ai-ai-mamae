import { Request, Response, NextFunction } from "express";
import multer from "multer";
import { photoUpload } from "../config/multer";

function uploadImage(request: Request, response: Response, next: NextFunction) {
  photoUpload.single("image")(request, response, (error: any) => {
    if (!error) {
      return next();
    }

    
    if (error instanceof multer.MulterError) {
      if (error.code === "LIMIT_FILE_SIZE") {
        return response.status(400).json({ message: "Arquivo excede o tamanho máximo permitido (5MB)" });
      }

      return response.status(400).json({ message: error.message });
    }

    
    return response.status(415).json({ message: "Formato de imagem não suportado" });
  });
}

export { uploadImage };