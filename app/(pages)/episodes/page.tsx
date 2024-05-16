import { Suspense } from 'react'

import { getEpisodes } from '@/app/actions'
import Episodes from '@/components/core/Episodes'
import Loading from '@/components/core/Loading'

export const revalidate = 60 * 60 * 6 // 1 hour
export const dynamic = 'force-dynamic'

const EpisodesClient = async () => {
	const [data] = await Promise.all([getEpisodes()])
	return <Episodes episodes={data.episodes} />
}

export default async function EpisodesPage() {
	return (
		<div className="w-full max-w-3xl p-4 mb-8 border rounded-lg border-zinc-900 bg-zinc-950/75">
			<Suspense fallback={<Loading />}>
				<EpisodesClient />
			</Suspense>
		</div>
	)
}
