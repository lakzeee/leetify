import React, { useEffect } from "react";
import { FiMoon, FiSun } from "react-icons/fi";
import { useLocalStorage } from "usehooks-ts";

export default function ThemeButton() {
  //we store the theme in localStorage to preserve the state on next visit with an initial theme of dark.
  const [theme, setTheme] = useLocalStorage("color-theme", "night");

  //toggles the theme
  const toggleTheme = () => {
    if (theme === "night") {
      setTheme("winter");
      document.documentElement.classList.remove("dark");
    } else {
      setTheme("night");
      document.documentElement.classList.add("dark");
    }
  };

  //modify data-theme attribute on document.body when theme changes
  useEffect(() => {
    const body = document.documentElement;
    body.setAttribute("data-theme", theme);
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
