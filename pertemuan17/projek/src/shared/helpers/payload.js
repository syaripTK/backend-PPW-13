const succesResponse = (res, code, message, data) => {
  return res.status(code).json({
    success: true,
    message,
    data,
  });
};

const errorResponse = (res, code, message, data = null) => {
  return res.status(code).json({
    success: false,
    message,
    data,
  });
};

const respond = (res, code, status, message, data) => {
  return res.status(code).json({
    status,
    message,
    data,
  });
};

module.exports = {
  succesResponse,
  errorResponse,
  respond
};
