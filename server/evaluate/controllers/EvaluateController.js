import path from "path";
import crypto from "crypto";
import response from "../../common/response.js";
import excel from "./Excel.js";
import db from "../../db/database.js";

async function upload(req, res) {
  const originalName = req.file.originalname;

  const rows = excel.parseFromBuffer(req.file.buffer, originalName);
  if (!rows) {
    return response.error(res, 1, "Failed to parse the file, please check the file format.");
  }

  if (rows.length == 0) {
    return response.error(res, 2, "The file does not contain any record.");
  }

  const fileId = genFileId();
  db.insertFile(fileId, originalName, req.user.username, rows);

  response.ok(res, "File uploaded successfully", {
    fileId: fileId,
    originalName: originalName,
    rows: rows,
  });
}

function genFileId() {
  const hash = crypto.randomBytes(16).toString('hex');
  return hash;
}

async function evaluate(req, res) {
  const { fileId, rowIndex, accuracyRating, qualityRating, comment } = req.body;
  db.updateEvaluation(fileId, rowIndex, accuracyRating, qualityRating, comment);
  response.ok(res, "Evaluation updated successfully");
}

async function getResult(req, res) {
  const fileId = req.query.fileId;
  const file = db.getFile(fileId);
  if (!file) {
    return response.error(res, 1, "File not found");
  }

  const evaluations = db.getEvaluations(fileId);
  
  response.ok(res, "Evaluations retrieved successfully", {
    file: file,
    rows: evaluations,
  });
}

export default {
  upload,
  evaluate,
  getResult,
};
