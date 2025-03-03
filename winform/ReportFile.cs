using RadiologyReportEvaluation;
using System;
using System.Collections.Generic;
using System.IO;

using OfficeOpenXml;


public class ReportFile
{
    public static readonly ReportFile Instance = new ReportFile();

    public string FileName { get; private set; }
    private List<Row> rows = new List<Row>();
    private ReportFile()
    {
        ExcelPackage.LicenseContext = LicenseContext.NonCommercial;
    }

    public void LoadFile(string fileName)
    {
        FileName = fileName;
        ParseFile();
    }

    private readonly List<string> Columns = new List<string> { "Findings", "Impression A", "Impression B", "Ethnicity", "Gender", "Reason For Exam", "Age" };

    private void ParseFile()
    {
        this.rows.Clear();

        using (ExcelPackage package = new ExcelPackage(new FileInfo(FileName)))
        {
            ExcelWorksheet worksheet = package.Workbook.Worksheets[0];
            int rowCount = worksheet.Dimension.Rows;
            for (int row = 2; row <= rowCount; row++)
            {
                int colIndex = 1;
                bool isEmptyRow = worksheet.Cells[row, colIndex].Value == null;
                if (isEmptyRow)
                {
                    break;
                }
                string findings = worksheet.Cells[row, colIndex++].Value.ToString();
                string impressionA = worksheet.Cells[row, colIndex++].Value.ToString();
                string impressionB = worksheet.Cells[row, colIndex++].Value.ToString();
                string ethnicity = worksheet.Cells[row, colIndex++].Value.ToString();
                string gender = worksheet.Cells[row, colIndex++].Value.ToString();
                string reasonForExam = worksheet.Cells[row, colIndex++].Value.ToString();
                string age = worksheet.Cells[row, colIndex++].Value.ToString();

                Row r = new Row(findings, impressionA, impressionB, ethnicity, gender, reasonForExam, age);
                rows.Add(r);
            }
        }

    }

    public void SaveFile(string saveFolder)
    {
        using (ExcelPackage excel = new ExcelPackage())
        {
            excel.Workbook.Worksheets.Add("Worksheet1");
            var headerRow = new List<string[]>();
            headerRow.Add(Columns.ToArray());
            headerRow.Add(new string[] { "Clinical Accuracy", "Overall Quality", "Comment" });

            var worksheet = excel.Workbook.Worksheets["Worksheet1"];
            worksheet.Cells["A1"].LoadFromArrays(headerRow);
            int row = 2;
            foreach (Row r in rows)
            {
                int col = 1;

                worksheet.Cells[row, col++].Value = r.Findings;
                worksheet.Cells[row, col++].Value = r.ImpressionA;
                worksheet.Cells[row, col++].Value = r.ImpressionB;
                worksheet.Cells[row, col++].Value = r.Ethnicity;
                worksheet.Cells[row, col++].Value = r.Gender;
                worksheet.Cells[row, col++].Value = r.ReasonForExam;
                worksheet.Cells[row, col++].Value = r.Age;
                worksheet.Cells[row, col++].Value = r.AccuracyRating;
                worksheet.Cells[row, col++].Value = r.QualityRating;
                worksheet.Cells[row, col++].Value = r.Comment;

                row++;
            }

            FileInfo file = new FileInfo(Path.Combine(saveFolder, CreateExportFileName()));

            excel.SaveAs(file);
        }
    }

    private string CreateExportFileName()
    {
        string fileName = Path.GetFileNameWithoutExtension(FileName);
        string extension = Path.GetExtension(FileName);
        string date = DateTime.Now.ToString("yyyyMMddHHmmss");
        return string.Format("{0}_{1}_evaluation{2}", fileName, date, extension);
    }

    public List<Row> GetRows()
    {
        return rows;
    } 

    public Row GetRow(int index)
    {
        return rows[index];
    }
}
