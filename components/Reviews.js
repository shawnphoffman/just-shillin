import { getReviews } from 'app/actions'

import styles from './Reviews.module.css'
import Stars from './Stars'

export default async function Reviews() {
	const { reviews } = await getReviews()

	if (!reviews) return null

	return (
		<>
			<div className={styles.heading}>Recent Reviews</div>
			{filteredReviews.map(r => (
				<div className={styles.container} key={r.title}>
					<div className={styles.header}>
						<div className={styles.byline}>
							<div className={styles.title}>{`"${r.title}"`}</div>
							<div className={styles.author}>{r.author}</div>
						</div>
						<Stars count={r.stars} />
					</div>
					<div className={styles.text}>{r.text}</div>
				</div>
			))}
		</>
	)
}
