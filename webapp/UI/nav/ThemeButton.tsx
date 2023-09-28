"use client";
import React, { useEffect, useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";
import { useThemeStore } from "@/Components/hooks/useThemeStore";

export default function ThemeButton() {
  const [theme, setTheme] = useState("");
  const { toggleNightMode } = useThemeStore();
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
      toggleNightMode(false);
    } else if (theme == "night") {
      localStorage.setItem("theme", "night");
      document.documentElement.classList.add("dark");
      toggleNightMode(true);
    }
  }, [theme, toggleNightMode]);

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
