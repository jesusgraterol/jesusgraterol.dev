/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ['class'],
    content: ['./src/**/*.{html.js.jsx,ts,tsx}'],
  theme: {
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
  			primary: '#0C0C0C',
  			muted: '#64748b',
  		},
      backdropBlur: {
        xs: '2px',
      }
  	}
  },
  plugins: [require("tailwindcss-animate")],
}