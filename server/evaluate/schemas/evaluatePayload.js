export default {
  type: "object",
  properties: {
    fileId: {
      type: "string",
    },
    rowIndex: {
      type: "number",
    },
    accuracyRating: {
      type: "number",
    },
    qualityRating: {
      type: "number",
    },
    comment: {
      type: "string",
    },
  },
  required: ["fileId", "rowIndex", "accuracyRating", "qualityRating", "comment"],
  additionalProperties: false,
};
