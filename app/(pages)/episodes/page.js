import { Suspense } from 'react'

import { getEpisodes } from 'app/actions'
import styles from 'app/Global.module.css'
import Episode from 'components/Episodes/Episode'

export const revalidate = 60 * 60 // 1 hour

const EpisodesClient = async () => {
	const [data] = await Promise.all([
		getEpisodes(),
		//
		new Promise(resolve => setTimeout(resolve, 5000)),
	])
	return data.episodes.map(ep => <Episode episode={ep} key={ep.guid} />)
}

export default async function EpisodesPage() {
	return (
		<Suspense fallback={<div className="fa-solid fa-space-station-moon-construction fa-beat-fade" />}>
			<div className={styles.episodesContainer}>
				<EpisodesClient />
			</div>
		</Suspense>
	)
}
