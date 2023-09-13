import "./globals.css";
import type { Metadata } from "next";
import ToasterProvider from "@/Components/providers/ToasterProvider";
// import Nav from "@/UI/layout/nav";
import React from "react";
import Drawer from "@/UI/layout/drawer";
import dynamic from "next/dynamic";

const Nav = dynamic(() => import("../UI/layout/nav"), { ssr: false });
export const metadata: Metadata = {
  title: "Leetify",
  description: "Elevate Your Coding Interview Preparation",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="night" className="dark">
      <body>
        <ToasterProvider />
        <Nav />
        <Drawer />
        <main className="container mx-auto min-h-full px-4 pt-24 z-0">
          {children}
        </main>
      </body>
    </html>
  );
}
