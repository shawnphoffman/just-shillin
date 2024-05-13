import Image from 'next/image'

import styles from './Episodes.module.css'
import EpisodeSummary from './EpisodeSummary'

const options = { year: 'numeric', month: 'long', day: 'numeric' } as const

export default function Episodes({ episode }) {
	const pubDate = new Date(episode.pubDate).toLocaleDateString('en-US', options)
	return (
		<div className={styles.container}>
			<h2 className="mb-2 md:mb-4 text-center text-2xl font-bold text-sky-500">{episode.title}</h2>
			<div className={styles.detailsContainer}>
				<Image
					src={episode.imgSrc}
					alt={episode.title}
					className="w-32 md:w-48 h-fit aspect-square rounded mb-2"
					width={192}
					height={192}
				/>
				<div className={styles.summary}>
					<div className="text-xs text-white/75 mb-2">Posted: {pubDate}</div>
					<div>
						<EpisodeSummary summary={episode.summary} />
					</div>
					<div className={styles.linkContainer}>
						<a className={styles.link} target="_blank" href={episode.link ? episode.link : 'https://zencastr.com/Just-Shillin'}>
							Episode Link
						</a>
					</div>
				</div>
			</div>
		</div>
	)
}
