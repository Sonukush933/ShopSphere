import { ErrorRequestHandler } from "express";
import ApiError from "../utils/ApiError";

const errorMiddleware: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      statusCode: err.statusCode,
      success: err.success,
      message: err.message,
      errors: err.errors,
    });
  }

  console.log(err);

  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
}

export default errorMiddleware;