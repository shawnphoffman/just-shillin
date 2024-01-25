import 'styles/globals.css'

import { GeistSans } from 'geist/font/sans'
import Image from 'node_modules/next/image'

import styles from 'app/Global.module.css'
import ActiveLink from 'components/ActiveLink'

import titleLogo from './header@2x.png'

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

export default function RootLayout({ children }) {
	return (
		<html lang="en" className={GeistSans.className}>
			<head>
				<script src="https://kit.fontawesome.com/d7ccc5bb1a.js" crossOrigin="anonymous" async></script>
			</head>
			<body>
				<div className="scroller">
					<div className={styles.wrapper}>
						<div className={styles.page}>
							<div className={styles.header}>
								<Image className={styles.headerLogo} alt="Just Shillin'" src={titleLogo} width={292} height={139} priority />
								<div className={styles.navContainer}>
									<ActiveLink href="/" label="Links" />
									<ActiveLink href="/episodes" label="Episodes" />
									<ActiveLink href="/listen-now" label="Listen Now" />
								</div>
							</div>
							<div className={styles.pageDetails}>{children}</div>
						</div>
					</div>
				</div>
			</body>
		</html>
	)
}
