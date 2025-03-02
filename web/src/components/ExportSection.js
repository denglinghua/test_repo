import React from "react";
import { Container, Typography, Box, Button, Input } from "@mui/material";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const ExportSection = ({ file }) => {
  const handleExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(transformData(file.rows));
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8" });

    saveAs(blob, "export.xlsx");
  };

  const transformData = (rows) => {
    return rows.map((row) => {
      // copy all the fields except evaluation
      const { evaluation, ...rest } = row;
      const newEval = {
        "Clinical Accuracy": evaluation.accuracyRating,
        "Overall Quality": evaluation.qualityRating,
        "Comment": evaluation.comment
      }
      return { ...rest, ...newEval};
    });
  }

  return (
    <Container maxWidth="md">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="left"
        justifyContent="center"
      >
        <Typography
          variant="body1"
          gutterBottom
          style={{ marginBottom: "2rem" }}
        >
          All records have been successfully evaluated. You can now export the
          results.
        </Typography>

        <Button
          variant="contained"
          color="primary"
          sx={{ width: "200px" }}
          onClick={handleExport}
        >
          Export to Excel
        </Button>
      </Box>
    </Container>
  );
};

export default ExportSection;
