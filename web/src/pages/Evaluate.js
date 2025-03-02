import React, { useState } from "react";
import { Container, Box } from "@mui/material";
import UploadSection from "../components/UploadSection";
import EvaluateSection from "../components/EvaluateSection";
import ExportSection from "../components/ExportSection";
import api from "../utils/api";

const Evaluate = () => {
  const [currentStep, setCurrentStep] = useState("upload");
  const [fileInfo, setFileInfo] = useState([]);

  const handleFileUpload = async (formData) => {
    const response = api.upload("/upload", formData).then((res) => {
      addEvaluationInfo(res.data.rows);
      setFileInfo(res.data);
      setCurrentStep("evaluate");
    });
  };

  const addEvaluationInfo = function (rows) {
    rows.forEach((row) => {
      row.evaluation = {
        accuracyRating: 0,
        qualityRating: 0,
        comment: "",
      };
    });
    return rows;
  };

  const handleEvaluationComplete = () => {
    setCurrentStep("export");
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
        {currentStep === "upload" && (
          <UploadSection onFileUpload={handleFileUpload} />
        )}

        {currentStep === "evaluate" && <EvaluateSection file={fileInfo} onComplete={handleEvaluationComplete} />}

        {currentStep === "export" && <ExportSection file={fileInfo} />}
      </Box>
    </Container>
  );
};

export default Evaluate;
