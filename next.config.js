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
	async redirects() {
		return [
			{
				source: '/studio',
				destination: 'https://pod-content-studio.vercel.app/studio',
				permanent: false,
			},
			{
				source: '/refresh',
				destination: '/api/revalidate/episodes',
				permanent: true,
			},
		]
	},
	// This is sanity-related
	// logging: {
	// 	fetches: {
	// 		fullUrl: true,
	// 	},
	// },
}
