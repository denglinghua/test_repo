import * as React from "react";
import { Container, Typography, Box, Button, Link, IconButton, Dialog, DialogTitle, DialogContent } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CloseIcon from '@mui/icons-material/Close';
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import Chart from "./Chart";

import * as g from "../utils/global";
import api from "../utils/api";

const ExportSection = ({ file }) => {
  const [openDialog, setOpenDialog] = React.useState(false);

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

  const handleClose = () => {
    setOpenDialog(false);
  };

  return (
    <Container maxWidth="md">
      <Box display="flex" flexDirection="column" alignItems="flex-start" justifyContent="center">
        <Typography variant="body1" gutterBottom style={{ marginBottom: "2rem" }}>
          All records have been successfully scored. You can now export the results.
        </Typography>

        <Button variant="contained" color="primary" sx={{ width: "200px" }} onClick={handleExport}>
          Export to Excel
        </Button>

        <Typography variant="body2" mt={3}>
          You can also download the report anytime using the following link:
        </Typography>

        <Box display="flex" alignItems="center" mt={1}>
          <Link href={exportUrl} target="_blank" rel="noopener" sx={{ marginRight: "0.5rem" }}>
            {exportUrl}
          </Link>
          <IconButton color="#d3d3d3" onClick={handleCopyToClipboard}>
            <ContentCopyIcon fontSize="small" />
          </IconButton>
        </Box>
        <Button color="primary" sx={{ textTransform: "none", marginTop: "1rem" }} onClick={() => setOpenDialog(true)}>
          View score statistics charts
        </Button>
      </Box>
      <Dialog onClose={handleClose} open={openDialog}>
        <DialogTitle sx={{ textAlign: "center" }}>Score Distribution</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Chart />
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default ExportSection;
