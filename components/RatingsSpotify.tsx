import styles from './Ratings.module.css'

import { getSpotifyReviews } from '@/app/actions'

export default async function RatingsSpotify() {
	const spotifyData = await getSpotifyReviews()

	// console.log({ spotifyData })

	if (!spotifyData || !spotifyData.rating) return null

	return (
		<a className={`${styles.container} ${styles.spotify} wow`} href={spotifyData.url || ''} target="_blank" rel="noopener noreferrer">
			<div>{spotifyData.rating.toFixed(1)}</div>
			<i className={`fa-solid fa-star-sharp ${styles.star}`} aria-hidden />
			<div>on Spotify</div>
		</a>
	)
}
