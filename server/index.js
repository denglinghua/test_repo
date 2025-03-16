import express from "express";
import cors from "cors";
import morgan from "morgan";
import env from "./env.js";
import userRoutes from "./user/routes.js";
import evaluateRoutes from "./evaluate/routes.js";
import exportRoutes from "./evaluate/exportRoutes.js";
import authMiddleware from "./common/middlewares/IsAuthenticatedMiddleware.js";
import globalError from "./common/middlewares/GlobalErrorHandleMiddleware.js";
import delayMiddleware from "./common/middlewares/delayMiddleware.js";
import logger from "./common/logger.js";
import db from "./db/database.js";

const app = express();

if (env.isDev()) {
  // Middleware that logs the incoming requests to the console.
  app.use(morgan("tiny"));
  // simulate newtwork delay in development mode
  // this is useful to test the UI loading states
  logger.info("Delay middleware enabled");
  app.use(delayMiddleware);
}

// Middleware that enables CORS for all the incoming requests.
app.use(cors());

// Middleware that parses the body payloads as JSON to be consumed next set
// of middlewares and controllers.
app.use(express.json());

// unauthenticated routes
app.use("/", userRoutes);
app.use("/", exportRoutes);

// add auth middleware, the above one is public and the following ones authentication is required
app.use("/", authMiddleware.check);

app.use("/", evaluateRoutes);

// global error handler, keep this at the end of the middleware stack
app.use(globalError);

db.init();

const port = env.port();
app.listen(port, () => {
  logger.info("Server Listening on PORT: " + port);
});
