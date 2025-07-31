/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    safelist: [
    // Existing safelist entries
    'bg-emerald-100', 'bg-emerald-200', 'text-emerald-600', 'text-emerald-800', 'border-emerald-600', 'ring-emerald-500',
    'bg-blue-100', 'bg-blue-200', 'text-blue-600', 'text-blue-800', 'border-blue-600', 'ring-blue-500',
    'bg-purple-100', 'bg-purple-200', 'text-purple-600', 'text-purple-800', 'border-purple-600', 'ring-purple-500',
    'bg-orange-100', 'bg-orange-200', 'text-orange-600', 'text-orange-800', 'border-orange-600', 'ring-orange-500',
    'bg-green-100', 'bg-green-200', 'text-green-600', 'text-green-800', 'border-green-600', 'ring-green-500',
    'bg-indigo-100', 'bg-indigo-200', 'text-indigo-600', 'text-indigo-800', 'border-indigo-600', 'ring-indigo-500',
    'bg-yellow-100', 'bg-yellow-200', 'text-yellow-600', 'text-yellow-800', 'border-yellow-600', 'ring-yellow-500',
    'bg-red-100', 'bg-red-200', 'text-red-600', 'text-red-800', 'border-red-600', 'ring-red-500',
    // Additional color variations that might be needed
    'bg-emerald-500', 'bg-blue-500', 'bg-purple-500', 'bg-orange-500', 'bg-green-500', 'bg-indigo-500', 'bg-yellow-500', 'bg-red-500',
    'text-white', 'text-white/90', 'text-white/80', 'bg-white/20', 'border-white/30',
    // Animation classes
    'rotate-180'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554'
        },
        secondary: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
          950: '#042f2e'
        },
        accent: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
          950: '#431407'
        },
        gold: {
          50: '#fefce8',
          100: '#fef9c3',
          200: '#fef08a',
          300: '#fde047',
          400: '#facc15',
          500: '#eab308',
          600: '#ca8a04',
          700: '#a16207',
          800: '#854d0e',
          900: '#713f12',
          950: '#422006'
        },
        navy: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '112': '28rem',
        '128': '32rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'pulse-slow': 'pulse 3s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
