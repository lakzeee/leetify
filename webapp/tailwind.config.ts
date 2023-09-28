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
    themes: ["night", "winter"], // true: all themes | false: only light + dark | array: specific themes like this ["light", "dark", "cupcake"]
    darkTheme: "night", // name of one of the included themes for dark mode
  },
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      orange: {
        "50": "#fff5ed",
        "100": "#ffe9d4",
        "200": "#ffcea8",
        "300": "#ffab71",
        "400": "#ff8a4c",
        "500": "#fe5911",
        "600": "#ef3f07",
        "700": "#c62b08",
        "800": "#9d240f",
        "900": "#7e2110",
        "950": "#440d06",
      },
    },
  },
};
export default config;
