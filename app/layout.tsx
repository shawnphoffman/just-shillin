import '@/app/global.css'
import '@fortawesome/fontawesome-svg-core/styles.css'

import { Analytics } from '@vercel/analytics/react'
import { GeistSans } from 'geist/font/sans'
import { Anton, Space_Mono } from 'next/font/google'
import { draftMode } from 'next/headers'
import Image from 'next/image'
import { VisualEditing } from 'next-sanity/visual-editing'

import logoShillin from '@/app/logo-shillin.webp'
import { siteDescription, siteTitle, siteUrl } from '@/app/meta'
// import AndyModal from '@/components/AndyModal/AndyModal'
// import ChrisRunModal from '@/components/ChrisRunModal/ChrisRunModal'
import ActiveLink from '@/components/core/ActiveLink'
import SiteBanner from '@/components/core/SiteBanner'

const display = Anton({ weight: '400', subsets: ['latin'], variable: '--font-display' })
const mono = Space_Mono({ weight: ['400', '700'], subsets: ['latin'], variable: '--font-mono' })

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

export default async function RootLayout({ children }: LayoutProps) {
	const { isEnabled: isDraftMode } = await draftMode()
	return (
		<html
			lang="en"
			className={`${GeistSans.className} ${display.variable} ${mono.variable} bg-shill-bg h-full p-0 m-0 overflow-x-hidden w-dvw`}
		>
			<head>
				<meta name="apple-itunes-app" content="app-id=1726695035" />
			</head>
			<body className="p-0 mx-auto my-0 text-white min-h-dvh w-dvw">
				<SiteBanner />
				<div className="flex flex-col items-center w-full max-w-screen-xl px-2 mx-auto">
					<div className="flex flex-col w-full max-w-4xl">
						<div className="flex flex-col items-center gap-6 m-4 text-center">
							<h1 className="sr-only">{siteTitle}</h1>
							{/* LOGO */}
							<Image
								className="w-72 lg:w-[26rem] h-auto drop-shadow-[0_10px_22px_rgba(0,0,0,0.55)]"
								alt={siteTitle}
								src={logoShillin}
								priority
							/>
							{/* NAV */}
							<nav className="flex flex-row flex-wrap justify-center gap-3.5">
								<ActiveLink href="/" label="Links" classes="-rotate-2" />
								{/* <ActiveLink href="https://www.online-tribute.com/AndyBell" label="Andy" target="_blank" classes="text-purple-500" /> */}
								<ActiveLink href="/updates" label="Updates" fuzzy classes="rotate-1" />
								<ActiveLink href="/episodes" label="Episodes" classes="-rotate-1" />
								{/* <ActiveLink href="/updates/trivia" label="Trivia" /> */}
								{/* <ActiveLink href="/listen-now" label="Listen Now" /> */}
							</nav>
						</div>
						<main className="flex flex-col items-center flex-1 gap-4 text-center">{children}</main>
					</div>
				</div>
				{process.env.VERCEL_ENV && <Analytics />}
				{/* <SpeedInsights /> */}
				{/* <ChrisRunModal /> */}
				{isDraftMode && <VisualEditing />}
			</body>
		</html>
	)
}
