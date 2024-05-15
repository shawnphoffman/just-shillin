import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { getAppleReviews } from '@/app/actions'

import styles from './Ratings.module.css'

export default async function RatingsApple() {
	const appleData = await getAppleReviews()

	// console.log({ appleData })

	if (!appleData || !appleData.appleRating) return null

	return (
		<a className={`${styles.container} wow`} href={appleData.appleRatingUrl || ''} target="_blank" rel="noopener noreferrer">
			<div>{appleData.appleRating}</div>
			{/* <i className={`fa-solid fa-star-sharp ${styles.star}`} aria-hidden /> */}
			<FontAwesomeIcon icon={'fa-solid fa-star-sharp' as IconProp} className="text-xs mx-0.5" />
			<div>on Apple Podcasts</div>
		</a>
	)
}
