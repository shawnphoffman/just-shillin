import { Suspense } from 'react'
import { XMLParser } from 'fast-xml-parser'

import styles from 'app/Global.module.css'
import Episode from 'components/Episodes/Episode'

// export const runtime = 'edge'

async function getData() {
	try {
		const res = await fetch('https://feeds.zencastr.com/f/l5bmy6wm.rss', {
			next: { revalidate: 60 * 60 * 1 },
		})
		const xml = await res.text()
		const parser = new XMLParser({
			ignoreAttributes: false,
			attributeNamePrefix: '@_',
		})
		const parsed = parser.parse(xml)
		let episodes = []
		if (parsed.rss.channel.item instanceof Array) {
			episodes = parsed.rss.channel.item.map(ep => ({
				guid: ep.guid['#text'],
				title: ep.title,
				imgSrc: ep['itunes:image']['@_href'],
				summary: ep['itunes:summary'],
				link: ep.link,
				pubDate: ep.pubDate,
			}))
		} else {
			const ep = parsed.rss.channel.item
			episodes = [
				{
					guid: ep.guid['#text'],
					title: ep.title,
					imgSrc: ep['itunes:image']['@_href'],
					summary: ep['itunes:summary'],
					link: ep.link,
					pubDate: ep.pubDate,
				},
			]
		}
		return {
			episodes,
		}
	} catch (error) {
		return {}
	}
}

const EpisodesClient = async () => {
	const [data] = await Promise.all([
		getData(),
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
