module.exports = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'media.zencastr.com',
				port: '',
				pathname: '/image-files/**',
			},
		],
	},
	// This is sanity-related
	logging: {
		fetches: {
			fullUrl: true,
		},
	},
}
