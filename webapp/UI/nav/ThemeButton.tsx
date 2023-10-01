"use client";
import React, { useEffect, useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";
import { useTheme } from "next-themes";

export default function ThemeButton() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (theme === "night") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  function setNightMode() {
    setTheme("night");
    document.documentElement.classList.add("dark");
  }

  function setDayMode() {
    setTheme("winter");
    document.documentElement.classList.remove("dark");
  }

  if (!mounted) {
    return null;
  }

  return (
    <>
      {theme == "night" ? (
        <button
          className="btn btn-md btn-ghost btn-circle"
          onClick={() => setDayMode()}
        >
          <FiMoon className="w-5 h-5" />
        </button>
      ) : (
        <button
          className="btn btn-md btn-ghost btn-circle"
          onClick={() => setNightMode()}
        >
          <FiSun className="w-5 h-5" />
        </button>
      )}
    </>
  );
}
