"use server";

import { cookies } from "next/headers";
const getToken = async (): Promise<string | null> => {
  try {
    const cookieStore = await cookies();
    console.log(cookieStore);
    const token = cookieStore.get("token");
    return token?.value ?? null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export { getToken };
