/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    backdropFilter: {
      none: 'none',
      blur: 'blur(30px)', // Adjust blur value as needed
    },
    extend: {
      keyframes: {
        'flashy-border': {
          '0%, 100%': { borderColor: 'red' },
          '25%': { borderColor: 'yellow' },
          '50%': { borderColor: 'green' },
          '75%': { borderColor: 'blue' },
        },
      },
      animation: {
        'flashy-border': 'flashy-border 8s linear',
      },
      fontFamily: {
        anta: ["Anta", "sans-serif"],
        VT323: ["VT323", "sans-serif"],
        "kode-mono": ["Kode Mono", "monospace"],
        Sixtyfour: ["Sixtyfour", "sans-serif"],
        "Oleo-Script": ["Oleo Script", "system-ui"],
        Mansalva: ["Mansalva", "sans-serif"],
        Genos: ["Genos", "sans-serif"],
        Orbitron: ["Orbitron", "sans-serif"],
        Cinzel: ["Cinzel", "sans-serif"],
        "Exo-2": ["Exo 2", "sans-serif"],
        Roboto: ["Roboto", "sans-serif"],
        Sanchez: ["Sanchez", "serif"],
        "DM-Serif-Text": ["DM Serif Text", "serif"],
        "Zen-Tokyo-Zoo": ["Zen Tokyo Zoo", "serif"],
        "Poppins": ["Poppins", "sans-serif"],
        Inter: ["Inter", "sans-serif"],
        Montserrat: ["Montserrat", "sans-serif"],
        "Open-Sans": ["Open Sans", "sans-serif"],
        "Plus-Jakarta-Sans": ["Plus Jakarta Sans", "sans-serif"],
        "Source-Serif-4": ["Source Serif 4", "serif"],
        "Work-Sans": ["Work Sans", "sans-serif"],
        Saira: ["Saira", "sans-serif"],
        Mohave: ["Mohave", "sans-serif"],
        Asap: ["Asap", "sans-serif"],
        Ubuntu: ["Ubuntu", "sans-serif"]
      },
      boxShadow: {
        'inner-dark': 'inset 0 4px 6px rgba(0, 0, 0, 0.3)', // Darker inner shadow
      },
    },
  },
  plugins: [],
};
