import { getToken } from "../get-token";
import { Room } from "@repo/db";
const createCanvas = async (name: string, token: string) => {
  try {
    const response = await fetch("http://localhost:3001/api/v1/room", {
      method: "POST",
      body: JSON.stringify({ name }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      const errorResponse = await response.json();
      return {
        error: true,
        message: errorResponse.message,
      };
    }
    const data = await response.json();
    return {
      error: false,
      message: data.message,
      room: data.room,
    };
  } catch (error) {
    console.error(error);
    return {
      error: true,
      message: "An unknown error occurred",
    };
  }
};

const getRooms = async () => {
  try {
    const token = await getToken();
    if (!token) {
      return {
        error: true,
        message: "Please login to get your rooms",
      };
    }
    const response = await fetch("http://localhost:3001/api/v1/rooms", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      const errorResponse = await response.json();
      return {
        error: true,
        message: errorResponse.message,
      };
    }
    const data = await response.json();
    return {
      error: false,
      message: data.message,
      rooms: data.rooms as Room[],
    };
  } catch (error) {
    console.error(error);
    return {
      error: true,
      message: "An unknown error occurred",
    };
  }
};

export { createCanvas, getRooms };
