import { prisma } from "@repo/db";
import { signinSchema, signupSchema } from "@repo/validations";
import { RequestHandler } from "express";
import bcrypt from "bcryptjs";
import { CustomError } from "../errors/custom-error";
import jwt from "jsonwebtoken";

const signup: RequestHandler = async (req, res, next) => {
  try {
    const body = req.body;
    const parsedBody = signupSchema.safeParse(body);
    if (!parsedBody.success)
      return next(new CustomError(400, parsedBody.error.message));

    const hashedPassword = await bcrypt.hash(parsedBody.data.password, 10);

    prisma.user.create({
      data: {
        email: parsedBody.data.email,
        username: parsedBody.data.username,
        password: hashedPassword,
      },
    });

    res.status(201).json({ error: false, message: "User signup successfull" });
  } catch (error) {
    next(error);
  }
};

const login: RequestHandler = async (req, res, next) => {
  try {
    const parsedBody = signinSchema.safeParse(req.body);
    if (!parsedBody.success) return;
    const foundUser = await prisma.user.findFirst({
      where: { email: parsedBody.data.email },
    });

    if (!foundUser) return next(new CustomError(404, "User not found"));

    const isPasswordMatch = bcrypt.compare(
      parsedBody.data.password,
      foundUser?.password,
    );

    if (!isPasswordMatch)
      return next(new CustomError(401, "Invalid credentials"));

    const token = jwt.sign({ userId: foundUser.id }, "secret_key");

    res.status(200).json({ error: false, message: "Login successful", token });
  } catch (error) {
    next(error);
  }
};

export { signup, login };
