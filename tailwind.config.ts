import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#FAFAF9',
        'text-primary': '#111827',
        'text-secondary': '#6B7280',
        accent: '#2F855A',
        card: '#FFFFFF',
        border: '#E5E7EB',
      },
      fontFamily: {
        cabin: ['var(--font-cabin)', 'sans-serif'],
        inter: ['var(--font-inter)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
