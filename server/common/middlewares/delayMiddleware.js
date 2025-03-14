// for testing purpose, this middleware will delay the response for 4 seconds
// to simulate a slow network connection
const delayMiddleware = (req, res, next) => {
  setTimeout(() => {
    next();
  }, 500);
};

export default delayMiddleware;