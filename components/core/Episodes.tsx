'use client'

import { memo, startTransition, Suspense, useCallback, useDeferredValue, useMemo, useState } from 'react'
import Fuse from 'fuse.js'

import Episode from '@/components/core/Episode'
import Loading from '@/components/core/Loading'

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
	if (episodes.length === 0) return <div>No episodes found...</div>

	return episodes.map(ep => <Episode episode={ep} key={ep.guid} />)
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
					className="block w-full px-4 py-2 text-base leading-5 text-white border rounded-lg placeholder-zinc-500 border-zinc-500 bg-zinc-900 focus:border-brand-blue focus-visible:outline-brand-red/75 focus-visible:outline-offset-2 focus-visible:outline-dashed focus-visible:outline-2"
					placeholder="Search"
					onChange={handleSearch}
				/>
				{/* <button className="px-2 font-medium text-black rounded-lg bg-brand-blue hover:bg-brand-blue/90 hover:scale-105 whitespace-nowrap">
					Guest Episodes
				</button> */}
			</div>

			<div className="flex flex-col items-center w-full border-t divide-y divide-brand-blue border-t-brand-blue">
				<Suspense fallback={<Loading />}>
					<EpisodeList episodes={filtered} />
				</Suspense>
			</div>
		</>
	)
}

export default memo(Episodes)
