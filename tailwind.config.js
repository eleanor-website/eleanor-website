/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        my_light:'#eae3dd',
        my_dark:'#5c1819',
        my_red:'#5c1819',
        my_red2:'#741e20',
      },
      fontFamily: {
        // Adding custom fonts
        Frank: [ "Frank Ruhl Libre", 'serif'],
        Lato: [ "Lato", 'serif']
      },
    },
  },
  plugins: [],
};
