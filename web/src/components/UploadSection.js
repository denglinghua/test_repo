import React, { useState } from "react";
import { Container, Typography, Box, Button, styled } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import api from "../utils/api";

const UploadSection = ({ onComplete }) => {
  const [error, setError] = useState("");

  const handleFileChange = (event) => {
    upload(event.target.files[0]);
  };

  const upload = async (selectedFile) => {
    const formData = new FormData();
    formData.append("file", selectedFile);

    api
      .upload("/upload", formData)
      .then((res) => {
        const hasData = res.data.rows.length > 0;
        if (hasData) {
          onComplete(res.data);
        } else {
          setError("The file does not contain any record.");
        }
      })
      .catch((err) => {
        if (err.code === 1) {
          setError(err.msg);
        }
      });
  };

  const fileExtension = ".xlsx";

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  return (
    <Container maxWidth="sm">
      <Box display="flex" flexDirection="column" alignItems="left" justifyContent="center">
        <Typography variant="body1" gutterBottom style={{ marginBottom: "1rem" }}>
          Upload an Excel file({fileExtension}) that includes patient information and findings.
        </Typography>
        <Box display="flex" flexDirection="column">
          <Button component="label" role={undefined} variant="contained" tabIndex={-1} startIcon={<CloudUploadIcon />}>
            Upload file
            <VisuallyHiddenInput type="file" accept={fileExtension} onChange={handleFileChange} />
          </Button>
          {error && (
            <Typography variant="body2" color="error" style={{ marginTop: "1rem" }}>
              {error}
            </Typography>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default UploadSection;
