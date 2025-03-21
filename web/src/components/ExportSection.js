import * as React from "react";
import { Stack, Typography, Button, Link, IconButton } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

import * as g from "../utils/global";
import api from "../utils/api";

const ExportSection = ({ file }) => {
  const exportUrl = `${api.apiURL}/export/${file.fileId}`;

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

    g.notifyOk("Exported successfully.");
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

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(exportUrl);
    g.notifyOk("URL copied to clipboard.");
  };

  return (
    <Stack spacing={4}>
      <Stack spacing={2}>
        <Typography variant="body1">
          All records have been successfully scored. You can now export the results.
        </Typography>

        <Button variant="contained" color="primary" sx={{ width: "200px" }} onClick={handleExport}>
          Export to Excel
        </Button>
      </Stack>

      <Stack>
        <Typography variant="body2">You can also download the report anytime using the following link:</Typography>
        <Stack direction="row" spacing={1} alignItems="center">
          <Link href={exportUrl} target="_blank">
            {exportUrl}
          </Link>
          <IconButton color="#d3d3d3" onClick={handleCopyToClipboard}>
            <ContentCopyIcon fontSize="small" />
          </IconButton>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ExportSection;
