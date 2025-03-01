import Ajv from "ajv";
import addFormats from "ajv-formats";
import response from "../response.js";

const ajv = new Ajv();
addFormats(ajv);

export default {
  /**
   * @description Compiles the schema provided in argument and validates the data for the
   * compiled schema, and returns errors if any
   *
   * @param {Object} schema - AJV Schema to validate against
   *
   * @returns {Function} - Express request handler
   */
  verify: (schema, source = "body") => {
    if (!schema) {
      throw new Error("Schema not provided");
    }

    return (req, res, next) => {
      const where = source === "body" ? req.body : req.query;
      const validate = ajv.compile(schema);
      const isValid = validate(where);

      if (isValid) {
        return next();
      }

      return response.error(res, 400, "Invalid request data", {
        error: `Invalid Payload: ${ajv.errorsText(validate.errors)}`,
      });
    };
  },
};
