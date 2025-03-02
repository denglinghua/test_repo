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
import api from "../utils/api";

const EvaluateSection = ({ file, onComplete }) => {
  const [rowIndex, setRowIndex] = useState(0);
  const [accuracyRating, setAccuracyRating] = useState(0);
  const [qualityRating, setQualityRating] = useState(0);
  const [comment, setComment] = useState("");
  const { fileName, rows } = file;
  const curRow = rows[rowIndex];
  const total = rows.length;

  useEffect(() => {
    if (rows.length > 0) {
      const { evaluation } = rows[rowIndex];
      setAccuracyRating(evaluation.accuracyRating);
      setQualityRating(evaluation.qualityRating);
      setComment(evaluation.comment);
    }
  }, [rowIndex, rows]);

  const handleNext = () => {
    updateEvaluation();
    setRowIndex(rowIndex + 1);

    if (rowIndex === total - 1) {
      onComplete();
    }
  };

  const handlePrevious = () => {
    updateEvaluation();
    setRowIndex(rowIndex - 1);
  };

  const updateEvaluation = () => {
    curRow.evaluation = { accuracyRating, qualityRating, comment };
    saveEvaluation();
  };

  const saveEvaluation = () => {
    api.post("/evaluate", { fileName, rowIndex, ...curRow.evaluation });
  };

  const progress = (rowIndex / total) * 100;

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
          height: 15,
          backgroundColor: "#e0e0e0",
          "& .MuiLinearProgress-bar": {
            backgroundColor: "#3f51b5",
          },
        }}
      />
      <Box mt={2} mb={2}>
        {rows.length > 0 && (
          <Box>
            <Box display="flex" justifyContent="center" mt={2} mb={2}>
              <Typography>
                {rowIndex} / {total}
              </Typography>
            </Box>
            <Box mt={2}>
              {Object.entries(curRow).filter(([key]) => key !== "evaluation").map(([key, value]) => (
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
          disabled={rowIndex === 0}
        >
          Previous
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleNext}
          disabled={rowIndex === total}
        >
          Next
        </Button>
      </Box>
    </Container>
  );
};

export default EvaluateSection;
