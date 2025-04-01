import { WebSocketServer, WebSocket } from "ws";
import { prisma } from "@repo/db";
import jwt from "jsonwebtoken";
const wss = new WebSocketServer({ port: 8080 });

interface CustomJwtPayload extends jwt.JwtPayload {
  userId: string;
}

type User = {
  userId: string;
  socket: WebSocket;
  rooms: string[];
};

const users: User[] = [];

const checkUser = async (token: string): Promise<string | null> => {
  try {
    const decoded = jwt.verify(token, "secret_key") as CustomJwtPayload;
    const userId = decoded.userId;
    if (!userId) {
      return null;
    }
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return null;
    }

    return user.id;
  } catch (error) {
    console.log(error);
    return null;
  }
};

wss.on("connection", async (socket, request) => {
  const authorization = request.headers.authorization;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return;
  }

  const token = authorization.split(" ")[1];

  if (!token) {
    return;
  }

  const userId = await checkUser(token);

  if (!userId) {
    return;
  }

  users.push({
    userId,
    socket,
    rooms: [],
  });

  socket.on("message", (data) => {
    const parsedData = JSON.parse(data.toString());
    const { type, content, room_name } = parsedData;
    const user = users.find((x) => x.socket === socket);

    if (type === "join_room") {
      if (!user) {
        return;
      }
      user.rooms.push(room_name);
    } else if (type === "leave_room") {
      if (!user) {
        return;
      }
      user.rooms = user.rooms.filter((x) => x !== room_name);
    } else if (type === "draw") {
    }
  });
});
