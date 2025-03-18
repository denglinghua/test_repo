import React from "react";
import { Stack, Typography } from "@mui/material";

const NotFound = () => {
  return (
    <Stack alignItems="center" justifyContent="center" minHeight="80vh" spacing={2}>
      <Typography variant="h4">
        404 - Page Not Found
      </Typography>
      <Typography variant="body1">The page you are looking for does not exist.</Typography>
    </Stack>
  );
};

export default NotFound;
