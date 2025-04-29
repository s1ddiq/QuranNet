"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system", resolvedTheme } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      style={
        {
          "--normal-bg": resolvedTheme === "dark" ? "#27272A" : "#73613fff",
          "--normal-text": resolvedTheme === "dark" ? "#000" : "#ffffff",
          "--normal-border": "transparent", // <-- remove border
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
