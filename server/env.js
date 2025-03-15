function isDev() {
  return process.env.NODE_ENV === 'dev';
}

function logLevel() {
  return process.env.LOG_LEVEL || 'info';
}

export default { isDev, logLevel };