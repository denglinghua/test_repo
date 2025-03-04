import React, { useState } from "react";
import { Container, Typography, Box, Button, Input, FormControl, FormHelperText } from "@mui/material";
import api from "../utils/api";

const UploadSection = ({ onComplete }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState("");

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = async (event) => {
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

  return (
    <Container maxWidth="sm">
      <Box display="flex" flexDirection="column" alignItems="left" justifyContent="center">
        <Typography variant="body1" gutterBottom style={{ marginBottom: "2rem" }}>
          Upload an Excel file({fileExtension}) that includes patient information and findings.
        </Typography>
        <Box display="flex" flexDirection="column">
          <FormControl error={!!error} style={{ marginBottom: "1rem" }}>
            <Input
              type="file"
              onChange={handleFileChange}
              inputProps={{ accept: fileExtension }}
              style={{ marginBottom: "1rem" }}
            />
            {error && <FormHelperText>{error}</FormHelperText>}
          </FormControl>
          <Button
            variant="contained"
            color="primary"
            onClick={handleFileUpload}
            disabled={!selectedFile}
            style={{ marginTop: "1rem" }}
          >
            Upload File
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default UploadSection;
