/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4f46e5',
        'primary-dark': '#4338ca',
        secondary: '#10b981',
        background: '#f3f4f6',
        surface: '#ffffff',
        'text-primary': '#1f2937',
        'text-secondary': '#6b7280',
      }
    },
  },
  plugins: [],
}