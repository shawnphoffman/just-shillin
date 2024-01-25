import styles from 'app/Global.module.css'
import LinkCard from 'components/LinkCard/LinkCard'
import Ratings from 'components/Ratings/Ratings'
import Reviews from 'components/Reviews/Reviews'
import items from 'config/links'

export default async function Home() {
	return (
		<>
			<div className={styles.pageDescription}>
				Join Andy and Shawn for a casual and light-hearted podcast experience. Discover what happens when two friends come together to share
				their love for the things that make life awesome.
			</div>
			<Ratings />
			<div className={styles.pageRow}>
				{items.map((item, i) => {
					return (
						<LinkCard
							i={i}
							key={item.title}
							title={item.title}
							subtitle={item.subtitle}
							link={item.href}
							icon={item.icon}
							cover={item.image}
							bg={item.background}
							color={item.color}
						></LinkCard>
					)
				})}
			</div>

			<div className={styles.pageRow}>
				<Reviews />
			</div>
		</>
	)
}
