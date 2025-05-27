// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundSize: {
        // give us a bg-size-200 utility → background-size: 200% 200%
        'size-200': '200% 200%',
      },
      keyframes: {
        'gradient-pan': {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%':      { 'background-position': '100% 50%' },
        },
      },
      animation: {
        'gradient-pan': 'gradient-pan 15s ease infinite',
      },
    },
  },
  plugins: [],
};
