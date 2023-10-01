"use client";
import { ThemeProvider } from "next-themes";
import React, { useEffect, useState } from "react";

type Props = {
  children: React.ReactNode;
};
export default function MyThemeProvider({ children }: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <></>;
  }

  return <ThemeProvider>{children}</ThemeProvider>;
}
