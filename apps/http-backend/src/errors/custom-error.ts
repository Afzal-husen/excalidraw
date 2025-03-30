export class CustomError extends Error {
  statusCode: number = 500;
  message: string;
  errorCode?: string;
  constructor(statusCode: number, message: string, errorCode?: string) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
    this.errorCode = errorCode;

    Error.captureStackTrace(this, this.constructor);
  }

  toJSON() {
    return {
      error: true,
      message: this.message,
      errorCode: this.errorCode,
      ...(process.env.NODE_ENV === "development" && { stack: this.stack }),
      ...(this.statusCode && { code: this.statusCode }),
    };
  }
}
