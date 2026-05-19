import { faStarSharp } from '@awesome.me/kit-d7ccc5bb1a/icons/classic/solid'
import { RatingsApple, RatingsGoodpods, RatingsSpotify } from '@shawnphoffman/pod-sites-shared/ratings'
import { Suspense } from 'react'

import Awards from '@/components/core/Awards'
import LinkCard from '@/components/core/LinkCard'
import Loading from '@/components/core/Loading'
import Reviews from '@/components/core/Reviews'

import { getAppleReviews, getSpotifyReviews } from '@/app/actions'

import items, { appleRatingUrl, goodpodsUrl, spotifyUrl } from './links'

export default async function Home() {
	// await new Promise(resolve => setTimeout(resolve, 2000))
	return (
		<>
			<div className="w-full max-w-4xl text-base leading-normal sm:text-lg">
				Join us for a casual and light-hearted podcast experience. Discover what happens when friends come together to share their love for
				the things that make life awesome
			</div>
			<div className="flex flex-row flex-wrap items-center justify-center gap-2">
				<Suspense fallback={''}>
					<RatingsApple appleRatingUrl={appleRatingUrl} getReviews={getAppleReviews} starIcon={faStarSharp} />
					<RatingsGoodpods goodpodsUrl={goodpodsUrl} starIcon={faStarSharp} />
					<RatingsSpotify spotifyUrl={spotifyUrl} getReviews={getSpotifyReviews} starIcon={faStarSharp} />
				</Suspense>
			</div>
			<div className="flex flex-row flex-wrap justify-center w-full gap-4">
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

			<Suspense fallback={null}>
				<Awards />
			</Suspense>

			<Suspense fallback={<Loading />}>
				<Reviews />
			</Suspense>
		</>
	)
}
