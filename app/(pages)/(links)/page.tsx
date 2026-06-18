import { faStarSharp } from '@awesome.me/kit-d7ccc5bb1a/icons/classic/solid'
import { Awards, RatingsApple, RatingsGoodpods, RatingsSpotify } from '@shawnphoffman/pod-sites-shared/ratings'
import { Suspense } from 'react'

import LinkCard from '@/components/core/LinkCard'
import Loading from '@/components/core/Loading'
import Reviews from '@/components/core/Reviews'

import { getAppleReviews, getSpotifyReviews } from '@/app/actions'
import { getAwards } from '@/sanity/sanity.requests'

import items, { appleRatingUrl, goodpodsUrl, resolveSubtitle, spotifyUrl } from './links'

export default async function Home() {
	return (
		<>
			<div className="w-full max-w-4xl text-base leading-normal sm:text-lg">
				Join us for a casual and light-hearted podcast experience. Discover what happens when friends come together to share their love for
				the things that make life awesome
			</div>
			<div className="links-ratings flex flex-row flex-wrap items-center justify-center gap-2">
				<Suspense fallback={''}>
					<RatingsApple appleRatingUrl={appleRatingUrl} getReviews={getAppleReviews} starIcon={faStarSharp} />
					<RatingsGoodpods goodpodsUrl={goodpodsUrl} starIcon={faStarSharp} />
					<RatingsSpotify spotifyUrl={spotifyUrl} getReviews={getSpotifyReviews} starIcon={faStarSharp} />
				</Suspense>
			</div>
			<div className="link-grid grid w-full grid-cols-[repeat(auto-fill,minmax(230px,1fr))] gap-[18px]">
				{items.map(item => {
					return (
						<LinkCard
							key={item.title}
							title={item.title}
							link={item.href}
							icon={item.icon}
							accent={item.accent}
							subtitle={resolveSubtitle(item)}
						></LinkCard>
					)
				})}
			</div>

			<Suspense fallback={null}>
				<Awards getAwards={getAwards} />
			</Suspense>

			<Suspense fallback={<Loading />}>
				<Reviews appleRatingUrl={appleRatingUrl} />
			</Suspense>
		</>
	)
}
