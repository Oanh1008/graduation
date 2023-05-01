/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      textShadow: {
        'default': '2px 2px 4px rgba(0, 0, 0, 0.5)',
        'lg': '3px 3px 6px rgba(0, 0, 0, 0.5)',
        'xl': '4px 4px 8px rgba(0, 0, 0, 0.5)',
      },
      container: {
        center: true,
        screens: {
          sm: '540px',
          md: '	720px',
          lg: '896px',
          xl: '1024px',
          '2xl': '1240px  ',
        },
      },
    },
  },
  plugins: [],
}