import { z } from "zod";

export const signupSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be atleast 3 characters" }),
  email: z
    .string()
    .email({ message: "Invalid email, please provide valid email" }),
  password: z
    .string()
    .min(6, { message: "Password must be atleast 6 characters" }),
});

export const signinSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email, please provide valid email" }),
  password: z
    .string()
    .min(6, { message: "Password must be atleast 6 characters" }),
});

export type Tsignup = z.infer<typeof signupSchema>;
export type Tsignin = z.infer<typeof signinSchema>;
