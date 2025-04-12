"use client";

import { useState, useEffect } from "react";

const useToken = () => {
  const [token, setToken] = useState<string | null>(null);
  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
  }, []);
  return token;
};

export { useToken };
