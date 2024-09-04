/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
          fontFamily: {
              sans: ['Inter', 'sans-serif'],
            }
        },
        colors:{
            "primary": "#1d232a",
            "secondary": "#e21936",
            "tertiary": "#EDF2F4",
            "black": "#000000",
            "secondary-red": "#b5172f",
        }
    },
    plugins: [],
  }