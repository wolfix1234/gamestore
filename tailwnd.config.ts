/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './pages/**/*.{js,ts,jsx,tsx,mdx}',
      './components/**/*.{js,ts,jsx,tsx,mdx}',
      './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
      extend: {
        fontFamily: {
          sans: ['Vazirmatn', 'sans-serif'],
          vazir: ['Vazirmatn', 'sans-serif'],
        },
        colors: {
          'electric-blue': '#00d4ff',
          'dark-blue': '#0099cc',
          'cyber-black': '#000000',
          'cyber-dark': '#0a0a0a',
          'cyber-gray': '#1a1a2e',
          'cyber-blue': '#16213e',
          'neon-blue': '#00ffff',
          'pure-white': '#ffffff',
          'text-primary': '#ffffff',
          'text-secondary': '#e5e5e5',
          'text-muted': '#b3b3b3',
        },
        backgroundColor: {
          'site': '#000000',
          'cyber': '#1a1a2e',
          'dark': '#16213e',
        },
        backgroundImage: {
          'cyber-gradient': 'linear-gradient(135deg, #000000 0%, #1a1a2e 50%, #16213e 100%)',
          'blue-gradient': 'linear-gradient(45deg, #00d4ff, #0099cc)',
          'neon-gradient': 'linear-gradient(90deg, #00d4ff, #00ffff, #0099cc)',
          'glass-gradient': 'linear-gradient(135deg, rgba(0, 0, 0, 0.7) 0%, rgba(26, 26, 46, 0.8) 100%)',
        },
        boxShadow: {
          'neon': '0 0 20px rgba(0, 212, 255, 0.4)',
          'neon-strong': '0 0 30px rgba(0, 212, 255, 0.7), 0 0 60px rgba(0, 212, 255, 0.3)',
          'cyber': '0 4px 20px rgba(0, 0, 0, 0.5)',
          'glow-blue': '0 0 25px rgba(0, 212, 255, 0.6)',
        },
        animation: {
          'pulse-neon': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
          'glow': 'glow 2s ease-in-out infinite alternate',
          'neon-pulse': 'neon-pulse 2s infinite',
          'text-flicker': 'text-flicker 3s infinite',
          'border-flow': 'border-flow 2s infinite',
          'fade-in': 'fadeIn 0.8s ease-out forwards',
          'slide-up': 'slideUp 0.8s ease-out forwards',
          'slide-in-left': 'slideInLeft 0.8s ease-out forwards',
          'slide-in-right': 'slideInRight 0.8s ease-out forwards',
          'shimmer': 'shimmer 1.5s infinite',
        },
        zIndex: {
          'navbar': '1000',
          'modal': '1050',
          'dropdown': '1020',
          'tooltip': '1030',
          'overlay': '1040',
          'hero': '10',
          'content': '1',
          'background': '0',
        },
        backdropBlur: {
          'xs': '2px',
          'cyber': '15px',
          'strong': '20px',
        },
      },
    },
    plugins: [],
  }