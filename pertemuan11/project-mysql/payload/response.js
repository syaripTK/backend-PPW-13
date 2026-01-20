const respond = (res, code, message, data) => {
  return res.status(code).json({
    message,
    data,
  });
};

export default respond;
