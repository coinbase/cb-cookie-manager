import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        sans: ['var(--font-coinbase-sans)'],
      },
      colors: {
        base: {
          white: 'rgba(255, 255, 255, 1)',
          black: 'rgb(50, 50, 50, 1)',
          blackInvert: 'rgb(205, 205, 205, 1)',
          gray: {
            10: 'rgb(238, 240, 243)',
            25: 'rgba(250, 250, 250, 1)',
            30: 'rgba(247, 247, 247, 1)',
            50: 'rgba(242, 242, 242, 1)',
            100: 'rgba(217, 217, 227, 1)',
            150: 'rgba(177, 183, 195, 1)',
            200: 'rgba(113, 120, 134, 1)',
          },
          blue: 'rgba(0, 0, 255, 1)',
          blueDark: '#7575FF',
          yellow: 'rgba(255, 210, 0, 1)',
          green: 'rgba(182, 245, 105, 1)',
          pink: 'rgba(254, 168, 205, 1)',
          'light-blue': 'rgba(60, 138, 255, 1)',
        },
      },
    },
  },
  plugins: [],
};
export default config;
