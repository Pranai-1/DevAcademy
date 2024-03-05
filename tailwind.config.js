/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      // tailwind.config.js or your CSS file

      animation: {
        shimmer: 'shimmer 1s infinite linear',
        ray: 'ray 2s infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        ray: {
          '0%': { opacity: 0, transform: 'translateX(100%)' },
          '50%': { opacity: 1 },
          '100%': { opacity: 0, transform: 'translateX(-100%)' },
        },
      },


    },
  },
  plugins: [],
}