import response from "../../common/response.js";
import parse from "./FileParser.js";

async function upload(req, res) {
  const filePath = req.file.path;

  const data = parse(filePath);
  if (!data) {
    return response.error(res, 1, "Failed to parse the file");
  }

  response.ok(res, "File uploaded successfully", data);
}

async function evaluate(req, res) {}

async function exportResult(req, res) {}

export default {
  upload,
  evaluate,
  exportResult,
};
