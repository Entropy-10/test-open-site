import typography from '@tailwindcss/typography'

import type { Config } from 'tailwindcss'

export default {
  content: ['./**/*.{ts,tsx,mdx}'],
  theme: {
    extend: {
      backgroundImage: {
        'bottom-fade': 'linear-gradient(180deg, #FFFFFF00 85%, 95%, #FFFEFA)',
        feature2: 'linear-gradient(270deg, #807EE1 -9.09%, #5E72EB 108.5%)',
        feature4: 'linear-gradient(90deg, #807EE1 -8.67%, #FF9190 118.61%);',
        footer: 'linear-gradient(90deg, #120C6E -30.19%, #807EE1 107.81%);'
      },
      colors: {
        'milky-white': '#FFFEFA',
        'light-blue': '#5E72EB',
        blue: '#120C6E',
        'medium-blue': '#0B0742',
        'dark-blue': '#070427'
      }
    }
  },
  plugins: [typography]
} satisfies Config
