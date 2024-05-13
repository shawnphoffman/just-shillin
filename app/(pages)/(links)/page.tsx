import { Suspense } from 'react'

import LinkCard from '@/components/core/LinkCard'
import Loading from '@/components/core/Loading'
import RatingsApple from '@/components/core/RatingsApple'
import RatingsSpotify from '@/components/core/RatingsSpotify'
import Reviews from '@/components/core/Reviews'

import items from './links'

export default async function Home() {
	return (
		<>
			<div className="pageDescription">
				Join Andy and Shawn for a casual and light-hearted podcast experience. Discover what happens when two friends come together to share
				their love for the things that make life awesome.
			</div>
			<div className="ratingsWrapper">
				<Suspense fallback={''}>
					<RatingsApple />
					{/* </Suspense> */}
					{/* <Suspense fallback={<Loading />}> */}
					<RatingsSpotify />
				</Suspense>
			</div>
			<div className="pageRow">
				{items.map(item => {
					return (
						<LinkCard
							key={item.title}
							title={item.title}
							link={item.href}
							icon={item.icon}
							bg={item.background}
							color={item.color}
						></LinkCard>
					)
				})}
			</div>

			<div className="pageRow">
				<Suspense fallback={<Loading />}>
					<Reviews />
				</Suspense>
			</div>
		</>
	)
}
