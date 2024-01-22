import 'styles/globals.css'

// import { Open_Sans } from 'next/font/google'
import { GeistSans } from 'geist/font/sans'
import Script from 'next/script'

import styles from 'app/Global.module.css'

// const openSans = Open_Sans({ subsets: ['latin'] })

// export const metadata = {
// 	title: 'Jammed Transmissions',
// 	description: 'A positive, listener interactive Star Wars podcast since 2018',
// 	metadataBase: 'https://jammedtransmissions.com',
// 	openGraph: {
// 		title: 'Jammed Transmissions: A Star Wars Podcast',
// 		description: 'A positive, listener interactive Star Wars podcast since 2018',
// 		url: 'https://jammedtransmissions.com',
// 		locale: 'en_US',
// 		type: 'website',
// 	},
// }

// export const runtime = 'edge'

export default function RootLayout({ children }) {
	return (
		// <html lang="en" style={{ fontFamily: openSans.style.fontFamily }}>
		<html lang="en" className={GeistSans.className}>
			<head>
				{/* <!-- FontAwesome Icons --> */}
				<Script src="https://kit.fontawesome.com/d7ccc5bb1a.js" strategy="afterInteractive" rel="preload" as="font" />
			</head>
			<body>
				<div className="scroller">
					<div className={styles.wrapper}>
						<div className={styles.page}>
							<div className={styles.pageDetails}>{children}</div>
						</div>
					</div>
				</div>
			</body>
		</html>
	)
}
