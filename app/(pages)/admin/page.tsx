import { Suspense } from 'react'

import { getEpisodes } from '@/app/actions'
import Loading from '@/components/core/Loading'

import styles from './page.module.css'

export const revalidate = 60 * 60 * 6 // 1 hour
export const dynamic = 'force-dynamic'

const AdminClient = async () => {
	const [data] = await Promise.all([
		getEpisodes(),
		//
		// new Promise(resolve => setTimeout(resolve, 5000)),
	])
	// return data.episodes.map(ep => <Episode episode={ep} key={ep.guid} />)

	return data.episodes.map(ep => (
		<div key={ep.guid} className={styles.container}>
			<div>{ep.title}</div>
			<span className={styles.guid}>{ep.guid}</span>
		</div>
	))
}

export default async function EpisodesPage() {
	return (
		<>
			<Suspense fallback={<Loading />}>
				<AdminClient />
			</Suspense>
		</>
	)
}
