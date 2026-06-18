const podSitesColors = {
	applepodcasts: '#872ec4',
	goodpods: '#fcdb00',
	spotify: '#16883e',
}

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./sanity/**/*.{js,ts,jsx,tsx,mdx}',
		'./utils/**/*.{js,ts,jsx,tsx,mdx}',
		'./node_modules/@shawnphoffman/pod-sites-shared/dist/**/*.{js,mjs,cjs}',
	],
	theme: {
		extend: {
			fontFamily: {
				display: ['var(--font-display)', 'sans-serif'],
				mono: ['var(--font-mono)', 'monospace'],
			},
			colors: {
				...podSitesColors,
				cream: '#ece6d4',
				'cream-edge': '#d4cfc3',
				shill: {
					bg: '#0b0a0e',
					ink: '#ece6d4',
					accent: '#00aeef',
				},
				brand: {
					red: '#f5294b',
					blue: '#00aeef',
					yellow: '#ffd23f',
				},
			},
			keyframes: {
				fadeInUp: {
					'0%': { opacity: 0 },
					'100%': { transform: 1 },
				},
				wiggle: {
					'0%, 100%': { transform: 'rotate(-8deg)' },
					'50%': { transform: 'rotate(8deg)' },
				},
			},
			animation: {
				fadeInUp: '0.5s fadeInUp',
				wiggle: 'wiggle 1.6s ease-in-out infinite',
			},
		},
	},
	plugins: [],
}
