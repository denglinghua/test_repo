import React from "react";
import { Stack, Typography } from "@mui/material";

// currently not used, global notifcation instead
const Error = () => {
  return (
    <Stack alignItems="center" justifyContent="center" minHeight="80vh" spacing={2}>
      <Typography variant="h4">Oops!</Typography>
      <Typography variant="body1">Some error occurred. Please try again later.</Typography>
      <a href="/">Go back to Home</a>
    </Stack>
  );
};

export default Error;
