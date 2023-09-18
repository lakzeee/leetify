"use client";
import React, { useEffect, useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";

export default function ThemeButton() {
  const [theme, setTheme] = useState("night");
  const toggleTheme = () => {
    if (theme === "night") {
      setTheme("winter");
    } else if (theme === "winter") {
      setTheme("night");
    }
  };
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) setTheme(savedTheme);
  }, []);

  useEffect(() => {
    const body = document.documentElement;
    body.setAttribute("data-theme", theme);
    if (theme === "winter") {
      localStorage.setItem("theme", "winter");
      document.documentElement.classList.remove("dark");
    } else {
      localStorage.setItem("theme", "night");
      document.documentElement.classList.add("dark");
    }
  }, [theme]);

  return (
    <button className="btn btn-md btn-ghost btn-circle" onClick={toggleTheme}>
      {theme === "night" ? (
        <FiMoon className="w-5 h-5" />
      ) : (
        <FiSun className="w-5 h-5" />
      )}
    </button>
  );
}
