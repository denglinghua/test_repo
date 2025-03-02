import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  Input,
  FormControl,
  FormHelperText,
} from "@mui/material";
import api from "../utils/api";

const UploadSection = ({ onComplete }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState("");

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("file", selectedFile);

    const response = api
      .upload("/upload", formData)
      .then((res) => {
        onComplete(res.data);
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
      <Box
        display="flex"
        flexDirection="column"
        alignItems="left"
        justifyContent="center"
      >
        <Typography
          variant="body1"
          gutterBottom
          style={{ marginBottom: "2rem" }}
        >
          Upload an Excel file({fileExtension}) that includes patient
          information and findings.
        </Typography>
        <form onSubmit={handleFileUpload}>
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
