import '@/app/(pages)/pages.css'
import '@/app/(pages)/stars.css'
import '@shawnphoffman/pod-sites-common/index.css'

// BRANDS
import { faAmazon, faBluesky, faSpotify, faYoutube } from '@awesome.me/kit-d7ccc5bb1a/icons/classic/brands'
// CLASSIC - SOLID
import {
	faAt,
	faPodcast,
	faSpaceStationMoonConstruction,
	faSquareRss,
	faStar,
	faStarSharp,
} from '@awesome.me/kit-d7ccc5bb1a/icons/classic/solid'
// DUO - SOLID
import { faStar as faStarDuo } from '@awesome.me/kit-d7ccc5bb1a/icons/duotone/solid'
// CUSTOM
import {
	faGoodpods,
	faOvercast,
	faPocketCasts,
	faRadioPublic,
	faYoutubeMusic,
	faZencastr,
} from '@awesome.me/kit-d7ccc5bb1a/icons/kit/custom'
import { library } from '@fortawesome/fontawesome-svg-core'
import Image from 'next/image'

import headerImage from '@/app/title.png'
import ActiveLink from '@/components/core/ActiveLink'
import StarBackground from '@/components/core/StarBackground'

library.add([
	faStarSharp,
	faStar,
	faStarDuo,
	faSpaceStationMoonConstruction,
	faAt,
	faPodcast,
	faSquareRss,
	faAmazon,
	faBluesky,
	faSpotify,
	faYoutube,
	faGoodpods,
	faOvercast,
	faPocketCasts,
	faRadioPublic,
	faYoutubeMusic,
	faZencastr,
])

export default function PageLayout({ children }) {
	return (
		<>
			<StarBackground />
			<div className="scroller">
				<div className="wrapper">
					<div className="page">
						<div className="header">
							{/* IMAGE */}
							<Image className="w-52 lg:w-72" alt="Just Shillin'" src={headerImage} width={300} height={300} priority />
							{/* NAV */}
							<div className="flex flex-row flex-wrap justify-center gap-4">
								<ActiveLink href="/" label="Links" />
								<ActiveLink href="/updates" label="Updates" />
								<ActiveLink href="/episodes" label="Episodes" />
								<ActiveLink href="/listen-now" label="Listen Now" />
							</div>
						</div>
						<div className="pageDetails">{children}</div>
					</div>
				</div>
			</div>
		</>
	)
}
