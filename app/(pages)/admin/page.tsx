import { Suspense } from 'react'

import { getEpisodes } from '@/app/actions'
import Loading from '@/components/core/Loading'

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
		<div key={ep.guid} className="flex flex-col justify-between w-full p-2 md:flex-row">
			<div className="font-bold">{ep.title}</div>
			<span className="text-sm text-yellow-400">{ep.guid}</span>
		</div>
	))
}

export default async function EpisodesPage() {
	return (
		<>
			<Suspense fallback={<Loading />}>
				<div className="grid items-center justify-center w-full grid-cols-1 p-4 mb-8 divide-y rounded-lg divide-sky-500 bg-zinc-950/75">
					<AdminClient />
				</div>
			</Suspense>
		</>
	)
}
