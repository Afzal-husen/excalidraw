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

export { createCanvas };
