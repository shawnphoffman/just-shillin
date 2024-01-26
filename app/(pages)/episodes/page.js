import { Suspense } from 'react'

import { getEpisodes } from 'app/actions'
import Episode from 'components/Episode'

export const revalidate = 60 * 60 // 1 hour
export const dynamic = 'force-dynamic'

const EpisodesClient = async () => {
	const [data] = await Promise.all([
		getEpisodes(),
		//
		// new Promise(resolve => setTimeout(resolve, 5000)),
	])
	return data.episodes.map(ep => <Episode episode={ep} key={ep.guid} />)
}

export default async function EpisodesPage() {
	return (
		<Suspense fallback={<i className="fa-solid fa-space-station-moon-construction fa-2xl fa-beat-fade" aria-hidden />}>
			<div className="episodesContainer">
				<EpisodesClient />
			</div>
		</Suspense>
	)
}
