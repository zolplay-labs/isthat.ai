import type { Config } from 'tailwindcss'
import { fontFamily } from 'tailwindcss/defaultTheme'
export default {
  darkMode: 'class',
  content: ['./app/**/*.tsx', './pages/**/*.tsx', './components/**/*.tsx'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans],
      },
    },
  },
  plugins: [],
} satisfies Config
