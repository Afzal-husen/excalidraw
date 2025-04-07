"use client";

import { useTheme } from "next-themes";
import {
  Toaster as Sonner,
  ToasterProps,
  toast as sonnerToast,
  ExternalToast,
} from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      {...props}
    />
  );
};

const toast = ({
  type,
  message,
  options,
}: {
  type: "success" | "error" | "warning" | "info";
  message: string;
  options?: ExternalToast;
}) => {
  return sonnerToast[type](type.charAt(0).toUpperCase() + type.slice(1), {
    description: message,
    ...options,
  });
};

export { Toaster, toast };
