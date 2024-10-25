import { faLink } from '@awesome.me/kit-d7ccc5bb1a/icons/classic/solid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import slugify from 'slugify'

import EpisodeSummary from './EpisodeSummary'

const options = { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'America/Los_Angeles' } as const

export default function Episodes({ episode }) {
	const pubDate = new Date(episode.pubDate).toLocaleDateString('en-US', options)
	const slug = slugify(episode.title)

	// console.log('ep', episode)

	const hasGuest = episode.keywords.includes('guest')
	const isBonus = !(episode.season || episode.episode)

	// console.log('isBonus', {
	// 	isBonus,
	// 	season: episode.season,
	// 	episode: episode.episode,
	// })

	return (
		<article className="flex flex-col justify-start w-full py-4 text-sm text-left" id={episode.guid} data-guest={hasGuest}>
			<a href={`#${slug}`} className="cursor-pointer group !text-brand-red flex flex-row justify-center items-center mb-2 md:mb-4 gap-2">
				<FontAwesomeIcon className="opacity-0 group-hover:opacity-100" icon={faLink} size="lg" />
				<h2 id={slug} className="text-2xl font-bold text-center text-brand-red">
					{episode.title}
				</h2>
				{(hasGuest || isBonus) && (
					<span className="px-1.5 py-0.5 text-xs font-bold text-black border rounded-lg border-brand-yellow bg-brand-yellow">
						{isBonus ? 'Bonus' : 'Guests'}
					</span>
				)}
			</a>
			<div className="flex flex-col items-center justify-start gap-4 md:flex-row md:items-start">
				<Image src={episode.imgSrc} alt={episode.title} className="w-32 rounded md:w-48 h-fit aspect-square" width={192} height={192} />
				<div className="flex flex-col self-stretch overflow-hidden whitespace-break-spaces text-wrap text-ellipsis">
					<div className="flex flex-row items-center gap-4 mb-2">
						<div className="text-xs text-white/75">Posted:&nbsp;{pubDate}</div>
						<span className="px-1 py-0.5 leading-none text-xs font-bold text-brand-blue border rounded-lg border-brand-blue bg-brand-black">
							{episode.duration}
						</span>
					</div>
					<div className="[&_a]:text-brand-blue mb-1 [&_a]:pb-0.5 [&_a]:font-bold [&_a:hover]:text-brand-yellow [&_a:hover]:bg-squiggle [&_a]:break-words">
						<EpisodeSummary summary={episode.summary} />
					</div>
					<div className="flex items-end flex-1">
						<a
							className="inline-block text-base font-bold text-brand-blue hover:text-brand-yellow hover:bg-squiggle"
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
