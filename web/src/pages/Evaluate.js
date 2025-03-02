import React, { useState } from "react";
import { Container, Box, IconButton, Tooltip } from "@mui/material";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import UploadSection from "../components/UploadSection";
import EvaluateSection from "../components/EvaluateSection";
import ExportSection from "../components/ExportSection";

const Evaluate = () => {
  const [currentStep, setCurrentStep] = useState("upload");
  const [fileInfo, setFileInfo] = useState([]);

  const handleUploadComplete = async (data) => {
    addEvaluationInfo(data.rows);
    setFileInfo(data);
    setCurrentStep("evaluate");
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
  };

  const handleGotoUpload = () => {
    setCurrentStep("upload");
    setFileInfo([]);
  };

  return (
    <Container>
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        minHeight="80vh"
      >
        {currentStep !== "upload" && (
          <Tooltip title="Upload another file" placement="bottom">
            <IconButton onClick={handleGotoUpload}>
              <ArrowCircleLeftIcon style={{ fontSize: 40 }} />
            </IconButton>
          </Tooltip>
        )}
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          {currentStep === "upload" && (
            <UploadSection onComplete={handleUploadComplete} />
          )}

          {currentStep === "evaluate" && (
            <EvaluateSection
              file={fileInfo}
              onComplete={handleEvaluationComplete}
            />
          )}

          {currentStep === "export" && <ExportSection file={fileInfo} />}
        </Box>
      </Box>
    </Container>
  );
};

export default Evaluate;
