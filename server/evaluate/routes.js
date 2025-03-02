import express from "express";
import multer from "multer";
import crypto from "crypto";
import evaluateController from "./controllers/EvaluateController.js";

const router = express.Router();

function generateUniqueFileName(file) {
  const originalName = file.originalname;
  const fileName = originalName.substring(0, originalName.lastIndexOf('.'));
  const extension = originalName.substring(originalName.lastIndexOf('.'));
  const hash = crypto.randomBytes(16).toString('hex');
  return `${fileName}-${hash}${extension}`;
}

const uploadStorage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, generateUniqueFileName(file));
  },
});

const upload = multer({ storage: uploadStorage });

router.post(
  "/upload",
  upload.single("file"),
  evaluateController.upload
);

router.post(
  "/evaluate",
  evaluateController.evaluate
);

router.get(
  "/result",
  evaluateController.getResult
);

export default router;
