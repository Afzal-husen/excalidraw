import express, { type Express } from "express";
import {
  createRoom,
  getRooms,
  getRoomShapes,
  login,
  signup,
} from "../controllers/user";
import { authenticateUser } from "../middlewares/auth";

const router: Express = express();

router.post("/signup", signup);
router.post("/signin", login);
router.post("/room", authenticateUser, createRoom);
router.get("/rooms", authenticateUser, getRooms);
router.get("/shapes/:room_name", authenticateUser, getRoomShapes);

export default router;
