import xlsx from "xlsx";
import logger from "../../common/logger.js";

function parse(filePath) {
  try {
    const workbook = xlsx.readFile(filePath);
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
  } catch (error) {
    logger.error(`Failed to parse file-${filePath}`, error.message);
    return null;
  }
}

export default parse;
