import xlsx from "xlsx";
import fs from "fs/promises";
import logger from "../../common/logger.js";

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

export default { parseFromFile, parseFromBuffer };