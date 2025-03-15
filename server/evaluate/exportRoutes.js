import express from "express";
import evaluateController from "./controllers/EvaluateController.js";

const router = express.Router();

// why separate route for export?
// because the export route is not authenticated
router.get("/export/:fileId", evaluateController.exportExcel);

export default router;