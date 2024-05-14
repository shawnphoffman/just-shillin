import styles from './LinkCard.module.css'

export default function LinkCard({ link, bg, icon, title, color = 'var(--white)' }) {
	const gradient = `linear-gradient(${bg}, ${bg}), linear-gradient(135deg, white, grey, white) !important`
	return (
		<a
			className={`${styles.container} wow`}
			href={link}
			target="_blank"
			rel="noopener noreferrer"
			style={{ backgroundImage: gradient, backgroundColor: bg, color: color }}
		>
			<i className={icon} aria-hidden />
			<h2 className={styles.title}>{title}</h2>
		</a>
	)
}