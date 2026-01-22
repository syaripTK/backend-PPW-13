const responSukses = (res, code, status, message, data) => {
  return res.status(code).json({
    status,
    message,
    data,
  });
};

const responError = (res, code, status, message) => {
  return res.status(code).json({
    status,
    message,
  });
};

export { responSukses, responError };
