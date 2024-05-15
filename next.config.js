module.exports = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'media.zencastr.com',
				port: '',
				pathname: '/image-files/**',
			},
			{
				protocol: 'https',
				hostname: 'cdn.sanity.io',
			},
		],
	},
	// This is sanity-related
	// logging: {
	// 	fetches: {
	// 		fullUrl: true,
	// 	},
	// },
}
