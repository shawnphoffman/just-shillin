import '@/app/global.css'
import '@fortawesome/fontawesome-svg-core/styles.css'

import { GeistSans } from 'geist/font/sans'

import { siteDescription, siteTitle, siteUrl } from '@/app/meta'

export const metadata = {
	title: {
		template: `%s | ${siteTitle}`,
		default: siteTitle,
	},
	description: siteDescription,
	metadataBase: siteUrl,
	openGraph: {
		title: {
			template: `%s | ${siteTitle}`,
			default: siteTitle,
		},
		description: siteDescription,
		siteName: siteTitle,
		url: siteUrl,
		locale: 'en_US',
		type: 'website',
	},
}

export default function RootLayout({ children }) {
	return (
		<html lang="en" className={GeistSans.className}>
			<head>
				<meta name="apple-itunes-app" content="app-id=1726695035" />
			</head>
			<body>{children}</body>
		</html>
	)
}
