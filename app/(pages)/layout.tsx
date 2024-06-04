import '@/app/(pages)/icons'

import Image from 'next/image'

import { title } from '@/app/layout'
import headerImage from '@/app/title.png'
import ActiveLink from '@/components/core/ActiveLink'
import StarBackground from '@/components/core/StarBackground'

export default function PageLayout({ children }) {
	return (
		<>
			<StarBackground />
			<div className="w-full px-2 py-0 mx-auto overflow-scroll h-dvh">
				<div className="flex flex-col items-center w-full max-w-screen-xl mx-auto">
					<div className="flex flex-col w-full max-w-4xl min-h-dvh">
						<div className="flex flex-col items-center m-4 text-center">
							<h1 className="sr-only">{title}</h1>
							{/* IMAGE */}
							<Image className="w-52 lg:w-72" alt="" src={headerImage} width={300} height={300} priority />
							{/* NAV */}
							<nav className="flex flex-row flex-wrap justify-center gap-4">
								<ActiveLink href="/" label="Links" />
								<ActiveLink href="/updates" label="Updates" />
								<ActiveLink href="/episodes" label="Episodes" />
								<ActiveLink href="/listen-now" label="Listen Now" />
							</nav>
						</div>
						<div className="flex flex-col items-center flex-1 gap-4 text-center">{children}</div>
					</div>
				</div>
			</div>
		</>
	)
}
