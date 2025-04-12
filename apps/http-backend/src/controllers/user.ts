import { prisma } from "@repo/db";
import {
  createRoomSchema,
  signinSchema,
  signupSchema,
} from "@repo/validations";
import { RequestHandler } from "express";
import bcrypt from "bcryptjs";
import { CustomError } from "../errors/custom-error";
import jwt from "jsonwebtoken";

const signup: RequestHandler = async (req, res, next) => {
  try {
    console.log(req.body);
    const body = req.body;
    const parsedBody = signupSchema.safeParse(body);
    if (!parsedBody.success)
      return next(new CustomError(400, "Invalid inputs"));

    const hashedPassword = await bcrypt.hash(parsedBody.data.password, 10);

    const createdUser = await prisma.user.create({
      data: {
        email: parsedBody.data.email,
        username: parsedBody.data.username,
        password: hashedPassword,
      },
    });

    res.status(201).json({
      error: false,
      message: "User signup successful",
      user: createdUser,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const login: RequestHandler = async (req, res, next) => {
  try {
    const parsedBody = signinSchema.safeParse(req.body);
    if (!parsedBody.success)
      return next(new CustomError(400, "Invalid inputs"));
    const foundUser = await prisma.user.findFirst({
      where: { email: parsedBody.data.email },
    });

    if (!foundUser) return next(new CustomError(404, "User not found"));

    const isPasswordMatch = await bcrypt.compare(
      parsedBody.data.password,
      foundUser?.password,
    );

    if (!isPasswordMatch)
      return next(new CustomError(401, "Invalid credentials"));

    const token = jwt.sign({ userId: foundUser.id }, "secret_key");

    res
      .cookie("token", token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
      })
      .status(200)
      .json({
        error: false,
        message: "Login successful",
        token,
        user: foundUser,
      });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const createRoom: RequestHandler = async (req, res, next) => {
  try {
    const parsedBody = createRoomSchema.safeParse(req.body);
    const userId = req.userId;
    if (!userId) return next(new CustomError(401, "Unauthorized"));
    if (!parsedBody.success)
      return next(new CustomError(400, parsedBody.error.message));

    const createdRoom = await prisma.room.create({
      data: {
        name: parsedBody.data.name,
        user_id: userId,
      },
    });

    res.status(201).json({
      error: false,
      message: "Room created successfully",
      room: createdRoom,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getRooms: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.userId;
    if (!userId) return next(new CustomError(401, "Unauthorized"));

    const rooms = await prisma.room.findMany({
      where: { user_id: userId },
    });
    res.status(200).json({
      error: false,
      rooms,
    });
  } catch (error) {
    next(error);
  }
};

const getRoomShapes: RequestHandler = async (req, res, next) => {
  try {
    const roomName = req.params.room_name;
    if (!roomName) return next(new CustomError(400, "Room name is required"));

    const shapes = await prisma.shape.findMany({
      where: { room_id: roomName },
    });

    res.status(200).json({
      error: false,
      shapes,
    });
  } catch (error) {
    next(error);
  }
};

export { signup, login, createRoom, getRooms, getRoomShapes };
