import React, { useState } from "react";
import { Container, Typography, Box, Button, Input } from "@mui/material";

const UploadSection = ({ onFileUpload }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      alert("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    onFileUpload(formData);
  };

  const fileExtension = ".xlsx";

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="left"
        justifyContent="center"
      >
        <Typography variant="body1" gutterBottom style={{ marginBottom: "2rem" }}>
          Upload an Excel file({fileExtension}) that includes patient information and findings.
        </Typography>
        <form onSubmit={handleFileUpload}>
          <Box
            display="flex"
            flexDirection="column"
          >
            <Input
              type="file"
              onChange={handleFileChange}
              inputProps={{ accept: fileExtension }}
              style={{ marginBottom: "1rem" }}
            />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={!selectedFile}
              style={{ marginTop: "1rem" }}
            >
              Upload File
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default UploadSection;
