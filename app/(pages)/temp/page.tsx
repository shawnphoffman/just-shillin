import { Suspense } from 'react'
import { kv } from '@vercel/kv'

// import { getEpisodes } from '@/app/actions'
import Loading from '@/components/core/Loading'

export const revalidate = 60 * 60 * 6 // 1 hour
export const dynamic = 'force-dynamic'

const TempClient = async () => {
	const setKey = 'test:set:episodes'
	const episodeKeys = await kv.smembers(setKey)

	const ep1HashKey = 'test:ep:1'
	const ep2HashKey = 'test:ep:2'

	await kv.sadd(setKey, [ep1HashKey, ep2HashKey])

	const ep1 = {
		id: 1,
		title: 'test-1',
	}
	const ep2 = {
		id: 2,
		title: 'test-2',
	}
	// HSETNX
	await kv.hset(ep1HashKey, ep1)
	await kv.hset(ep2HashKey, ep2)
	const ep1Resp = await kv.hgetall(ep1HashKey)
	const ep2Resp = await kv.hgetall(ep2HashKey)

	// const [data] = await Promise.all([
	// 	// getEpisodes(),
	// 	//
	// 	new Promise(resolve => setTimeout(resolve, 5000)),
	// ])
	// // return data.episodes.map(ep => <Episode episode={ep} key={ep.guid} />)

	return (
		<div>
			<h1>{JSON.stringify(episodeKeys)}</h1>
			<p>{JSON.stringify(ep1Resp)}</p>
			<p>{JSON.stringify(ep2Resp)}</p>
		</div>
	)
}

export default async function EpisodesPage() {
	return (
		<div className="episodesContainer">
			<Suspense fallback={<Loading />}>
				<TempClient />
			</Suspense>
		</div>
	)
}
