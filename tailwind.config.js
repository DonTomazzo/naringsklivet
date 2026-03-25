/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'menu-slide-in': {
          '0%': { transform: 'translateX(100%)' },
          '80%': { transform: 'translateX(-5%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'menu-slide-out': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'slideIn': {
          from: { transform: 'translateX(100%)' },
          to: { transform: 'translateX(0)' },
        },
        'fadeOut': {
          from: { opacity: '1' },
          to: { opacity: '0' },
        },
        'text-blink': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
      animation: {
        'menu-in': 'menu-slide-in 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
        'menu-out': 'menu-slide-out 0.5s ease-in-out forwards',
        'toast-slide-in': 'slideIn 0.5s ease-out forwards',
        'toast-fade-out': 'fadeOut 0.5s ease-in 2.5s forwards',
        'text-blink': 'text-blink 2s linear infinite',
      },
      fontFamily: {
        // LÄGG TILL NUNITO HÄR: Denna inställning gör Nunito till standard för hela sidan.
        sans: ['Nunito', 'sans-serif'], 
        
        // Din befintliga handsfree font är kvar
        handwritten: ['"Dancing Script"', 'cursive'],
      },
      // Typography plugin konfiguration för bättre blogg-styling
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#374151',
            a: {
              color: '#0c5370',
              '&:hover': {
                color: '#083a4c',
              },
            },
            h1: {
              color: '#111827',
              fontWeight: '800',
            },
            h2: {
              color: '#1f2937',
              fontWeight: '700',
            },
            h3: {
              color: '#374151',
              fontWeight: '600',
            },
            strong: {
              color: '#111827',
              fontWeight: '600',
            },
            code: {
              color: '#0c5370',
              backgroundColor: '#f3f4f6',
              padding: '0.25rem 0.375rem',
              borderRadius: '0.25rem',
              fontWeight: '500',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            blockquote: {
              borderLeftColor: '#0c5370',
              backgroundColor: '#f0f9ff',
              padding: '1rem 1.5rem',
              borderRadius: '0.5rem',
            },
          },
        },
        lg: {
          css: {
            h1: {
              fontSize: '2.5rem',
            },
            h2: {
              fontSize: '2rem',
            },
            h3: {
              fontSize: '1.5rem',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};

html {
  scroll-behavior: smooth;
}