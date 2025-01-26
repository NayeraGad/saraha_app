const validation = (schema) => {
  return async (req, res, next) => {
    const inputData = { ...req.body, ...req.query, ...req.params};

    const validationResult = schema.validate(inputData, {
      abortEarly: false,
    });

    if (validationResult?.error) {
      return res.status(400).json(validationResult.error.details);
    }

    next();
  };
};

export default validation;
