import typography from '@tailwindcss/typography'

import type { Config } from 'tailwindcss'

export default {
	content: ['./**/*.{ts,tsx,mdx}'],
	theme: {
		extend: {
			screens: {
				xs: '500px'
			},
			backgroundImage: {
				'bottom-fade': 'linear-gradient(180deg, #FFFFFF00 85%, 95%, #FFFEFA)',
				feature2: 'linear-gradient(270deg, #807EE1 -9.09%, #5E72EB 108.5%)',
				feature4: 'linear-gradient(90deg, #807EE1 -8.67%, #FF9190 118.61%);',
				footer: 'linear-gradient(90deg, #120C6E -30.19%, #807EE1 107.81%);',
				'flag-fade':
					'linear-gradient(270deg, #FFFEFA 5%, rgba(255, 254, 250, 0.00) 15%), linear-gradient(0deg, #FFFEFA 5%, rgba(255, 254, 250, 0.00) 25%);'
			},
			colors: {
				'milky-white': '#FFFEFA',
				'light-blue': '#5E72EB',
				blue: '#120C6E',
				'medium-blue': '#0B0742',
				'dark-blue': '#070427',
				lavender: '#807EE1',
				salmon: '#FF9190'
			},
			keyframes: {
				overlayShow: {
					from: { opacity: '0' },
					to: { opacity: '1' }
				},
				contentShow: {
					from: {
						opacity: '0',
						transform: 'translate(-50%, -48%) scale(0.96)'
					},
					to: { opacity: '1', transform: 'translate(-50%, -50%) scale(1)' }
				}
			},
			animation: {
				overlayShow: 'overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
				contentShow: 'contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)'
			}
		}
	},
	plugins: [typography]
} satisfies Config
