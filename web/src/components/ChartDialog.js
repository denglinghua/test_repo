import * as React from "react";
import { IconButton, Dialog, DialogTitle, DialogContent } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Chart from "./Chart";

const ChartDialog = (props) => {
  const { onClose, open } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open} autoFocus disableEnforceFocus>
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
  );
};

export default ChartDialog;
