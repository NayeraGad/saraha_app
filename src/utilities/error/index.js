export const asyncHandler = (fn) => {
  return (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
};

export const globalErrorHandler = (err, req, res, next) => {
  return res.status(err["cause"] || 500).json({
    message: err.message,
    // stack: err.stack,
  });
};
