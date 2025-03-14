import * as React from "react";
import { Container, Typography, Box, LinearProgress, Button, Rating, Divider, FormControl } from "@mui/material";
import * as g from "../utils/global";

const EvaluateSection = ({ file, onComplete }) => {
  const [rowIndex, setRowIndex] = React.useState(0);
  const [accuracyRating, setAccuracyRating] = React.useState(0);
  const [qualityRating, setQualityRating] = React.useState(0);
  const [comment, setComment] = React.useState("");
  const [error, setError] = React.useState("");

  const { fileName, rows } = file;
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
    g.post("/evaluate", { fileName, rowIndex, ...curRow.evaluation }).finally(() => {
      g.setLoading(false);
    });
  };

  return (
    <Container maxWidth="lg">
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" mt={1}>
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
      <Box>
        {rows.length > 0 && (
          <Box>
            <Box display="flex" justifyContent="center" mt={1}>
              <Typography>
                {rowIndex + 1} / {total}
              </Typography>
            </Box>
            <Box mt={1} mb={1}>
              {["Findings", "Impression A", "Impression B", "Reason For Exam"].map((key) => (
                <React.Fragment key={key}>
                  <Typography variant="body1" gutterBottom>
                    <strong>{key}</strong>
                  </Typography>
                  <Typography variant="body2" gutterBottom style={{ whiteSpace: "pre-line" }}>
                    {curRow[key]}
                  </Typography>
                </React.Fragment>
              ))}
              <Box display="flex">
                {["Ethnicity", "Gender", "Age"].map((key) => (
                  <Typography variant="body1" gutterBottom key={key} mr={3}>
                    <strong>{key}: </strong>
                    {curRow[key]}
                  </Typography>
                ))}
              </Box>
            </Box>
          </Box>
        )}
      </Box>
      <Divider />
      <FormControl error={!!error}>
        {error && (
          <Typography variant="body2" color="error" gutterBottom mt={1}>
            {error}
          </Typography>
        )}
      </FormControl>
      <Box display="flex" justifyContent="left">
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
      </Box>
      <Box>
        <Typography gutterBottom>
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
      </Box>
      <Box display="flex" justifyContent="space-between" width="100%" mt={2}>
        <Button variant="contained" color="secondary" onClick={handlePrevious} disabled={rowIndex === 0}>
          Previous
        </Button>
        <Button variant="contained" color="secondary" onClick={handleNext} disabled={rowIndex === total}>
          {nextButtonTitle}
        </Button>
      </Box>
    </Container>
  );
};

export default EvaluateSection;
