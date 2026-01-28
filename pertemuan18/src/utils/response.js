const succesResponse = (res, code, message, data) => {
  return res.status(code).json({
    success: true,
    message,
    data,
  });
};

const errorResponse = (res, code, message) => {
  return res.status(code).json({
    success: false,
    message,
  });
};

module.exports = {
  succesResponse,
  errorResponse,
};
