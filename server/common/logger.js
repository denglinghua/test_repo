import winston from "winston";
import env from "../env.js";

const logger = winston.createLogger({
  level: env.logLevel(),
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.prettyPrint()
  ),
  transports: [
    new winston.transports.File({
      filename: "./logs/error.log",
      level: "error",
    }),
    // new winston.transports.File({ filename: "./logs/info.log", level: "info" }), // info only?
    new winston.transports.Console(),
  ],
});

function info(message, ...args) {
  logger.info(message, args);
}

function error(message, err) {
  logger.error(message, err);
}

export default { info, error };
