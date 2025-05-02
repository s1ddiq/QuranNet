"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, ToasterProps } from "sonner";

export const Toaster = (props: ToasterProps) => {
  const { theme = "system", resolvedTheme = "light" } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      style={
        {
          // Always produce a color string, never `false`
          "--normal-bg": isDark ? "#27272A" : "#fff7ebff",
          "--normal-text": isDark ? "#fff" : "#000",
          "--normal-border": "transparent",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};
