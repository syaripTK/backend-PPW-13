const respond = (res, code, status, message, data) => {
  res.status(code).json({
    status,
    message,
    data,
  });
};

export { respond };
