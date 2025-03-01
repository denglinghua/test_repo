import logger from "../logger.js";

function globalErrorHandler(err, req, res, next) {
  logger.error('global error handler', err);

  const errorMessage = err.message || "Something went wrong.";
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    error: errorMessage,
  });
}

export default globalErrorHandler;
