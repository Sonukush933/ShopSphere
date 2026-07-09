import { ErrorRequestHandler } from "express";
import ApiError from "../utils/ApiError";
import logger from '../logs/logger';

const errorMiddleware: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      statusCode: err.statusCode,
      success: err.success,
      message: err.message,
      errors: err.errors,
    });
  }

logger.error(err.stack || err.message);

return res.status(500).json({
  success: false,
  message: "Internal Server Error",
});
}

export default errorMiddleware;