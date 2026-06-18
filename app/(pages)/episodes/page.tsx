import { Metadata } from 'next/types'

import { getEpisodes } from '@/app/actions'
import Episodes from '@/components/core/Episodes'
import HalftoneMarker from '@/components/updates/HalftoneMarker'
export const metadata: Metadata = {
	title: 'Episodes',
}

// NOTE Loading.tsx wraps Pages in Suspense but it seems to only work when it is nested and not the root Loading component

export default async function EpisodesPage() {
	const data = await getEpisodes()
	const count = data.episodes?.length ?? 0

	return (
		<div className="flex flex-col items-center w-full max-w-3xl mb-8">
			<h1 className="font-display text-3xl tracking-wide text-center text-cream sm:text-4xl">The Whole Catalog</h1>
			<HalftoneMarker centered className="mt-2 mb-3" />
			<p className="max-w-xl mb-6 text-center text-cream/70">
				Every episode we&apos;ve ever put out, in one place: movies, games, Star Wars rabbit holes, and the tangents in between.
				{count > 0 ? ` Dig through all ${count} below.` : ''}
			</p>
			<div className="w-full p-4 border-2 rounded-2xl border-cream-edge/25 bg-zinc-950/75">
				<Episodes episodes={data.episodes} />
			</div>
		</div>
	)
}
