import React from "react";
import { Backdrop, CircularProgress } from "@mui/material";

const Loading = ({ open }) => {
  return (
    <Backdrop sx={{ color: '#f0f0f0', zIndex: (theme) => theme.zIndex.snackbar + 1 }} open={open}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default Loading;