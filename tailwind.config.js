/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1890ff",
        secondary: "#f0f2f5",
      },
    },
  },
  plugins: [],
  // Disable Tailwind's base styles to prevent conflicts with Ant Design
  corePlugins: {
    preflight: false,
  },
};
