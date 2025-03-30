import { ErrorRequestHandler } from "express";
import { CustomError } from "../errors/custom-error";

interface ErrorResponse {
  error: boolean;
  message: string;
  stack?: string;
  code?: number;
  errorCode?: string;
}

process.on("unhandledRejection", (reason, promise) => {
  console.log("Unhandled Rejection at:", promise, "reason:", reason);
});

process.on("uncaughtException", (error) => {
  console.log("Uncaught Exception:", error);
});

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  let statusCode = 500;
  let message = "Something went wrong";
  let errorCode = "INTERNAL_SERVER_ERROR";

  if (err instanceof CustomError) {
    statusCode = err.statusCode;
    message = err.message;
    errorCode = err.errorCode || "INTERNAL_SERVER_ERROR";
  }

  const errorResponse: ErrorResponse = {
    error: true,
    message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    ...(statusCode && { code: statusCode }),
    ...(errorCode && { errorCode }),
  };

  res.status(statusCode).json(errorResponse);
};
