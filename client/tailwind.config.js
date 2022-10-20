/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        marvel: ["Marvel", "sans-serif"],
      },
      boxShadow: {
        'full': '4px 4px 2px 1px rgba(0, 0, 0, 1)',
      }
    },
  },
  plugins: [],
}
