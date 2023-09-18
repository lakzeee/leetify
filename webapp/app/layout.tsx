import "./globals.css";
import type { Metadata } from "next";
import ToasterProvider from "@/Components/providers/ToasterProvider";
import React from "react";

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
        <main>{children}</main>
      </body>
    </html>
  );
}
