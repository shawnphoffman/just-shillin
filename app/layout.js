import 'styles/globals.css'

// import { Open_Sans } from 'next/font/google'
import { GeistSans } from 'geist/font/sans'
import Script from 'next/script'
import Image from 'node_modules/next/image'

import styles from 'app/Global.module.css'
import NavBar from 'components/NavBar/NavBar'

import titleLogo from './header@2x.png'

// const openSans = Open_Sans({ subsets: ['latin'] })

export const metadata = {
	title: `Just Shillin'`,
	description:
		'Join Andy and Shawn for a casual and light-hearted podcast experience. Discover what happens when two friends come together to share their love for the things that make life awesome',
	metadataBase: 'https://justshillin.com',
	openGraph: {
		title: `Just Shillin'`,
		description:
			'Join Andy and Shawn for a casual and light-hearted podcast experience. Discover what happens when two friends come together to share their love for the things that make life awesome',
		url: 'https://justshillin.com',
		locale: 'en_US',
		type: 'website',
	},
}

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
							<div className={styles.header}>
								<Image className={styles.headerLogo} alt="Just Shillin'" src={titleLogo} width={292} height={139} priority />
								<NavBar />
							</div>
							<div className={styles.pageDetails}>{children}</div>
						</div>
					</div>
				</div>
			</body>
		</html>
	)
}
