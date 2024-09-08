import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        "costum": "2px 0px 10px black",
        "secondary": "rgba(0, 0, 0, 0.04) 0px 3px 5px"
      },
    },
  },
  plugins: [],
};
export default config;
