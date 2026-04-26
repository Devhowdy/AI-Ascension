/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Orbitron", "sans-serif"],
        body: ["Rajdhani", "sans-serif"],
      },
      colors: {
        ember: "#ff7a2f",
        flare: "#ffd166",
        plasma: "#78f3ff",
        void: "#05070d",
        steel: "#9eb4d1",
      },
      boxShadow: {
        arena: "0 0 0 1px rgba(120,243,255,0.18), 0 28px 80px rgba(5,7,13,0.7)",
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(rgba(120,243,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(120,243,255,0.08) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};
