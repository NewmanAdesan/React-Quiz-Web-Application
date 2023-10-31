/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height: {
        "header-height": "140px",
        "main-height": "calc(100vh - 140px)"
      },
      width: {
        "options-width": "calc(100% - 1rem)",
      }
    },
  },
  plugins: [],
}