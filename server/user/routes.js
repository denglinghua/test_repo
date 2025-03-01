import express from "express";
import userController from "./controllers/UserController.js";
import schemaValidator from "../common/middlewares/SchemaValidationMiddleware.js";
import loginPayload from "./schemas/loginPayload.js";

const router = express.Router();

router.post(
  "/login",
  [[schemaValidator.verify(loginPayload)]],
  userController.login
);

export default router;
