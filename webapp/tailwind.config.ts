import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./ui/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/flowbite/**/*.js",
    "./node_modules/flowbite-react/**/*.js",
  ],
  plugins: [
    require("@tailwindcss/typography"),
    require("daisyui"),
    require("flowbite/plugin")({
      charts: true,
    }),
  ],
  daisyui: {
    themes: [
      "winter",
      {
        night: {
          ...require("daisyui/src/theming/themes")["[data-theme=night]"],
          "base-100": "#111827",
          success: "#2EC48D",
        },
      },
    ],
    darkTheme: "night",
  },
};
export default config;
