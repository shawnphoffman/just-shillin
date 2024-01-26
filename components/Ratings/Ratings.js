import { getReviews } from 'app/actions'

import styles from './Ratings.module.css'

export default async function Ratings() {
	const data = await getReviews()

	if (!data || !data.appleRating) return null

	return (
		<a className={styles.container} href={data.appleRatingUrl || ''} target="_blank" rel="noopener noreferrer">
			<div>{data.appleRating}</div>
			<i className={`fa-solid fa-star-sharp ${styles.star}`} aria-hidden />
			<div>on Apple Podcasts</div>
		</a>
	)
}
