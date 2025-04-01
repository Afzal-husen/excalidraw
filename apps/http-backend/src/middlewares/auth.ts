import { RequestHandler } from "express";
import { CustomError } from "../errors/custom-error";
import jwt, { JwtPayload } from "jsonwebtoken";

interface CustomJwtPayload extends JwtPayload {
  userId: string;
}

const authenticateUser: RequestHandler = (req, res, next) => {
  const authorization = req.headers.authorization;

  if (authorization && !authorization.startsWith("Bearer ")) {
    return next(new CustomError(401, "Unauthorized"));
  }

  const token = authorization?.split(" ")[1];

  if (!token) return next(new CustomError(401, "Unauthorized"));

  const decoded = jwt.verify(token, "secret_key") as CustomJwtPayload;

  req.userId = decoded.userId;

  next();
};

export { authenticateUser };
