import { ErrorRequestHandler } from "express";
import { CustomError } from "../errors/custom-error";
import { Prisma } from "@repo/db";

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

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002" && err.meta?.target) {
      statusCode = 400;
      message = `Duplicate ${err.meta.target}`;
      errorCode = "VIOLATING_UNIQUE_CONSTRAINT";
    }
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
