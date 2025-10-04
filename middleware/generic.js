export const handleGenericErrors = (err, req, res, next) => {

  if (err.name === "NotFoundError") {
    return res.status(404).json({
      success: false,
      message: err.message
    });
  }

  if (err.name === "Error" && err.message === "no jwt secret") {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }

  if (err) {
    return res.status(500).json({
      success: false,
      message: `Unhandled error: ${err.name}, ${err.message}`,
    });
  }

  next(err);
}
