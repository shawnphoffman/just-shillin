'use client'

import Linkify from 'react-linkify'

import styles from './Episodes.module.css'

const options = { year: 'numeric', month: 'long', day: 'numeric' }

const Episodes = ({ episode }) => {
	const pubDate = new Date(episode.pubDate).toLocaleDateString('en-US', options)

	return (
		<div className={styles.container}>
			<h2 className={styles.title}>{episode.title}</h2>

			<div className={styles.detailsContainer}>
				{/* eslint-disable-next-line @next/next/no-img-element */}
				<img src={episode.imgSrc} alt={episode.title} className={styles.cover} />
				<div className={styles.summary}>
					<div className={styles.pubDate} suppressHydrationWarning>
						Posted: {pubDate}
					</div>
					<Linkify>{episode.summary}</Linkify>
					<a className={styles.link} target="_blank" href={episode.link ? episode.link : 'https://zencastr.com/Just-Shillin'}>
						Episode Link
					</a>
				</div>
			</div>
		</div>
	)
}

export default Episodes
