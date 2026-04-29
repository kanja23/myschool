/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Primary — deep forest green (education, growth, trust)
        primary: {
          50:  '#f0f9f4',
          100: '#dcf1e6',
          200: '#bbe3ce',
          300: '#88cead',
          400: '#52b286',
          500: '#2e9468',
          600: '#1e7852',
          700: '#196043',
          800: '#174d37',
          900: '#14402e',
          950: '#0a2419',
        },
        // Accent — warm amber (warmth, highlights, CTAs)
        accent: {
          50:  '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        // Surface — warm off-whites for cards and backgrounds
        surface: {
          50:  '#fafaf8',
          100: '#f5f4f0',
          200: '#eeede8',
          300: '#e0dfd8',
          400: '#c8c6bc',
        },
        // CBC grade colours — used for EE/ME/AE/BE badges
        ee:  { bg: '#dcfce7', text: '#15803d', border: '#86efac' },
        me:  { bg: '#dbeafe', text: '#1d4ed8', border: '#93c5fd' },
        ae:  { bg: '#fef9c3', text: '#a16207', border: '#fde047' },
        be:  { bg: '#fee2e2', text: '#b91c1c', border: '#fca5a5' },
      },
      fontFamily: {
        // Display: elegant, trustworthy serif for headings
        display: ['Georgia', 'Cambria', 'Times New Roman', 'serif'],
        // Body: clean humanist sans for UI
        sans: ['DM Sans', 'system-ui', '-apple-system', 'sans-serif'],
        // Mono: for codes, IDs
        mono: ['JetBrains Mono', 'Menlo', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.65rem', { lineHeight: '1rem' }],
      },
      boxShadow: {
        'card':    '0 1px 3px 0 rgb(0 0 0 / 0.06), 0 1px 2px -1px rgb(0 0 0 / 0.06)',
        'card-md': '0 4px 6px -1px rgb(0 0 0 / 0.07), 0 2px 4px -2px rgb(0 0 0 / 0.07)',
        'card-lg': '0 10px 15px -3px rgb(0 0 0 / 0.08), 0 4px 6px -4px rgb(0 0 0 / 0.06)',
        'inner-sm': 'inset 0 1px 2px 0 rgb(0 0 0 / 0.05)',
      },
      borderRadius: {
        'xl2': '1rem',
        'xl3': '1.5rem',
      },
      animation: {
        'fade-in':     'fadeIn 0.3s ease-out',
        'slide-up':    'slideUp 0.3s ease-out',
        'slide-in':    'slideIn 0.25s ease-out',
        'pulse-soft':  'pulseSoft 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn:    { from: { opacity: '0' },                     to: { opacity: '1' } },
        slideUp:   { from: { opacity: '0', transform: 'translateY(8px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        slideIn:   { from: { opacity: '0', transform: 'translateX(-8px)' }, to: { opacity: '1', transform: 'translateX(0)' } },
        pulseSoft: { '0%, 100%': { opacity: '1' }, '50%': { opacity: '0.7' } },
      },
    },
  },
  plugins: [],
}
