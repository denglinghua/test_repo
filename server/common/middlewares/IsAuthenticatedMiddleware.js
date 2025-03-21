import jwt from "jsonwebtoken";
import env from "../../env.js";
import logger from "../logger.js";

// Stateless Authentication (Token-Based Authentication), not cookie-based authentication
// it suits well for RESTful APIs, which can be consumed by any client
export default {
  check: (req, res, next) => {
    const authHeader = req.headers["authorization"];

    // IF no auth headers are provided
    // THEN return 401 Unauthorized error
    if (!authHeader) {
      return res.status(401).json({
        status: false,
        error: {
          message: "Auth headers not provided in the request.",
        },
      });
    }

    // IF bearer auth header is not provided
    // THEN return 401 Unauthorized error
    if (!authHeader.startsWith("Bearer")) {
      return res.status(401).json({
        status: false,
        error: {
          message: "Invalid auth mechanism.",
        },
      });
    }

    const token = authHeader.split(" ")[1];

    // IF bearer auth header is provided, but token is not provided
    // THEN return 401 Unauthorized error
    if (!token) {
      return res.status(401).json({
        status: false,
        error: {
          message: "Bearer token missing in the authorization headers.",
        },
      });
    }

    // jwt verify method to verify the token
    const JWTSecret = env.JWTSecret();
    jwt.verify(token, JWTSecret, (err, user) => {
      if (err) {
        logger.error("Error while verifying token", err);
        return res.status(403).json({
          status: false,
          error: "Invalid access token provided, please login again.",
        });
      }

      req.user = user;
      next();
    });
  },
};
