import React, { useState } from "react";
import { Container, Box, IconButton, Tooltip } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import UploadSection from "../components/UploadSection";
import EvaluateSection from "../components/EvaluateSection";
import ExportSection from "../components/ExportSection";

const Evaluate = () => {
  const [currentStep, setCurrentStep] = useState("upload");
  // after uploading a file which will be verified and parsed by the server
  // then sent back to the client as a response
  // after rows scoring, scores will be updated back to the server
  // client data will be used to export results sheet as data source
  // also, the data will be saved to the database. but currently, the database data is not used
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
              <CloudUploadIcon style={{ fontSize: 40 }} />
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
