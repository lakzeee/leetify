import "./globals.css";
import type { Metadata } from "next";
import ToasterProvider from "@/Components/providers/ToasterProvider";
import React from "react";
import MyThemeProvider from "@/Components/providers/MyThemeProvider";

export const metadata: Metadata = {
  title: "Leetify",
  description: "Elevate Your Coding Interview Preparation",
};
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ToasterProvider />
        <MyThemeProvider>{children}</MyThemeProvider>
      </body>
    </html>
  );
}
