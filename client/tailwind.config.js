/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        studio: {
          bg: '#F8FAFC',
          surface: '#FFFFFF',
          text: '#0F172A',
          muted: '#475569',
          border: '#E2E8F0',
        },
        corporate: {
          blue: '#0066CC',
          'blue-light': '#E0F2FE',
          'blue-hover': '#0052A3',
          sky: '#0284C7',
          cyan: '#0EA5E9',
        },
        toshiba: {
          red: '#DC2626',
          hover: '#B91C1C',
        }
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        heading: ['Outfit', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(15, 23, 42, 0.06)',
        'card': '0 10px 30px rgba(15, 23, 42, 0.08)',
        'blue': '0 8px 24px rgba(0, 102, 204, 0.18)',
      }
    },
  },
  plugins: [],
}
