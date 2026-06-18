import { faLink } from '@awesome.me/kit-d7ccc5bb1a/icons/classic/solid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import slugify from 'slugify'

import HalftoneMarker from '@/components/updates/HalftoneMarker'

import EpisodeSummary from './EpisodeSummary'

const options = { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'America/Los_Angeles' } as const

export default function Episodes({ episode, index = 0 }) {
	const pubDate = new Date(episode.pubDate).toLocaleDateString('en-US', options)
	const slug = slugify(episode.title)

	const hasGuest = episode.keywords.includes('guest')
	const isBonus = !(episode.season || episode.episode)

	const accentBorder = isBonus ? 'border-brand-red' : hasGuest ? 'border-brand-yellow' : 'border-cream-edge/70'
	const badgeClass = isBonus ? 'border-brand-red bg-brand-red text-cream' : 'border-brand-yellow bg-brand-yellow text-black'
	const rotations = [-2.5, 2, -1.5, 2.5, -2, 1.5]
	const rot = rotations[index % rotations.length]

	return (
		<article className="flex flex-col justify-start w-full py-4 text-sm text-left" id={episode.guid} data-guest={hasGuest}>
			<HalftoneMarker centered fullWidth className="mb-3" />
			<a href={`#${slug}`} className="cursor-pointer group !text-cream flex flex-row justify-center items-center mb-2 md:mb-4 gap-2">
				<FontAwesomeIcon className="opacity-0 group-hover:opacity-100 !text-brand-blue" icon={faLink} size="lg" />
				<h2 id={slug} className="text-2xl font-bold text-center text-cream">
					{episode.title}
				</h2>
				{(hasGuest || isBonus) && (
					<span className={`px-1.5 py-0.5 text-xs font-bold border rounded-lg ${badgeClass}`}>{isBonus ? 'Bonus' : 'Guests'}</span>
				)}
			</a>
			<div className="flex flex-col items-center justify-start gap-4 md:flex-row md:items-start">
				<Image
					src={episode.imgSrc}
					alt={episode.title}
					style={{ '--rot': `${rot}deg` } as React.CSSProperties}
					className={`episode-cover w-32 md:w-48 h-fit aspect-square rounded-lg border-4 ${accentBorder}`}
					width={192}
					height={192}
				/>
				<div className="flex flex-col self-stretch overflow-hidden whitespace-break-spaces text-wrap text-ellipsis">
					<div className="flex flex-row items-center gap-4 mb-2">
						<div className="text-xs text-cream/60">Posted:&nbsp;{pubDate}</div>
						<span className="px-1 py-0.5 leading-none text-xs font-bold text-brand-blue border rounded-lg border-brand-blue bg-black/40">
							{episode.duration}
						</span>
					</div>
					<div className="[&_a]:text-brand-blue mb-1 [&_a]:pb-0.5 [&_a]:font-bold [&_a:hover]:underline [&_a]:break-words">
						<EpisodeSummary summary={episode.summary} />
					</div>
					<div className="flex items-end flex-1">
						<a
							className="inline-block text-base font-bold text-brand-blue hover:underline"
							target="_blank"
							href={episode.link ? episode.link : 'https://zencastr.com/Just-Shillin'}
						>
							Episode Link
						</a>
					</div>
				</div>
			</div>
		</article>
	)
}
