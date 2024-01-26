import styles from './LinkCard.module.css'

export default function LinkCard({ i, link, bg, icon, title, subtitle, color = 'var(--white)' }) {
	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<a href={link} target="_blank" rel="noopener noreferrer">
					<div className={styles.cover} style={{ background: bg, color: color }}>
						<i className={icon} aria-hidden />
						<div className={styles.data}>
							<h2 className={styles.title}>{title}</h2>
							{!!subtitle && <p className={styles.subtitle}>{subtitle}</p>}
						</div>
					</div>
				</a>
			</div>
		</div>
	)
}
