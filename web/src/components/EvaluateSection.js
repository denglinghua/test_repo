import * as React from "react";
import { Typography, Box, Stack, LinearProgress, Button, Rating, Divider, FormControl } from "@mui/material";
import * as g from "../utils/global";

const EvaluateSection = ({ file, onComplete }) => {
  const [rowIndex, setRowIndex] = React.useState(0);
  const [accuracyRating, setAccuracyRating] = React.useState(0);
  const [qualityRating, setQualityRating] = React.useState(0);
  const [comment, setComment] = React.useState("");
  const [error, setError] = React.useState("");

  const { fileId, rows } = file;
  // Since upload section has already checked the file, we can assume the file is not empty
  const curRow = rows[rowIndex];
  const total = rows.length;

  const progress = ((rowIndex + 1) * 100) / total;
  const nextButtonTitle = rowIndex === total - 1 ? "Finish" : "Next";

  React.useEffect(() => {
    const { evaluation } = rows[rowIndex];
    setAccuracyRating(evaluation.accuracyRating);
    setQualityRating(evaluation.qualityRating);
    setComment(evaluation.comment);
  }, [rowIndex, rows]);

  const checkRating = () => {
    if (accuracyRating === 0 || qualityRating === 0) {
      setError("Please score the accuracy and quality before moving on.");
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (!checkRating()) {
      return;
    }

    switchRow(rowIndex + 1);

    if (rowIndex === total - 1) {
      onComplete();
    }
  };

  const handlePrevious = () => {
    switchRow(rowIndex - 1);
  };

  const switchRow = (index) => {
    updateEvaluation();
    setRowIndex(index);
    setError("");
  };

  // try to save changed evaluation when switching to row, no matter next or previous
  const updateEvaluation = () => {
    // check evaluation changed
    if (
      accuracyRating === curRow.evaluation.accuracyRating &&
      qualityRating === curRow.evaluation.qualityRating &&
      comment === curRow.evaluation.comment
    ) {
      console.log("No change in evaluation");
      return;
    }
    curRow.evaluation = { accuracyRating, qualityRating, comment };
    saveEvaluation();
  };

  const saveEvaluation = () => {
    g.setLoading(true);
    g.post("/evaluate", { fileId: fileId, rowIndex, ...curRow.evaluation }).finally(() => {
      g.setLoading(false);
    });
  };

  return (
    <Stack>
      <Box display="flex" justifyContent="center" mt={1}>
        <Typography variant="h5" gutterBottom>
          Evaluate
        </Typography>
      </Box>
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{
          height: 12,
          backgroundColor: "#e0e0e0",
          "& .MuiLinearProgress-bar": {
            backgroundColor: "#3f51b5",
          },
        }}
      />
      <Box display="flex" justifyContent="center" mt={1}>
        <Typography>
          {rowIndex + 1} / {total}
        </Typography>
      </Box>
      <Stack mb={1} spacing={1}>
        {["Findings", "Impression A", "Impression B", "Reason For Exam"].map((key) => (
          <Stack key={key}>
            <Typography variant="body1" gutterBottom>
              <strong>{key}</strong>
            </Typography>
            <Typography variant="body2" gutterBottom style={{ whiteSpace: "pre-line" }}>
              {curRow[key]}
            </Typography>
          </Stack>
        ))}
        <Stack direction="row" spacing={3}>
          {["Ethnicity", "Gender", "Age"].map((key) => (
            <Typography variant="body1" gutterBottom key={key}>
              <strong>{key}: </strong>
              {curRow[key]}
            </Typography>
          ))}
        </Stack>
      </Stack>
      <Divider />
      <FormControl error={!!error}>
        {error && (
          <Typography variant="body2" color="error" gutterBottom mt={1}>
            {error}
          </Typography>
        )}
      </FormControl>
      <Stack direction="row" justifyContent="left" mt={1}>
        <Typography gutterBottom>
          <strong>Clinical Accuracy:</strong>
        </Typography>
        <Rating
          name="accuracyRating"
          value={accuracyRating}
          onChange={(event, newValue) => {
            setAccuracyRating(newValue);
          }}
        />
        <Typography gutterBottom ml={3}>
          <strong>Overall Quality:</strong>
        </Typography>
        <Rating
          name="qualityRating"
          value={qualityRating}
          onChange={(event, newValue) => {
            setQualityRating(newValue);
          }}
        />
      </Stack>
      <Stack spacing={1}>
        <Typography>
          <strong>Comment:</strong>
        </Typography>
        <textarea
          name="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows="5"
          cols="64"
          placeholder="Enter your comment here..."
        />
      </Stack>
      <Stack direction="row" justifyContent="space-between" width="100%" mt={1}>
        <Button variant="contained" color="secondary" onClick={handlePrevious} disabled={rowIndex === 0}>
          Previous
        </Button>
        <Button variant="contained" color="secondary" onClick={handleNext} disabled={rowIndex === total}>
          {nextButtonTitle}
        </Button>
      </Stack >
    </Stack>
  );
};

export default EvaluateSection;
