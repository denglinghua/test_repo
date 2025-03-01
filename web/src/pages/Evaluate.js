import React, { useState } from "react";
import { Container, Typography, Box, Button, Input } from "@mui/material";
import UploadSection from "../components/UploadSection";
import EvaluateSection from "../components/EvaluateSection";
import api from "../utils/api";

const Evaluate = () => {
  const [currentStep, setCurrentStep] = useState("upload");
  const [data, setData] = useState([]);

  const handleFileUpload = async (formData) => {
    const response = api.upload("/upload", formData).then((res) => {
      setData(addEvaluationInfo(res.data));
      setCurrentStep("evaluate");
    });
  };

  const addEvaluationInfo = function (data) {
    data.forEach((item) => {
      item.evaluation = {
        clinicalAccuracy: 0,
        overallQuality: 0,
        comment: "",
      };
    });
    return data;
  }

  return (
    <Container>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="80vh"
      >
        {currentStep === "upload" && <UploadSection onFileUpload={handleFileUpload} />}

        {currentStep === "evaluate" && <EvaluateSection data={data} />}

        {currentStep === "export" && (
          <Typography variant="h4" gutterBottom>
            Export Page
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default Evaluate;
