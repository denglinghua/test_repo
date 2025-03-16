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

async function exportExcel(req, res) {
  const fileId = req.params.fileId;
  const file = db.getFile(fileId);
  if (!file) {
    return response.error(res, 1, "File not found");
  }

  const rows = db.getEvaluations(fileId);
  const buffer = excel.exportExcel(rows);
  
  res.setHeader('Content-Disposition', `attachment; filename=${file.file_name}`);
  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.send(buffer);
}

async function stats(req, res) {
  const data = db.getStastics();
  const result = {
    accuracy: data.accuracy.map((row) => Object.values(row)),
    quality: data.quality.map((row) => Object.values(row)),
  };
  response.ok(res, "Stastics retrieved successfully", result);
}

export default {
  upload,
  evaluate,
  exportExcel,
  stats,
};
