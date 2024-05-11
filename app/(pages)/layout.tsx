import '@/app/(pages)/global.css'
import '@/app/(pages)/stars.css'
import '@shawnphoffman/pod-sites-common/index.css'

import Image from 'next/image'

// import titleSvg from '@/app/title.svg'
import headerImage from '@/app/title.png'
import ActiveLink from '@/components/ActiveLink'
import StarBackground from '@/components/StarBackground'

export default function PageLayout({ children }) {
	return (
		<>
			<StarBackground />
			<div className="scroller">
				<div className="wrapper">
					<div className="page">
						<div className="header">
							{/* <Image className="headerLogo" alt="Just Shillin'" src={titleLogo} width={292} height={139} priority /> */}
							<Image className="headerLogo" alt="Just Shillin'" src={headerImage} width={300} height={300} priority />
							{/* <Image src={titleSvg} alt="Just Shillin'" priority unoptimized className="headerLogo" /> */}
							<div className="navContainer">
								<ActiveLink href="/" label="Links" />
								<ActiveLink href="/episodes" label="Episodes" />
								<ActiveLink href="/listen-now" label="Listen Now" />
								{process.env.VERCEL_ENV !== 'production' && <ActiveLink href="/updates" label="Updates" />}
								{process.env.VERCEL_ENV !== 'production' && <ActiveLink href="/admin" label="Admin" style={{ color: 'var(--js2)' }} />}
							</div>
						</div>
						<div className="pageDetails">{children}</div>
					</div>
				</div>
			</div>
		</>
	)
}
