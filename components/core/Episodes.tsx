'use client'

import { memo, startTransition, Suspense, useCallback, useDeferredValue, useMemo, useState } from 'react'
import Fuse from 'fuse.js'

import Episode from '@/components/core/Episode'
import Loading from '@/components/core/Loading'
import HalftoneDivider from '@/components/updates/HalftoneDivider'

const fuseOptions = {
	includeScore: true,
	useExtendedSearch: true,
	minMatchCharLength: 3,
	keys: [
		{
			name: 'title',
			weight: 0.7,
		},
		{
			name: 'summary',
			weight: 0.3,
		},
	],
}

type EpisodeListProps = {
	episodes: any[]
}

const EpisodeList = memo(({ episodes }: EpisodeListProps): any => {
	if (episodes.length === 0)
		return (
			<div className="flex flex-col items-center w-full gap-3 py-10 text-center">
				<div className="font-display text-xl tracking-wide text-cream">Nothing in the crates for that one</div>
				<p className="max-w-xs text-sm text-cream/60">Try a different title, guest, or topic.</p>
				<HalftoneDivider className="w-40 mt-1" />
			</div>
		)

	return episodes.map((ep, i) => <Episode episode={ep} index={i} key={ep.guid} />)
})
EpisodeList.displayName = 'EpisodeList'

const Episodes = ({ episodes }) => {
	// const [guestsOnly, setGuestsOnly] = useState(false)
	const [search, setSearch] = useState('')
	const deferredSearch = useDeferredValue(search)

	const handleSearch = useCallback(e => {
		e.preventDefault()
		const value = e.target.value
		startTransition(() => setSearch(value))
	}, [])

	const fuse = useMemo(() => {
		return new Fuse(episodes, fuseOptions)
	}, [episodes])

	const filtered = useMemo(() => {
		if (deferredSearch.length >= 3) {
			const out = fuse.search(`'"${deferredSearch}"`, { limit: 20 }).map(e => e.item)
			return out
		}
		return episodes
	}, [deferredSearch, episodes, fuse])

	return (
		<>
			<div className="flex flex-row w-full gap-2 mb-4">
				<label className="sr-only" htmlFor="search">
					Search
				</label>
				<input
					type="text"
					id="search"
					className="block w-full px-4 py-2 text-base leading-5 text-white border-2 rounded-xl placeholder-zinc-500 border-cream-edge/30 bg-zinc-900/60 focus:border-brand-blue focus-visible:outline-brand-red/75 focus-visible:outline-offset-2 focus-visible:outline-dashed focus-visible:outline-2"
					placeholder="Search by title or guest..."
					onChange={handleSearch}
				/>
				{/* <button className="px-2 font-medium text-black rounded-lg bg-brand-blue hover:bg-brand-blue/90 hover:scale-105 whitespace-nowrap">
					Guest Episodes
				</button> */}
			</div>

			<div className="flex flex-col items-center w-full">
				<Suspense fallback={<Loading />}>
					<EpisodeList episodes={filtered} />
				</Suspense>
			</div>
		</>
	)
}

export default memo(Episodes)
