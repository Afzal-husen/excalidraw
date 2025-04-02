import { WebSocketServer, WebSocket } from "ws";
import { prisma, Shape } from "@repo/db";
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

const addShape = async (
  shapeString: string,
  room_name: string,
): Promise<Shape | null> => {
  try {
    const shape = await prisma.shape.create({
      data: {
        shape_type: shapeString,
        room: {
          connect: {
            name: room_name,
          },
        },
      },
    });
    return shape;
  } catch (error) {
    return null;
  }
};

wss.on("connection", async (socket, request) => {
  const authorization = request.headers.authorization;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    console.log("User not found");
    socket.close();
    return;
  }

  const token = authorization.split(" ")[1];

  if (!token) {
    console.log("User not found");
    socket.close();
    return;
  }

  const userId = await checkUser(token);

  if (!userId) {
    console.log("User not found");
    socket.close();
    return;
  }

  users.push({
    userId,
    socket,
    rooms: [],
  });

  socket.on("message", async (data) => {
    const parsedData = JSON.parse(data.toString());
    const { type, content, room_name } = parsedData;
    const user = users.find((x) => x.socket === socket);

    if (type === "join_room") {
      if (!user) {
        socket.close();
        return;
      }
      user.rooms.push(room_name);
      console.log("User joined room", room_name);
    } else if (type === "leave_room") {
      if (!user) {
        return;
      }
      user.rooms = user.rooms.filter((x) => x !== room_name);
    } else if (type === "draw") {
      const shapeString = JSON.stringify(content);
      const shape = {
        type,
        content: shapeString,
        room_name,
      };
      users.forEach((x) => {
        if (x.rooms.includes(room_name)) {
          x.socket.send(JSON.stringify(shape));
        }
      });

      await addShape(shapeString, room_name);
    }
  });
});
