const successResponse = (res, code, message, datas) => {
  return res.status(code).json({
    success: true,
    message,
    data: datas,
  });
};

const errorResponse = (res, code, message, data) => {
  return res.status(code).json({
    success: false,
    message,
    data,
  });
};

export { successResponse, errorResponse };
