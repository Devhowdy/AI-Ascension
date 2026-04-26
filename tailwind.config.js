/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        abyss: '#060816',
        steel: '#0f1727',
        ember: '#ff8b4d',
        plasma: '#6ae6ff',
        pulse: '#89f7d8',
      },
      fontFamily: {
        display: ['Orbitron', 'system-ui', 'sans-serif'],
        body: ['Rajdhani', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 40px rgba(106, 230, 255, 0.2)',
        ember: '0 0 30px rgba(255, 139, 77, 0.25)',
      },
      backgroundImage: {
        arenaGrid:
          'radial-gradient(circle at center, rgba(106,230,255,0.16), transparent 40%), linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
};
