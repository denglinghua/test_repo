import path from "path";
import response from "../../common/response.js";
import excel from "./Excel.js";
import db from "../../db/database.js";

async function upload(req, res) {
  const filePath = req.file.path;

  const rows = excel.parse(filePath);
  if (!rows) {
    return response.error(res, 1, "Failed to parse the file, please check the file format.");
  }

  const fileName = path.basename(filePath);
  db.insertFile(fileName, req.user.username, rows);

  response.ok(res, "File uploaded successfully", {
    fileName: fileName,
    rows: rows,
  });
}

async function evaluate(req, res) {
  const { fileName, rowIndex, accuracyRating, qualityRating, comment } = req.body;
  db.updateEvaluation(fileName, rowIndex, accuracyRating, qualityRating, comment);
  response.ok(res, "Evaluation updated successfully");
}

async function getResult(req, res) {
  const fileName = req.query.fileName;
  const file = db.getFile(fileName);
  if (!file) {
    return response.error(res, 1, "File not found");
  }

  const evaluations = db.getEvaluations(fileName);
  
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
