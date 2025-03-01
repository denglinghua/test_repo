import jwt from "jsonwebtoken";
import logger from "../logger.js";

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
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
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
