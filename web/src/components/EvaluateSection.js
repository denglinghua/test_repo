import React, { useState, useEffect} from "react";
import {
  Container,
  Typography,
  Box,
  LinearProgress,
  Button,
  Rating,
  Divider,
} from "@mui/material";

const EvaluateSection = ({ data }) => {
  const [row, setRow] = useState(0);
  const [accuracyRating, setAccuracyRating] = useState(0);
  const [qualityRating, setQualityRating] = useState(0);
  const [comment, setComment] = useState("");
  const rowData = data[row];
  const total = data.length;

  useEffect(() => {
    if (data.length > 0) {
      const { evaluation } = data[row];
      setAccuracyRating(evaluation.accuracyRating);
      setQualityRating(evaluation.qualityRating);
      setComment(evaluation.comment);
    }
  }, [row, data]);

  const handleNext = () => {
    saveEvaluation();
    setRow(row + 1);
    
  };

  const handlePrevious = () => {
    saveEvaluation();
    setRow(row - 1);
  };

  const saveEvaluation = () => {
    rowData.evaluation = { accuracyRating, qualityRating, comment };
  };

  const progress = (row / total) * 100;

  return (
    <Container maxWidth="lg">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        mt={2}
      >
        <Typography variant="h5" gutterBottom>
          Evaluate
        </Typography>
      </Box>
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{
          height: 10,
          backgroundColor: "#e0e0e0",
          "& .MuiLinearProgress-bar": {
            backgroundColor: "#3f51b5",
          },
        }}
      />
      <Box mt={2} mb={2}>
        {data.length > 0 && (
          <Box>
            <Box display="flex" justifyContent="center" mt={2} mb={2}>
              <Typography>
                {row + 1} / {total}
              </Typography>
            </Box>
            <Box mt={2}>
              {Object.entries(rowData).filter(([key]) => key !== "evaluation").map(([key, value]) => (
                <Typography key={key} variant="body1" gutterBottom>
                  <strong>{key}:</strong> {value}
                </Typography>
              ))}
            </Box>
          </Box>
        )}
      </Box>
      <Divider />
      <Box mt={2} display="flex" justifyContent="left">
        <Typography gutterBottom>
          <strong>Clinical Accuracy:</strong>
        </Typography>
        <Rating
          name='accuracyRating'
          value={accuracyRating}
          onChange={(event, newValue) => {
            setAccuracyRating(newValue);
          }}
        />
        <Typography gutterBottom ml={3}>
          <strong>Overall Quality:</strong>
        </Typography>
        <Rating
          name='qualityRating'
          value={qualityRating}
          onChange={(event, newValue) => {
            setQualityRating(newValue);
          }}  
        />
      </Box>
      <Box>
        <Typography gutterBottom>
          <strong>Comment:</strong>
        </Typography>
        <textarea
          name='comment'
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows="6"
          cols="64"
          placeholder="Enter your comment here..."
        />
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
