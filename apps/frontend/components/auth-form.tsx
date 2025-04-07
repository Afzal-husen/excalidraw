"use client";

import {
  FormControl,
  FormMessage,
  FormField,
  FormItem,
  FormLabel,
  Form,
  Button,
  Input,
  Icons,
  toast,
} from "@repo/ui";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { useTransition } from "react";
import { signIn, signUp } from "@/lib/services/auth";
const signInSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const signUpSchema = z
  .object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    email: z.string().email("Please enter a valid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(100)
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number",
      ),
    confirmPassword: z.string(),
  })
  .refine(
    (data: { password: string; confirmPassword: string }) =>
      data.password === data.confirmPassword,
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    },
  );

type SignUpFormValues = z.infer<typeof signUpSchema>;
type SignInFormValues = z.infer<typeof signInSchema>;

type AuthFormProps = {
  type: "signup" | "login";
};

const AuthForm = ({ type }: AuthFormProps) => {
  const [isPending, startTransition] = useTransition();
  const form = useForm<SignUpFormValues | SignInFormValues>({
    resolver: zodResolver(type === "signup" ? signUpSchema : signInSchema),
    defaultValues:
      type === "signup"
        ? {
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
          }
        : {
            email: "",
            password: "",
          },
  });

  async function onSubmit(values: SignUpFormValues | SignInFormValues) {
    if (type === "signup") {
      startTransition(async () => {
        const { email, password, username } = values as SignUpFormValues;
        const { error, message } = await signUp(username, email, password);
        if (error) {
          toast({ type: "error", message });
        } else {
          toast({ type: "success", message });
        }
      });
    } else {
      startTransition(async () => {
        const { email, password } = values;
        const { error, message, token } = await signIn(email, password);
        if (error) {
          toast({ type: "error", message });
        } else {
          toast({ type: "success", message });
          localStorage.setItem("token", token);
        }
      });
    }
  }
  return (
    <div className="flex min-h-screen items-center justify-center bg-accent">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-background p-8 shadow-lg">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-foreground">
            {type === "signup"
              ? "Create your account"
              : "Sign in to your account"}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {type === "signup"
              ? "Already have an account?"
              : "Don't have an account?"}{" "}
            <Link
              href={type === "signup" ? "/login" : "/signup"}
              className="font-medium text-blue-600 hover:text-blue-500">
              {type === "signup" ? "Sign in" : "Sign up"}
            </Link>
          </p>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-8 space-y-6">
            {type === "signup" ? (
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="John Doe"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : null}

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email address</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      {...field}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      {...field}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {type === "signup" ? (
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        {...field}
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : null}

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? (
                <>
                  <Icons.Spinner className="mr-2 h-4 w-4" />
                  {type === "signup" ? "Sign up" : "Sign in"}
                </>
              ) : type === "signup" ? (
                "Sign up"
              ) : (
                "Sign in"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AuthForm;
