"use client";
import React, { useEffect } from "react";
import { FiMoon, FiSun } from "react-icons/fi";
import { useLocalStorage } from "usehooks-ts";

export default function ThemeButton() {
  const [theme, setTheme] = useLocalStorage("color-theme", "night");
  const toggleTheme = () => {
    if (theme === "night") {
      setTheme("winter");
    } else if (theme === "winter") {
      setTheme("night");
    }
  };

  useEffect(() => {
    const body = document.documentElement;
    body.setAttribute("data-theme", theme);
    if (theme === "winter") {
      document.documentElement.classList.remove("dark");
    } else {
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
