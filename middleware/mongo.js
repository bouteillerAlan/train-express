export const handleMongoErrors = (err, req, res, next) => {
  if (err.name === "ValidationError") {
    const errors = Object.values(err.errors).map(val => ({
      field: val.path,
      message: val.message
    }));
    return res.status(400).json({
      success: false,
      message: "Validation error",
      errors
    });
  }

  if (err.name === "StrictPopulateError") {
    return res.status(500).json({
      success: false,
      message: "Populate error",
      errors: []
    });
  }

  if (err.name === "ReferenceError") {
    return res.status(500).json({
      success: false,
      message: "Reference error",
      errors: [err.message]
    });
  }

  next(err);
}
