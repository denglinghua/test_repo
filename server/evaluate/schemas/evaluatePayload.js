export default {
  type: "object",
  properties: {
    fileName: {
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
  required: ["fileName", "rowIndex", "accuracyRating", "qualityRating", "comment"],
  additionalProperties: false,
};
