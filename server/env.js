import dotenv from "dotenv";

// Load the environment variables from the .env file
dotenv.config();

const requiredEnvVars = ["JWT_SECRET"];

function checkRequiredEnvVars() {
  requiredEnvVars.forEach((envVar) => {
    if (!process.env[envVar]) {
      throw new Error(`Missing required environment variable: ${envVar}`);
    }
  });
}

function isDev() {
  return !process.env.NODE_ENV || process.env.NODE_ENV === "dev";
}

function logLevel() {
  return process.env.LOG_LEVEL || "info";
}

function port() {
  return process.env.PORT || 3001;
}

function JWTSecret() {
  return process.env.JWT_SECRET;
}

checkRequiredEnvVars();

export default { isDev, logLevel, port, JWTSecret };
