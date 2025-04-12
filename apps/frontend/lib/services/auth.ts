const signUp = async (username: string, email: string, password: string) => {
  try {
    const response = await fetch("http://localhost:3001/api/v1/signup", {
      method: "POST",
      body: JSON.stringify({ username, email, password }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
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
    };
  } catch (error) {
    console.error(error);
    return {
      error: true,
      message: "An unknown error occurred",
    };
  }
};

const signIn = async (email: string, password: string) => {
  try {
    const response = await fetch("http://localhost:3001/api/v1/signin", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
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
      token: data.token,
    };
  } catch (error) {
    console.error(error);
    return {
      error: true,
      message: "An unknown error occurred",
    };
  }
};
export { signUp, signIn };
