import xlsx from "xlsx";
import fs from "fs/promises";
import logger from "../../common/logger.js";

// save uploaded file to disk and parse it
// it is not used in the current implementation due to compability with cloud services
// it is more friendly for cloud services to avoid access local file system
function parseFromFile(filePath, fileName) {
  try {
    const workbook = xlsx.readFile(filePath);
    const data = parse(workbook);
    fs.unlink(filePath);
    return data;
  } catch (error) {
    logger.error(`Failed to parse file-${fileName}`, error.message);
    return null;
  }
}

// dont save the file to disk, parse it from buffer
// TODO: memory security issue
function parseFromBuffer(buffer, fileName) {
  try {
    const workbook = xlsx.read(buffer, { type: "buffer" });
    return parse(workbook);
  } catch (error) {
    logger.error(`Failed to parse buffer--${fileName}`, error.message);
    return null;
  }
}

function parse(workbook) {
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];

  const data = xlsx.utils.sheet_to_json(sheet, { header: 1 });

  //Columns : Findings	Impression A	Impression B	Ethnicity	Gender	Reason For Exam	Age
  const expectedColumns = [
    "Findings",
    "Impression A",
    "Impression B",
    "Ethnicity",
    "Gender",
    "Reason For Exam",
    "Age",
  ];

  // Get the actual columns from the first row
  const actualColumns = data[0];

  const columnsMatch = expectedColumns.every(
    (col, index) => col === actualColumns[index]
  );

  if (!columnsMatch) {
    return null;
  }

  const jsonData = xlsx.utils.sheet_to_json(sheet);

  return jsonData;
}

function exportExcel(rows) {
  // before exporting, transform the database columns to display columns
  rows = rows.map((row) => ({
    "Findings": row.findings,
    "Impression A": row.impression_a,
    "Impression B": row.impression_b,
    "Ethnicity": row.ethnicity,
    "Gender": row.gender,
    "Reason For Exam": row.reason_for_exam,
    "Age": row.age,
    "Clinical Accuracy": row.accuracy_rating,
    "Overall Quality": row.quality_rating,
    "Comment": row.comment,
  }));

  const ws = xlsx.utils.json_to_sheet(rows);
  const wb = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(wb, ws, "Sheet1");

  const buffer = xlsx.write(wb, { type: "buffer", bookType: "xlsx" });

  return buffer;
}

export default { parseFromFile, parseFromBuffer, exportExcel };