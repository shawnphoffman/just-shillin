import styles from './Reviews.module.css'

export default function Stars({ count }) {
	const numStars = Number(count)

	let solidStars = []
	for (let i = 1; i <= numStars; i++) {
		solidStars.push(<i className="fa-solid fa-star" key={'solid' + i} aria-hidden />)
	}
	let emptyStars = []
	for (let i = 1; i <= 5 - numStars; i++) {
		emptyStars.push(<i className="fa-duotone fa-star" key={'empty' + i} aria-hidden />)
	}

	return (
		<div className={styles.starContainer}>
			{solidStars}
			{emptyStars}
		</div>
	)
}
