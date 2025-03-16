// for testing purpose, this middleware will delay the response for some time
// to simulate a slow network connection
// this is useful to test the UI loading states
// in production, this middleware should not be used
const delayMiddleware = (req, res, next) => {
  setTimeout(() => {
    next();
  }, 500);
};

export default delayMiddleware;