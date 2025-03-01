import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  LinearProgress,
  Button,
} from "@mui/material";

const EvaluateSection = ({ data }) => {
  const [row, setRow] = useState(0);
  const total = data.length;

  const handleNext = () => {
    setRow(row + 1);
  };

  const handlePrevious = () => {
    setRow(row - 1);
  };

  const progress = (row / total) * 100;

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="h4" gutterBottom>
          Evaluate
        </Typography>
      </Box>
      <LinearProgress variant="determinate" value={progress} />
      <Box mt={2} mb={2}>
        {data.length > 0 && (
          <Box>
            <Typography variant="h6">Row {row + 1} of {total}</Typography>
            <Box mt={2}>
              {Object.entries(data[row]).map(([key, value]) => (
                <Typography key={key} variant="body1" gutterBottom>
                  <strong>{key}:</strong> {value}
                </Typography>
              ))}
            </Box>
          </Box>
        )}
      </Box>
      <Box display="flex" justifyContent="space-between" width="100%" mt={2}>
        <Button
          variant="contained"
          color="secondary"
          onClick={handlePrevious}
          disabled={row === 0}
        >
          Previous
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleNext}
          disabled={row === total}
        >
          Next
        </Button>
      </Box>
    </Container>
  );
};

export default EvaluateSection;
