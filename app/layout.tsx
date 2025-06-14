import '@/app/global.css'
import '@fortawesome/fontawesome-svg-core/styles.css'

import { Analytics } from '@vercel/analytics/react'
import { GeistSans } from 'geist/font/sans'
import Image from 'next/image'

import { siteDescription, siteTitle, siteUrl } from '@/app/meta'
import headerImage from '@/app/title.png'
// import AndyModal from '@/components/AndyModal/AndyModal'
import ChrisRunModal from '@/components/ChrisRunModal/ChrisRunModal'
import ActiveLink from '@/components/core/ActiveLink'
import StarBackground from '@/components/core/StarBackground'

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

type LayoutProps = {
	children: React.ReactNode
}

export default function RootLayout({ children }: LayoutProps) {
	return (
		<html lang="en" className={`${GeistSans.className} bg-black h-full p-0 m-0 overflow-x-hidden w-dvw`}>
			<head>
				<meta name="apple-itunes-app" content="app-id=1726695035" />
			</head>
			<body className="px-2 py-0 mx-auto my-0 text-white min-h-dvh w-dvw">
				<StarBackground />
				<div className="flex flex-col items-center w-full max-w-screen-xl mx-auto">
					<div className="flex flex-col w-full max-w-4xl min-h-dvh">
						<div className="flex flex-col items-center m-4 text-center">
							<h1 className="sr-only">{siteTitle}</h1>
							{/* IMAGE */}
							<Image className="w-52 lg:w-72" alt="" src={headerImage} width={300} height={300} priority />
							{/* NAV */}
							<nav className="flex flex-row flex-wrap justify-center gap-4">
								<ActiveLink href="/" label="Links" />
								<ActiveLink href="https://www.online-tribute.com/AndyBell" label="Andy" target="_blank" classes="text-purple-500" />
								<ActiveLink href="/updates" label="Updates" fuzzy />
								<ActiveLink href="/episodes" label="Episodes" />
								{/* <ActiveLink href="/updates/trivia" label="Trivia" /> */}
								{/* <ActiveLink href="/listen-now" label="Listen Now" /> */}
							</nav>
						</div>
						<main className="flex flex-col items-center flex-1 gap-4 text-center">{children}</main>
					</div>
				</div>
				{process.env.VERCEL_ENV && <Analytics />}
				{/* <SpeedInsights /> */}
				<ChrisRunModal />
			</body>
		</html>
	)
}
