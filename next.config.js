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
		domains: ['cdn.sanity.io'],
	},
	// This is sanity-related
	logging: {
		fetches: {
			fullUrl: true,
		},
	},
}
