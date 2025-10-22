/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        brand: "var(--color-brand)",
        secondary: "var(--color-secondary)",
        "brand-hover": "var(--brand-hover)",
        "accent": "var(--color-accent)",
        "red-500": "#FF3D32",
        "red-900": "#661814",
        "green-500": "#22C55E",
        "green-600": "#1DA750",
        "surface-0": "rgb(var(--color-surface-0))",
        "surface-50": "rgb(var(--color-surface-50))",
        "surface-100": "rgb(var(--color-surface-100))",
        "surface-200": "rgb(var(--color-surface-200))",
        "surface-300": "rgb(var(--color-surface-300))",
        "surface-400": "rgb(var(--color-surface-400))",
        "surface-500": "rgb(var(--color-surface-500))",
        "surface-600": "rgb(var(--color-surface-600))",
        "surface-700": "rgb(var(--color-surface-700))",
        "surface-800": "rgb(var(--color-surface-800))",
        "surface-900": "rgb(var(--color-surface-900))",
        "surface-950": "rgb(var(--color-surface-950))",
        icon: "var(--color-icon)",
      },
      container: {
        center: true,
      },
      borderRadius: {
        "2.5xl": "20px",
        "15px": "15px",
      },
      padding: {
        4.5: "18px",
      },
      margin: {
        4.5: "18px",
      },
      height: {
        4.5: "18px",
      },
      width: {
        4.5: "18px",
      },
      gap: {
        4.5: "18px",
      },
      space: {
        4.5: "18px",
      },
      screens: {
        "2xl": "1440px",
        "4xl": "1920px"
      },
      lineHeight: {
        "full": "100%",
      },
    },
  },
  darkMode: "class",
  plugins: [require("tailwindcss-primeui")],
};
