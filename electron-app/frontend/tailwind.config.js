/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Sintra-inspired dark theme with tech focus
        background: '#0a0a0f',
        foreground: '#e8e8ef',
        primary: {
          DEFAULT: '#6366f1',
          foreground: '#ffffff',
        },
        secondary: {
          DEFAULT: '#1e1e2e',
          foreground: '#e8e8ef',
        },
        accent: {
          DEFAULT: '#22c55e',
          foreground: '#ffffff',
        },
        destructive: {
          DEFAULT: '#ef4444',
          foreground: '#ffffff',
        },
        muted: {
          DEFAULT: '#3a3a4e',
          foreground: '#a0a0b0',
        },
        border: '#2a2a3e',
        input: '#2a2a3e',
        ring: '#6366f1',
        card: {
          DEFAULT: '#14141f',
          foreground: '#e8e8ef',
        },
        // Agent-specific colors
        agent: {
          analyzer: '#8b5cf6',
          designer: '#ec4899',
          architect: '#3b82f6',
          builder: '#22c55e',
          security: '#f59e0b',
          performance: '#06b6d4',
          dataengineer: '#a855f7',
          integration: '#10b981',
          aiml: '#f97316',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
      },
    },
  },
  plugins: [],
}

