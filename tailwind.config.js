const podSitesColors = {
	amazonmusic: '#0077c1',
	applepodcasts: '#872ec4',
	bluesky: '#0560ff',
	castbox: '#db3c0e',
	discord: '#5865F2',
	email: '#52565e',
	etsy: '#f56400',
	facebook: '#0866ff',
	goodpods: '#fcdb00',
	googlepodcasts: '#206ff2',
	iheart: '#c6002b',
	instagram: '#c13584',
	overcast: '#be5a01',
	patreon: '#d93b26',
	pocketcasts: '#ea150d',
	podbean: '#5f7e1b',
	radiopublic: '#ce262f',
	rss: '#ce4a0c',
	spotify: '#16883e',
	teepublic: '#374ecd',
	threads: '#222',
	tiktok: '#eb004a',
	twitch: '#9146ff',
	twitter: '#0d7ac4',
	youtube: '#ee0000',
	zencastr: '#1474e0',
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
			backgroundImage: {
				squiggle: "url('/squiggle.svg')",
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
