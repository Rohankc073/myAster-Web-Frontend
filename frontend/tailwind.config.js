/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./node_modules/flowbite/**/*.js",
    './index.html',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3579FF', // Define the primary color
      },
    },
  },
  plugins: [
    require('daisyui'),
    require('flowbite/plugin')
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#3579FF',
          secondary: '#F3F4F6', // Optional: Define a secondary color
          accent: '#3A4256', // Optional: Define an accent color
          neutral: '#3D4451', // Optional: Define a neutral color
          'base-100': '#FFFFFF', // Optional: Background color
          info: '#3ABFF8',
          success: '#36D399',
          warning: '#FBBD23',
          error: '#F87272',
        },
      },
    ],
    // Set the default theme to `mytheme`
    darkTheme: 'mytheme',
  },
};
