import { Suspense } from 'react'

import LinkCard from 'components/LinkCard'
import Ratings from 'components/Ratings'
import Reviews from 'components/Reviews'

import items from './links'

export default async function Home() {
	return (
		<>
			<div className="pageDescription">
				Join Andy and Shawn for a casual and light-hearted podcast experience. Discover what happens when two friends come together to share
				their love for the things that make life awesome.
			</div>
			<Suspense>
				<Ratings />
			</Suspense>
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
				<Suspense>
					<Reviews />
				</Suspense>
			</div>
		</>
	)
}
