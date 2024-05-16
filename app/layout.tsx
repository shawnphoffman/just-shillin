import '@/app/global.css'
import '@fortawesome/fontawesome-svg-core/styles.css'

import { GeistSans } from 'geist/font/sans'

const title = `Just Shillin' Podcast`
const description =
	'Join Andy and Shawn for a casual and light-hearted podcast experience. Discover what happens when two friends come together to share their love for the things that make life awesome'
const url = 'https://justshillin.com'

export const metadata = {
	title: {
		template: `%s | ${title}`,
		default: title,
	},
	description,
	metadataBase: url,
	openGraph: {
		title: {
			template: `%s | ${title}`,
			default: title,
		},
		description,
		siteName: title,
		url: url,
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
