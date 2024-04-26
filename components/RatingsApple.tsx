import styles from './Ratings.module.css'

import { getAppleReviews } from '@/app/actions'

export default async function RatingsApple() {
	const appleData = await getAppleReviews()

	// console.log({ appleData })

	if (!appleData || !appleData.appleRating) return null

	return (
		<a className={`${styles.container} wow`} href={appleData.appleRatingUrl || ''} target="_blank" rel="noopener noreferrer">
			<div>{appleData.appleRating}</div>
			<i className={`fa-solid fa-star-sharp ${styles.star}`} aria-hidden />
			<div>on Apple Podcasts</div>
		</a>
	)
}
