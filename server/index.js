import express from "express";
import cors from "cors";
import morgan from "morgan";
import "./evnconfig.js";
import config from "./config.js";
import userRoutes from "./user/routes.js";
import evaluateRoutes from "./evaluate/routes.js";
import authMiddleware from "./common/middlewares/IsAuthenticatedMiddleware.js";
import globalError from "./common/middlewares/GlobalErrorHandleMiddleware.js";
import delayMiddleware from "./common/middlewares/delayMiddleware.js";
import logger from "./common/logger.js";
import db from "./db/database.js";

const app = express();

const port = process.env.PORT || config.port;

// Middleware that logs the incoming requests to the console.
app.use(morgan("tiny"));
// Middleware that enables CORS for all the incoming requests.
app.use(cors());

// Middleware that parses the body payloads as JSON to be consumed next set
// of middlewares and controllers.
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  // simulate newtwork delay in development mode
  app.use(delayMiddleware);
}

app.use("/", userRoutes);

// add auth middleware, the above one is public and the following ones authentication is required
app.use("/", authMiddleware.check);

app.use("/", evaluateRoutes);

// global error handler, keep this at the end of the middleware stack
app.use(globalError);

db.init();

app.listen(port, () => {
  logger.info("Server Listening on PORT: " + port);
});
