module.exports = (res, message, data, token, status = {}) => {
  res.status(200);
  res.json({
    data,
    message,
    status,
    token,
  });
};
