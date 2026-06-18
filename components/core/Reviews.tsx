import { faStarSharp } from '@awesome.me/kit-d7ccc5bb1a/icons/classic/solid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { getAppleReviews } from '@/app/actions'
import HalftoneDivider from '@/components/updates/HalftoneDivider'
import HalftoneMarker from '@/components/updates/HalftoneMarker'

import Stars from './Stars'

type Review = {
	title: string
	author: string
	stars: string | number
	text: string
}

type Props = {
	appleRatingUrl?: string
}

export default async function Reviews({ appleRatingUrl }: Props) {
	const { reviews } = await getAppleReviews()

	const all: Review[] = Array.isArray(reviews) ? reviews : []
	const filteredReviews = all.reduce((memo: Review[], acc) => {
		if (acc.stars !== 5 && !!process.env.VERCEL_URL) {
			return memo
		}
		memo.push(acc)
		return memo
	}, [])

	return (
		<div className="flex flex-col items-center w-full mt-2">
			<div className="w-full font-display text-2xl tracking-wide text-center text-cream">Recent Reviews</div>
			<HalftoneMarker centered className="mt-1 mb-4" />

			{filteredReviews.length === 0 ? (
				<EmptyReviews appleRatingUrl={appleRatingUrl} />
			) : (
				<div className="grid w-full grid-cols-1 gap-3 mb-8 sm:grid-cols-2">
					{filteredReviews.map((r: Review) => (
						<figure
							key={r.title}
							className="review-card flex flex-col gap-2 p-4 text-left border-2 rounded-xl border-cream-edge/25 bg-zinc-950/70"
						>
							<div className="flex items-center gap-3">
								<HalftoneMarker className="flex-1" />
								<Stars count={r.stars} />
							</div>
							<blockquote className="flex flex-col gap-1">
								<span className="font-bold leading-snug text-brand-blue">{`"${r.title}"`}</span>
								<span className="text-sm leading-relaxed text-cream/85">{r.text}</span>
							</blockquote>
							<figcaption className="mt-auto text-xs italic text-cream/55">{r.author}</figcaption>
						</figure>
					))}
				</div>
			)}
		</div>
	)
}

function EmptyReviews({ appleRatingUrl }: Props) {
	return (
		<div className="relative flex flex-col items-center w-full max-w-xl gap-3 px-6 py-8 mb-8 overflow-hidden text-center rounded-2xl border-2 border-cream-edge/25 bg-zinc-950/75">
			<div className="opacity-80 text-brand-yellow">
				<Stars count={0} />
			</div>
			<div className="font-display text-xl tracking-wide text-cream">No reviews on the wall yet</div>
			<p className="max-w-sm text-sm leading-relaxed text-cream/70">
				Be the first to slap a five-star sticker on the show. It takes ten seconds and genuinely makes our week.
			</p>
			{appleRatingUrl && (
				<a
					href={appleRatingUrl}
					target="_blank"
					rel="noreferrer noopener"
					className="inline-flex items-center gap-2 px-4 py-2 mt-1 font-display tracking-wide transition-colors border-2 rounded-lg text-brand-blue border-cream-edge/40 hover:text-cream hover:border-cream-edge/70"
				>
					<FontAwesomeIcon icon={faStarSharp} />
					Leave a review on Apple Podcasts
				</a>
			)}
			<HalftoneDivider className="w-40 mt-3" />
		</div>
	)
}
