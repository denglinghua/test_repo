import React, { useState } from "react";
import { Container, Typography, Box, Button, Snackbar, Alert } from "@mui/material";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const ExportSection = ({ file }) => {
  const [open, setOpen] = useState(false);

  const handleExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(transformData(file.rows));
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });

    saveAs(blob, createExportFileName(file.originalName));

    setOpen(true);
  };

  const createExportFileName = (originalName) => {
    const lastDotIndex = originalName.lastIndexOf(".");
    const baseName = originalName.substring(0, lastDotIndex);
    const ext = originalName.substring(lastDotIndex + 1);
    const date = new Date();
    const formattedDate = date.toISOString().replace(/[-:T]/g, "").split(".")[0];
    return `${baseName}_${formattedDate}_evaluation.${ext}`;
  };

  const transformData = (rows) => {
    return rows.map((row) => {
      // copy all the fields except evaluation
      const { evaluation, ...rest } = row;
      const newEval = {
        "Clinical Accuracy": evaluation.accuracyRating,
        "Overall Quality": evaluation.qualityRating,
        Comment: evaluation.comment,
      };
      return { ...rest, ...newEval };
    });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <Container maxWidth="md">
      <Box display="flex" flexDirection="column" alignItems="left" justifyContent="center">
        <Typography variant="body1" gutterBottom style={{ marginBottom: "2rem" }}>
          All records have been successfully scored. You can now export the results.
        </Typography>

        <Button variant="contained" color="primary" sx={{ width: "200px" }} onClick={handleExport}>
          Export to Excel
        </Button>
      </Box>

      <Snackbar
        open={open}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Export successful!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ExportSection;
